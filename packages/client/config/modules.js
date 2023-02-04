

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return '';
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(paths.appSrc, baseUrlResolved) === '') {
    return [paths.appSrc];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  // if (path.relative(paths.appPath, baseUrlResolved) === '') {
  //   return null;
  // }

  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
        ' Create React App does not support other values at this time.'
    )
  );
}

/**
 * @param {string} prop
 */
function removeWildcardTemplatePart(prop) {
  return prop.replace('/*', '')
}

function resolveAliasPath(...args) {
  return path.resolve(...args);
}

function getWebpackAliases(options = {}) {
  const baseUrl = options.baseUrl

  if(!baseUrl) {
    return {}
  }

  const baseAlias = {src: paths.appSrc};

  const customAliases = Object.keys(options.paths).reduce((aliasAcc, alias) => ({
    ...aliasAcc,
    [removeWildcardTemplatePart(alias)]: resolveAliasPath(baseAlias.src, options.paths[alias].map(removeWildcardTemplatePart)[0])
  }), {});

  return {...baseAlias, ...customAliases};
}

function getJestAliases(options = {}) {
  const baseUrl = options.baseUrl

  if (!baseUrl) {
    return {}
  }

  let resultAlias = {'^src/(.*)$': '<rootDir>/src/$1'}

  return Object.assign({}, resultAlias,
    Object.keys(options.paths).reduce(
      (obj, alias) => {
        obj[`^${removeWildcardTemplatePart(alias)}(.*)$`] = options.paths[alias].map(p => `<rootDir>/src/${removeWildcardTemplatePart(p)}/$1`)
        return obj
      }, {}
    )
  )
}

function getModules() {
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.'
    );
  }

  let config;

  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {basedir: paths.appNodeModules}));
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();

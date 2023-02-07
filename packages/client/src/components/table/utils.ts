export const interpolateString = (line: string, value: number | string, template: string): string => {
  return line.replaceAll(template, String(value));
}

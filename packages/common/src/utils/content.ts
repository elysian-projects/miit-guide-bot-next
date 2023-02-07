import escapeHtml from "escape-html";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";
import { FlatContent, RichContent } from "../types";

export const flattenContent = (content: RichContent | FlatContent | undefined): FlatContent => {
  if(!content) {
    return "";
  }

  if(typeof content !== "object" && Array.isArray(content)) {
    return content.join(" ");
  }

  return String(content);
};

// FIXME: define better types for serialization and deserialization

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeContent = (node: any): string => {
  // The given prop might be an array on nodes that we want to serialize, so we need to recursively
  // serialize one by one in an array and glue it all together to string with `\n` separator
  if(Array.isArray(node)) {
    return node.map(currentNode => serializeContent(currentNode)).join("\n");
  }

  if(Text.isText(node)) {
    let string = escapeHtml(node.text);

    if(node["bold" as keyof typeof node]) {
      string = `<b>${string}</b>`;
    }

    return string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = node.children?.map((currentNode: any) => serializeContent(currentNode)).join("");

  if(children.length === 0) {
    return "";
  }

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserializeContent = (element: any, markAttributes = {}) => {
  if (element.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, element.textContent);
  }

  // This case basically means that the given value has no parent HTML element, so it's just a plain text node.
  // This is definitely an invalid value since all of the nodes must have at least one parent HTML element, but
  // if this case works out, we have to process it properly and show what a user might want to see on the page instead
  // of an error message, so here we just manually create a new element valid for the editor container and return it
  else if (element.nodeType !== Node.ELEMENT_NODE) {
    return [jsx("element", {}, element)];
  }

  const nodeAttributes = { ...markAttributes, bold: false };

  switch (element.nodeName) {
    case "b":
      nodeAttributes.bold = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: any = Array.from(element.childNodes)
    .map(node => deserializeContent(node, nodeAttributes))
    .flat();

  if(children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  switch (element.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: element.getAttribute("href") },
        children
      );
    default:
      return children;
  }
};

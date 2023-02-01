
// export const computeArticleData = <T extends ContentNode>(node: T[]): T[] => {
//   if(node.length !== 1 || node[0].type !== "article" || typeof node[0].content !== "string") {
//     throw new Error("The given node is not of article type!");
//   }

//   const articleContent = node[0].content.split("---");
//   return Array.from({length: articleContent.length}, (_, index): T => ({...node[0], content: articleContent[index]}));
// };

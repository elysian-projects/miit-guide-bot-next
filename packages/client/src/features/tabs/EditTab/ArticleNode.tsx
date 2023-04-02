import { Link } from "@mui/material";
import { ContentNode, FlatContent, RichContent } from "common/src";
import { FC } from "react";
import { formatDate } from "../../../utils/formatDate";
import { ArticleNodeStyled } from "./ArticlesNode.styles";

interface IArticleNodeProps {
  data: ContentNode<FlatContent | RichContent>
}

export const ArticleNode: FC<IArticleNodeProps> = ({data}) => {
  return (
    <ArticleNodeStyled>
      <Link href={`/content/articles/edit?id=${data.id}`}>{data.label}</Link>
      {data.addedOn && (
        <div>{formatDate(data.addedOn)}</div>
      )}
    </ArticleNodeStyled>
  );
};

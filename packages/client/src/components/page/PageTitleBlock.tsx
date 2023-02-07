import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../separator";
import { PageTitleStyledBlock } from "./Page.styles";

interface IPageTitleBlockProps {
  title: string,
  linkTitle?: string
  href?: string
}

export const PageTitleBlock: FC<IPageTitleBlockProps> = ({title, linkTitle, href}) => (
  <>
    <PageTitleStyledBlock>
      <Typography variant="h4">{title}</Typography>
      {(linkTitle && href) && (
        <Link to={href}>
          <Button variant="text">
            {linkTitle}
          </Button>
        </Link>
      )}
    </PageTitleStyledBlock>
    <Separator />
  </>
)

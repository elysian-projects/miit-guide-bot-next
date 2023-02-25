import { Badge, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../../components/separator";
import { PageTitleStyledBlock } from "./Page.styles";

interface IPageTitleBlockProps {
  title: string,
  linkTitle?: string
  href?: string,
  badgeContent?: string | number
}

export const PageTitleBlock: FC<IPageTitleBlockProps> = ({title, linkTitle, href, badgeContent}) => (
  <>
    <PageTitleStyledBlock>
      {badgeContent ? (
        <Badge badgeContent={badgeContent} color="primary">
          <Typography variant="h4">{title}</Typography>
        </Badge>
      ) : (
        <Typography variant="h4">{title}</Typography>
      )}
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
);

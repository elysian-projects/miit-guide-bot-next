import { Delete, Edit } from "@mui/icons-material";
import { CardActions, IconButton, Tooltip, TooltipProps } from "@mui/material";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { useRedirect } from "../../hooks/useRedirect";

const tooltipProps: Omit<TooltipProps, "children" | "title"> = {
  placement: "top",
  enterNextDelay: 500
}

interface ICardActionBar {
  editLink?: string,
  deleteLink?: string,
  additionalLinks?: {value: string, icon: ReactNode, tip?: string}[]
}

export const CardActionBar: FC<ICardActionBar> = ({deleteLink, editLink, additionalLinks}) => {
  const {redirect} = useRedirect();

  return (
    <CardActions style={{justifyContent: "space-between"}}>
      {editLink && (
        <Tooltip title="Редактировать" {...tooltipProps}>
          <IconButton onClick={() => redirect(editLink)} aria-label="edit">
            <Edit />
          </IconButton>
        </Tooltip>
      )}

      <AdditionalLinksStyled>
        {additionalLinks && additionalLinks.map(link => (
          <Tooltip title={link.tip} key={link.value} {...tooltipProps}>
            <IconButton onClick={() => redirect(link.value)}>
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </AdditionalLinksStyled>

      {deleteLink && (
        <Tooltip title="Удалить" {...tooltipProps}>
          <IconButton onClick={() => redirect(deleteLink)} aria-label="delete">
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </CardActions>
  )
}

const AdditionalLinksStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`

import { Delete, Edit } from "@mui/icons-material";
import { CardActions, IconButton } from "@mui/material";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { useRedirect } from "../../hooks/useRedirect";

interface ICardActionBar {
  editLink?: string,
  deleteLink?: string,
  additionalLinks?: {value: string, icon: ReactNode}[]
}

export const CardActionBar: FC<ICardActionBar> = ({deleteLink, editLink, additionalLinks}) => {
  const {redirect} = useRedirect();

  return (
    <CardActions style={{justifyContent: "space-between"}}>
      {editLink && (
        <IconButton onClick={() => redirect(editLink)} aria-label="edit">
          <Edit />
        </IconButton>
      )}

      <AdditionalLinksStyled>
        {additionalLinks && additionalLinks.map(link => (
          <IconButton onClick={() => redirect(link.value)} key={link.value}>
            {link.icon}
          </IconButton>
        ))}
      </AdditionalLinksStyled>

      {deleteLink && (
        <IconButton onClick={() => redirect(deleteLink)} aria-label="delete">
          <Delete />
        </IconButton>
      )}
    </CardActions>
  )
}

const AdditionalLinksStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`

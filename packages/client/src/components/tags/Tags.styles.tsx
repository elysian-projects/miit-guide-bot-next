import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const TagsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #f1f1f1;
`

export const TagStyled = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1565C0;
  border-radius: 4px;
  color: #fff;
  padding: 4px 8px;
`

export const TagLink = styled.a`
  color: #fff;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export const DeleteIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  >* {
    font-size: 18px;
    transition-duration: .3s;

    :hover {
      cursor: pointer;
    }
  }
`

export const AddTagStyled = styled(TextField)`
  width: 100%
`

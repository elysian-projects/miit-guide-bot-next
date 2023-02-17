import { Clear } from "@mui/icons-material";
import { FC } from "react";
import { isValidURL, shrinkValueLength } from "../../../../common/src";
import { DeleteIcon, TagLink, TagStyled } from "./Tags.styles";

interface ITagProps {
  value: string,
  handlerRemove?: (tag: string) => void
}

export const Tag: FC<ITagProps> = ({value, handlerRemove = () => {}}) => {
  const removeThis = () => {
    handlerRemove(value);
  }

  return (
    <TagStyled>
      {isValidURL(value) ? (
        <TagLink href={value} target="_blank">
          {shrinkValueLength(value)}
        </TagLink>
      ) : (
        shrinkValueLength(value)
      )}
      <DeleteIcon onClick={removeThis}>
        <Clear />
      </DeleteIcon>
    </TagStyled>
  )
}

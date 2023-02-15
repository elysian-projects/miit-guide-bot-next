import { Clear } from "@mui/icons-material";
import { FC } from "react";
import { isValidURL } from "../../../../common/src";
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
          {normalizeValue(value)}
        </TagLink>
      ) : (
        normalizeValue(value)
      )}
      <DeleteIcon onClick={removeThis}>
        <Clear />
      </DeleteIcon>
    </TagStyled>
  )
}

const normalizeValue = (value: string): string => {
  if(value.length <= 20) {
    return value;
  }

  return value.substring(0, 20);
}

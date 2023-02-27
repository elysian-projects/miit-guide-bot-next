import { FC, KeyboardEventHandler, useState } from "react";
import { AddTagStyled } from "./Tags.styles";

interface IAddTagProps {
  handler: (tag: string) => void;
  placeholder?: string
}

export const AddTag: FC<IAddTagProps> = ({handler, placeholder}) => {
  const [value, setValue] = useState<string>("");

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if(event.key === "Enter" && value.length > 0) {
      event.preventDefault();
      handler(value);
      setValue("");
    }
  };

  return (
    <AddTagStyled
      type="text"
      placeholder={placeholder}
      value={value}
      onKeyDown={handleKeydown}
      onChange={event => setValue(event.target.value)}
    />
  );
};

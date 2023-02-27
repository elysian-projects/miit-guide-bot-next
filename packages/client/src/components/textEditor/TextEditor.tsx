import { FC, useState } from "react";
import { TextareaStyled } from "./TextEditor.styles";

interface ITextEditorProps {
  initialValue?: string,
  onChangeCallback?: (value: string) => void
}

export const TextEditor: FC<ITextEditorProps> = (props) => {
  const {
    initialValue,
    onChangeCallback = () => 0
  } = props;

  const [value, setValue] = useState<string>(initialValue || "");

  return (
    <TextareaStyled
      onChange={event => {
        setValue(event.target.value);
        onChangeCallback(event.target.value);
      }}
      value={value}
    />
  );
};

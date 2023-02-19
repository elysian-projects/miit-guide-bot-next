import { deserializeContent, serializeContent } from "common/src";
import { FC, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { EditableStyled } from "./TextEditor.styles";

interface ITextEditorProps {
  initialValue?: string,
  onChangeCallback?: (value: string) => void
}

const defaultValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  }
]

export const TextEditor: FC<ITextEditorProps> = (props) => {
  const {
    initialValue,
    onChangeCallback = () => {}
  } = props;

  const [editor] = useState(() => withReact(createEditor()))

  const handleChange = (value: Descendant[]) => {
    onChangeCallback(serializeContent(value))
  }

  const getInitialValue = (): Descendant[] => {
    if(!initialValue) {
      return defaultValue;
    }

    return deserializeContent(initialValue) ?? defaultValue;
  }

  return (
    <Slate onChange={handleChange} editor={editor} value={getInitialValue()}>
      <EditableStyled />
    </Slate>
  )
}

import { styled as MUIStyled } from "@mui/material";
import { FC, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { serializeContent } from "../../../../common/src";

interface ITextEditorProps {
  initialValue?: Descendant[],
  onChangeCallback?: (value: string) => void
}

const EditableStyled = MUIStyled(Editable)`
  border: 1px solid black;
`

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

  return (
    <Slate onChange={handleChange} editor={editor} value={initialValue ?? defaultValue}>
      <EditableStyled
        onKeyDown={event => {
          if(event.key === "&") {
            event.preventDefault();
            editor.insertText("и");
          }
        }}
      />
    </Slate>
  )
}

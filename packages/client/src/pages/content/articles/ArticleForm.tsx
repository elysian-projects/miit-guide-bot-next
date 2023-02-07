import { FormControl, TextField } from "@mui/material";
import { FC, useState } from "react";
import { ContentNode } from "../../../../../common/src";

interface IArticleForm {
  data?: ContentNode | null
}

export const ArticleForm: FC<IArticleForm> = ({data}) => {
  const [formData] = useState<ContentNode>(data || {
    id: -1,
    label: "",
    content: [],
    picture: "",
    tabValue: "",
    type: "article",
    links: [],
    value: ""
  });

  return (
    <FormControl fullWidth>
      <TextField label="Название" variant="outlined" value={formData.label} />
      <TextField label="Контент" variant="outlined" value={formData.content} />
    </FormControl>
  )
}

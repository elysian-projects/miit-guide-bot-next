import { Article } from "@mui/icons-material";
import { Avatar, Box, Button, Container, CssBaseline, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ArticleType, ContentNode, FlatContent } from "../../../../../common/src";
import { TextEditor } from "../../../components/form/TextEditor";

type ArticleFormContentNode = Omit<ContentNode<FlatContent>, "id">;

const articleTypes: {value: ArticleType, label: string}[] = [
  {label: "Статья", value: "article"},
  {label: "Локация", value: "location"},
]

const defaultFormState: ArticleFormContentNode = {
  label: "",
  content: "",
  picture: "",
  tabValue: "",
  type: "article",
  links: [],
  value: ""
}

interface IArticleForm {
  data?: Partial<ArticleFormContentNode> | null
}

export const ArticleForm: FC<IArticleForm> = ({data}) => {
  const [formData, setFormData] = useState<ArticleFormContentNode>({...defaultFormState, ...data});
  const [articleType, setArticleType] = useState<ArticleType>(formData.type);

  const textFieldHandleChange = (_data: string): void => {}

  return (
    <Container component="main" sx={{
      maxWidth: "100%",
    }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Article />
        </Avatar>
        <Typography component="h1" variant="h5">
          Статья
        </Typography>
        <Box component="form" noValidate width={"100%"}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label={"Название " + (articleType === "article" ? "статьи" : "локации")}
            onChange={event => setFormData({...formData, label: event.target.value})}
            name="title"
            value={formData.label}
            autoComplete="text"
            autoFocus
          />

          <TextEditor initialValue={formData.content} onChangeCallback={textFieldHandleChange} />

          <Select
            labelId="article-type-selector"
            id="article-type-selector"
            value={articleType}
            fullWidth
          >
            {articleTypes.map(type => (
              <MenuItem
                key={type.value}
                value={type.value}
                onClick={() => setArticleType(type.value)}
              >
                {type.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

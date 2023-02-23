import { Article } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { CSSProperties, FC, FormEventHandler, useEffect, useState } from "react";
import { TextEditor } from "../../../components/form/TextEditor";
import { ArticleFormContentNode } from "./AddArticlePage";
import { AddLinks } from "./components/AddLinks";
import { ArticleTypeSelect } from "./components/ArticleTypeSelect";
import { ChooseTab } from "./components/ChoseTab";
import { PhotoLink } from "./components/PhotoLink";
import { defaultFormState } from "./constants";

const aligningStyles = {
  display: 'flex',
  flexDirection: 'column',
} as CSSProperties;

interface IArticleForm {
  data?: Partial<ArticleFormContentNode> | null,
  onUpdate?: (data: ArticleFormContentNode) => void,
  onSubmit?: FormEventHandler
}

export const ArticleForm: FC<IArticleForm> = (props) => {
  const {
    data,
    onUpdate = () => {},
    onSubmit = () => {}
  } = props;

  const [formData, setFormData] = useState<ArticleFormContentNode>({...defaultFormState, ...data});
  const [error] = useState<string | null>(null);

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  }

  useEffect(() => {
    onUpdate(formData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  return (
    <Container component="div" sx={{maxWidth: "100%"}}>
      <CssBaseline />
      <Box sx={{...aligningStyles, alignItems: "center"}}>

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Article />
        </Avatar>
        <Typography component="h1" variant="h5">
          Статья
        </Typography>

        <Box
          sx={{...aligningStyles, marginTop: "10px", gap: "8px", width: "100%"}}
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <TextField
            required
            fullWidth
            id="title"
            placeholder={"Название " + (formData.type === "article" ? "статьи" : "локации")}
            onChange={event => setFormData({...formData, label: event.target.value})}
            name="title"
            value={formData.label}
            autoComplete="text"
            autoFocus
          />

          <ArticleTypeSelect
            value={formData.type}
            onUpdate={type => setFormData({...formData, type})}
          />

          <PhotoLink
            value={formData.picture}
            onUpdate={updatedLink => setFormData({...formData, picture: updatedLink})}
          />

          <ChooseTab
            tabIdValue={formData.tabId}
            onUpdate={updatedTab => setFormData({...formData, tabId: updatedTab.id})}
            type={formData.type}
          />

          <TextEditor
            initialValue={formData.content}
            onChangeCallback={data => setFormData({...formData, content: data})}
          />

          <AddLinks
            values={formData.links || []}
            onUpdate={links => setFormData({...formData, links})}
          />

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

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

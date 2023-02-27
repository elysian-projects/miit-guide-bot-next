import { Article } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { Form } from "../../components/form";
import { TextEditor } from "../../components/textEditor/TextEditor";
import { AddLinks } from "./components/AddLinks";
import { ArticleTypeSelect } from "./components/ArticleTypeSelect";
import { ChooseTab } from "./components/ChoseTab";
import { PhotoLink } from "./components/PhotoLink";
import { defaultFormState } from "./constants";

interface IArticleForm {
  data?: Partial<ContentNode<FlatContent>> | null,
  onUpdate?: (data: ContentNode<FlatContent>) => void,
  onSubmit?: FormEventHandler
}

export const ArticleForm: FC<IArticleForm> = ({
  data,
  onUpdate = () => 0,
  onSubmit = () => 0
}) => {
  const [formData, setFormData] = useState<ContentNode<FlatContent>>({...defaultFormState, ...data});

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  return (
    <Form
      title="Статьи"
      onSubmit={handleFormSubmit}
      buttonTitle="Сохранить"
      icon={<Article />}
    >
      <TextField
        required
        fullWidth
        id="title"
        placeholder={"Название " + (formData.type === "article" ? "статьи" : "локации") + "*"}
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
    </Form>
  );
};

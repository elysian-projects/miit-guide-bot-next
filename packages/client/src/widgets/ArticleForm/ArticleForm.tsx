import { Article } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { Form } from "../../components/form";
import { TextEditor } from "../../components/textEditor/TextEditor";
import { formatDate } from "../../utils/formatDate";
import { AddLinks } from "./components/AddLinks";
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
        placeholder={"Название статьи*"}
        onChange={event => setFormData({...formData, label: event.target.value})}
        name="title"
        value={formData.label}
        autoComplete="text"
        autoFocus
      />

      {formData.addedOn && (
        <TextField
          value={`Добавлено: ${formatDate(formData.addedOn)}`}
          disabled
        />
      )}

      <PhotoLink
        value={formData.picture}
        onUpdate={updatedLink => setFormData({...formData, picture: updatedLink})}
      />

      <ChooseTab
        tabIdValue={formData.tabId}
        onUpdate={updatedTab => setFormData({...formData, tabId: updatedTab.id})}
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

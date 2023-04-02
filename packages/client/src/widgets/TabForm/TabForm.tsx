import { Storage } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { TabNode } from "common/src";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { Form } from "../../components/form";
import { ArticleTypeSelect } from "../ArticleForm";
import { defaultTabFormState } from "./constants";

interface ITabFormProps {
  data?: TabNode | null,
  onUpdate?: (data: TabNode) => void,
  onSubmit?: FormEventHandler
}

export const TabForm: FC<ITabFormProps> = ({
  data,
  onUpdate = () => 0,
  onSubmit = () => 0,
}) => {
  const [formData, setFormData] = useState<TabNode>({...defaultTabFormState, ...data});

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  return (
    <Form
      title="Вкладка"
      onSubmit={handleFormSubmit}
      buttonTitle="Сохранить"
      icon={<Storage />}
    >
      <TextField
        required
        fullWidth
        id="title"
        placeholder="Название вкладки*"
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
    </Form>
  );
};

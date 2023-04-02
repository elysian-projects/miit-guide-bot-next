import { Alert } from "@mui/material";
import { ContentNode, FlatContent } from "common/src";
import { FC, FormEventHandler, useState } from "react";
import { useRedirect } from "../../../hooks/useRedirect";
import { ArticleForm, defaultFormState } from "../../../widgets/ArticleForm";
import { createArticle } from "../api";
import { validateArticleForm } from "./scripts/formValidation";

export const AddArticleForm: FC = () => {
  const [formState, setFormState] = useState<ContentNode<FlatContent>>(defaultFormState);
  const [error, setError] = useState<string | null>(null);
  const {redirect} = useRedirect();

  const onSubmit: FormEventHandler = async () => {
    const validationResponse = validateArticleForm(formState);

    if(!validationResponse.ok) {
      setError(validationResponse.message);

      setTimeout(() => setError(null), 3000);

      return;
    }

    const response = await createArticle(formState);

    if(!response.ok) {
      setError(response.message || "");
      return;
    }

    redirect("/content/articles/");
  };

  return <>
    {error && (
      <Alert severity="error">
        {error}
      </Alert>
    )}
    <ArticleForm
      onUpdate={setFormState}
      onSubmit={onSubmit}
    />
  </>;
};

import { ContentNode, FlatContent, flattenContent } from "common/src";
import { FC, useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { ArticleForm } from "../../../widgets/ArticleForm/ArticleForm";
import { ConfirmEditDialog } from "../../../widgets/ConfirmEditAlert";
import { ResponseAlert } from "../../../widgets/ResponseAlert";
import { getOneArticle, updateArticle } from "../api";

export const EditArticleForm: FC = () => {
  const {redirect} = useRedirect();
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));
  const {error, response, status} = useHttp<ContentNode<FlatContent>>("articles", async () => getOneArticle({id: id ?? ""}));
  const [formData, setFormData] = useState<ContentNode<FlatContent> | null>(response?.data || null);
  const [submitResult, setSubmitResult] = useState<{ok: boolean, message: string} | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    (!id || error || status === "error") && redirect("/content/articles");
  }, [error, redirect, status]);

  const onUpdate = (updatedContent: ContentNode<FlatContent>): void => {
    setFormData(updatedContent);
  };

  const onSubmit = (): void => {
    setEditDialogOpen(true);
  };

  const applyChanges = async (shouldEdit: boolean): Promise<void> => {
    if(formData && shouldEdit) {
      setSubmitResult(await updateArticle(formData));
    }
    setEditDialogOpen(false);
  };

  return (
    <>
      {response ? (
        <>
          <ConfirmEditDialog
            open={editDialogOpen}
            returnDialogResult={applyChanges}
          />
          {submitResult && (
            <ResponseAlert
              open={Boolean(submitResult)}
              handleClose={() => setSubmitResult(null)}
              submitResult={submitResult}
            />
          )}
          <ArticleForm
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            data={{...response?.data, content: flattenContent(response?.data?.content)}}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

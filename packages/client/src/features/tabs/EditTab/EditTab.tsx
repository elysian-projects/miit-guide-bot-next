import { TabNode } from "common/src";
import { FC, useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { ConfirmEditDialog } from "../../../widgets/ConfirmEditAlert";
import { ResponseAlert } from "../../../widgets/ResponseAlert";
import { TabForm } from "../../../widgets/TabForm";
import { getOneTab, updateTab } from "../api";

export const EditTab: FC = () => {
  const {redirect} = useRedirect();
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));
  const {error, response, status} = useHttp<TabNode>("tabs", async () => getOneTab({id: id ?? ""}));
  const [formData, setFormData] = useState<TabNode | null>(response?.data || null);
  const [submitResult, setSubmitResult] = useState<{ok: boolean, message: string} | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    (!id || error || status === "error") && redirect("/content/tabs");
  }, [error, redirect, status]);

  const onUpdate = (updatedContent: TabNode): void => {
    setFormData(updatedContent);
  };

  const onSubmit = (): void => {
    setEditDialogOpen(true);
  };

  const applyChanges = async (shouldEdit: boolean): Promise<void> => {
    if(formData && shouldEdit) {
      setSubmitResult(await updateTab(formData));
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
          <TabForm
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            data={response?.data}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

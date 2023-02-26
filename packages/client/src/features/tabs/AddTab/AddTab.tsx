import { Alert } from "@mui/material";
import { TabNode } from "common/src";
import { FC, FormEventHandler, useState } from "react";
import { useRedirect } from "../../../hooks/useRedirect";
import { TabForm } from "../../../widgets/TabForm";
import { defaultTabFormState } from "../../../widgets/TabForm/constants";
import { createTab } from "../api";
import { validateTabForm } from "./scripts/formValidation";

export const AddTabForm: FC = () => {
  const [formState, setFormState] = useState<TabNode>(defaultTabFormState);
  const [error, setError] = useState<string | null>(null);
  const {redirect} = useRedirect();

  const onSubmit: FormEventHandler = async () => {
    const validationResponse = validateTabForm(formState);

    if(!validationResponse.ok) {
      setError(validationResponse.message);

      setTimeout(() => setError(null), 3000);

      return;
    }

    const response = await createTab({label: formState.label, type: formState.type});

    if(!response.ok) {
      setError(response.message);
      return;
    }

    redirect("/content/tabs/");
  };

  return <>
    {error && (
      <Alert severity="error">
        {error}
      </Alert>
    )}
    <TabForm
      onUpdate={setFormState}
      onSubmit={onSubmit}
    />
  </>;
};

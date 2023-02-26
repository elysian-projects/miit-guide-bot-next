import { Alert } from "@mui/material";
import { TabNode } from "common/src";
import { FC, useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { useHttp } from "../../../hooks/useHttp";
import { useRedirect } from "../../../hooks/useRedirect";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { DeleteDialog } from "../../../widgets/DeleteDialog";
import { deleteTab, getOneTab } from "../api";

export const DeleteTab: FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const {getQueryProp} = useSearchQuery();
  const [id] = useState<string | null>(getQueryProp("id"));
  const {error, isFetching, response, status} = useHttp<TabNode>("tab", async () => getOneTab({id: id ?? ""}));
  const {redirect} = useRedirect();

  const closePage = () => {
    setOpen(false);
    redirect("/content/tabs");
  };

  useEffect(() => {
    if(!id || error || status === "error") {
      closePage();
    }
  }, [closePage, error, id, status]);

  const handleDelete = async () => {
    await deleteTab(id || "");
    closePage();
  };

  return <>
    {response?.data && (
      <DeleteDialog
        open={open}
        text={<>
          Вы уверены, что хотите удалить вкладку <i><b>{response?.data.label}</b></i>?
          Удаление вкладки также повлечёт за собой удаление <b>всех статей</b>, прикреплённых
          к ней! <b>После удаления отменить это действие будет невозможно!</b>
        </>
        }
        handleClose={closePage}
        handleDelete={handleDelete}
      />
    )}
    {isFetching ? (
      <Loader />
    ) : (response && !response.ok) && (
      <Alert severity={"error"}>
        {response.message}
      </Alert>
    )}
  </>;
};

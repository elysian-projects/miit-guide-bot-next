import { Alert } from "@mui/material";
import { FC } from "react";
import { TabNode } from "../../../../../common/src";
import { getAllTabs } from "../../../api/tabs";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { DataTable } from "../../../components/table/DataTable";
import { useHttp } from "../../../hooks/useHttp";
import { getTableColumnNames } from "../../../utils/tableColumn";

export const AllTabsPage: FC = () => {
  const {error, response, status} = useHttp<TabNode[]>("getAllTabs", getAllTabs);
  const columnNames = getTableColumnNames(response?.data ? response.data[0] : {}, {addChange: true, addDelete: true});

  return (
    <>
      <PageTitleBlock
        title="Вкладки"
        linkTitle="Добавить вкладку"
        href="/content/tabs/add"
      />
      {status === "loading" && (
        <Alert severity="info">Загрузка данных...</Alert>
      )}
      {status === "error" && (
        <Alert severity="error">{error}</Alert>
      )}
      {(status === "success" && response) && (
        <DataTable
          columnNames={columnNames}
          data={response.data ?? []}
          serviceColumns={{
            editLink: "/content/tabs/edit?id=$id",
            deleteLink: "/content/tabs/delete?id=$id"
          }}
        />
      )}
    </>
  )
}

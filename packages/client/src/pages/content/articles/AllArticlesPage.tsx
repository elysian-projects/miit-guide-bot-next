import { Alert } from "@mui/material";
import { FC } from "react";
import { ContentNode } from "../../../../../common/src";
import { getAllArticles } from "../../../api/articles";
import { PageTitleBlock } from "../../../components/page/PageTitleBlock";
import { DataTable } from "../../../components/table/DataTable";
import { useHttp } from "../../../hooks/useHttp";
import { getTableColumnNames } from "../../../utils/tableColumn";

export const AllArticlesPage: FC = () => {
  const {response, status, error} = useHttp<ContentNode[]>("articlesPage", getAllArticles);
  const columnNames = getTableColumnNames(response?.data ? response.data[0] : {}, {addChange: true, addDelete: true});

  return (
    <>
      <PageTitleBlock
        title="Статьи"
        linkTitle="Добавить статью"
        href="/content/articles/add"
        badgeContent={response?.data?.length}
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
            editLink: "/content/articles/edit?id=$id",
            deleteLink: "/content/articles/delete?id=$id"
          }}
        />
      )}
    </>
  )
}

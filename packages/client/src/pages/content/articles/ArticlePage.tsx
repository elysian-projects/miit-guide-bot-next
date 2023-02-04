import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";
import { ContentNode } from "../../../../../common/src";
import { Separator } from "../../../components/separator";
import { getTableColumnNames } from "../../../utils/tableColumn";

const placeholder: ContentNode[] = [
  {id: 1, label: "Название", value: "value", content: ["Some content1", "Some content2"], tabValue: "tab_value", picture: "link", type: "article"},
  {id: 2, label: "Название 2", value: "value2", content: ["Some content1"], tabValue: "tab_value2", picture: "link2", type: "location"}
];

export const ArticlePage: FC = () => {
  // const query = useQuery("articles", getArticles, {placeholderData: placeholder});
  const query = placeholder;
  const columnNames = getTableColumnNames(query[0]);

  return (
    <>
      <Typography variant="h4">Статьи</Typography>

      <Separator />

      {/* {query.status === "loading" && (
        <Alert severity="info">Загрузка данных...</Alert>
      )}
      {query.status === "error" && (
        <Alert severity="error">Ошибка! Не удалось загрузить данные!</Alert>
      )} */}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnNames.map((columnName) => (
                <TableCell
                  key={columnName}
                  style={{backgroundColor: "#8190ad"}}
                >
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {query.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {Object.values(row).map((column) => {
                    return (
                      <TableCell key={column}>{column}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../../api/articles";
import { Separator } from "../../../components/separator";
import { CHANGE, DELETE } from "../../../constants/table";
import { getTableColumnNames } from "../../../utils/tableColumn";
import { ArticlesPageTitle } from "./Articles.styles";

export const ArticlePage: FC = () => {
  const query = useQuery("articles", getAllArticles);
  const columnNames = getTableColumnNames(query.data ? query.data[0] : {}, {addChange: true, addDelete: true});

  return (
    <>
      <ArticlesPageTitle>
        <Typography variant="h4">Статьи</Typography>
        <Link to="/content/articles/add">
          <Button>
            Добавить
          </Button>
        </Link>
      </ArticlesPageTitle>

      <Separator />

      {query.status === "loading" && (
        <Alert severity="info">Загрузка данных...</Alert>
      )}
      {query.status === "error" && (
        <Alert severity="error">Ошибка! Не удалось загрузить данные!</Alert>
      )}
      {query.status === "success" && (
        <TableContainer style={{maxHeight: "80vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnNames?.map((columnName) => (
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
              {query.data?.map((row) => ((
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {Object.values(row)?.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                  {columnNames.includes(CHANGE) && (
                    <TableCell>
                      <Link to={`/content/articles/edit?id=${row.id}`}>
                        <Button
                          variant="contained"
                          color="info"
                        >
                          {CHANGE}
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                  {columnNames.includes(DELETE) && (
                    <TableCell>
                      <Link to={`/content/articles/delete?id=${row.id}`}>
                        <Button
                          variant="contained"
                          color="error"
                        >
                          {DELETE}
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

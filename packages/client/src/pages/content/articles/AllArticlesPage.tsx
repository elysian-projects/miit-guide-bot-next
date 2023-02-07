import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  Link as MUILink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ContentNode, isValidURL } from "../../../../../common/src";
import { getAllArticles } from "../../../api/articles";
import { Separator } from "../../../components/separator";
import { CHANGE, DELETE } from "../../../constants/table";
import { useHttp } from "../../../hooks/useHttp";
import { getTableColumnNames } from "../../../utils/tableColumn";
import { ArticlesPageTitle } from "./Articles.styles";

export const AllArticlesPage: FC = () => {
  const {response, status, error} = useHttp<ContentNode[]>("articlesPage", getAllArticles);
  const columnNames = getTableColumnNames(response?.data ? response.data[0] : {}, {addChange: true, addDelete: true});

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

      {status === "loading" && (
        <Alert severity="info">Загрузка данных...</Alert>
      )}
      {status === "error" && (
        <Alert severity="error">{error}</Alert>
      )}
      {status === "success" && (
        <TableContainer style={{maxHeight: "80vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnNames?.map((columnName) => (
                  <TableCell
                    key={columnName}
                    style={{backgroundColor: "#dfdfdf"}}
                  >
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {response?.data?.map((row) => ((
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {Object.values(row)?.map((column) => (
                    <TableCell key={column}>
                      {isValidURL(column) ? (
                        <MUILink href={column} target="_blank" rel="noreferrer">
                          {column}
                        </MUILink>
                      ) : (
                        <>
                          {column}
                        </>
                      )}
                    </TableCell>
                  ))}
                  {columnNames.includes(CHANGE) && (
                    <ServiceTableCell href={`/content/articles/edit?id=${row.id}`} icon={<Edit />} />
                  )}
                  {columnNames.includes(DELETE) && (
                    <ServiceTableCell href={`/content/articles/delete?id=${row.id}`} icon={<Delete />} />
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

interface IServiceTableCellProps {
  icon: ReactNode,
  href: string
}

const ServiceTableCell: FC<IServiceTableCellProps> = ({href, icon}) => (
  <TableCell style={{textAlign: "center"}}>
    <Link to={href}>
      <IconButton>
        {icon}
      </IconButton>
    </Link>
  </TableCell>
)

import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Link as MUILink, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";
import { isValidURL } from "../../../../common/src";
import { CHANGE, DELETE } from "../../constants/table";

interface IDataTableProps {
  columnNames: string[]
  data: ({id: string | number})[]
}

export const DataTable: FC<IDataTableProps> = (props) => {
  const {columnNames, data} = props;

  return (
    <TableContainer style={{maxHeight: "80vh"}}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columnNames.map((columnName) => (
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
          {data.map((row) => ((
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {Object.values(row).map((column) => (
                <TableCell key={column}>
                  {column && isValidURL(String(column)) ? (
                    <>
                      {Array.isArray(column) ? column.map(value => (
                        <Fragment key={value}>
                          [<OuterLink value={value} />]
                        </Fragment>
                      ))
                      : (
                        <OuterLink value={String(column)} />
                      )}
                    </>
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

interface IOuterLinkProps {
  value: string
}

const OuterLink: FC<IOuterLinkProps> = ({value}) => {
  return (
    <MUILink href={value} target="_blank" rel="noreferrer">
      {value}
    </MUILink>
  )
}

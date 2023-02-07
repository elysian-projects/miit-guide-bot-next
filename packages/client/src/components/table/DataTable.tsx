import { Delete, Edit } from "@mui/icons-material";
import { Link as MUILink, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, Fragment } from "react";
import { getRandomId, isValidURL } from "../../../../common/src";
import { ServiceTableCell } from "./ServiceTableCell";
import { interpolateString } from "./utils";

interface IDataTableProps {
  columnNames: string[]
  data: ({id: string | number})[]
  serviceColumns?: {
    editLink?: string,
    deleteLink?: string
  }
}

export const DataTable: FC<IDataTableProps> = (props) => {
  const {columnNames, data, serviceColumns} = props;

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
                <TableCell key={getRandomId()}>
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
              <>
                {serviceColumns?.editLink && (
                  <ServiceTableCell href={interpolateString(serviceColumns.editLink, row.id, "$id")} icon={<Edit />}  />
                )}
                {serviceColumns?.deleteLink && (
                  <ServiceTableCell href={interpolateString(serviceColumns.deleteLink, row.id, "$id")} icon={<Delete />}  />
                )}
              </>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

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

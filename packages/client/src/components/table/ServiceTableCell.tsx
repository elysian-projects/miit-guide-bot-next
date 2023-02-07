import { IconButton, TableCell } from "@mui/material"
import { FC, ReactNode } from "react"
import { Link } from "react-router-dom"

interface IServiceTableCellProps {
  icon: ReactNode,
  href: string
}

export const ServiceTableCell: FC<IServiceTableCellProps> = ({href, icon}) => (
  <TableCell style={{textAlign: "center"}}>
    <Link to={href}>
      <IconButton>
        {icon}
      </IconButton>
    </Link>
  </TableCell>
)

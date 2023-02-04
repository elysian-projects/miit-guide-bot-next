import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { HeaderLink } from "./Header.styles";

export const HeaderUserMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(Boolean(anchorEl));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClick}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <HeaderLink to="/auth/logout">
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
              Выход
          </MenuItem>
        </HeaderLink>
      </Menu>
    </>
  )
}

import { Login, Logout, Person } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { HeaderLink } from "./Header.styles";

export const HeaderUserMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(Boolean(anchorEl));
  const {isAuthenticated, getUserLogin} = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="medium"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 35, height: 35 }}></Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClick}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {(isAuthenticated() && getUserLogin()) && (
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            {getUserLogin()}
          </MenuItem>
        )}

        <HeaderLink to={isAuthenticated() ? "/auth/logout" : "/auth/login"}>
          <MenuItem>
            <ListItemIcon>
              {isAuthenticated() ? (
                <Logout fontSize="small" />
              ) : (
                <Login fontSize="small" />
              )}
            </ListItemIcon>
            {isAuthenticated() ? (
              <>
                Выход
              </>
            ) : (
              <>
                Вход
              </>
            )}
          </MenuItem>
        </HeaderLink>
      </Menu>
    </>
  );
};

import { Reorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { ActionBarStyled } from "./ActionBar.styles";
import { SearchField } from "./components/SearchField";

interface IActionBarProps {
  reorderCallback?: () => void,
  searchCallback?: (value: string) => void
}

export const ActionBar: FC<IActionBarProps> = ({
  reorderCallback = () => 0,
  searchCallback = () => 0
}) => {
  return (
    <ActionBarStyled>
      <SearchField onChange={searchCallback}/>
      <IconButton onClick={reorderCallback}>
        <Reorder />
      </IconButton>
    </ActionBarStyled>
  );
};

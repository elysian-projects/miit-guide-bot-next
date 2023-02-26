import { Reorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC, useRef } from "react";
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
  const shouldCallHandler = useRef(true);

  const handleChange = (value: string) => {
    if(value.length > 3 && shouldCallHandler.current) {
      searchCallback(value);
      shouldCallHandler.current = false;
    }

    setTimeout(() => {
      searchCallback(value);
      shouldCallHandler.current = true;
    }, 500);
  };

  return (
    <ActionBarStyled>
      <SearchField onChange={handleChange}/>
      <IconButton onClick={reorderCallback}>
        <Reorder />
      </IconButton>
    </ActionBarStyled>
  );
};

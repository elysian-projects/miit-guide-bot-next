import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { FC, useState } from "react";

interface ISearchFieldProps {
  onChange: (value: string) => void
}

export const SearchField: FC<ISearchFieldProps> = ({
  onChange
}) => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel size="small" htmlFor="search">Поиск</InputLabel>
        <OutlinedInput
          id="search"
          size="small"
          value={value}
          style={{background: "#fff"}}
          onChange={event => {
            setValue(event.target.value);
            onChange(event.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

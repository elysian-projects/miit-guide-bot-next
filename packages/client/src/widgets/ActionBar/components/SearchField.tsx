import { Search } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { FC, FormEventHandler, useEffect, useState } from "react";

interface ISearchFieldProps {
  onChange: (value: string) => void
}

export const SearchField: FC<ISearchFieldProps> = ({
  onChange
}) => {
  const [value, setValue] = useState<string>("");

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onChange(value);
  };

  useEffect(() => {
    if(value.length === 0) {
      onChange(value);
    }
  }, [value]);

  return (
    <Box
      component={"form"}
      method="post"
      onSubmit={onSubmit}
    >
      <FormControl variant="outlined">
        <OutlinedInput
          id="search"
          size="small"
          placeholder="Поиск"
          value={value}
          style={{background: "#fff"}}
          onChange={event => {
            setValue(event.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

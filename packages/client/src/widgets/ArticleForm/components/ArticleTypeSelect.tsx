import { MenuItem, Select } from "@mui/material";
import { ArticleType } from "common/src";
import { FC } from "react";

const articleTypes: {value: ArticleType, label: string}[] = [
  {label: "Статья", value: "article"},
  {label: "Локация", value: "location"},
];

interface IArticleTypeSelectProps {
  value: ArticleType,
  onUpdate: (type: ArticleType) => void
}

export const ArticleTypeSelect: FC<IArticleTypeSelectProps> = ({
  value,
  onUpdate
}) => {
  return (
    <Select
      id="article-type-selector"
      labelId="article-type-selector"
      value={value}
      fullWidth
    >
      {articleTypes.map(type => (
        <MenuItem
          key={type.value}
          value={type.value}
          placeholder="Тип статьи*"
          onClick={() => onUpdate(type.value)}
        >
          {type.label}
        </MenuItem>
      ))}
    </Select>
  );
};

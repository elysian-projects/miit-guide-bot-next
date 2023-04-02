import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { CSSProperties, FC } from "react";

interface ICardTitleProps {
  value: string,
  noWrap?: boolean,
  variant?: Variant | "inherit"
}

export const CardTitle: FC<ICardTitleProps> = (props) => {
  const {
    value,
    variant = "body2",
    noWrap = false
  } = props;

  const styles = (noWrap)
    ? {
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "100%",
      whiteSpace: "nowrap"
    } as CSSProperties
    : {};

  return (
    <Typography variant={variant} title={value} style={styles} color="text.secondary">
      {value}
    </Typography>
  );
};

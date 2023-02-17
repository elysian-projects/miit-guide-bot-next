import { CardMedia, CardMediaClasses, SxProps, Theme } from "@mui/material";
import { FC } from "react";

const MEDIA_HEIGHT = 250;
const MEDIA_FALLBACK = "/images/broken-image.webp";

interface ICardMediaCustomProps {
  height?: string | number,
  children?: React.ReactNode,
  classes?: Partial<CardMediaClasses>,
  image?: string,
  src?: string,
  sx?: SxProps<Theme>,
}

export const CardMediaCustom: FC<ICardMediaCustomProps> = (props) => {
  const {
    height = MEDIA_HEIGHT,
    image = MEDIA_FALLBACK,
    ...restProps
  } = props;

  return (
    <CardMedia
      component="img"
      height={height}
      image={image}
      onError={({currentTarget}) => {
        currentTarget.onerror = null;
        currentTarget.src = MEDIA_FALLBACK;
      }}
      {...restProps}
    />
  )
}

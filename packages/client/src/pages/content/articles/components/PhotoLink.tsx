import { PhotoCamera } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Link as MUILink, Paper, Tooltip } from "@mui/material";
import { CSSProperties, FC } from "react";

const paperStyles = {
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center'
} as CSSProperties;

interface IPhotoLinkProps {
  value: string,
  onUpdate: (updatedValue: string) => void
}

export const PhotoLink: FC<IPhotoLinkProps> = ({
  value,
  onUpdate
}) => {
  return (
    <Paper sx={paperStyles}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Фотография"
        value={value}
        onChange={event => onUpdate(event.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Предпросмотр">
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <MUILink href={value} target="_black">
            <PhotoCamera />
          </MUILink>
        </IconButton>
      </Tooltip>
    </Paper>
  )
}

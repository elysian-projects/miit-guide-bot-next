import { PhotoCamera } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { CSSProperties, FC, useState } from "react";
import { PhotoPreviewModal } from "../../PhotoPreviewModal";

const paperStyles = {
  padding: "2px 4px",
  display: "flex",
  alignItems: "center"
} as CSSProperties;

interface IPhotoLinkProps {
  value: string,
  onUpdate: (updatedValue: string) => void
}

export const PhotoLink: FC<IPhotoLinkProps> = ({
  value,
  onUpdate
}) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const togglePreview = () => {
    setPreviewOpen(!previewOpen);
  };

  return (
    <>
      <PhotoPreviewModal open={previewOpen} handleClose={handlePreviewClose} photo={value} />
      <Paper sx={paperStyles}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Фотография*"
          value={value}
          onChange={event => onUpdate(event.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Предпросмотр">
          <IconButton onClick={togglePreview} color="primary" sx={{ p: "10px" }} aria-label="directions">
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
};

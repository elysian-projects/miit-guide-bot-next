import { Close } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { FC } from "react";
import { PhotoPreviewBoxStyled } from "./PhotoPreviewModal.styles";

interface IPhotoPreviewModalProps {
  open: boolean,
  handleClose: () => void,
  photo: string
}

export const PhotoPreviewModal: FC<IPhotoPreviewModalProps> = ({open, photo, handleClose}) => (
  <Modal style={{zIndex: 6000}} open={open} onClose={handleClose}>
    <PhotoPreviewBoxStyled>
      <IconButton color="error" style={{position: "absolute", width: 32, height: 32, right: 0}} onClick={handleClose}>
        <Close />
      </IconButton>
      <img src={photo} />
    </PhotoPreviewBoxStyled>
  </Modal>
);

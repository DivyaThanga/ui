import React from "react";

import { Modal, Fade, Box, Backdrop } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "rigde",
  boxShadow: 24,
  width: "30%",
  borderRadius: "20px",
  p: 4,
  maxHeight: "90%",
};

export default function ModalComponent({ modalOpen, handleClose, modalValue }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <Box sx={style}>{modalValue}</Box>
      </Fade>
    </Modal>
  );
}

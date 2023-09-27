import React from "react";
import {
  Typography,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const ConfirmDelete = ({ open, handleClose, handleOk }) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Xóa File
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Bạn có chắc chắn muốn xóa file không ? Dữ liệu sẽ không khôi phục được
          !
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleOk}>
          Đồng ý
        </Button>
        <Button variant="contained" color="success" onClick={handleClose}>
          Hủy
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default ConfirmDelete;

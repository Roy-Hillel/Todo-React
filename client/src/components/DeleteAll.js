import * as React from "react";
import { Button } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ deleteAll }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (flag) => {
    if (flag) {
      deleteAll();
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="danger" onClick={handleClickOpen}>
        Delete all
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Hold up!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete all your Todos? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" onClick={() => handleClose(false)}>
            Hell no..
          </Button>
          <Button variant="danger" onClick={() => handleClose(true)}>
            Oh Yes indeed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

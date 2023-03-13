import styled from "@emotion/styled";
import { Dialog, DialogContent } from "@mui/material";
import React from "react";
// import { makeStyles } from "@mui/styles";


const useStyles = styled((theme) => ({
  dialogPaper: {
    height: "450px",
  },
}));

export default function DialogForAPI(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.DialogClose(false);
  };

  return (
    <div>
      <Dialog
        open={props.DialogOpen}
        onClose={() => handleClose()}
        fullWidth={true}
        maxWidth="xs"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {props.message === "Success." ? (
            <span
              style={{ fontSize: 100, color: "#FF0000" }}
              className="material-icons-outlined"
            >
              task_alt
            </span>
          ) : (
            <span
              className="material-icons-outlined"
              style={{ fontSize: 100, color: "orange" }}
            >
              warning
            </span>
          )}

          <p
            style={{
              alignItems: "center",
              fontSize: 28,
              color: "#FF0000",
            }}
          >
            {props.message}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

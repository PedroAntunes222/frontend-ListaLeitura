import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Alerts({ color, message, setAlert }) {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert
        variant="filled"
        onClose={() => {
          setAlert(false);
        }}
        severity={color}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

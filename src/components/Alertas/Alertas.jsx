import React from 'react'
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Alertas({cor, message, alerta}) {

  return (
    <Snackbar open={true} autoHideDuration={6000}>
        <Alert
          variant="filled"
          onClose={() => {
            alerta(false);
          }}
          severity={cor}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
  )
}

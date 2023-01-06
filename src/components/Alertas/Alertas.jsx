import React from 'react'
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Alertas(props) {

  return (
    <Snackbar open={true} autoHideDuration={6000}>
        <Alert
          variant="filled"
          onClose={() => {
            props.alerta(false);
          }}
          severity={props.cor}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
  )
}

export default Alertas
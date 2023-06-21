import React, { useContext } from "react";
import putUser from "../../../../functions/API/User/putUser";
import styles from "./AltButton.module.scss";

import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";
// import { useNavigate } from "react-router-dom";

export default function AtlButton({ user }) {
  // const navigate = useNavigate();
  const { demo } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const atlUser = () => {
    if (demo) {
      setMessage("A versão DEMO não suporta essa função");
      setSeverity("error");
      setAlert(true);
    } else {
      putUser(user)
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Fab
        variant="contained"
        onClick={atlUser}
        size="large"
        color="success"
        className={styles.saveFlutuante}
      >
        <SaveIcon />
      </Fab>
    </>
  );
}

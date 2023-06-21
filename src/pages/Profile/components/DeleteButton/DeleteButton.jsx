import React, { useContext } from "react";
import delUser from "../../../../functions/API/User/delUser";
import styles from "./DeleteButton.module.scss";

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";

export default function DeleteButton({ userID }) {
  const { demo } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const deletaUser = () => {
    if (demo) {
      setMessage("A versão DEMO não suporta essa função");
      setSeverity("error");
      setAlert(true);
    } else {
      delUser(userID)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Fab
      onClick={deletaUser}
      color="error"
      className={styles.deleteFlutuante}
    >
      <DeleteIcon />
    </Fab>
  );
}

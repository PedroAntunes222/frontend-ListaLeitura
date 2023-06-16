import React from "react";
import delUser from "../../../../functions/API/User/delUser";
import styles from "./DeleteButton.module.scss"

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({userID}) {
  const deletaUser = (e) => {
    e.preventDefault();
    delUser(userID)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fab
      onClick={(e) => deletaUser(e)}
      color="error"
      className={styles.deleteFlutuante}
    >
      <DeleteIcon />
    </Fab>
  );
}

import React from "react";
import putUser from "../../../../functions/API/User/putUser";
import styles from "./AltButton.module.scss";

import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function AtlButton({ user }) {
  const { id, nome, email, senha } = user;

  const atlUser = (e) => {
    e.preventDefault();
    putUser(id, nome, email, senha)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Fab
      variant="contained"
      onClick={(e) => atlUser(e)}
      size="large"
      color="success"
      className={styles.saveFlutuante}
    >
      <SaveIcon />
    </Fab>
  );
}

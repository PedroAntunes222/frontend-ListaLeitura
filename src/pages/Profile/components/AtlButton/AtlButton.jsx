import React from "react";
import putUser from "../../../../functions/API/User/putUser";
import styles from "./AltButton.module.scss";

import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
// import { useNavigate } from "react-router-dom";

export default function AtlButton({ user }) {
  console.log(user)
  // const navigate = useNavigate();

  const atlUser = () => {
    putUser(user)
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
      onClick={atlUser}
      size="large"
      color="success"
      className={styles.saveFlutuante}
    >
      <SaveIcon />
    </Fab>
  );
}

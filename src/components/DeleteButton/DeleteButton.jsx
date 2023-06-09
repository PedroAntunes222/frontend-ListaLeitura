import React from "react";
import { delLivro } from "../../service/API";
import styles from "./deleteButton.module.scss";

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

export default function deleteButton({
  livroID,
  alert,
  loading,
  message,
  refresh,
}) {
  const deletaLivro = (e) => {
    e.preventDefault();
    loading(true);
    delLivro(livroID)
      .then(function (response) {
        console.log(response);
        message(response.data);
        loading(false);
        alert(true);
        refresh && refresh();
      })
      .catch(function (error) {
        console.log(error);
        message(error.data);
      });
  };

  return (
    <div className={refresh && styles.length}>
      <Fab
        onClick={(e) => deletaLivro(e)}
        color="error"
        className={refresh && styles.botaoDelete}
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
}

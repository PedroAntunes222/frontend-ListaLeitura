import React from "react";
import { delLivro } from "../../service/API";
import styles from "./deleteButton.module.scss";

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

export default function deleteButton({
  bookID,
  setAlert,
  loading,
  message,
  refresh,
}) {
  const deleteLivro = (e) => {
    e.preventDefault();
    loading(true);
    delLivro(bookID)
      .then(function (response) {
        console.log(response);
        message(response.data);
        loading(false);
        setAlert(true);
        refresh && refresh();
      })
      .catch(function (error) {
        console.log(error);
        message(error.data);
      });
  };

  return (
      <Fab
        onClick={(e) => deleteLivro(e)}
        color="error"
        className={refresh && styles.buttonDelete}
      >
        <DeleteIcon />
      </Fab>
  );
}

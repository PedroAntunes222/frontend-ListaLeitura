import React from "react";
import { delLivro } from "../../service/API";
import styles from "./deleteButton.module.scss";
import AlertContext from "../../context/Alert/alert";

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";

export default function DeleteButton({ bookID, refresh }) {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const deleteLivro = (e) => {
    e.preventDefault();
    delLivro(bookID)
      .then(function (response) {
        console.log(response);
        setMessage("Livro deletado");
        setSeverity("error");
        setAlert(true);
        refresh && refresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Fab
        onClick={(e) => deleteLivro(e)}
        color="error"
        className={refresh && styles.buttonDelete}
      >
        <DeleteIcon />
      </Fab>
    </>
  );
}

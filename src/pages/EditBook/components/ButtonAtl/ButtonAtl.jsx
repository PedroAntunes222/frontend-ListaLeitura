import React, { useContext } from "react";
import styles from "./ButtonAtl.module.scss";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";
import putBook from "../../../../functions/API/Book/putBook";

import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";

export default function ButtonAtl({ editedBook }) {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);
  const { authenticated } = useContext(AuthContext);

  const atlBook = () => {
    putBook(editedBook, authenticated)
      .then((response) => {
        console.log(response);
        setMessage("Livro atualizado");
        setSeverity("success");
        setAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Fab
      onClick={(e) => atlBook(e)}
      color="success"
      className={styles.saveBook}
    >
      <SaveIcon />
    </Fab>
  );
}

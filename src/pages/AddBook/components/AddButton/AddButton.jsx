import React, { useContext } from "react";
import styles from "./AddButton.module.scss";
import addBook from "../../../../functions/API/Book/addBook";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";

import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { demoJSON } from "../../../../service/Demo";

export default function AddButton({ newBook }) {
  const { authenticated, demo } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const addsBook = () => {
    if (demo) {
      demoJSON.livros.push(newBook);
      setMessage("Livro adicionado");
      setSeverity("success");
      setAlert(true);
    } else {
      addBook(newBook, authenticated)
        .then(function (response) {
          console.log(response);
          setMessage("Livro adicionado");
          setSeverity("success");
          setAlert(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Fab
      onClick={() => addsBook()}
      size="large"
      color="success"
      className={styles.save}
    >
      <SaveIcon />
    </Fab>
  );
}

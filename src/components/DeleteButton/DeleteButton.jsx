import React, { useContext } from "react";
import delBook from "../../functions/API/Book/delBook";
import styles from "./deleteButton.module.scss";
import AuthContext from "../../context/Auth/auth";
import AlertContext from "../../context/Alert/alert";
import { demoJSON } from "../../service/Demo";

import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function DeleteButton({ bookID, refresh }) {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);
  const { demo } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteLivro = (e) => {
    e.preventDefault();
    if (demo) {
      demoJSON.livros = demoJSON.livros.filter((livro) => livro.id !== bookID);
      setMessage("Livro deletado");
      setSeverity("error");
      setAlert(true);
      refresh && refresh();
    } else {
      delBook(bookID)
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
    }
    !refresh && navigate("/shelf");
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

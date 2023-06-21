import React, { useContext } from "react";
import styles from "./ButtonAtl.module.scss";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";
import putBook from "../../../../functions/API/Book/putBook";

import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { demoJSON } from "../../../../service/Demo";

export default function ButtonAtl({ editedBook }) {
  const { authenticated, demo } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const atlBook = () => {
    if (demo) {
      const livroIndex = demoJSON.livros.findIndex(
        (livro) => livro.id === editedBook.id
      );
      if (livroIndex !== -1) {
        demoJSON.livros[livroIndex] = {
          ...demoJSON.livros[livroIndex],
          capa: editedBook.capa,
          titulo: editedBook.titulo,
          subTitulo: editedBook.subTitulo,
          generoPrincipal: editedBook.generoPrincipal,
          generoSecundario: editedBook.generoSecundario,
          sinopse: editedBook.sinopse,
          paginasLidas: editedBook.paginasLidas,
          paginasTotais: editedBook.paginasTotais,
          rating: editedBook.rating,
          completo: editedBook.completo,
        };
      }
      setMessage("Livro atualizado");
      setSeverity("success");
      setAlert(true);
    } else {
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
    }
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

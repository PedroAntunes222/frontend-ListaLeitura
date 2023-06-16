import React, { useContext } from "react";
import styles from "./AltPages.module.scss";
import Book from "../../../../class/book";
import putBook from "../../../../functions/API/Book/putBook";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";

import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function AltPages({
  livro,
  lidas,
  setPaginasLidas,
  paginasTotais,
}) {
  const { authenticated } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const atlPages = (e) => {
    e.preventDefault();
    const livroATL = new Book(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.sinopse,
      livro.generoPrincipal,
      livro.generoSecundario,
      lidas,
      livro.paginasTotais,
      livro.rating,
      false
    );
    putBook(livroATL, authenticated)
      .then(function (response) {
        console.log(response);
        setMessage("Progresso atualizado");
        setSeverity("success");
        setAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.paginasGrid}>
      <TextField
        id="paginasLidas"
        autoComplete="off"
        value={lidas || 0}
        className={styles.inputPage}
        onChange={(e) => setPaginasLidas(parseInt(e.target.value))}
      />

      <span> / </span>

      <p className={styles.totalPages}> {paginasTotais}</p>

      <Button
        size="small"
        endIcon={<SaveIcon />}
        onClick={(e) => atlPages(e)}
        className={styles.botaoAtl}
      />
    </div>
  );
}

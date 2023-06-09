import React, { useContext, useState } from "react";
import styles from "../../MostraLivro.module.scss";
import Livro from "../../../../class/livro";
import { putLivro } from "../../../../service/API";
import AuthContext from "../../../../context/auth";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Alertas from "../../../../components/Alertas/Alertas";

export default function AltPages({
  livro,
  lidas,
  setPaginasLidas,
  paginasTotais,
}) {
  const { authenticated } = useContext(AuthContext);
  const [alert, setAlert] = useState();
  const [message, setMessage] = useState("");

  const atlPages = (e) => {
    e.preventDefault();
    const livroATL = new Livro(
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
    putLivro(livroATL, authenticated)
      .then(function (response) {
        console.log(response);
        setMessage("Progresso atualizado");
        setAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {alert && <Alertas alerta={setAlert} message={message} cor="success" />}

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
    </>
  );
}

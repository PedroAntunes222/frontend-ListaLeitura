import React, { useState, useEffect } from "react";
import { getLivro } from "../Service/getData";
import styles from "./ListaLivros.module.scss";

function MostraLivro() {
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        console.log(response.data.livros);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.grupoCards}>
      <p> {livro.nome} </p>
      <p> {livro.genero} </p>
      <p> {livro.sinopse} </p>
    </div>
  );
}

export default MostraLivro;

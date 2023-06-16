import React, { useContext, useState } from "react";
import styles from "./CompletaModal.module.scss";
import putBook from "../../../../functions/API/Book/putBook";
import BookRating from "../../../../components/BookRating/BookRating";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Book from "../../../../class/book";
import AuthContext from "../../../../context/Auth/auth";

export default function CompletaModal({ livro, lidas, totais }) {
  const { authenticated } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const completar = (e) => {
    e.preventDefault();
    const livroATL = new Book(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      lidas,
      livro.paginasTotais,
      rating,
      true
    );
    putBook(livroATL, authenticated)
      .then((response) => {
        console.log(response);
        navigate("/shelf");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.complete}>
        <p>Livro Completado</p>
        <p>
          {lidas} / {totais}
        </p>

        <BookRating rating={rating} setRating={setRating} />

        <Button variant="outlined" onClick={(e) => completar(e)}>
          Completar
        </Button>
      </div>
    </div>
  );
}

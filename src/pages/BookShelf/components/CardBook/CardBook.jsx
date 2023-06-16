import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardBook.module.scss";
import bookCover from "../../../../functions/BookCover/bookCover";
import BookRating from "../../../../components/BookRating/BookRating";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Progress from "../Progress/Progress";
import DeleteButton from "../../../../components/DeleteButton/DeleteButton";

export default function CardBook({
  livro,
  refresh,
}) {
  const {
    id,
    capa,
    titulo,
    generoPrincipal,
    generoSecundario,
    paginasLidas,
    paginasTotais,
    completo,
    rating,
  } = livro;
  return (
    <Card className={styles.card}>
      <Link to={`/viewBook/${id}`}>
        <CardMedia
          className={styles.cover}
          component="img"
          height="200"
          image={bookCover(capa)}
          alt={`${titulo} cover image`}
        />

        <CardContent className={styles.cardInfo}>
          <DeleteButton
            bookID={id}
            refresh={refresh}
          />

          <div className={styles.bookTypes}>
            <p className={styles.type}>{generoPrincipal}</p>

            {generoSecundario && (
              <p className={styles.type}> / {generoSecundario}</p>
            )}
          </div>

          <Progress lidas={paginasLidas} totais={paginasTotais} />

          <div className={styles.cardText}>
            <h4 className={styles.title}>{titulo}</h4>
            {completo && <BookRating rating={rating} readOnly={true} />}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

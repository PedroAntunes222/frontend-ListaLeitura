import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardLivro.module.scss";
import bookCover from "../../../../functions/bookCover";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Progress from "../Progress/Progress";
import DeleteButton from "../../../../components/DeleteButton/DeleteButton";

export default function CardLivro({
  livro,
  setAlert,
  loading,
  message,
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
            setAlert={setAlert}
            loading={loading}
            message={message}
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
            {completo && (
              <Stack spacing={1} className={styles.ratingLivro}>
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={0}
                  precision={0.5}
                  value={rating || 0}
                  sx={{ justifyContent: "center" }}
                />
              </Stack>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

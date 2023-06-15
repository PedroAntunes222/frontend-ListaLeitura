import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardLivro.module.scss";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Progress from "../Progress/Progress";
import DeleteButton from "../../../../components/DeleteButton/DeleteButton";

function CardLivro({ livro, setAlert, loading, message, refresh }) {
  return (
    <Card className={styles.card}>
      <Link to={`/viewBook/${livro.id}`}>
        <CardMedia
          className={styles.cover}
          component="img"
          height="200"
          image={
            livro.capa
              ? livro.capa
              : "https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
          }
          alt={`${livro.titulo} cover image`}
        />

        <CardContent className={styles.cardInfo}>
          <DeleteButton
            bookID={livro.id}
            setAlert={setAlert}
            loading={loading}
            message={message}
            refresh={refresh}
          />

          <div className={styles.bookTypes}>
            <p className={styles.type}>{livro.generoPrincipal}</p>

            {livro.generoSecundario && (
              <p className={styles.type}> / {livro.generoSecundario}</p>
            )}
          </div>

          <Progress lidas={livro.paginasLidas} totais={livro.paginasTotais} />

          <div className={styles.cardText}>
            <h4 className={styles.title}>{livro.titulo}</h4>
            {livro.completo && (
              <Stack spacing={1} className={styles.ratingLivro}>
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={0}
                  precision={0.5}
                  value={livro.rating || 0}
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

export default CardLivro;

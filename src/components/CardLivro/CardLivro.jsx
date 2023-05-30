import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardLivro.module.scss";
import { delLivro } from "../../service/API";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function CardLivro({livro, alert, loading, message, refresh}) {
  const deletaLivro = (id, e) => {
    e.preventDefault();
    loading(true);
    delLivro(id)
      .then(function (response) {
        console.log(response);
        message(response.data);
        refresh();
        loading(false);
        alert(true);
      })
      .catch(function (error) {
        console.log(error);
        message(error.data);
      });
  };

  const CircularProgressWithLabel = () => {
    let calc = Math.floor(
      (livro.paginasLidas * 100) / livro.paginasTotais
    );

    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          size="10vh"
          value={calc}
          color="success"
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="success"
            className={styles.completePercent}
          >
            {`${calc}%`}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card className={styles.card}>
      <Link to={`/livro/${livro.id}`}>
        {!livro.capa ? (
          <CardMedia
            className={styles.capa}
            component="img"
            height="200"
            image="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
            alt={`${livro.titulo} no image`}
          />
        ) : (
          <CardMedia
            className={styles.capa}
            component="img"
            image={livro.capa}
            alt={`${livro.titulo} cover image`}
          />
        )}

        <CardContent className={styles.cardInfo}>
          <Fab
            onClick={(e) => deletaLivro(livro.id, e)}
            color="error"
            className={styles.botaoFormulario}
          >
            <DeleteIcon />
          </Fab>

          <div className={styles.cardGenero}>
            <p className={styles.genero}>{livro.generoPrincipal}</p>

            {livro.generoSecundario && (
              <p className={styles.genero}> / {livro.generoSecundario}</p>
            )}
          </div>

          <CircularProgressWithLabel />

          <div className={styles.cardText}>
            <h4 className={styles.titulo}>{livro.titulo}</h4>
            {/* {livro.subTitulo && (
              <h4 className={styles.subtitulo}>{livro.subTitulo}</h4>
            )} */}
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

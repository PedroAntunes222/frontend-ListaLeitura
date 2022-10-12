import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardLivro.module.scss";
import { delLivro } from "../../Service/getData";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function CardLivro(props) {
  const deletaLivro = (id, e) => {
    e.preventDefault();
    props.loading(true);
    delLivro(id)
      .then(function (response) {
        console.log(response);
        props.message(response.data);
        props.refresh();
        props.loading(false);
        props.modal(true);
      })
      .catch(function (error) {
        console.log(error);
        props.message(error.data);
      });
  };

  const CircularProgressWithLabel = () => {
    let calc = Math.floor(
      (props.livro.paginasLidas * 100) / props.livro.paginasTotais
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
      <Link to={`/livro/${props.livro.id}`}>
        {!props.livro.capa ? (
          <CardMedia
            className={styles.capa}
            component="img"
            height="200"
            image="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
            alt={`${props.livro.titulo} no image`}
          />
        ) : (
          <CardMedia
            className={styles.capa}
            component="img"
            image={props.livro.capa}
            alt={`${props.livro.titulo} cover image`}
          />
        )}

        <CardContent className={styles.cardInfo}>
          <Fab
            onClick={(e) => deletaLivro(props.livro.id, e)}
            color="error"
            className={styles.botaoFormulario}
          >
            <DeleteIcon />
          </Fab>

          <div className={styles.cardGenero}>
            <p className={styles.genero}>{props.livro.generoPrincipal}</p>

            {props.livro.generoSecundario && (
              <p className={styles.genero}> / {props.livro.generoSecundario}</p>
            )}
          </div>

          <CircularProgressWithLabel />

          <div className={styles.cardText}>
            <h4 className={styles.titulo}>{props.livro.titulo}</h4>
            {props.livro.subTitulo && (
              <h4 className={styles.subtitulo}>{props.livro.subTitulo}</h4>
            )}
            {props.livro.completo && (
              <Stack spacing={1} className={styles.ratingLivro}>
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={0}
                  precision={0.5}
                  value={props.livro.rating || 0}
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

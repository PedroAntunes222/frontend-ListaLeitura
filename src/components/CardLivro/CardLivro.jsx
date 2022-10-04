import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardLivro.module.scss";
import { delLivro } from "../../Service/getData";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
          <div className={styles.cardGenero}>
            <p className={styles.genero}>{props.livro.generoPrincipal}</p>

            {props.livro.generoSecundario ? (
              <p className={styles.genero}> / {props.livro.generoSecundario}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <Fab size="small">
              <VisibilityIcon />
            </Fab>
          </div>

          <div className={styles.cardText}>
            <div>
              <h4 className={styles.titulo}>{props.livro.titulo}</h4>
              <h4 className={styles.subtitulo}>{props.livro.subTitulo}</h4>
            </div>
          </div>

          <Fab
            onClick={(e) => deletaLivro(props.livro.id, e)}
            color="error"
            className={styles.botaoFormulario}
          >
            <DeleteIcon />
          </Fab>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CardLivro;

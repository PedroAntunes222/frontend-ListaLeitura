import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser } from "../../Service/getData";
import styles from "./ListaLivros.module.scss";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Home() {
  const [livros, setLivros] = useState([]);
  const [refresh, setrefresh] = useState(0);

  useEffect(() => {
    getUser()
      .then((response) => {
        setLivros(response.data.livros);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getUser()
      .then((response) => {
        setLivros(response.data.livros);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const deletaLivro = (id, e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/livro/" + id)
      .then(function (response) {
        console.log(response);
        setrefresh((prev) => prev + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.grupoCards}>
      <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
        <Fab>
          <AddIcon />
        </Fab>
      </Card>

      {livros.map((livro) => (
        <Card key={livro.id} className={styles.card}>
          <Link to={`/livro/${livro.id}`}>
            {!livro.capa ? (
              <CardMedia
                className={styles.capa}
                component="img"
                height="200"
                image="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
                alt={`${livro.titulo} no cover image`}
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
              <VisibilityIcon />

              <div className={styles.cardText}>
                <div className={styles.title}>{livro.titulo}</div>
                <div>{livro.genero}</div>
              </div>

              <CardActions className={styles.cardButton}>
                <Button
                  onClick={(e) => deletaLivro(livro.id, e)}
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<DeleteIcon />}
                  className={styles.botaoFormulario}
                />
              </CardActions>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default Home;

// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaLivros.module.scss";
import { getUser } from "../../Service/getData";
import React, { useState, useEffect } from "react";
import { delLivro } from "../../Service/getData";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Home() {
  const [livros, setLivros] = useState([]);
  // const [refresh, setrefresh] = useState(0);

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
  }, [livros]);

  const deletaLivro = (id, e) => {
    e.preventDefault();
    delLivro(id);
    // axios
    // .delete("http://localhost:8080/livro/" + id)
    // .then(function (response) {
    //   console.log(response);
    //   setrefresh((prev) => prev + 1);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
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
              <div className={styles.cardGenero}>
                <p className={styles.genero}>{livro.generoPrincipal}</p>

                {livro.generoSecundario ? (
                  <p className={styles.genero}> / {livro.generoSecundario}</p>
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
                  <h4 className={styles.titulo}>{livro.titulo}</h4>
                  <h4 className={styles.subtitulo}>{livro.subTitulo}</h4>
                </div>
              </div>

              <Fab
                onClick={(e) => deletaLivro(livro.id, e)}
                color="error"
                className={styles.botaoFormulario}
              >
                <DeleteIcon />
              </Fab>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default Home;

// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaLivros.module.scss";
import { getUser } from "../../Service/getData";
import React, { useState, useEffect } from "react";
import CardLivro from "../../components/CardLivro/CardLivro";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

function ListaLivros() {
  const [livros, setLivros] = useState([]);

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

  return (
    <div className={styles.grupoCards}>
      <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
        <Fab>
          <AddIcon />
        </Fab>
      </Card>

      {livros.map((livro) => (
        <CardLivro {...livro} key={livro.id} />
      ))}
    </div>
  );
}

export default ListaLivros;

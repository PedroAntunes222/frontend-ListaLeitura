// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaLivros.module.scss";
import { getUser } from "../../Service/getData";
import React, { useState, useEffect } from "react";
import CardLivro from "../../components/CardLivro/CardLivro";
import Loading from "../../components/Loading/Loading";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [modal, setModal] = useState(false);

  useEffect(() => {
    getUser()
      .then((response) => {
        setLivros(response.data.livros);
        // console.log(loading);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  return (
    <>
      {loading && <Loading />}

      <div className={styles.grupoCards}>
        <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
          <Fab>
            <AddIcon />
          </Fab>
        </Card>

        {livros.map((livro) => (
          <CardLivro
            livro={livro}
            loading={setLoading}
            refresh={refreshList}
            key={livro.id}
          />
        ))}
      </div>
    </>
  );
}

export default ListaLivros;

// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaCompletos.module.scss";
import { getUser } from "../../Service/getData";
import React, { useState, useEffect, useContext } from "react";
import CardLivro from "../../components/CardLivro/CardLivro";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../Service/auth";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function ListaCompletos() {
  const { authenticated } = useContext(AuthContext);
  const [livros, setLivros] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getUser(authenticated)
      .then((response) => {
        setLivros(response.data.livros);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [refresh, authenticated]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  const fechaModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <>
      {modal && (
        <div className={styles.modal}>
          <div>
            <p>{message}</p>
            <Button variant="outlined" onClick={(e) => fechaModal(e)}>
              OK
            </Button>
          </div>
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.grupoCards}>
          <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
            <Fab>
              <AddIcon />
            </Fab>
          </Card>

          {livros
            .filter((livros) => livros.completo === true)
            .map((livro) => (
              <CardLivro
                livro={livro}
                modal={setModal}
                loading={setLoading}
                message={setMessage}
                refresh={refreshList}
                key={livro.id}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default ListaCompletos;

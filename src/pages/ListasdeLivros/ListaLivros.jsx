// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaLivros.module.scss";
import { getLivros } from "../../service/API";
import React, { useState, useEffect, useContext } from "react";
import CardLivro from "./components/CardLivro/CardLivro";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../context/auth";
import Alertas from "../../components/Alertas/Alertas";
import { generos } from "../../service/Generos";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function ListaLivros() {
  const { authenticated } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const [livros, setLivros] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterGenero, setFilterGenero] = useState("");
  const [filterCompleto, setFilterCompleto] = useState("todos");
  const [info, setInfo] = useState("titulo");
  const [ordenacao, setOrdenacao] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    setLoading(true);
    getLivros(authenticated, setLivros);
    setLoading(false);
  }, [refresh, authenticated]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    let livrosFilter = livros;

    if (pesquisa !== "") {
      livrosFilter = livrosFilter.filter((item) =>
        item.titulo.toLowerCase().includes(pesquisa)
      );
    }

    if (filterGenero !== "") {
      livrosFilter = livrosFilter.filter(
        (item) =>
          item.generoPrincipal === filterGenero ||
          item.generoSecundario === filterGenero
      );
    }

    if (filterCompleto !== "todos") {
      livrosFilter = livrosFilter.filter(
        (item) => item.completo === filterCompleto
      );
    }

    if (ordenacao) {
      livrosFilter = [...livrosFilter].sort((a, b) =>
        String(a[info]).toLowerCase() > String(b[info]).toLowerCase() ? 1 : -1
      );
    } else {
      livrosFilter = [...livrosFilter].sort((a, b) =>
        String(a[info]).toLowerCase() < String(b[info]).toLowerCase() ? 1 : -1
      );
    }

    setFiltered(livrosFilter);
  }, [pesquisa, filterGenero, filterCompleto, info, ordenacao, livros]);

  return (
    <>
      {alert && <Alertas alerta={setAlert} message={message} cor="error" />}

      {/* {success &&
     <Alertas
        alerta={setSuccess}
        message={message}
        cor="success"
      /> } */}

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.Lista}>
            <div className={styles.pesquisa}>
              <TextField
                id="outlined-select-currency"
                className={styles.searchBar}
                autoComplete="off"
                label="Pesquisa"
                value={pesquisa || ""}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </div>

            <div className={styles.filtros}>
              <TextField
                id="outlined-select-currency"
                className={styles.selectFilter}
                select
                label="Genero"
                value={filterGenero || ""}
                onChange={(e) => setFilterGenero(e.target.value)}
              >
                {generos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                className={styles.selectFilter}
                select
                label="Completo"
                value={String(filterCompleto) || ""}
                onChange={(e) => setFilterCompleto(e.target.value)}
              >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value={true}>Completos</MenuItem>
                <MenuItem value={false}>Incompletos</MenuItem>
              </TextField>

              <TextField
                id="outlined-select-currency"
                className={styles.selectFilter}
                select
                label="Info"
                value={String(info) || ""}
                onChange={(e) => setInfo(e.target.value)}
              >
                <MenuItem value="titulo"> Nome </MenuItem>
                <MenuItem value="id"> Data </MenuItem>
                <MenuItem value="rating"> Avaliação </MenuItem>
                <MenuItem value="paginasTotais"> Páginas </MenuItem>
              </TextField>

              <TextField
                id="outlined-select-currency"
                className={styles.selectFilter}
                select
                label="Ordenação"
                value={String(ordenacao) || ""}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <MenuItem value={true}> Crescente </MenuItem>
                <MenuItem value={false}> Decrescente </MenuItem>
              </TextField>
            </div>
          </div>
          <div className={styles.grupoCards}>
            <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
              <Fab>
                <AddIcon />
              </Fab>
            </Card>

            {filtered.map((livro) => (
              <CardLivro
                livro={livro}
                alert={setAlert}
                loading={setLoading}
                message={setMessage}
                refresh={refreshList}
                key={livro.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ListaLivros;

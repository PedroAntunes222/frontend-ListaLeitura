import React, { useEffect, useState } from "react";
import styles from "./Filtros.module.scss";
import { MenuItem, TextField } from "@mui/material";
import { generos } from "../../../../service/Generos";

export default function Filtros({ livros, setFiltered }) {
  const [filterGenero, setFilterGenero] = useState("");
  const [filterCompleto, setFilterCompleto] = useState("todos");
  const [info, setInfo] = useState("titulo");
  const [ordenacao, setOrdenacao] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

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
  }, [
    pesquisa,
    filterGenero,
    filterCompleto,
    info,
    ordenacao,
    livros,
    setFiltered,
  ]);

  return (
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
  );
}

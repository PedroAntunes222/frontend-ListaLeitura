import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { MenuItem, TextField } from "@mui/material";
import { generos } from "../../../../service/Generos";

export default function Filtros({ livros, setFiltered }) {
  const [filterGenero, setFilterGenero] = useState("");
  const [filter, setFilter] = useState("todos");
  const [info, setInfo] = useState("titulo");
  const [order, setOrder] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let bookFilter = livros;

    if (search !== "") {
      bookFilter = bookFilter.filter((item) =>
        item.titulo.toLowerCase().includes(search)
      );
    }

    if (filterGenero !== "") {
      bookFilter = bookFilter.filter(
        (item) =>
          item.generoPrincipal === filterGenero ||
          item.generoSecundario === filterGenero
      );
    }

    if (filter !== "todos") {
      bookFilter = bookFilter.filter(
        (item) => item.completo === filter
      );
    }

    if (order) {
      bookFilter = [...bookFilter].sort((a, b) =>
        String(a[info]).toLowerCase() > String(b[info]).toLowerCase() ? 1 : -1
      );
    } else {
      bookFilter = [...bookFilter].sort((a, b) =>
        String(a[info]).toLowerCase() < String(b[info]).toLowerCase() ? 1 : -1
      );
    }

    setFiltered(bookFilter);
  }, [
    search,
    filterGenero,
    filter,
    info,
    order,
    livros,
    setFiltered,
  ]);

  return (
    <div className={styles.shelf}>
      <div className={styles.search}>
        <TextField
          id="outlined-select-currency"
          className={styles.searchBar}
          autoComplete="off"
          label="search"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.filters}>
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
          value={String(filter) || ""}
          onChange={(e) => setFilter(e.target.value)}
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
          value={String(order) || ""}
          onChange={(e) => setOrder(e.target.value)}
        >
          <MenuItem value={true}> Crescente </MenuItem>
          <MenuItem value={false}> Decrescente </MenuItem>
        </TextField>
      </div>
    </div>
  );
}

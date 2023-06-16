import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./BookShelf.module.scss";
import getBooks from "../../functions/API/Book/getBooks";
import CardBook from "./components/CardBook/CardBook";
import AuthContext from "../../context/Auth/auth";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import Filtros from "./components/Filters/Filters";

export default function BookShelf() {
  const { authenticated } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(0);

  const [livros, setLivros] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getBooks(authenticated, setLivros);
  }, [refresh, authenticated]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  return (
    <>
      <Filtros livros={livros} setFiltered={setFiltered} />

      <div className={styles.cardsGroup}>
        <Card component={Link} to="/addBook" className={styles.addBook}>
          <Fab>
            <AddIcon />
          </Fab>
        </Card>

        {filtered?.map((livro) => (
          <CardBook
            livro={livro}
            refresh={refreshList}
            key={livro.id}
          />
        ))}
      </div>
    </>
  );
}

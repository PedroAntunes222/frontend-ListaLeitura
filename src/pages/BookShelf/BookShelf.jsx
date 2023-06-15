import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./BookShelf.module.scss";
import { getLivros } from "../../service/API";
import CardLivro from "./components/CardLivro/CardLivro";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../context/auth";
import Alerts from "../../components/Alerts/Alerts";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import Filtros from "./components/Filters/Filters";

export default function BookShelf() {
  const { authenticated } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const [livros, setLivros] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setLoading(true);
    getLivros(authenticated, setLivros);
    setLoading(false);
  }, [refresh, authenticated]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  return (
    <>
      {alert && <Alerts setAlert={setAlert} message={message} cor="error" />}

      {loading ? (
        <Loading />
      ) : (
        <>
          <Filtros
            livros={livros}
            setFiltered={setFiltered}
          />

          <div className={styles.cardsGroup}>
            <Card component={Link} to="/addBook" className={styles.addBook}>
              <Fab>
                <AddIcon />
              </Fab>
            </Card>

            {filtered.map((livro) => (
              <CardLivro
                livro={livro}
                setAlert={setAlert}
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

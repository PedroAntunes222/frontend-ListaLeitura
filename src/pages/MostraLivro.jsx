import React, { useState, useEffect } from "react";
import { getLivro } from "../Service/getData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./MostraLivro.module.scss";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CircularProgress from "@mui/material/CircularProgress";

function MostraLivro() {
  const navigate = useNavigate();
  const [livro, setLivro] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        console.log(response.data);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
    setLoading(false);
    console.log(loading);
  }, []);

  const deletaLivro = (id, e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/livro/" + id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate(`/lista`);
  };

  return (
    <div className={styles.cardInfo}>
      <div>
        {!livro.capa ? (
          <img
            src="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
            alt={`${livro.nome} no cover`}
          />
        ) : (
          <img src={livro.capa} alt={`${livro.nome} cover`} />
        )}
      </div>
      <div className={styles.infosLivro}>
        <p> {livro.nome} </p>
        <p> {livro.genero} </p>
        <p> {livro.sinopse} </p>

        <ButtonGroup className={styles.grupoBotoes}>
          <Button
            variant="contained"
            onClick={(e) => deletaLivro(livro.id, e)}
            endIcon={<DeleteIcon />}
            color="error"
            size="large"
            className={styles.botaoFormulario}
          />
          <Button
            variant="contained"
            // onClick={limpaForm}
            endIcon={<TaskAltIcon />}
            color="success"
            size="large"
            className={styles.botaoFormulario}
          />
        </ButtonGroup>
      </div>
    </div>
  );
}

export default MostraLivro;

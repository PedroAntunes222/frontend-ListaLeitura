// import axios from "axios";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLivro } from "../Service/getData";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./EditaLivro.module.scss";
import { useNavigate } from "react-router-dom";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

function EditaLivro() {
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const [livro, setLivro] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [capa, setCapa] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");

  const atlLivro = (id, e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put("http://localhost:8080/livro/" + id, {
        nome: nome,
        genero: genero,
        sinopse: sinopse,
        capa: capa,
        usuario: { id: 1 },
      })
      .then(function (response) {
        console.log(response);
        setModal(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // setLoading(false);
  };

  const fechaModal = () => {
    setLoading(false);
    setModal("");
    navigate(`/lista`);
  };

  useEffect(() => {
    // setLoading(true);
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        console.log(response.data);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
    // setLoading(false);
  }, []);

  useEffect(() => {
    setNome(livro.nome);
    setGenero(livro.genero);
    setSinopse(livro.sinopse);
    setCapa(livro.capa);
  }, [livro]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
      {modal ? (
        <div className={styles.loading}>
          <p>Livro adicionado com sucesso</p>
          <Button
            variant="outlined"
            onClick={fechaModal}
            endIcon={<CheckCircleOutlineRoundedIcon />}
            size="large"
            className={styles.botaoFormulario}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.cardInfo}>
        <div className={styles.coverLivro}>
          <Fab
            component={Link}
            to={`/livro/${livro.id}`}
            className={styles.returnFlutuante}
          >
            <ReplyAllOutlinedIcon />
          </Fab>
          {!livro.capa ? (
            <img
              src="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
              alt={`${livro.nome} no cover`}
            />
          ) : (
            <img src={livro.capa} alt={`${livro.nome} cover`} />
          )}
        </div>
        <Box className={styles.infosLivro}>
          <TextField
            id="nomeLivro"
            label="nome"
            variant="outlined"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
          />
          <TextField
            id="nomeGenero"
            label="genero"
            variant="outlined"
            value={genero || ""}
            onChange={(e) => setGenero(e.target.value)}
            className={styles.input}
          />
          <TextField
            id="nomeSinopse"
            label="sinopse"
            variant="outlined"
            value={sinopse || ""}
            onChange={(e) => setSinopse(e.target.value)}
            className={styles.input}
          />
          <TextField
            id="nomeSinopse"
            label="capa"
            variant="outlined"
            value={capa || ""}
            onChange={(e) => setCapa(e.target.value)}
            className={styles.input}
          />

          {/* 
            <p>{livro.nome}</p>
            <p>{livro.genero}</p>
            <p>{livro.sinopse}</p> 
        */}

          <div className={styles.grupoBotoes}>
            <Button
              variant="contained"
              onClick={(e) => atlLivro(livro.id, e)}
              endIcon={<SaveIcon />}
              size="large"
              className={styles.botaoFormulario}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default EditaLivro;

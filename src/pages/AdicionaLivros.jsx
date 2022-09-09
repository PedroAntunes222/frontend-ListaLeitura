import axios from "axios";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from "@mui/material/InputLabel";
import styles from "./AdicionaLivros.module.scss";
import FormControl from "@mui/material/FormControl";

function ListagemLivros() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopse, setSinopse] = useState("");

  const enviaLivro = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/livro/add", {
        nome: nome,
        genero: genero,
        sinopse: sinopse,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setNome("");
    setGenero("");
    setSinopse("");
  };

  return (
    <div>
      <h1 className={styles.titulo}> Adicione um livro </h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.formularioLivro}
      >
        {/* <h1 className={styles.titulo}> Adicione um livro </h1> */}
        <TextField
          id="nome-livro"
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="select-label">Gênero</InputLabel>
          <Select
            id="select-label"
            className={styles.selectLabel}
            value={genero}
            label="Nome"
            onChange={(e) => setGenero(e.target.value)}
          >
            <MenuItem value={"Aventura"}>Aventura</MenuItem>
            <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
            <MenuItem value={"Drama"}>Drama</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="sinopse-livro"
          label="Sinopse"
          variant="outlined"
          multiline
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={enviaLivro}
          endIcon={<SendIcon />}
          color="success"
          className={styles.enviar}
        >
          Adicionar
        </Button>
      </Box>
    </div>
  );
}

export default ListagemLivros;

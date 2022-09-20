import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdicionaLivros.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import InventoryIcon from "@mui/icons-material/Inventory";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

function ListagemLivros() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [capa, setCapa] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");

  const adicionaLivro = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8080/livro/add", {
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

    setNome("");
    setGenero("");
    setSinopse("");
    setCapa("");
  };

  const limpaForm = () => {
    setNome("");
    setGenero("");
    setSinopse("");
    setCapa("");
  };

  const fechaModal = () => {
    setLoading(false);
    setModal("");
  };

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
      <div className={styles.formPage}>
        <h1 className={styles.titulo}> Adicione um livro </h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.formularioLivro}
        >
          <Fab component={Link} to="/lista" className={styles.livrosLista}>
            <InventoryIcon />
          </Fab>
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
              <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
              <MenuItem value={"Aventura"}>Aventura</MenuItem>
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
          <TextField
            id="endereco-capa"
            label="Image Adress"
            variant="outlined"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
          />

          <div className={styles.grupoBotoes}>
            <Button
              variant="contained"
              onClick={limpaForm}
              endIcon={<DeleteIcon />}
              color="error"
              size="large"
              className={styles.botaoFormulario}
            />
            <Button
              variant="contained"
              onClick={adicionaLivro}
              endIcon={<SendIcon />}
              color="success"
              size="large"
              className={styles.botaoFormulario}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default ListagemLivros;

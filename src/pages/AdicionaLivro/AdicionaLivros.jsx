// import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./AdicionaLivros.module.scss";
import { addLivro } from "../../service/API";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../context/auth";
import Alertas from "../../components/Alertas/Alertas";
import { generos } from "../../service/Generos";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

function ListagemLivros() {
  const { authenticated } = useContext(AuthContext);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginas, setPaginas] = useState("");
  const [capa, setCapa] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const limpaForm = () => {
    setTitulo("");
    setSubtitulo("");
    setgeneroPrincipal("");
    setgeneroSecundario("");
    setSinopse("");
    setPaginas("");
    setCapa("");
  };

  const adicionaLivro = (e) => {
    e.preventDefault();
    setLoading(true);
    addLivro(
      capa,
      titulo,
      subtitulo,
      generoPrincipal,
      generoSecundario,
      sinopse,
      paginas,
      authenticated
    )
      .then(function (response) {
        console.log(response);
        setMessage(response.data);
        setLoading(false);
        setAlert(true);
        limpaForm();
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.data);
      });
  };
  
  return (
    <>
     
     {alert &&
     <Alertas
        alerta={setAlert}
        message={message}
        cor="success"
      /> }

      {loading && <Loading />}

      <div className={styles.formPage}>
        <h1 className={styles.titulo}> Adicione um livro </h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.formularioLivro}
        >
          <Fab component={Link} to="/lista" className={styles.flutuanteLista}>
            <ReplyAllIcon />
          </Fab>

          <Fab
            onClick={limpaForm}
            color="error"
            size="large"
            className={styles.botaoRedo}
          >
            <SettingsBackupRestoreIcon />
          </Fab>

          <div>
            <TextField
              className={styles.inputLivro}
              id="Titulo-livro"
              label="Titulo"
              variant="outlined"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <TextField
              className={styles.inputLivro}
              id="Subtitulo-livro"
              label="Subtitulo"
              variant="outlined"
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
            />
            <div className={styles.generoGrid}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Gênero 1</InputLabel>
                <Select
                  id="generoPrincipal-label"
                  className={styles.selectLabel}
                  value={generoPrincipal}
                  label="generoPrincipal"
                  onChange={(e) => setgeneroPrincipal(e.target.value)}
                >
                  
                  {generos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="select-label">Gênero 2</InputLabel>
                <Select
                  id="generoSecundario-label"
                  className={styles.selectLabel}
                  value={generoSecundario}
                  label="generoSecundario"
                  onChange={(e) => setgeneroSecundario(e.target.value)}
                >
                  {generos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div>

            <TextField
              className={styles.inputLivro}
              id="endereco-capa"
              label="Image Adress"
              variant="outlined"
              value={capa}
              onChange={(e) => setCapa(e.target.value)}
            />

            <TextField
              className={styles.inputLivro}
              id="paginas"
              label="N° de Páginas"
              variant="outlined"
              value={paginas}
              onChange={(e) => setPaginas(e.target.value)}
            />

            <TextField
              className={styles.inputLivro}
              id="sinopse-livro"
              label="Sinopse"
              variant="outlined"
              multiline
              value={sinopse}
              onChange={(e) => setSinopse(e.target.value)}
            />
          </div>

          <Fab
            onClick={adicionaLivro}
            size="large"
            color="success"
            className={styles.botaoSave}
          >
            <SaveIcon />
          </Fab>
        </Box>
      </div>
    </>
  );
}

export default ListagemLivros;

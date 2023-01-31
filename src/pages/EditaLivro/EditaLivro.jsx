// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { getLivro, putLivro } from "../../service/API";
import { Link } from "react-router-dom";
import styles from "./EditaLivro.module.scss";
// import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../service/auth";
import Alertas from "../../components/Alertas/Alertas";
import { generos } from "../../service/Generos";

import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function EditaLivro() {
  const { authenticated } = useContext(AuthContext);
  // const navigate = useNavigate();

  const [livro, setLivro] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginasTotais, setPaginasTotais] = useState("");
  const [capa, setCapa] = useState("");
  const [rating, setRating] = useState("");
  const [completo, setCompleto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
    setTitulo(livro.titulo);
    setSubtitulo(livro.subTitulo);
    setgeneroPrincipal(livro.generoPrincipal);
    setgeneroSecundario(livro.generoSecundario);
    setSinopse(livro.sinopse);
    setPaginasTotais(livro.paginasTotais);
    setCapa(livro.capa);
    setRating(livro.rating);
    setCompleto(livro.completo);
  }, [livro]);

  const atlLivro = (id, e) => {
    e.preventDefault();
    setLoading(true);
    putLivro(
      id,
      capa,
      titulo,
      subtitulo,
      generoPrincipal,
      generoSecundario,
      sinopse,
      livro.paginasLidas,
      paginasTotais,
      rating,
      livro.completo,
      authenticated
    )
      .then(function (response) {
        console.log(response);
        setMessage(response.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>

    {success &&
     <Alertas
        alerta={setSuccess}
        message={message}
        cor="success"
      /> }

      {loading && <Loading />}

      <div className={styles.cardInfo}>
        <h1 className={styles.titulo}>Editar Livro</h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.infosLivro}
        >
          {/* botao return */}
          <Fab
            component={Link}
            to={`/livro/${livro.id}`}
            className={styles.returnFlutuante}
          >
            <ReplyAllOutlinedIcon />
          </Fab>

          {/* botao save */}
          <Fab
            onClick={(e) => atlLivro(livro.id, e)}
            color="success"
            className={styles.saveFlutuante}
          >
            <SaveIcon />
          </Fab>

          {completo && (
            <Stack spacing={1} className={styles.ratingLivro}>
              <Rating
                name="size-medium"
                defaultValue={0}
                precision={0.5}
                value={rating || 0}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
            </Stack>
          )}

          <div>
            <TextField
              id="tituloLivro"
              label="Titulo"
              variant="outlined"
              value={titulo || ""}
              onChange={(e) => setTitulo(e.target.value)}
              className={styles.input}
            />

            <TextField
              id="Subtitulo-livro"
              label="Subtitulo"
              variant="outlined"
              value={subtitulo || ""}
              onChange={(e) => setSubtitulo(e.target.value)}
              className={styles.input}
            />

            <div className={styles.generoGrid}>
              <FormControl fullWidth className={styles.input}>
                <InputLabel id="select-label">Gênero 1</InputLabel>
                <Select
                  id="generoPrincipal-label"
                  value={generoPrincipal || ""}
                  label="Gênero 1"
                  onChange={(e) => setgeneroPrincipal(e.target.value)}
                >
                  {generos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                 ))}
                </Select>
              </FormControl>

              <FormControl fullWidth className={styles.input}>
                <InputLabel id="select-label">Gênero 2</InputLabel>
                <Select
                  id="generoSecundario-label"
                  value={generoSecundario || ""}
                  label="Gênero 2"
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
              id="capa"
              label="Capa"
              variant="outlined"
              value={capa || ""}
              onChange={(e) => setCapa(e.target.value)}
              className={styles.input}
            />

            <TextField
              id="paginas"
              label="N° de Páginas"
              variant="outlined"
              value={paginasTotais || ""}
              onChange={(e) => setPaginasTotais(e.target.value)}
            />

            <TextField
              id="nomeSinopse"
              label="sinopse"
              variant="outlined"
              multiline
              value={sinopse || ""}
              onChange={(e) => setSinopse(e.target.value)}
              className={styles.input}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default EditaLivro;

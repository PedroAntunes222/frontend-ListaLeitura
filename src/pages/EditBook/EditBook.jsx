// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { getLivro, putLivro } from "../../service/API";
import { Link, useParams } from "react-router-dom";
import styles from "./EditBook.module.scss";
import AuthContext from "../../context/Auth/auth";
import AlertContext from "../../context/Alert/alert";
import BookRating from "../../components/BookRating/BookRating";
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
import Book from "../../class/book";

export default function EditBook() {
  const { bookID } = useParams();
  const { setAlert, setMessage } = useContext(AlertContext);
  const { authenticated } = useContext(AuthContext);

  const [livro, setLivro] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setsubTitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginasTotais, setPaginasTotais] = useState("");
  const [capa, setCapa] = useState("");
  const [rating, setRating] = useState("");
  const [completo, setCompleto] = useState("");

  useEffect(() => {
    // setLoading(true);
    getLivro(bookID)
      .then((response) => {
        console.log(response.data);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
    // setLoading(false);
  }, [bookID]);

  useEffect(() => {
    setTitulo(livro.titulo);
    setsubTitulo(livro.subTitulo);
    setgeneroPrincipal(livro.generoPrincipal);
    setgeneroSecundario(livro.generoSecundario);
    setSinopse(livro.sinopse);
    setPaginasTotais(livro.paginasTotais);
    setCapa(livro.capa);
    setRating(livro.rating);
    setCompleto(livro.completo);
  }, [livro]);

  const atlLivro = (e) => {
    e.preventDefault();

    const livroATL = new Book(
      bookID,
      capa,
      titulo,
      subTitulo,
      sinopse,
      generoPrincipal,
      generoSecundario,
      livro.paginasLidas,
      paginasTotais,
      rating,
      livro.completo
    );
    console.log(livroATL);
    putLivro(livroATL, authenticated)
      .then((response) => {
        console.log(response);
        setMessage("Livro atualizado");
        setAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.cardInfo}>
      <h1 className={styles.title}>Editar Livro</h1>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.bookInfos}
      >
        <div className={styles.ratingBook}>
          {completo && (
            <BookRating
              rating={rating}
              setRating={setRating}
              readOnly={false}
            />
          )}
        </div>

        {/* botao return */}
        <Fab
          component={Link}
          to={`/viewBook/${livro.id}`}
          className={styles.returnToShelf}
        >
          <ReplyAllOutlinedIcon />
        </Fab>

        {/* botao save */}
        <Fab
          onClick={(e) => atlLivro(e)}
          color="success"
          className={styles.saveBook}
        >
          <SaveIcon />
        </Fab>

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
            id="subTitulo-livro"
            label="subTitulo"
            variant="outlined"
            value={subTitulo || ""}
            onChange={(e) => setsubTitulo(e.target.value)}
            className={styles.input}
          />

          <div className={styles.typesGrid}>
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
  );
}

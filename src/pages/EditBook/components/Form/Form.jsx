import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Form.module.scss";
import ButtonAtl from "../ButtonAtl/ButtonAtl";
import { generos } from "../../../../service/Generos";
import BookRating from "../../../../components/BookRating/BookRating";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import Book from "../../../../class/book";

export default function Form({ originalBook }) {
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
    setTitulo(originalBook.titulo);
    setsubTitulo(originalBook.subTitulo);
    setgeneroPrincipal(originalBook.generoPrincipal);
    setgeneroSecundario(originalBook.generoSecundario);
    setSinopse(originalBook.sinopse);
    setPaginasTotais(originalBook.paginasTotais);
    setCapa(originalBook.capa);
    setRating(originalBook.rating);
    setCompleto(originalBook.completo);
  }, [originalBook]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.bookInfos}
    >
      <div className={styles.ratingBook}>
        {completo && (
          <BookRating rating={rating} setRating={setRating} readOnly={false} />
        )}
      </div>

      {/* botao return */}
      <Fab
        component={Link}
        to={`/viewBook/${originalBook.id}`}
        className={styles.returnToShelf}
      >
        <ReplyAllOutlinedIcon />
      </Fab>

      <ButtonAtl
        editedBook={
          new Book(
            originalBook.id,
            capa,
            titulo,
            subTitulo,
            sinopse,
            generoPrincipal,
            generoSecundario,
            originalBook.paginasLidas,
            paginasTotais,
            rating,
            completo
          )
        }
      />

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
  );
}

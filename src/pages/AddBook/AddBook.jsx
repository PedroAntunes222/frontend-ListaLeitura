import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AddBook.module.scss";
import { generos } from "../../service/Generos";
import Book from "../../class/book";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ResetButton from "./components/ResetButton/ResetButton";
import AddButton from "./components/AddButton/AddButton";

export default function AddBook() {
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setsubTitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginas, setPaginas] = useState("");
  const [capa, setCapa] = useState("");

  return (
    <div className={styles.formPage}>
      <h1 className={styles.title}> Adicione um livro </h1>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.form}
      >
        <Fab component={Link} to="/shelf" className={styles.returnToShelf}>
          <ReplyAllIcon />
        </Fab>

        <ResetButton
          setTitulo={setTitulo}
          setsubTitulo={setsubTitulo}
          setgeneroPrincipal={setgeneroPrincipal}
          setgeneroSecundario={setgeneroSecundario}
          setSinopse={setSinopse}
          setPaginas={setPaginas}
          setCapa={setCapa}
        />

        <div>
          <TextField
            className={styles.inputBook}
            id="Titulo-livro"
            label="Titulo"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <TextField
            className={styles.inputBook}
            id="subTitulo-livro"
            label="subTitulo"
            variant="outlined"
            value={subTitulo}
            onChange={(e) => setsubTitulo(e.target.value)}
          />
          <div className={styles.doubleDropdown}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Gênero 1</InputLabel>
              <Select
                id="generoPrincipal-label"
                className={styles.selectLabel}
                value={generoPrincipal}
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
            className={styles.inputBook}
            id="endereco-capa"
            label="Image Adress"
            variant="outlined"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
          />

          <TextField
            className={styles.inputBook}
            id="paginas"
            label="N° de Páginas"
            variant="outlined"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
          />

          <TextField
            className={styles.inputBook}
            id="sinopse-livro"
            label="Sinopse"
            variant="outlined"
            multiline
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
          />
        </div>

        <AddButton
          newBook={
            new Book(
              0,
              capa,
              titulo,
              subTitulo,
              sinopse,
              generoPrincipal,
              generoSecundario,
              0,
              paginas,
              0,
              0
            )
          }
        />
      </Box>
    </div>
  );
}

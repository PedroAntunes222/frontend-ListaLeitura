import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLivro } from "../../Service/getData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MostraLivro.module.scss";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
// import CircularProgress from "@mui/material/CircularProgress";

function MostraLivro() {
  const navigate = useNavigate();
  const [livro, setLivro] = useState([]);
  const [rating, setRating] = useState("");

  const [paginasTotais, setPaginasTotais] = useState("");
  const [paginasLidas, setPaginasLidas] = useState("");

  // const [loading, setLoading] = useState(false);

  const atlPages = (id, e) => {
    e.preventDefault();
    // setLoading(true);
    axios
      .put("http://localhost:8080/livro/" + id, {
        capa: livro.capa,
        titulo: livro.titulo,
        subTitulo: livro.subTitulo,
        generoPrincipal: livro.generoPrincipal,
        generoSecundario: livro.generoSecundario,
        sinopse: livro.sinopse,
        paginasLidas: paginasLidas,
        paginasTotais: livro.paginasTotais,
        completo: false,
        usuario: { id: 1 },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // setLoading(false);
  };

  // const pageProgress = () => {
  //   if (paginasLidas > paginasTotais) {
  //     //erro
  //   } else if (paginasLidas === paginasTotais) {
  //     //complete
  //   }
  //   //setPaginasLidas()
  //   //return atlPages
  //   else console.log("complete");
  // };

  useEffect(() => {
    // setLoading(true);
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        setLivro(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    // setLoading(false);
  }, []);

  useEffect(() => {
    setPaginasLidas(livro.paginasLidas);
    setPaginasTotais(livro.paginasTotais);
  }, [livro]);

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
      <div className={styles.coverLivro}>
        <Fab component={Link} to="/lista" className={styles.returnFlutuante}>
          <ReplyAllOutlinedIcon />
        </Fab>

        {!livro.capa ? (
          <img
            src="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
            alt={`${livro.titulo} no cover`}
          />
        ) : (
          <img src={livro.capa} alt={`${livro.titulo} cover`} />
        )}

        <Stack spacing={1} className={styles.ratingLivro}>
          <Rating
            name="size-medium"
            defaultValue={0}
            precision={0.5}
            value={parseFloat(rating)}
            onChange={(e) => setRating(e.target.value)}
          />
        </Stack>
      </div>

      <div className={styles.infosLivro}>
        <div className={styles.fabGroup}>
          <Fab onClick={(e) => deletaLivro(livro.id, e)} color="error">
            <DeleteIcon />
          </Fab>

          <Fab component={Link} to={`/edit/${livro.id}`}>
            <EditOutlinedIcon />
          </Fab>
        </div>

        <div className={styles.titulos}>
          <h1 className={styles.tituloLivro}>{livro.titulo}</h1>

          {livro.subTitulo !== "" && (
            <h3 className={styles.subtituloLivro}>{livro.subTitulo}</h3>
          )}
        </div>

        <div className={styles.generosLivro}>
          <h4>{livro.generoPrincipal}</h4>
          {livro.generoSecundario !== "" && (
            <h4> / {livro.generoSecundario} </h4>
          )}
        </div>

        <p className={styles.sinopseLivro}> {livro.sinopse} </p>

        <div className={styles.paginasGrid}>
          <TextField
            id="paginasLidas"
            value={paginasLidas || ""}
            className={styles.inputPage}
            onChange={(e) => setPaginasLidas(e.target.value)}
          />

          <span> / </span>

          <p className={styles.totalPages}> {paginasTotais}</p>

          <Button
            size="small"
            endIcon={<SaveIcon />}
            onClick={(e) => atlPages(livro.id, e)}
            className={styles.botaoAtl}
          />
        </div>

        <div className={styles.grupoBotoes}>
          {/* <Button
            variant="contained"
            onClick={(e) => deletaLivro(livro.id, e)}
            endIcon={<DeleteIcon />}
            color="error"
            size="large"
            className={styles.botaoFormulario}
          /> */}

          <Button
            variant="contained"
            onClick={(e) => console.log(rating)}
            endIcon={<TaskAltIcon />}
            color="success"
            size="large"
            className={styles.botaoFormulario}
          />
        </div>
      </div>
    </div>
  );
}

export default MostraLivro;

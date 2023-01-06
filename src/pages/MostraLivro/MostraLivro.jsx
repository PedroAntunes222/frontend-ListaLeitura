// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { getLivro, putLivro, delLivro } from "../../Service/API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MostraLivro.module.scss";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../Service/auth";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function MostraLivro() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [livro, setLivro] = useState([]);
  const [completo, setCompleto] = useState(false);
  const [unable, setUnable] = useState(true);

  const [paginasTotais, setPaginasTotais] = useState(0);
  const [paginasLidas, setPaginasLidas] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [completa, setCompleta] = useState(false);
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    // setLoading(true);
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        setLivro(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Atualiza os estados (sem loop de get)
  useEffect(() => {
    setPaginasLidas(livro.paginasLidas);
    setPaginasTotais(livro.paginasTotais);
    setRating(livro.rating);
  }, [livro]);

  const deletaLivro = (id, e) => {
    e.preventDefault();
    setLoading(true);
    delLivro(id)
      .then(function (response) {
        console.log(response);
        setMessage(response.data);
        setLoading(false);
        setModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const atlPages = (e) => {
    e.preventDefault();
    // setAlerta(true);
    putLivro(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      paginasLidas,
      livro.paginasTotais,
      livro.rating,
      completo,
      authenticated
    )
      .then(function (response) {
        console.log(response);
        setAlerta(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fechaModal = (e) => {
    e.preventDefault();
    setModal(false);
    navigate("/lista");
  };

  const completar = (e) => {
    e.preventDefault();
    setLoading(true);
    putLivro(
      livro.id,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      paginasLidas,
      livro.paginasTotais,
      rating,
      completo,
      authenticated
    )
      .then(function (response) {
        console.log(response);
        setMessage(response.data);
        setLoading(false);
        setModal(true);
        setCompleta(false);
        navigate("/lista");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const CircularProgressWithLabel = () => {
    let calc = Math.floor((paginasLidas * 100) / paginasTotais);

    useEffect(() => {
      // se o progresso for 100%, habilita o botao de completo
      if (paginasLidas === paginasTotais) {
        setUnable(false);
        setCompleto(true);
      } else {
        setUnable(true);
        setCompleto(false);
      }
    });

    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          size="10vh"
          value={calc}
          color="success"
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={(e) => setCompleta(true)}
            endIcon={<TaskAltIcon />}
            disabled={unable}
            size="large"
            color="success"
            className={styles.botaoFormulario}
          />
        </Box>

        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          className={styles.completePercent}
        >
          {`${calc}%`}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {completa && (
        <div className={styles.modal}>
          <div className={styles.complete}>
            <p>Livro Completado</p>
            <p>
              {paginasLidas} / {paginasTotais}
            </p>

            <Stack spacing={1} className={styles.ratingLivro}>
              <Rating
                name="size-medium"
                defaultValue={0}
                precision={0.5}
                value={rating || 0}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
            </Stack>
            <Button variant="outlined" onClick={(e) => completar(e)}>
              Completar
            </Button>
          </div>
        </div>
      )}

      {modal && (
        <div className={styles.modal}>
          <div>
            <p>{message}</p>
            <Button onClick={(e) => fechaModal(e)}>OK</Button>
          </div>
        </div>
      )}

      <Snackbar open={alerta} autoHideDuration={6000}>
        <Alert
          variant="filled"
          onClose={() => {
            setAlerta(false);
          }}
          // onClick={setAlerta(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Páginas salvas!
        </Alert>
      </Snackbar>

      {loading ? (
        <Loading />
      ) : (
        <div className={styles.cardInfo}>
          <div className={styles.coverLivro}>
            <Fab
              component={Link}
              to="/lista"
              className={styles.returnFlutuante}
            >
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
            {completo && (
              <Stack spacing={1} className={styles.ratingLivro}>
                <Rating
                  name="size-medium"
                  defaultValue={0}
                  precision={0.5}
                  value={rating || 0}
                  readOnly
                  // onChange={(e) => setRating(parseFloat(e.target.value))}
                />
              </Stack>
            )}
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
                autoComplete="off"
                value={paginasLidas || 0}
                className={styles.inputPage}
                onChange={(e) => setPaginasLidas(parseInt(e.target.value))}
              />

              <span> / </span>

              <p className={styles.totalPages}> {paginasTotais}</p>

              <Button
                size="small"
                endIcon={<SaveIcon />}
                onClick={(e) => atlPages(e)}
                className={styles.botaoAtl}
              />
            </div>

            <div className={styles.grupoBotoes}>
              <CircularProgressWithLabel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MostraLivro;

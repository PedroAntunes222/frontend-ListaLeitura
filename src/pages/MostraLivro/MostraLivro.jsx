// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { getLivro, putLivro } from "../../service/API";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MostraLivro.module.scss";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../context/auth";
import Alertas from "../../components/Alertas/Alertas";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import Livro from "../../class/livro";
import Progress from "./Components/Progress/Progress";

function MostraLivro() {
  const { idLivro } = useParams();

  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [livro, setLivro] = useState([]);

  const [paginasTotais, setPaginasTotais] = useState(0);
  const [paginasLidas, setPaginasLidas] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [completa, setCompleta] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLivro(idLivro)
      .then((response) => {
        const livroteste = Livro.fromMap(response.data);
        setLivro(livroteste);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [idLivro]);

  // Atualiza os estados (sem loop de get)
  useEffect(() => {
    setPaginasLidas(livro.paginasLidas);
    setPaginasTotais(livro.paginasTotais);
    setRating(livro.rating);
  }, [livro]);

  const atlPages = (e) => {
    e.preventDefault();
    // setAlert(true);
    const livroATL = new Livro(
      idLivro,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.sinopse,
      livro.generoPrincipal,
      livro.generoSecundario,
      paginasLidas,
      livro.paginasTotais,
      livro.rating,
      false
    );
    putLivro(livroATL, authenticated)
      .then(function (response) {
        console.log(response);
        setMessage("Progresso atualizado");
        setAlert(true);
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
    const livroATL = new Livro(
      idLivro,
      livro.capa,
      livro.titulo,
      livro.subTitulo,
      livro.generoPrincipal,
      livro.generoSecundario,
      livro.sinopse,
      paginasLidas,
      livro.paginasTotais,
      rating,
      true
    );
    putLivro(livroATL, authenticated)
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

      {alert && <Alertas alerta={setAlert} message={message} cor="success" />}

      {success && (
        <Alertas alerta={setSuccess} message={message} cor="success" />
      )}

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
          </div>

          <div className={styles.infosLivro}>
            {livro.completo && (
              <Stack spacing={1} className={styles.ratingLivro}>
                <Rating
                  name="size-medium"
                  defaultValue={0}
                  precision={0.5}
                  value={rating || 0}
                  readOnly
                />
              </Stack>
            )}

            <div className={styles.fabGroup}>
              <DeleteButton
                livroID={livro.id}
                alert={setModal}
                loading={setLoading}
                message={setMessage}
              />

              <Fab component={Link} to={`/edit/${livro.id}`}>
                <EditOutlinedIcon />
              </Fab>
            </div>
            <div className={styles.titulos}>
              <h1 className={styles.tituloLivro}>{livro.titulo}</h1>

              {livro.subTitulo !== "" && (
                <h3 className={styles.subTituloLivro}>{livro.subTitulo}</h3>
              )}
            </div>

            <div className={styles.generosLivro}>
              <h4>{livro.generoPrincipal}</h4>
              {livro.generoSecundario !== "" && (
                <h4> / {livro.generoSecundario} </h4>
              )}
            </div>

            <p className={styles.sinopseLivro}> {livro.sinopse} </p>

            {!livro.completo && (
              <>
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
                  <Progress 
                    lidas={paginasLidas}
                    totais={paginasTotais}
                    setCompleta={setCompleta}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MostraLivro;

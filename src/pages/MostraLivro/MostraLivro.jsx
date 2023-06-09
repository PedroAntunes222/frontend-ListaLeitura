// import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLivro } from "../../service/API";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MostraLivro.module.scss";
import Loading from "../../components/Loading/Loading";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Livro from "../../class/livro";
import CompletaModal from "./Components/CompletaModal/CompletaModal";
import AltPages from "./Components/AltPages/AltPages";
import Progress from "./Components/Progress/Progress";
import Modal from "../../components/Modal/Modal";

function MostraLivro() {
  const { idLivro } = useParams();
  const [livro, setLivro] = useState([]);
  const [paginasTotais, setPaginasTotais] = useState(0);
  const [paginasLidas, setPaginasLidas] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [completa, setCompleta] = useState(false);

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

  useEffect(() => {
    setPaginasLidas(livro.paginasLidas);
    setPaginasTotais(livro.paginasTotais);
    setRating(livro.rating);
  }, [livro]);

  return (
    <>
      {completa && (
        <CompletaModal
          livro={livro}
          lidas={paginasLidas}
          totais={paginasTotais}
          setLoading={setLoading}
        />
      )}

      {modal && <Modal message={message} setModal={setModal} color={"#d32f2f"} />}

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
                <AltPages
                  livro={livro}
                  lidas={paginasLidas}
                  setPaginasLidas={setPaginasLidas}
                  paginasTotais={paginasTotais}
                  setMessage={setMessage}
                />

                <Progress
                  lidas={paginasLidas}
                  totais={paginasTotais}
                  setCompleta={setCompleta}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MostraLivro;

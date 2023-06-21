import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Form.module.scss";
import DeleteButton from "../../../../components/DeleteButton/DeleteButton";
import bookCover from "../../../../functions/BookCover/bookCover";
import BookRating from "../../../../components/BookRating/BookRating";

import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CompletaModal from "./../../Components/CompletaModal/CompletaModal";
import AltPages from "./../../Components/AltPages/AltPages";
import Progress from "./../../Components/Progress/Progress";
import Modal from "../../../../components/Modal/Modal";

export default function Form({ livro }) {
  const [paginasTotais, setPaginasTotais] = useState(0);
  const [paginasLidas, setPaginasLidas] = useState(0);
  const [rating, setRating] = useState(0);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [completa, setCompleta] = useState(false);

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
        />
      )}

      {modal && (
        <Modal message={message} setModal={setModal} color={"#d32f2f"} />
      )}

        <div className={styles.coverLivro}>
          <Fab component={Link} to="/shelf" className={styles.returnFlutuante}>
            <ReplyAllOutlinedIcon />
          </Fab>

          <img src={bookCover(livro.capa)} alt={`${livro.titulo} book cover`} />
        </div>

        <div className={styles.infosLivro}>
          {livro.completo && <BookRating rating={rating} readOnly={true} />}

          <div className={styles.fabGroup}>
            <DeleteButton
              bookID={livro.id}
              alert={setModal}
              message={setMessage}
            />

            <Fab component={Link} to={`/editBook/${livro.id}`}>
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
    </>
  );
}

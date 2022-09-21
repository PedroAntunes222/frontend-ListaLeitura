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
// import CircularProgress from "@mui/material/CircularProgress";

function MostraLivro() {
  const navigate = useNavigate();
  const [livro, setLivro] = useState([]);
  // const [loading, setLoading] = useState(false);

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
      </div>
      <div className={styles.infosLivro}>
        {/* BOTAO FLUTUANTE */}
        <Fab
          component={Link}
          to={`/edit/${livro.id}`}
          className={styles.editFlutuante}
        >
          <EditOutlinedIcon />
        </Fab>
        {/* BOTAO FLUTUANTE */}

        <div>
          <h1 className={styles.tituloLivro}>
            {livro.titulo ? livro.titulo[0] : ""}
          </h1>

          {livro.titulo ? (
            livro.titulo[1] !== "" ? (
              <h3 className={styles.subtituloLivro}>{livro.titulo[1]}</h3>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        <div className={styles.generosLivro}>
          <h4>{livro.genero ? livro.genero[0] : ""}</h4>
          {livro.genero ? (
            livro.genero[1] !== "" ? (
              <h4> / {livro.genero[1]} </h4>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        <p className={styles.sinopseLivro}> {livro.sinopse} </p>

        <div className={styles.grupoBotoes}>
          <Button
            variant="contained"
            onClick={(e) => deletaLivro(livro.id, e)}
            endIcon={<DeleteIcon />}
            color="error"
            size="large"
            className={styles.botaoFormulario}
          />
          <Button
            variant="contained"
            // onClick={limpaForm}
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

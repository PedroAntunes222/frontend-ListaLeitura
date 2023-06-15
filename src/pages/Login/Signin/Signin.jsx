import React, { useState } from "react";
import styles from "./Signin.module.scss";
import { addUser } from "../../../service/API";
import { Link } from "react-router-dom";
import Alerts from "../../../components/Alerts/Alerts";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendLogin = (e) => {
    e.preventDefault();

    if (email === "" || nome === "" || senha1 === "" || senha2 === "") {
      setMessage("Campos vazios");
      setAlert(true);
    } else {
      if (!/^\S+@\S+$/.test(email)) {
        setMessage("Email inválido");
        setAlert(true);
      } else if (senha1 !== senha2) {
        setMessage("Senhas diferentes");
        setAlert(true);
      } else {
        addUser(nome, email, senha1)
          .then(function (response) {
            console.log(response);
            setMessage("Cadastrado com sucesso");
            setSuccess(true);
          })
          .catch(function (error) {
            console.log(error.data);
            setMessage("Erro ao cadastrar");
            setAlert(true);
          });
      }
    }
  };

  return (
    <>
      {alert && <Alerts alerta={setAlert} message={message} cor="error" />}

      {success && (
        <Alerts alerta={setSuccess} message={message} cor="success" />
      )}

      <div className={styles.signinPage}>
        <Box
          component="form"
          // noValidate
          autoComplete="off"
          className={styles.loginForm}
        >
          <Fab
            component={Link}
            to={"/login"}
            className={styles.returnToLogin}
          >
            <ReplyAllOutlinedIcon />
          </Fab>

          <TextField
            className={styles.inputLogin}
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            className={styles.inputLogin}
            id="nome"
            label="Nome"
            variant="outlined"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <TextField
            label="Senha"
            variant="outlined"
            value={senha1 || ""}
            onChange={(e) => setSenha1(e.target.value)}
          />

          <TextField
            label="Confirme a senha"
            variant="outlined"
            value={senha2 || ""}
            onChange={(e) => setSenha2(e.target.value)}
          />

          <Button
            variant="outlined"
            color="success"
            onClick={(e) => sendLogin(e)}
          >
            Cadastrar
          </Button>
        </Box>
      </div>
    </>
  );
}

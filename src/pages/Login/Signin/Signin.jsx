import React, { useContext, useState } from "react";
import styles from "./Signin.module.scss";
import AlertContext from "../../../context/Alert/alert";
import { addUser } from "../../../service/API";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";

export default function Signin() {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();

    if (email === "" || nome === "" || senha1 === "" || senha2 === "") {
      setMessage("Campos vazios");
      setSeverity("error");
      setAlert(true);
    } else {
      if (!/^\S+@\S+$/.test(email)) {
        setMessage("Email inválido");
        setSeverity("error");
        setAlert(true);
      } else if (senha1 !== senha2) {
        setMessage("Senhas diferentes");
        setSeverity("error");
        setAlert(true);
      } else {
        addUser(nome, email, senha1)
          .then(function (response) {
            console.log(response);
            setMessage("Cadastrado com sucesso");
            setSeverity("error");
            setAlert(true);
          })
          .catch(function (error) {
            console.log(error.data);
            setMessage("Erro ao cadastrar");
            setSeverity("error");
            setAlert(true);
          });
      }
    }
  };

  return (
    <div className={styles.signinPage}>
      <Box
        component="form"
        // noValidate
        autoComplete="off"
        className={styles.loginForm}
      >
        <Fab component={Link} to={"/login"} className={styles.returnToLogin}>
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
  );
}

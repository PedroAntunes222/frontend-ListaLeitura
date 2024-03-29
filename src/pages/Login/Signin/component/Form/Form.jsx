import React, { useState } from "react";

import { Link } from "react-router-dom";
import SigninButton from "../SigninButton/SigninButton";
import styles from "./Form.module.scss";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";

export default function Form({usuarios}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  return (
    <Box component="form" autoComplete="off" className={styles.loginForm}>
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

      <SigninButton nome={nome} email={email} senha1={senha1} senha2={senha2} usuarios={usuarios} />
    </Box>
  );
}

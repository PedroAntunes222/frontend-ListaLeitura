import React, { useState } from "react";
import styles from "./Cadastro.module.scss";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Service/getData";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = () => setShowPassword(!showPassword);

  const enviaLogin = (e) => {
    e.preventDefault();
    addUser(nome, email, senha)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.data);
      });
    // console.log("enviando login");
    // navigate("/lista");
  };

  return (
    <Box
      component="form"
      // noValidate
      autoComplete="off"
      className={styles.formularioLogin}
    >
      <Fab component={Link} to={"/login"} className={styles.returnFlutuante}>
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
        type={showPassword ? "text" : "password"}
        value={senha || ""}
        onChange={(e) => setSenha(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="ver senha" onClick={showHidePassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="outlined" color="success" onClick={(e) => enviaLogin(e)}>
        Cadastrar
      </Button>
    </Box>
  );
}

export default Cadastro;

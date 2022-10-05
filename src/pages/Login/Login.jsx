import React, { useState, useEffect, useContext } from "react";
import styles from "./login.module.scss";
import { getUsers } from "../../Service/getData";
import AuthContext from "../../Service/auth";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Login() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("pedro@gmail.com");
  const [senha, setSenha] = useState("123");
  const [usuarios, setUsuarios] = useState("");

  useEffect(() => {
    getUsers()
      .then(function (response) {
        setUsuarios(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }, []);

  const enviaLogin = () => {
    console.log(usuarios);
    const user = usuarios.filter((user) => user.email === email);
    console.log(user);

    if (!user.length) {
      console.log("não cadastrado");
    } else {
      if (user[0].senha !== senha) {
        console.log("senha incorreta");
      } else {
        localStorage.setItem("login", user[0].id);
        setAuthenticated(localStorage.getItem("login"));
        navigate("/lista");
      }
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.formularioLogin}
    >
      <TextField
        className={styles.inputLogin}
        id="email"
        label="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        className={styles.inputLivro}
        id="senha"
        label="senha"
        variant="outlined"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <Button variant="outlined" onClick={(e) => enviaLogin(e)}>
        Cadastrar
      </Button>
      <Button variant="outlined" color="success" onClick={(e) => enviaLogin(e)}>
        Entrar
      </Button>
    </Box>
  );
}

export default Login;

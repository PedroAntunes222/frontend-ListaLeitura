import React, { useState, useEffect, useContext } from "react";
import styles from "./Login.module.scss";
import getUsers from "../../functions/API/User/getUsers";
import AuthContext from "../../context/Auth/auth";
import AlertContext from "../../context/Alert/alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const navigate = useNavigate();

  const { setAuthenticated } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const [email, setEmail] = useState("pedro@gmail.com");
  const [senha, setSenha] = useState("123");
  const [usuarios, setUsuarios] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = () => setShowPassword(!showPassword);

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
    if (usuarios) {
      const user = usuarios.filter((user) => user.email === email);

      if (!user.length) {
        setMessage("Email não cadastrado");
        setSeverity("error");
        setAlert(true);
      } else {
        if (user[0].senha !== senha) {
          setMessage("Senha incorreta");
          setSeverity("error");
          setAlert(true);
        } else {
          localStorage.setItem("login", user[0].id); // nao perder ao atualizar a página
          setAuthenticated(user[0].id);
          navigate("/shelf");
        }
      }
    } else {
      setMessage("Backend Offline");
      setSeverity("error");
      setAlert(true);
    }
  };

  return (
    <>
      <div className={styles.loginPage}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.loginForm}
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

          <Button variant="outlined" component={Link} to="/cadastrar">
            Cadastrar
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => enviaLogin(e)}
          >
            Entrar
          </Button>
        </Box>
      </div>
    </>
  );
}

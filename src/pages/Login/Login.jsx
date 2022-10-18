import React, { useState, useEffect, useContext } from "react";
import styles from "./login.module.scss";
import { getUsers } from "../../Service/getData";
import AuthContext from "../../Service/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("pedro@gmail.com");
  const [senha, setSenha] = useState("123");
  const [usuarios, setUsuarios] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState("");

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
    console.log(usuarios);
    const user = usuarios.filter((user) => user.email === email);
    console.log(user);

    if (!user.length) {
      setError("Não cadastrado");
      setAlerta(true);
    } else {
      if (user[0].senha !== senha) {
        setError("Senha incorreta");
        setAlerta(true);
      } else {
        localStorage.setItem("login", user[0].id); // nao perder ao atualizar a página
        setAuthenticated(localStorage.getItem("login"));
        navigate("/lista");
      }
    }
  };

  return (
    <>
      <Snackbar open={alerta} autoHideDuration={6000}>
        <Alert
          variant="filled"
          onClose={() => {
            setAlerta(false);
          }}
          // onClick={setAlerta(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <div className={styles.loginPage}>
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

export default Login;

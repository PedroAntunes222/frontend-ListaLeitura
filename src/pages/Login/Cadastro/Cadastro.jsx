import React, { useState } from "react";
import styles from "./Cadastro.module.scss";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Service/getData";
import { Link } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [message, setMessage] = useState("");
  const [alerta, setAlerta] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = () => setShowPassword(!showPassword);

  const enviaLogin = (e) => {
    e.preventDefault();
    if (senha1 !== senha2) {
      setMessage("Senhas inválidas");
      setAlerta(true);
    } else {
      addUser(nome, email, senha1)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.data);
        });
      // console.log("enviando login");
      // navigate("/lista");
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
          {message}
        </Alert>
      </Snackbar>
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
          // type={showPassword ? "text" : "password"}
          value={senha1 || ""}
          onChange={(e) => setSenha1(e.target.value)}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton aria-label="ver senha" onClick={showHidePassword}>
          //         {showPassword ? <Visibility /> : <VisibilityOff />}
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />

        <TextField
          label="Confirme a senha"
          variant="outlined"
          // type={showPassword ? "text" : "password"}
          value={senha2 || ""}
          onChange={(e) => setSenha2(e.target.value)}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <IconButton aria-label="ver senha" onClick={showHidePassword}>
          //         {showPassword ? <Visibility /> : <VisibilityOff />}
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={(e) => enviaLogin(e)}
        >
          Cadastrar
        </Button>
      </Box>
    </>
  );
}

export default Cadastro;

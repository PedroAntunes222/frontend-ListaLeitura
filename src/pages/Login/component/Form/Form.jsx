import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Form.module.scss";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EnviaLogin from "../EnviaLogin/EnviaLogin";

export default function Form(users) {
  const [email, setEmail] = useState("pedro@gmail.com");
  const [senha, setSenha] = useState("123");
  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = () => setShowPassword(!showPassword);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={styles.loginForm}
    >
      <TextField
        className={styles.inputLogin}
        id="email"
        label="Email"
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

      <EnviaLogin users={users} email={email} senha={senha} />
    </Box>
  );
}

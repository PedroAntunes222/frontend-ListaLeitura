import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function EnviaLogin({users, email, senha}) {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState()
  const { setAuthenticated } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const enviaLogin = () => {
    if (usuarios) {
      const user = usuarios?.filter((user) => user.email === email);

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

  useEffect(()=>{
    setUsuarios(users.users);
  },[users])

  return (
    <Button variant="outlined" color="success" onClick={(e) => enviaLogin(e)}>
      Entrar
    </Button>
  );
}

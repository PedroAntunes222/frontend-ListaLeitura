import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/Auth/auth";
import AlertContext from "../../../../context/Alert/alert";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default function EnviaLogin({ users, email, senha }) {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState(users.users);
  const { setDemo, setAuthenticated } = useContext(AuthContext);
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const enviaLogin = () => {
    if (!usuarios.length) {
      setMessage("Versão DEMO");
      setSeverity("success");
      setAlert(true);

      localStorage.setItem("login", 1); // nao perder ao atualizar a página
      localStorage.setItem("demo", true); // nao perder ao atualizar a página
      setDemo(true);
      setAuthenticated(1);
      navigate("/shelf");
    } else {
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
    }
  };

  useEffect(() => {
    setUsuarios(users.users);
  }, [users]);

  return (
    <Button variant="outlined" color="success" onClick={(e) => enviaLogin(e)}>
      Entrar
    </Button>
  );
}

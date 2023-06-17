import React, { useContext } from "react";
import AlertContext from "../../../../../context/Alert/alert";
import addUser from "../../../../../functions/API/User/addUser";

import Button from "@mui/material/Button";

export default function SendSignin({nome, email, senha1, senha2}) {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

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
    <Button variant="outlined" color="success" onClick={(e) => sendLogin(e)}>
      Cadastrar
    </Button>
  );
}

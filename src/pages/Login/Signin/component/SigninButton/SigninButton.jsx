import React, { useContext } from "react";
import AlertContext from "../../../../../context/Alert/alert";
import addUser from "../../../../../functions/API/User/addUser";
import User from "../../../../../class/user";

import Button from "@mui/material/Button";

export default function SigninButton({
  nome,
  email,
  senha1,
  senha2,
  usuarios,
}) {
  const { setAlert, setMessage, setSeverity } = useContext(AlertContext);

  const sendLogin = () => {
    if (email === "" || nome === "" || senha1 === "" || senha2 === "") {
      setMessage("Campos vazios");
      setSeverity("error");
      setAlert(true);
    } else {
      if (!/^\S+@\S+$/.test(email)) {
        setMessage("Email inválido");
        setSeverity("error");
        setAlert(true);
      } else if (usuarios?.filter((user) => user.email === email)) {
        setMessage("Email já cadastrado");
        setSeverity("error");
        setAlert(true);
      } else if (senha1 !== senha2) {
        setMessage("Senhas diferentes");
        setSeverity("error");
        setAlert(true);
      } else {
        let newUser = new User(1, nome, email, senha1);
        addUser(newUser)
          .then(function (response) {
            console.log(response);
            setMessage("Cadastrado com sucesso");
            setSeverity("success");
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
    <Button variant="outlined" color="success" onClick={sendLogin}>
      Cadastrar
    </Button>
  );
}

import React, { useEffect, useContext, useState } from "react";
import { getUser, putUser, delUser } from "../../service/API";
import AuthContext from "../../context/auth";
import { Link } from "react-router-dom";
import styles from "./Perfil.module.scss";

import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

export default function Perfil() {
  const { authenticated } = useContext(AuthContext);
  const [user, setUser] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    getUser(authenticated)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [authenticated]);

  useEffect(() => {
    setNome(user.nome);
    setEmail(user.email);
    setSenha(user.senha);
  }, [user]);

  const atlUser = (id, e) => {
    e.preventDefault();
    putUser(id, nome, email, senha)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletaUser = (id, e) => {
    e.preventDefault();
    delUser(id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.perfilInfos}>
      <Fab component={Link} to={"/lista"} className={styles.returnFlutuante}>
        <ReplyAllOutlinedIcon />
      </Fab>

      <Fab
        onClick={(e) => deletaUser(user.id, e)}
        color="error"
        className={styles.deleteFlutuante}
      >
        <DeleteIcon />
      </Fab>

      <Avatar alt="Remy Sharp">P</Avatar>

      <TextField
        id="nomeUser"
        label="Nome"
        variant="outlined"
        value={nome || ""}
        onChange={(e) => setNome(e.target.value)}
        className={styles.input}
      />

      <TextField
        id="emailUser"
        label="Email"
        variant="outlined"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <TextField
        id="senhaUser"
        label="Senha"
        variant="outlined"
        value={senha || ""}
        onChange={(e) => setSenha(e.target.value)}
        className={styles.input}
      />

      <Fab
        variant="contained"
        onClick={(e) => atlUser(user.id, e)}
        size="large"
        color="success"
        className={styles.saveFlutuante}
      >
        <SaveIcon />
      </Fab>
    </div>
  );
}

import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import AtlButton from "./components/AtlButton/AtlButton";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";

import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

export default function Profile() {
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

  return (
    <div className={styles.perfilInfos}>
      <Fab component={Link} to={"/shelf"} className={styles.returnFlutuante}>
        <ReplyAllOutlinedIcon />
      </Fab>

      <DeleteButton userID={user.id} />

      <Avatar alt="Remy Sharp">{user.nome?.slice(0, 1)}</Avatar>

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

      <AtlButton user={user} />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import AtlButton from "../../components/AtlButton/AtlButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import User from "../../../../class/user";

import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import TextField from "@mui/material/TextField";
import AvatarIcon from "../../../../components/AvatarIcon/AvatarIcon";

export default function Form({ user }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    setNome(user.nome);
    setEmail(user.email);
    setSenha(user.senha);
  }, [user]);

  return (
    <>
      <Fab component={Link} to={"/shelf"} className={styles.returnFlutuante}>
        <ReplyAllOutlinedIcon />
      </Fab>

      <DeleteButton userID={user.id} />

      <AvatarIcon user={user} />

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

      <AtlButton user={new User(user.id, nome, email, senha)} />
    </>
  );
}

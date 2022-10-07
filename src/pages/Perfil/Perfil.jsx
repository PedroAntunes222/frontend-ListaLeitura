import React, { useEffect, useContext, useState } from "react";
import { getUser } from "../../Service/getData";
import AuthContext from "../../Service/auth";
import { Link } from "react-router-dom";
import styles from "./Perfil.module.scss";

import Avatar from "@mui/material/Avatar";

function Perfil() {
  const { authenticated } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser(authenticated)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [authenticated]);

  return (
    <div className={styles.perfilInfos}>
      <Avatar alt="Remy Sharp">P</Avatar>

      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
      <p>Senha: {user.senha}</p>
    </div>
  );
}

export default Perfil;

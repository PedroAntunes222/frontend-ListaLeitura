import React, { useEffect, useContext, useState } from "react";
import { getUser } from "../../Service/getData";
import AuthContext from "../../Service/auth";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function Header() {
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
    <Box component="div">
      <div className={styles.headerBar}>
        <div className={styles.headerOptions}>
          <Link to="/em-andamento">Em andamento</Link>
          <Link to="/completos">Completos</Link>
          <Link to="/lista">Todos</Link>
        </div>

        <Stack
          component={Link}
          to="/meu-perfil"
          direction="row"
          spacing={2}
          className={styles.headerProfile}
        >
          <Avatar alt="Remy Sharp">P</Avatar>
          <p>Olá, {user.nome}</p>
        </Stack>
      </div>
    </Box>
  );
}

export default Header;

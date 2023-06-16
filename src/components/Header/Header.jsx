import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (authenticated!=='null') {
      getUser(authenticated)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [authenticated]);

  const logout = () => {
    localStorage.setItem("login", null);
    setAuthenticated(null);
    navigate("/");
  };

  return (
    <Box component="div">
      {authenticated > 0 && (
        <div className={styles.headerBar}>
          <Stack
            component={Link}
            to="/my-profile"
            direction="row"
            spacing={2}
            className={styles.headerProfile}
          >
            <Avatar alt="Remy Sharp">{(user.nome).slice(0,1)}</Avatar>
            <p>Olá, {user.nome}</p>
          </Stack>

          <LogoutIcon onClick={logout} />
        </div>
      )}
    </Box>
  );
}

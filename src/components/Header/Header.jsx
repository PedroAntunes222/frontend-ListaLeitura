import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { demoJSON } from "../../service/Demo";

export default function Header() {
  const { authenticated, demo } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (demo) {
      setUser(demoJSON);
    } else {
      if (authenticated !== "null") {
        getUser(authenticated)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [authenticated, demo]);

  const logout = () => {
    if (demo) {
      localStorage.removeItem("demo");
    }
    localStorage.removeItem("login");
    window.location.reload();
  };

  const avatarMaker = () => {
    return user.nome?.slice(0, 1);
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
            <Avatar alt="Remy Sharp">{avatarMaker()}</Avatar>
            <p>Olá, {user.nome}</p>
          </Stack>

          <LogoutIcon onClick={logout} />
        </div>
      )}
    </Box>
  );
}

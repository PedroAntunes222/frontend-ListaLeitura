import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import LogoutButton from "./components/logout/LogoutButton";
import { demoJSON } from "../../service/Demo";

import Stack from "@mui/material/Stack";

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

  return (
    <div>
      <div className={styles.headerBar}>
        <Stack
          component={Link}
          to="/my-profile"
          direction="row"
          spacing={2}
          className={styles.headerProfile}
        >
          <AvatarIcon user={user} />
          <p className={styles.welcomeText}>Olá, {user.nome}</p>
        </Stack>

        <LogoutButton />
      </div>
    </div>
  );
}

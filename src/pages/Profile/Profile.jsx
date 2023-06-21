import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import styles from "./Profile.module.scss";
import Form from "./components/Form/Form";
import { demoJSON } from "../../service/Demo";

export default function Profile() {
  const { authenticated, demo } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (demo) {
      setUser(demoJSON);
    } else {
      getUser(authenticated)
        .then((response) => {
          // console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [authenticated, demo]);

  return (
    <div className={styles.perfilInfos}>
      <Form user={user} />
    </div>
  );
}

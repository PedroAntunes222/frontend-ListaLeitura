import React, { useEffect, useContext, useState } from "react";
import getUser from "../../functions/API/User/getUser";
import AuthContext from "../../context/Auth/auth";
import styles from "./Profile.module.scss";
import Form from "./components/Form/Form";

export default function Profile() {
  const { authenticated } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser(authenticated)
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, [authenticated]);

  return (
    <div className={styles.perfilInfos}>
      <Form user={user} />
    </div>
  );
}

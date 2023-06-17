import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import getUsers from "../../functions/API/User/getUsers";
import Form from "./component/Form/Form";

export default function Login() {
  const [usuarios, setUsuarios] = useState("");

  useEffect(() => {
    getUsers()
      .then(function (response) {
        setUsuarios(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }, []);

  return (
    <>
      <div className={styles.loginPage}>
        <Form users={usuarios} />
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./Signin.module.scss";
import getUsers from "../../../functions/API/User/getUsers";
import Form from "./component/Form/Form";

export default function Signin() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsers()
      .then(function (response) {
        setUsuarios(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.data);
      });
  }, []);

  return (
    <div className={styles.signinPage}>
      <Form usuarios={usuarios} />
    </div>
  );
}

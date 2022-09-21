import React from "react";
import styles from "./Loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

function Loading(loading) {
  console.log(loading);
  return (
    <>
      {!loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Loading;

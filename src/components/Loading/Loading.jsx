import React from "react";
import styles from "./Loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  );
}

export default Loading;

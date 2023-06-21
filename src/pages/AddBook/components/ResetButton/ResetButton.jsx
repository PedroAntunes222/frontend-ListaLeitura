import React from "react";
import styles from "./ResetButton.module.scss";

import Fab from "@mui/material/Fab";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

export default function ResetButton({
  setTitulo,
  setsubTitulo,
  setgeneroPrincipal,
  setgeneroSecundario,
  setSinopse,
  setPaginas,
  setCapa,
}) {
  const limpaForm = () => {
    setTitulo("");
    setsubTitulo("");
    setgeneroPrincipal("");
    setgeneroSecundario("");
    setSinopse("");
    setPaginas("");
    setCapa("");
  };

  return (
    <Fab
      onClick={limpaForm}
      color="error"
      size="large"
      className={styles.erase}
    >
      <SettingsBackupRestoreIcon />
    </Fab>
  );
}

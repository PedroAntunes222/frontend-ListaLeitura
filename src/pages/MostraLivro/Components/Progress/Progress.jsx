import React, { useEffect, useState } from "react";
import styles from "./Progresso.module.scss";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function Progress({ lidas, totais, setCompleta }) {
  const [unable, setUnable] = useState(true);

  let calc = Math.floor((lidas * 100) / totais);

  useEffect(() => {
    if (lidas === totais) {
      setUnable(false);
    } else {
      setUnable(true);
    }
  }, [lidas, totais]);

  return (
    <Box
      sx={{ position: "relative", display: "inline-flex" }}
      className={styles.grupoBotoes}
    >
      <CircularProgress
        variant="determinate"
        size="10vh"
        value={calc}
        color="success"
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={(e) => setCompleta(true)}
          endIcon={<TaskAltIcon />}
          disabled={unable}
          size="large"
          color="success"
          className={styles.botaoFormulario}
        />
      </Box>

      <Typography
        variant="caption"
        component="div"
        color="text.secondary"
        className={styles.completePercent}
      >
        {`${calc}%`}
      </Typography>
    </Box>
  );
}

import React from "react";

export default function Progress({lidas, totais, setUnable, unbale, setCompleto}) {
  let calc = Math.floor((lidas * 100) / totais);

  useEffect(() => {
    // se o progresso for 100%, habilita o botao de completo
    if (lidas === totais) {
      setUnable(false);
      setCompleto(true);
    } else {
      setUnable(true);
      setCompleto(false);
    }
  });

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
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

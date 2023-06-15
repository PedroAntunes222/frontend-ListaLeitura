import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progress({ lidas, totais }) {
  let calc = Math.floor((lidas * 100) / totais);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
      }}
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
        <Typography variant="caption" component="div" color="success">
          {`${calc}%`}
        </Typography>
      </Box>
    </Box>
  );
}

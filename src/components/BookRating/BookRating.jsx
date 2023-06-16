import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function BookRating({rating, setRating, readOnly}) {
  return (
    <Stack spacing={1}>
      <Rating
        readOnly={readOnly}
        name="size-medium"
        defaultValue={0}
        precision={0.5}
        value={rating || 0}
        sx={{ justifyContent: "center" }}
        onChange={(e) => setRating(parseFloat(e.target.value))}
      />
    </Stack>
  );
}

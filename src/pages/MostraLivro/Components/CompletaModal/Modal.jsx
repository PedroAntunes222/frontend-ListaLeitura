import React, { useState } from "react";
import styles from "../MostraLivro.module.scss";
import { putLivro } from "../../../../service/API";
import { Button, Rating, Stack } from "@mui/material";

export default function Modal({livro, lidas, totais}) {
  const [rating, setRating] = useState(0);


// const completar = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const livroATL = new Livro(
//       livro.id,
//       livro.capa,
//       livro.titulo,
//       livro.subTitulo,
//       livro.generoPrincipal,
//       livro.generoSecundario,
//       livro.sinopse,
//       lidas,
//       livro.paginasTotais,
//       rating,
//       true
//     );
//     putLivro(livroATL, authenticated)
//       .then(function (response) {
//         console.log(response);
//         setMessage(response.data);
//         setLoading(false);
//         setModal(true);
//         setCompleta(false);
//         navigate("/lista");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

  return (
    <div className={styles.modal}>
      <div className={styles.complete}>
        <p>Livro Completado</p>
        <p>
          {lidas} / {totais}
        </p>

        <Stack spacing={1} className={styles.ratingLivro}>
          <Rating
            name="size-medium"
            defaultValue={0}
            precision={0.5}
            value={rating || 0}
            onChange={(e) => setRating(parseFloat(e.target.value))}
          />
        </Stack>
        <Button variant="outlined" onClick={(e) => completar(e)}>
          Completar
        </Button>
      </div>
    </div>
  );
}


{/* <Modal 
lidas={paginasLidas}
totais={paginasTotais}
setRating={setRating}
rating={rating}
/> */}
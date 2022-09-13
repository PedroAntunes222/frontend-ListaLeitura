import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../Service/getData";
import styles from "./ListaLivros.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckIcon from "@mui/icons-material/Check";

function Home() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    getUser()
      .then((response) => {
        console.log(response.data.livros);
        setLivros(response.data.livros);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.grupoCards}>
      {livros.map((livro) => (
        <Card sx={{ maxWidth: 345 }} key={livro.id}>
          {!livro.capa ? (
            <CardMedia
              component="img"
              height="200"
              image="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
              alt={`${livro.nome} no cover image`}
            />
          ) : (
            <CardMedia
              component="img"
              height="200"
              image={livro.capa}
              alt={`${livro.nome} cover image`}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {livro.nome}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {livro.genero}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {livro.sinopse}
            </Typography>
          </CardContent>

          <ButtonGroup variant="contained" className={styles.cardButton}>
            <Button
              component={Link}
              to={`/livro/${livro.id}`}
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              className={styles.botaoFormulario}
            />
            <Button
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              className={styles.botaoFormulario}
            />
          </ButtonGroup>

          <CardActions className={styles.cardButton}>
            <Button
              variant="contained"
              component={Link}
              to={`/livro/${livro.id}`}
              size="small"
              color="success"
              startIcon={<CheckIcon />}
              className={styles.botaoFormulario}
            />
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import getLivros from "../blocos/getLivros";

function Home() {
  // useEffect(() => {
  //   fetch("http://localhost:8080/livro/getAll")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setLivros(result);
  //     });
  // });

  const [livros, setLivros] = useState([]);

  useEffect(() => {
    getLivros()
      .then((response) => {
        console.log(response.data);
        setLivros(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {livros.map((livro) => (
        <div key={livro.id}>
          <p>{livro.nome}</p>
          <p>{livro.genero}</p>
          <p>{livro.sinopse}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;

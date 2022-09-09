import React, { useState, useEffect } from "react";
import { getLivros } from "../Service/getData";

function Home() {
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

import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdicionaLivros from "./AdicionaLivros";
import ListaLivros from "./ListaLivros";
import MostraLivro from "./MostraLivro";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdicionaLivros />} />
        <Route path="/lista" element={<ListaLivros />} />
        <Route path="/livro" element={<MostraLivro />} />
        <Route path="/livro/*" element={<MostraLivro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdicionaLivros from "./AdicionaLivros";
import EditaLivro from "./EditaLivro";
import ListaLivros from "./ListaLivros";
import MostraLivro from "./MostraLivro";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaLivros />} />
        <Route path="/adicionar" element={<AdicionaLivros />} />
        <Route path="/lista" element={<ListaLivros />} />
        <Route path="/livro" element={<MostraLivro />} />
        <Route path="/livro/*" element={<MostraLivro />} />
        <Route path="/edit/" element={<EditaLivro />} />
        <Route path="/edit/*" element={<EditaLivro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

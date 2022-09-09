import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdicionaLivros from "./AdicionaLivros";
import ListaLivros from "./ListaLivros";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdicionaLivros />} />
        <Route path="/lista" element={<ListaLivros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

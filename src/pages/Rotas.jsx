import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdicionaLivros from "./AdicionaLivro/AdicionaLivros";
import EditaLivro from "./EditaLivro/EditaLivro";
import ListaLivros from "./ListaLivros/ListaLivros";
import MostraLivro from "./MostraLivro/MostraLivro";
import ListaCompletos from "./ListaCompletos/ListaCompletos";
import Login from "./Login/Login";
import { AuthProvider } from "../Service/auth";

function Rotas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adicionar" element={<AdicionaLivros />} />
          <Route path="/lista" element={<ListaLivros />} />
          <Route path="/livro" element={<MostraLivro />} />
          <Route path="/livro/*" element={<MostraLivro />} />
          <Route path="/edit/" element={<EditaLivro />} />
          <Route path="/edit/*" element={<EditaLivro />} />
          <Route path="/completos" element={<ListaCompletos />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Rotas;

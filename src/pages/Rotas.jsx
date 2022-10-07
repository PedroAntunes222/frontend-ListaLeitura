import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Service/auth";

import Header from "../components/Header/Header";
import Login from "./Login/Login";
import AdicionaLivros from "./AdicionaLivro/AdicionaLivros";
import EditaLivro from "./EditaLivro/EditaLivro";
import ListaTodos from "./ListasdeLivros/ListaTodos/TodosLivros";
import ListaCompletos from "./ListasdeLivros/ListaCompletos/ListaCompletos";
import ListaAndamento from "./ListasdeLivros/ListaAndamento/ListaAndamento";
import MostraLivro from "./MostraLivro/MostraLivro";
import Perfil from "./Perfil/Perfil";

function Rotas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/adicionar" element={<AdicionaLivros />} />
            <Route path="/lista" element={<ListaTodos />} />
            <Route path="/livro/*" element={<MostraLivro />} />
            <Route path="/edit/*" element={<EditaLivro />} />
            <Route path="/completos" element={<ListaCompletos />} />
            <Route path="/em-andamento" element={<ListaAndamento />} />
            <Route path="/meu-perfil" element={<Perfil />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Rotas;

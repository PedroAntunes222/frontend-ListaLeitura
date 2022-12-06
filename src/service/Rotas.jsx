import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../service/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "../components/Header/Header";
import Login from "../pages/Login/Login";
import AdicionaLivros from "../pages/AdicionaLivro/AdicionaLivros";
import EditaLivro from "../pages/EditaLivro/EditaLivro";
import ListaLivros from "../pages/ListaLivros/ListaLivros";
import MostraLivro from "../pages/MostraLivro/MostraLivro";
import Perfil from "../pages/Perfil/Perfil";
import Cadastro from "../pages/Login/Cadastro/Cadastro";

function Rotas() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastrar" element={<Cadastro />} />
              <Route path="/adicionar" element={<AdicionaLivros />} />
              <Route path="/lista" element={<ListaLivros />} />
              <Route path="/livro/*" element={<MostraLivro />} />
              <Route path="/edit/*" element={<EditaLivro />} />
              <Route path="/meu-perfil" element={<Perfil />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Rotas;

import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Service/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "../components/Header/Header";
import Login from "./Login/Login";
import AdicionaLivros from "./AdicionaLivro/AdicionaLivros";
import EditaLivro from "./EditaLivro/EditaLivro";
import ListaTodos from "./ListasdeLivros/TodosLivros";
import MostraLivro from "./MostraLivro/MostraLivro";
import Perfil from "./Perfil/Perfil";

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
              <Route path="/adicionar" element={<AdicionaLivros />} />
              <Route path="/lista" element={<ListaTodos />} />
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

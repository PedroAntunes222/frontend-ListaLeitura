import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Header from "../components/Header/Header";
import Cadastro from "../pages/Login/Cadastro/Cadastro";

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("login");
  const [authenticated, setAuthenticated] = useState(auth);

  // console.log(localStorage.getItem("login"))

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {authenticated > 0 ? (
        children
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastro />} />
          </Routes>
        </>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;

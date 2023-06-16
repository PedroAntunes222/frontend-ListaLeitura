import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Signin from "../../pages/Login/Signin/Signin";

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("login");
  const [authenticated, setAuthenticated] = useState(auth);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {authenticated > 0 ? (
        children
      ) : (
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/cadastrar" element={<Signin />} />
          </Routes>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;

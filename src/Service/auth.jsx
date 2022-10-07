import React, { useState, createContext } from "react";
import Login from "../pages/Login/Login";
import { Route, Routes } from "react-router-dom";

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("login");
  const [authenticated, setAuthenticated] = useState(auth);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {authenticated ? (
        children
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;

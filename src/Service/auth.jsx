import React, { useState, createContext } from "react";

const AuthContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("login");
  const [authenticated, setAuthenticated] = useState(auth);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

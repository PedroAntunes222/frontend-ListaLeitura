import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/Auth/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AlertProvider } from "../context/Alert/alert";

import Header from "../components/Header/Header";
import Login from "./Login/Login";
import SignIn from "./Login/Signin/Signin";
import AddBook from "./AddBook/AddBook";
import EditBook from "./EditBook/EditBook";
import BookShelf from "./BookShelf/BookShelf";
import ViewBook from "./ViewBook/ViewBook";
import Profile from "./Profile/Profile";

export default function Rotas() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
      <AlertProvider>
        <AuthProvider>
          <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/addBook" element={<AddBook />} />
              <Route path="/shelf" element={<BookShelf />} />
              <Route path="/viewBook/:bookID" element={<ViewBook />} />
              <Route path="/editBook/:bookID" element={<EditBook />} />
              <Route path="/my-profile" element={<Profile />} />
            </Routes>
        </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
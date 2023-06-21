import React, { useState, useEffect, useContext } from "react";
import getBook from "../../functions/API/Book/getBook";
import styles from "./ViewBook.module.scss";
import { useParams } from "react-router-dom";
import Book from "../../class/book";
import Form from "./components/Form/Form";
import AuthContext from "../../context/Auth/auth";
import { demoJSON } from "../../service/Demo";

export default function ViewBook() {
  const { demo } = useContext(AuthContext);
  const { bookID } = useParams();
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    if (demo) {
      const book = demoJSON.livros.find((book) => book.id === parseInt(bookID));
      const bookClass = Book.fromMap(book);
      setLivro(bookClass);
    } else {
      getBook(bookID)
        .then((response) => {
          const bookClass = Book.fromMap(response.data);
          setLivro(bookClass);
        })
        .catch((error) => console.log(error));
    }
  }, [bookID, demo]);

  return (
    <div className={styles.cardInfo}>
      <Form livro={livro} />
    </div>
  );
}

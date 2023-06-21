import React, { useState, useEffect } from "react";
import getBook from "../../functions/API/Book/getBook";
import styles from "./ViewBook.module.scss";
import { useParams } from "react-router-dom";
import Book from "../../class/book";
import Form from "./Components/Form/Form";

export default function ViewBook() {
  const { bookID } = useParams();
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    getBook(bookID)
      .then((response) => {
        const livroClass = Book.fromMap(response.data);
        setLivro(livroClass);
      })
      .catch((error) => console.log(error));
  }, [bookID]);

  return (
    <div className={styles.cardInfo}>
      <Form livro={livro} />
    </div>
  );
}

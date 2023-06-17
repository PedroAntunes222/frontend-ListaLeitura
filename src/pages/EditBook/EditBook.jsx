// import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getBook from "../../functions/API/Book/getBook";
import Form from "./components/Form/Form";
import styles from "./EditBook.module.scss"

export default function EditBook() {
  const { bookID } = useParams();

  const [livro, setLivro] = useState([]);

  useEffect(() => {
    getBook(bookID)
      .then((response) => {
        console.log(response.data);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
  }, [bookID]);

  return (
    <div className={styles.cardInfo}>
      <h1 className={styles.title}>Editar Livro</h1>
      <Form originalBook={livro} />
    </div>
  );
}

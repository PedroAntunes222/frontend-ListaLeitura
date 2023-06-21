// import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import getBook from "../../functions/API/Book/getBook";
import Form from "./components/Form/Form";
import styles from "./EditBook.module.scss";
import AuthContext from "../../context/Auth/auth";
import { demoJSON } from "../../service/Demo";

export default function EditBook() {
  const { demo } = useContext(AuthContext);
  const { bookID } = useParams();

  const [livro, setLivro] = useState([]);

  useEffect(() => {
    if (demo) {
      const book = demoJSON.livros.find((book) => book.id === parseInt(bookID));
      setLivro(book);
    } else {
      getBook(bookID)
        .then((response) => {
          console.log(response.data);
          setLivro(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [bookID, demo]);

  return (
    <div className={styles.cardInfo}>
      <h1 className={styles.title}>Editar Livro</h1>
      <Form originalBook={livro} />
    </div>
  );
}

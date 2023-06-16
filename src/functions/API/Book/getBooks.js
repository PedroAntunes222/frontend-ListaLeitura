import axios from "axios";
import url from "../API";

export default function getBooks(id, callback) {
  axios
    .get(url + "usuario/" + id)
    .then((response) => {
      callback(response.data.livros);
    })
    .catch((error) => {
      console.log(error);
    });
}

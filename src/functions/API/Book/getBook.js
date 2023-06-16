import axios from "axios";
import url from "../API";

export default function getBook(id) {
  return axios.get(url + "livro/" + id);
}

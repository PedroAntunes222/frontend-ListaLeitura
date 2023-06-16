import axios from "axios";
import url from "../API";

export default function delBook(id) {
  return axios.delete(url + "livro/" + id);
}

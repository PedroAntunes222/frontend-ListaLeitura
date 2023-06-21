import axios from "axios";
import url from "../API";

export default function getBooks(id) {
  return axios.get(url + "usuario/" + id);
}

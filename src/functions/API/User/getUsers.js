import axios from "axios";
import url from "../API";

export default function getUsers() {
  return axios.get(url + "usuario/all");
}

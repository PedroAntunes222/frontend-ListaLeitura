import axios from "axios";
import url from "../API";

export default function getUser(id) {
  return axios.get(url + "usuario/" + id);
}

import axios from "axios";
import url from "../API";

export default function delUser(id) {
  return axios.delete(url + "usuario/" + id);
}

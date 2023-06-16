import axios from "axios";
import url from "../API";

export default function putUser(id, nome, email, senha) {
  return axios.put(url + "usuario/" + id, {
    nome: nome,
    email: email,
    senha: senha,
  });
}

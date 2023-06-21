import axios from "axios";
import url from "../API";

export default function putUser(user) {
  return axios.put(url + "usuario/" + user.id, {
    nome: user.nome,
    email: user.email,
    senha: user.senha,
  });
}

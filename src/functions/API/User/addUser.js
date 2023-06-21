import axios from "axios";
import url from "../API";

export default function addUser(user) {
  return axios.post(url + "usuario/add", {
    nome: user.nome,
    email: user.email,
    senha: user.senha,
  });
}

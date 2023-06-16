import axios from "axios";
import url from "../API";

export default function addUser(nome, email, senha) {
  console.log("passoubaqui");
  return axios.post(url + "usuario/add", {
    nome: nome,
    email: email,
    senha: senha,
  });
}

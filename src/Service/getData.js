import axios from "axios";

const urlGet = "http://localhost:8080/livro/getAll";

const urlPost = "http://localhost:8080/usuario/getAll";

export function getLivros() {
  return axios.get(urlGet);
}

export function getUsers() {
  return axios.get(urlPost);
}

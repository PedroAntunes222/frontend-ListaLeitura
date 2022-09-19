import axios from "axios";

// const urlGet = "http://localhost:8080/usuario/";

const urlPost = "http://localhost:8080/usuario/";

export function getUser() {
  let id = 1;
  let url = "http://localhost:8080/usuario/" + id;
  return axios.get(url);
}

export function getLivro(id) {
  let url = "http://localhost:8080/livro/" + id;
  return axios.get(url);
}

export function getUsers() {
  return axios.get(urlPost);
}

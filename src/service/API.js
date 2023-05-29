import axios from "axios";
import Livro from "../class/livro";

// const url = "https://backend-listaleitura-production.up.railway.app/";
const url = "http://localhost:5000/";

export function getUser(id) {
  return axios.get(url + "usuario/" + id);
}

export function getUsers() {
  return axios.get(url + "usuario/all");
}

export function addUser(nome, email, senha) {
  console.log('passoubaqui')
  return axios.post(url + "usuario/add", {
    nome: nome,
    email: email,
    senha: senha,
  });
}

export function delUser(id) {
  return axios.delete(url + "usuario/" + id);
}

export function putUser(id, nome, email, senha) {
  return axios.put(url + "usuario/" + id, {
    nome: nome,
    email: email,
    senha: senha,
  });
}

export function getLivros(id, callback) {
  axios
    .get(url + "usuario/" + id)
    .then((response) => {
      callback(response.data.livros);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getLivro(id) {
  return axios.get(url + "livro/" + id);
}

export function addLivro(livro, auth) {
  return axios.post(url + "livro/add", {
    capa: livro.capa,
    titulo: livro.titulo,
    subTitulo: livro.subtitulo,
    generoPrincipal: livro.generoPrincipal,
    generoSecundario: livro.generoSecundario,
    sinopse: livro.sinopse,
    paginasLidas: 0,
    paginasTotais: livro.paginasTotais,
    completo: false,
    usuario: { id: auth },
  });
}

export function delLivro(id) {
  return axios.delete(url + "livro/" + id);
}

export function putLivro(
  id,
  capa,
  titulo,
  subTitulo,
  generoPrincipal,
  generoSecundario,
  sinopse,
  paginasLidas,
  paginasTotais,
  rating,
  completo,
  authenticated
) {
  return axios.put(url + "livro/" + id, {
    capa: capa,
    titulo: titulo,
    subTitulo: subTitulo,
    generoPrincipal: generoPrincipal,
    generoSecundario: generoSecundario,
    sinopse: sinopse,
    paginasLidas: paginasLidas,
    paginasTotais: paginasTotais,
    rating: rating,
    completo: completo,
    usuario: { id: authenticated },
  });
}

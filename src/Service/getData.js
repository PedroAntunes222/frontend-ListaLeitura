import axios from "axios";
// import AuthContext from "./auth";

// const urlGet = "http://localhost:5000/usuario/";

export function getUser(id) {
  return axios.get("http://localhost:5000/usuario/" + id);
}

export function getUsers() {
  return axios.get("http://localhost:5000/usuario/all");
}

export function addUser(nome, email, senha) {
  return axios.post("http://localhost:5000/usuario/add", {
    nome: nome,
    email: email,
    senha: senha,
  });
}

export function delUser(id) {
  return axios.delete(
    "http://localhost:5000/usuario/" + id
  );
}

export function putUser(id, nome, email, senha) {
  return axios.put(
    "http://localhost:5000/usuario/" + id,
    {
      nome: nome,
      email: email,
      senha: senha,
    }
  );
}

export function getLivro(id) {
  return axios.get("http://localhost:5000/livro/" + id);
}

export function addLivro(
  capa,
  titulo,
  subTitulo,
  generoPrincipal,
  generoSecundario,
  sinopse,
  paginasTotais,
  authenticated
) {
  return axios.post("http://localhost:5000/livro/add", {
    capa: capa,
    titulo: titulo,
    subTitulo: subTitulo,
    generoPrincipal: generoPrincipal,
    generoSecundario: generoSecundario,
    sinopse: sinopse,
    paginasLidas: 0,
    paginasTotais: paginasTotais,
    completo: false,
    usuario: { id: authenticated },
  });
}

export function delLivro(id) {
  return axios.delete(
    "http://localhost:5000/livro/" + id
  );
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
  return axios.put("http://localhost:5000/livro/" + id, {
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

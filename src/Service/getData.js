import axios from "axios";
// import AuthContext from "./auth";

// const urlGet = "http://back-end-lista-leitura.herokuapp.com/usuario/";

export function getUser(id) {
  return axios.get("http://back-end-lista-leitura.herokuapp.com/usuario/" + id);
}

export function getUsers() {
  return axios.get("http://back-end-lista-leitura.herokuapp.com/usuario/all");
}

export function getLivro(id) {
  return axios.get("http://back-end-lista-leitura.herokuapp.com/livro/" + id);
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
  return axios.post("http://back-end-lista-leitura.herokuapp.com/livro/add", {
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
    "http://back-end-lista-leitura.herokuapp.com/livro/" + id
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
  return axios.put("http://back-end-lista-leitura.herokuapp.com/livro/" + id, {
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

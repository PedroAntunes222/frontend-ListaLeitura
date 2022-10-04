import axios from "axios";

// const urlGet = "http://back-end-lista-leitura.herokuapp.com/usuario/";

export function getUser() {
  let id = 4;
  let url = "http://back-end-lista-leitura.herokuapp.com/usuario/" + id;
  return axios.get(url);
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
  paginasTotais
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
    usuario: { id: 4 },
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
  completo
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
    usuario: { id: 4 },
  });
}

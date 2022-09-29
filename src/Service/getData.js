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
  let url = "http://back-end-lista-leitura.herokuapp.com/livro/" + id;
  return axios.get(url);
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
  axios
    .post("http://back-end-lista-leitura.herokuapp.com/livro/add", {
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
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function delLivro(id) {
  axios
    .delete("http://back-end-lista-leitura.herokuapp.com/livro/" + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
  axios
    .put("http://back-end-lista-leitura.herokuapp.com/livro/" + id, {
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
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

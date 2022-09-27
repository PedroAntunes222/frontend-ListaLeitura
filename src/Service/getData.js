import axios from "axios";

// const urlGet = "http://localhost:8080/usuario/";

export function getUser() {
  let id = 1;
  let url = "http://localhost:8080/usuario/" + id;
  return axios.get(url);
}

export function getUsers() {
  return axios.get("http://localhost:8080/usuario/all");
}

export function getLivro(id) {
  let url = "http://localhost:8080/livro/" + id;
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
    .post("http://localhost:8080/livro/add", {
      capa: capa,
      titulo: titulo,
      subTitulo: subTitulo,
      generoPrincipal: generoPrincipal,
      generoSecundario: generoSecundario,
      sinopse: sinopse,
      paginasLidas: 0,
      paginasTotais: paginasTotais,
      completo: false,
      usuario: { id: 1 },
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
    .delete("http://localhost:8080/livro/" + id)
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
    .put("http://localhost:8080/livro/" + id, {
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
      usuario: { id: 1 },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

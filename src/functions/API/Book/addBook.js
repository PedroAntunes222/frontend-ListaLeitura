import axios from "axios";
import url from "../API";

export default function addBook(livro, auth) {
  return axios.post(url + "livro/add", {
    capa: livro.capa,
    titulo: livro.titulo,
    subTitulo: livro.subTitulo,
    generoPrincipal: livro.generoPrincipal,
    generoSecundario: livro.generoSecundario,
    sinopse: livro.sinopse,
    paginasLidas: 0,
    paginasTotais: livro.paginasTotais,
    completo: false,
    usuario: { id: auth },
  });
}

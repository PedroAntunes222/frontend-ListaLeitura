import axios from "axios";
import url from "../API";

export default function putBook(livro, auth) {
  return axios.put(url + "livro/" + livro.id, {
    capa: livro.capa,
    titulo: livro.titulo,
    subTitulo: livro.subTitulo,
    generoPrincipal: livro.generoPrincipal,
    generoSecundario: livro.generoSecundario,
    sinopse: livro.sinopse,
    paginasLidas: livro.paginasLidas,
    paginasTotais: livro.paginasTotais,
    rating: livro.rating,
    completo: livro.completo,
    usuario: { id: auth },
  });
}

export default class Livro {
  constructor(
    id,
    capa,
    titulo,
    subTitulo,
    sinopse,
    generoPrincipal,
    generoSecundario,
    paginasLidas,
    paginasTotais,
    rating,
    completo
  ) {
    this.id = id;
    this.capa = capa;
    this.titulo = titulo;
    this.subTitulo = subTitulo;
    this.sinopse = sinopse;
    this.generoPrincipal = generoPrincipal;
    this.generoSecundario = generoSecundario;
    this.paginasLidas = paginasLidas;
    this.paginasTotais = paginasTotais;
    this.rating = rating;
    this.completo = completo;
  }

  static fromMap(item) {
    return new Livro(
      item.id,
      item.capa,
      item.titulo,
      item.subTitulo,
      item.sinopse,
      item.generoPrincipal,
      item.generoSecundario,
      item.paginasLidas,
      item.paginasTotais,
      item.rating,
      item.completo
    );
  }

  toMap() {
    return {
      capa: this.capa,
      titulo: this.titulo,
      subTitulo: this.subTitulo,
      sinopse: this.sinopse,
      generoPrincipal: this.generoPrincipal,
      generoSecundario: this.generoSecundario,
      paginasLidas: this.paginasLidas,
      paginasTotais: this.paginasTotais,
      rating: this.rating,
      completo: this.completo,
    };
  }
}

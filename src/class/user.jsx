export default class User {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static fromMap(item) {
    return new User(item.id, item.nome, item.email, item.senha);
  }

  toMap() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };
  }
}

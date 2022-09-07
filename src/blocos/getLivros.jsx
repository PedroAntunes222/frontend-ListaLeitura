import axios from "axios";
import React from "react";

const url = "http://localhost:8080/livro/getAll";

function getLivros() {
  return axios.get("http://localhost:8080/livro/getAll");
}

export default getLivros;

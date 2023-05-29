import CardLivro from "../components/CardLivro/CardLivro";
import ListaLivros from "../pages/ListasdeLivros/ListaLivros";
import { render } from "@testing-library/react";

test("render book list", () => {
  render(<ListaLivros />);
});

// test("render book card", () => {
//   render(
//     <CardLivro />
//   );
// });

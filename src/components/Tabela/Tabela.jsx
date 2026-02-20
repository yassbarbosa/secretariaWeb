import style from "../Tabela/Tabela.module.css";

export default function Tabela() {
  return (
    <table className={style.tabela}>
      <thead>
        <tr>
          <th>Matéria</th>
          <th>Nota</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Matemática</td>
          <td>8.5</td>
          <td>Aprovado</td>
        </tr>
        <tr>
          <td>Português</td>
          <td>7.0</td>
          <td>Aprovado</td>
        </tr>
        <tr>
          <td>História</td>
          <td>6.0</td>
          <td>Reprovado</td>
        </tr>
      </tbody>
    </table>
  );
}

import style from "../Tabela/Tabela.module.css";

export default function Tabela({ colunas, dados }) {
  return (
    <table className={style.tabela}>
      <thead>
        <tr>
          {colunas.map((coluna, index) => (
            <th key={index}>{coluna.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dados && dados.length > 0 ? (
          dados.map((linha, i) => (
            <tr key={i}>
              {colunas.map((coluna, j) => (
                <td
                  key={j}
                  className={
                    coluna.label === "Média"
                      ? style.media
                      : ""
                  }
                >
                  {coluna.label === "Média"
                    ? linha[coluna.key] != null
                      ? Number(linha[coluna.key]).toFixed(1)
                      : "-"
                    : linha[coluna.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={colunas.length}
              className={style.semDados}
            >
              Nenhum registro encontrado
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
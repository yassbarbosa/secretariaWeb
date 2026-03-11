import { useState, useEffect } from "react";
import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import styles from "./ModalCadastroNotas.module.css";
import { getSeries, getTurmasBySerie, getAlunoByTurma } from "../../services/professorService";
import { addNota } from "../../services/professorService";

export default function GradeModal({ onSubmit, professorId }) {
  const [series, setSeries] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  
  const [serieSelecionada, setSerieSelecionada] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [recuperacao, setRecuperacao] = useState(false);
  const [notaRecuperacao, setNotaRecuperacao] = useState("");
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const [seriesOptions, setSeriesOptions] = useState([]);
  const [turmasOptions, setTurmasOptions] = useState([]);
  const [alunosOptions, setAlunosOptions] = useState([]);

  useEffect(() => {
    carregarSeries();
  }, []);

  useEffect(() => {
    if (serieSelecionada) {
      carregarTurmas(serieSelecionada);
    } else {
      setTurmas([]);
      setTurmasOptions([]);
      setTurmaSelecionada("");
    }
  }, [serieSelecionada]);

  useEffect(() => {
    if (turmaSelecionada) {
      console.log("Turma selecionada ID:", turmaSelecionada);
      carregarAlunos(turmaSelecionada);
    } else {
      setAlunos([]);
      setAlunosOptions([]);
      setAlunoSelecionado("");
    }
  }, [turmaSelecionada]);

  useEffect(() => {
    calcularMedia();
  }, [n1, n2, recuperacao, notaRecuperacao]);

  useEffect(() => {
    if (series.length > 0) {
      const options = series.map(serie => ({
        value: serie,
        label: serie.replace('ANO_', '') + 'º Ano'
      }));
      setSeriesOptions(options);
    }
  }, [series]);

  useEffect(() => {
    if (turmas.length > 0) {
      console.log("Turmas com ID:", turmas);
      
      const options = turmas.map(turma => ({
        value: String(turma.id),
        label: turma.turma,
        turmaCompleta: turma
      }));
      
      setTurmasOptions(options);
    }
  }, [turmas]);

  useEffect(() => {
    if (alunos.length > 0) {
      const options = alunos.map(aluno => ({
        value: String(aluno.matricula),
        label: aluno.nomeCompleto,
        alunoCompleto: aluno
      }));
      setAlunosOptions(options);
    }
  }, [alunos]);

  const carregarSeries = async () => {
    try {
      const data = await getSeries();
      setSeries(data);
    } catch (error) {
      console.error("Erro ao carregar séries:", error);
    }
  };

  const carregarTurmas = async (serie) => {
    try {
      const data = await getTurmasBySerie(serie);
      console.log("Turmas carregadas:", data);
      setTurmas(data);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  const carregarAlunos = async (idTurma) => {
    try {
      console.log("Carregando alunos para turma ID:", idTurma);
      
      const turmaIdNumerico = parseInt(idTurma);
      
      if (isNaN(turmaIdNumerico)) {
        console.error("ID da turma inválido:", idTurma);
        setErro("ID da turma inválido");
        return;
      }
      
      const data = await getAlunoByTurma(turmaIdNumerico);
      console.log("Alunos carregados:", data);
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      setErro("Erro ao carregar alunos. Tente novamente.");
    }
  };

  const calcularMedia = () => {
    const nota1 = parseFloat(n1) || 0;
    const nota2 = parseFloat(n2) || 0;
    
    if (recuperacao) {
      const notaRec = parseFloat(notaRecuperacao) || 0;
      setMedia(notaRec.toFixed(1));
    } else {
      const mediaCalculada = (nota1 + nota2) / 2;
      setMedia(mediaCalculada.toFixed(1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!alunoSelecionado) {
      setErro("Selecione um aluno");
      return;
    }

    if (!n1 || !n2) {
      setErro("Preencha as notas N1 e N2");
      return;
    }

    if (recuperacao && !notaRecuperacao) {
      setErro("Preencha a nota de recuperação");
      return;
    }

    const aluno = alunos.find(a => String(a.matricula) === String(alunoSelecionado));
    
    if (!aluno) {
      setErro("Aluno não encontrado");
      return;
    }

    const dados = {
      idDisciplina: aluno.idDisciplina || 0,
      idAluno: parseInt(alunoSelecionado),
      idProfessor: professorId,
      n1: parseFloat(n1),
      n2: parseFloat(n2),
      nota: recuperacao ? parseFloat(notaRecuperacao) : parseFloat(media)
    };

    console.log("Enviando dados:", dados);

    setLoading(true);

    try {
      const response = await addNota(dados);
      console.log("Resposta do servidor:", response);
      alert("Nota cadastrada com sucesso!");
      onSubmit();
    } catch (error) {
      console.error("Erro ao cadastrar nota:", error);
      
      if (error.response?.status === 500) {
        setErro("Erro no servidor. Verifique se todos os dados estão corretos.");
      } else {
        setErro(error.response?.data?.message || "Erro ao cadastrar nota. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.titulo}>Cadastrar Nota</h2>

      {erro && <div className={styles.erro}>{erro}</div>}

      <SelectField 
        label="Série"
        options={seriesOptions}
        value={serieSelecionada}
        onChange={setSerieSelecionada}
        disabled={false}
      />

      <SelectField 
        label="Turma"
        options={turmasOptions}
        value={turmaSelecionada}
        onChange={setTurmaSelecionada}
        disabled={!serieSelecionada}
      />

      <SelectField 
        label="Nome"
        options={alunosOptions}
        value={alunoSelecionado}
        onChange={setAlunoSelecionado}
        disabled={!turmaSelecionada}
      />

      <div className={styles.notas}>
        <InputField 
          label="N1" 
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={n1}
          onChange={setN1}
          required
        />
        
        <InputField 
          label="N2" 
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={n2}
          onChange={setN2}
          required
        />

        <div className={styles.recuperacao}>
          <label className={styles.recuperacaoLabel}>
            Recuperação
          </label>

          <div className={styles.recuperacaoRow}>
            <input 
              type="checkbox" 
              checked={recuperacao}
              onChange={(e) => setRecuperacao(e.target.checked)}
            />

            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={notaRecuperacao}
              onChange={(e) => setNotaRecuperacao(e.target.value)}
              disabled={!recuperacao}
              placeholder="Nota"
            />
          </div>
        </div>
      </div>

      <InputField 
        label="Média" 
        value={media}
        disabled 
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
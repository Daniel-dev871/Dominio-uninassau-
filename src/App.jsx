import "./app.css"; // importa o css
import { useState, useEffect } from "react";//importa o use state e efect
//usestate cria estados(variaveis que faze o React atualizar a tela)
//useefect executa algo sempre que uma variavel mudr ou um componente iniciar
export default function App() {
  const [domain, setDomain] = useState("");//guarda dominio
  const [data, setData] = useState(null);//guarda o resuktado que a api da
  const [loading, setLoading] = useState(false);//motra carregando
  const [error, setError] = useState(null);//guarda mensadens de erro

  // useEffect apenas para debug e para mostrar uso obrigatório
  //esse useEffect e uma coisa simples, seria legal voces adcionarem mais coisasa
  useEffect(() => {
    console.log("Domínio digitado:", domain);
  }, [domain]);
//funçaõ que permite usar wait
  async function fetchDomain() {
    if (!domain) return;//impede requisição vazia
    setLoading(true);//aparece carregando
    setError(null);//apaga resultados anteriores
    setData(null);//apaga erros anteriores

//aqui ta usanado a api/ o fetch que esta chamando a api
    try {
      const res = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${domain}`);
      if (!res.ok) throw new Error("Erro ao buscar domínio");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
//coloquem o resto no chagpt peçam para ele explicr deu preguiça
  return (
    <div className="container">
      <h1 className="title">Consulta de Domínio (.br)</h1>

      <div className="card">
        <input
          type="text"
          placeholder="ex: exemplo.com.br"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="input"
        />

        <button onClick={fetchDomain} className="button">
          Consultar
        </button>

        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {data && (
          <div className="result">
            <h2 className="result-title">Resultado</h2>
            <p><strong>Domínio:</strong> {data.fqdn}</p>
            <p><strong>Disponível:</strong> {data.available ? "Sim" : "Não"}</p>
            {!data.available && (
              <>
                <p><strong>Última atualização:</strong> {data.last_update}</p>
                <p><strong>Status:</strong> {data.status}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

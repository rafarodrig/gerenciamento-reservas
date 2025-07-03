import axios from "axios";
import { useEffect, useState } from "react";

export default function OptionsTurmas({ id}) {
  const [options, setOptions] = useState([]);


  useEffect(() => {
    if (!id) return; // só busca se o modal estiver visível e houver id

    async function fetchData() {
      try {
        const response = await axios.get("/turmas", {
          params: {
            disponiveis_troca: true,
            id_reserva: id,
          },
        });
        setOptions(response.data.turmas || []);

      } catch (error) {
        console.error("Erro ao buscar turmas disponíveis:", error);
        alert("Erro ao carregar as turmas disponíveis.");
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      {options.map((turma) => (
        <option key={turma.id} value={turma.id}>
          {turma.nome} 
        </option>
      ))}
    </>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";

export default function OptionsSalas({ id}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!id) return; // só busca se o modal estiver visível e houver id

    async function fetchData() {
      try {
        const response = await axios.get("/salas", {
          params: {
            disponiveis_troca: true,
            id_reserva: id,
          },
        });

        console.log(response.data)
        setOptions(response.data.salas || []);

      } catch (error) {
        console.error("Erro ao buscar salas disponíveis:", error);
        alert("Erro ao carregar as salas disponíveis.");
      }
    }

    fetchData();
  }, [id]);

 return (
  <>
    {options.map((sala) => (
      <option key={sala.id} value={sala.id}>
        {sala.numero} - Unidade {sala.unidade} - {' '}
        {sala.turma_id ? sala.turma_nome : 'Disponível'}
      </option>
    ))}
  </>
);
}
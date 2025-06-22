import { useEffect, useState } from "react";
import EditarTurmaModal from "../modals/EditarTurmaModal";
import CadastrarReservaModal from "../modals/CadastrarReservaModal";
import axios from "axios";
export default function CadastrarReservaContainer({
    salaId, 
    reserva, 
    resetId, 
    onResult
    
}){
    
    const [editarTurma, setEditarTurma] = useState(false)
    const [showCadastrarReservaModal, setShowCadastrarReservaModal] = useState(false)
    const [formData, setFormData] = useState([]);
    const [sala, setSala] = useState(null);
    const [prevSala, setPrevSala] = useState(salaId);
    const [turmaCadastrada, setTurmaCadastrada] = useState(null);

    if(prevSala !== salaId){
      setPrevSala(salaId)
      setFormData((prev) => ({
        ...prev,
        cadastro_turma: 'cadastrada',
        nome: '',
        docente: '',
        curso: '',
        lotacao: '',
        responsavel_cadastro: '',
        turma: '',
        sala: salaId,
      }));
    }

    useEffect(() => {
        if (salaId) {
          console.log(reserva)
          console.log(formData)
        axios.get(`/salas/${salaId}`)
        .then((res) => {
            const sala = res.data
            setSala(sala);
            setShowCadastrarReservaModal(true);
        });
        }
    }, [salaId]);

    const fetchTurma = async () => {
      if (!formData.turma) {
        setTurmaCadastrada(null);
        return;
      }

      try {
        const res = await axios.get(`/turmas/${formData.turma}`);
        setTurmaCadastrada(res.data);
      } catch (error) {
        console.error("Erro ao buscar turma cadastrada:", error);
        setTurmaCadastrada(null);
      }
    };

    useEffect(() => {
    fetchTurma();
  }, [formData.turma]);

    const handleSubmit = (e) => {
      e.preventDefault();
    
      const payload = {
        sala: sala.id,
        responsavel_cadastro: formData.responsavel_cadastro,
        turma: formData.turma || null,
        datas: formData.datas
      };
    
      if (!formData.turma) {
        // Nova turma: incluir dados obrigatórios
        Object.assign(payload, {
          nome: formData.nome,
          curso: formData.curso,
          turno: formData.turno,
          docente: formData.docente,
          reserva_tipo: formData.reserva_tipo,
          lotacao: parseInt(formData.lotacao, 10),
        });
      }
      console.log(payload)
        axios.post('/reservas', payload)
        .then((res) => { 
            setShowCadastrarReservaModal(false);
            onResult(res.data.msg)

        })
        .catch((error) => {
          if (error.response?.data?.errors) console.error('Erros de validação:', error);
        });
    };

    if(!reserva) return;

    return(
        <>
        <CadastrarReservaModal 
        show={showCadastrarReservaModal}
        turmaCadastrada={turmaCadastrada}
        sala={sala}
        reserva={reserva.query}
        turmas={reserva.turmas_disponiveis}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={() => {setShowCadastrarReservaModal(false); resetId() }}
        setEditarTurma={(id) => {setShowCadastrarReservaModal(false); setEditarTurma(id)}}
        />

        <EditarTurmaModal
        turmaId={editarTurma}
        onCancel={() => {setShowCadastrarReservaModal(true); }}
        onResult={(msg) => {setShowCadastrarReservaModal(true); fetchTurma()}}
        onExited={()=> setEditarTurma(null) }
        />
        </>
    )

}
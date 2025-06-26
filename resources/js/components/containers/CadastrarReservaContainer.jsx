import { useEffect, useState } from "react";
import EditarTurmaModal from "../modals/EditarTurmaModal";
import DeletarTurmaModal from "../modals/DeletarTurmaModal";
import CadastrarReservaModal from "../modals/CadastrarReservaModal";
import axios from "axios";
import AlertaModal from "../modals/AlertaModal";
export default function CadastrarReservaContainer({
    salaId, 
    reserva, 
    resetId, 
    onResult
    
}){
    
    const [editarTurma, setEditarTurma] = useState(false)
    const [deletarTurma, setDeletarTurma] = useState(false)


    const [showCadastrarReservaModal, setShowCadastrarReservaModal] = useState(false)
    const [formData, setFormData] = useState([]);
    const [sala, setSala] = useState(null);
    const [prevSala, setPrevSala] = useState(salaId);
    const [turmaCadastrada, setTurmaCadastrada] = useState(null);
    const [errorMsg, setErrorMsg] = useState({});
    const [alertaMsg, setAlertaMsg] = useState(null);


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
        datas:reserva.query.datas,
        turno: reserva.query.turno,
        reserva_tipo: reserva.query.reserva_tipo,
        sala: salaId,
      }));
    }

    useEffect(() => {
        if (salaId) {
        axios.get(`/salas/${salaId}`)
        .then((res) => {
            const sala = res.data
            setSala(sala);
            setShowCadastrarReservaModal(true);
        });
        }
    }, [salaId]);

    const fetchTurma = async (turma) => {
      if (!turma) {
        setTurmaCadastrada(null);
        return;
      }

      try {
        const res = await axios.get(`/turmas/${turma}`);
        setTurmaCadastrada(res.data);
      } catch (error) {
        console.error("Erro ao buscar turma cadastrada:", error);
        setTurmaCadastrada(null);
      }
    };

    useEffect(() => {
    fetchTurma(formData.turma);
  }, [formData.turma]);



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
        onResult={(msg)=>{ setShowCadastrarReservaModal(false); setAlertaMsg(msg); onResult(false); resetId();}}
        onCancel={() => {setShowCadastrarReservaModal(false); resetId(); }}
        setEditarTurma={(id) => {setShowCadastrarReservaModal(false); setEditarTurma(id)}}
        setDeletarTurma={(id) =>{setShowCadastrarReservaModal(false); setDeletarTurma(id)}}
        // errorMsg={errorMsg}
        />

        <EditarTurmaModal
        turmaId={editarTurma}
        onCancel={() => {setShowCadastrarReservaModal(true); }}
        onResult={(msg) => {setAlertaMsg(msg); fetchTurma(editarTurma)}}
        onExited={()=> setEditarTurma(null)}
        />

        <DeletarTurmaModal
        turmaId={deletarTurma}
        onCancel={() => {setShowCadastrarReservaModal(true); }}
        onResult={(msg) => {setAlertaMsg(msg); setFormData((prev) => ({...prev, turma: ""})); onResult(false)}}
        onExited={()=> setDeletarTurma(null) }
        /> 

        {alertaMsg && (
              <AlertaModal result={alertaMsg} prevModal={() => setShowCadastrarReservaModal(true)} onExited={() => {setAlertaMsg(null);}} />
          )}
        </>
    )

}
import { api } from '@/services/api';
import { Modal, Form, Row, Col, Container } from 'react-bootstrap';
import CancelarButton from '../Buttons/CancelarButton';
import SalvarButton from '../Buttons/SalvarButton';
import SalaCard from '../Cards/SalaCard';
import { CirclePlus, PlusCircle } from 'lucide-react';
import TurmaCard from '../Cards/TurmaCard';
import { useSimpleForm } from '@/hooks/useSimpleForm';
import ReservaCard from '../Cards/ReservaCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useAlert } from '@/contexts/AlertContext';
import SelectInput from '../Inputs/SelectInput';



export default function CadastrarReservaModal({
  show,
  sala,
  reserva,
  turmas,
  setEditarTurma,
  setDeletarTurma,
  setCadastrarTurma,
  onResult,
  onClose,
  setTurmaSelecionada,
  turmaSelecionada,
}) {


  const { showAlert } = useAlert();
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    loading,
  } = useSimpleForm({
    initialValues: {
      nome: "",
      docente: "",
      curso: "",
      lotacao: "",
      turma: "",
      cadastro_turma: "cadastrada", // se necessário
    },
    onSubmit: async (data) => {
      const payload = {
        sala: sala?.id,
        turma: data.turma || null,
        datas: reserva?.datas,
      };

      console.log('Payload:', payload);
      const res = await api.post('/reservas', payload);
      showAlert(res.data.message, 'success');
      onResult?.();
      resetForm();
      onClose();
    }
  });

  const handleCancel = () => {
    resetForm();
    onClose?.();
  };

  // Custom handleChange para campos especiais
  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;

    handleChange(e); // mantém funcionalidade base do hook

    if (name === 'turma') {
      setTurmaSelecionada(value);
    }

  };

  if (!sala || !reserva) return null;

  return (
    <Modal show={show} onHide={handleCancel} centered size="lg" animation>
      <Modal.Header closeButton>
        <Modal.Title>
          <PlusCircle className="me-2" />
          Cadastrar Reserva
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="form-cadastrar-reserva" onSubmit={handleSubmit}>
          <Row className="g-3 align-items-stretch mb-3">

            {/* Coluna Sala */}

            <Col xs={12} md={6} className="d-flex">
              <div className="d-flex flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Sala </span> */}
                <SalaCard
                  sala={sala}
                  badge={<span className='tw-badge tw-badge--blue-lg'>Sala</span>}
                />
              </div>
            </Col>

            {/* Coluna Reserva */}
            <Col xs={12} md={6} className="d-flex">
              <div className="d-flex flex-column w-100">
                {/* <span className="mx-2 fw-semibold text-uppercase small text-muted">Reserva</span> */}
                <ReservaCard reserva={reserva} badge={<span className='tw-badge tw-badge--blue-lg'>Reserva</span>} />
              </div>
            </Col>
          </Row>
          <Container>

            <Row className='container-style p-3 mb-3' >
              {/* Linha com o select e botão lado a lado */}
              <Col className='mb-1 p-0' xs={12}>
                <div className="d-flex  align-items-stretch h-100 gap-2 ">
                  <div className="flex-grow-1 ">
                    <SelectInput
                      id="turma-cadastrada"
                      name="turma"
                      placeholder='Selecione uma turma'
                      value={formData.turma}
                      onChange={handleFormFieldChange}
                      options={turmas.map((turma) => ({
                        value: turma.id,
                        label: turma.nome,
                      }))}
                      isDisabled={formData.cadastro_turma !== "cadastrada"}
                      error={errors.turma}
                    />
                  </div>
                  <PrimaryButton className="square-button w-auto h-100" onClick={setCadastrarTurma}>
                    <CirclePlus />
                  </PrimaryButton>
                </div>
              </Col>
              <Col>
                {errors.turma && (
                  <div className="invalid-feedback d-block">
                    {errors.turma}
                  </div>
                )}
              </Col>
            </Row>
          </Container>
          <TurmaCard
            turma={turmaSelecionada}
            setDeletarTurma={(turma) => setDeletarTurma(turma)}
            setEditarTurma={(turma) => setEditarTurma(turma)}
            badge={<span className="tw-badge tw-badge--blue-lg">Turma</span>}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <CancelarButton onClick={handleCancel} />
        <SalvarButton loading={loading} form="form-cadastrar-reserva" type='submit' />
      </Modal.Footer>
    </Modal>
  );
}

import NavBar from '@/components/NavBar';
import { Head, useForm } from '@inertiajs/react';
import { Form, Row, Col, Button } from 'react-bootstrap';

// import { createRoot } from 'react-dom/client';
// const root = createRoot(document.getElementById('container-tabela'))
// root.render(<Image />);



export default function ConsultarReserva({dataAtual,pagina_titulo,dataAtualFormatada,numeros}) {
  
  const { data, setData, get, processing, errors} = useForm({
    turma : "",
    numero: "",
    docente: "",
    curso: "",
    data_inicio: dataAtual,
    data_fim: "",
    reserva_tipo: "",
    reserva_status: "Ativa"

  });

  
  const buscar = (e) => {
      e.preventDefault() 

      get(route('reservas.index'), {
            onSuccess: (data) => {
              
              console.log(data)

            }
        });
    }

return (
<>

<NavBar></NavBar>
<Head title="Consultar Reservas" />
  <nav>
    <Form 
      className="row g-3 form-consulta m-auto mt-5"
      id="form-consultar-reservas"
      method="get"
      onSubmit={buscar}>
    <div class="mt-0 fs-3 d-flex justify-content justify-content-between">
        <h1 class="h3">{pagina_titulo}</h1>
        <h1 class="h3">{dataAtualFormatada}</h1>
    </div>
     
      {/* FILTRO turma */}
      <Row className="g-3">
        <Col md={6}>
            <Form.Label htmlFor="inp-consulta-turma">Turma</Form.Label>
            <Form.Control 
              type="text"
              id="inp-consulta-turma"
              name="turma"
              value={data.turma}
              onChange={(e) => setData('turma', e.target.value)} 
            />
        </Col>

      {/* Docente */}
          <Col md={6}>
            <Form.Label htmlFor="inp-consulta-docente">Docente</Form.Label>
            <Form.Control 
              type="text" 
              id="inp-consulta-docente" 
              name="docente"
              value={data.docente} 
              onChange={(e) => setData('docente', e.target.value)} 
              />
          </Col>

       {/* Curso */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-curso">Curso</Form.Label>
            <Form.Control 
              type="text" 
              id="inp-consulta-curso" 
              name="curso" 
              value={data.curso} 
              onChange={(e) => setData('curso', e.target.value)} 
              />
          </Col>

      {/* Data Início */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-data-inicio">De</Form.Label>
            <Form.Control
              type="date"
              id="inp-consulta-data-inicio"
              name="data-inicio"
              value={data.data_inicio} 
              onChange={(e) => setData('data_inicio', e.target.value)}
              />
          </Col>

      {/* Data Fim */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-data-fim">Até</Form.Label>
            <Form.Control
              type="date"
              id="inp-consulta-data-fim"
              name="data-fim"
              onChange={(e) => setData('data_fim', e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              A data final não pode ser maior que a data inicial
            </Form.Control.Feedback>
          </Col>

      {/* Sala */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-sala">N.º da sala</Form.Label>
            <Form.Select 
              id="inp-consulta-sala" 
              name="sala" defaultValue="" 
              onChange={(e) => setData('numero', e.target.value)}
            >
              <option value="">Qualquer</option>
              {/* Dynamically inject room options here */}
              {numeros.map((numero) => <option key={numero} value={numero}>{numero}</option>)}
            </Form.Select>
          </Col>

      {/* Turno */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-turno">Turno</Form.Label>
            <Form.Select 
              id="inp-consulta-turno" 
              name="turno" 
              defaultValue="" 
              onChange={(e) => setData('turno', e.target.value)}
            >
              <option value="">Qualquer</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </Form.Select>
          </Col>


       {/* Tipo de Reserva */}
          <Col md={3}>
            <Form.Label htmlFor="inp-consulta-reserva-tipo">
              Tipo de reserva
            </Form.Label>
            <Form.Select
              id="inp-consulta-reserva-tipo"
              name="reserva_tipo"
              defaultValue=""
              onChange={(e) => setData('reserva_tipo', e.target.value)}
              >
              <option value="">Qualquer</option>
              <option value="Avulsa">Avulsa</option>
              <option value="Graduação">Graduação</option>
              <option value="Pos-graducao">Pós-graduação</option>
              <option value="FIC">FIC</option>
            </Form.Select>
          </Col>

     {/* Reserva Status */}
          <Col md={3}>
            <Form.Label htmlFor="inp-reserva-status">Reservas status</Form.Label>
            <Form.Select
              id="inp-reserva-status"
              name="reserva_status"
              value={data.reserva_status}
              onChange={(e) => setData('reserva_status', e.target.value)}
              
              >
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </Form.Select>
          </Col>
          
      {/* Botão Buscar */}
          <Col xs={12} className="d-flex align-items-center gap-2">
            <Button
              type="submit"
              className="btn-buscar"
              value="consultar-reservas"
              id="btn-buscar"
              variant="primary"
              >Buscar
            </Button>
          </Col>
      </Row>
    </Form>
  </nav>
  <div class="container-fluid my-4 " id="container-tabela" ></div>
</>
)}
import { Form, InputGroup, Button } from 'react-bootstrap';

export default function EditarTurmaForm({ formData, handleChange, handleSubmit, handleDelete }) {

  return (
    <Form id="form-editar-turma" onSubmit={handleSubmit}>
      <div className="input-group-turma">
        {/* INPUT NOME TURMA */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Nome</InputGroup.Text>
          <Form.Control
            type="text"
            className="inp-turma-dados"
            id="inp-editar-nome"
            placeholder="Nome"
            name="nome"
            value={formData.nome || ''}
            onChange={handleChange}
            isInvalid={!!formData.errors?.nome}
          />
          <Form.Control.Feedback type="invalid" id="error-editar-nome">
            {formData.errors?.nome}
          </Form.Control.Feedback>
        </InputGroup>

        {/* INPUT CURSO */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Curso</InputGroup.Text>
          <Form.Control
            type="text"
            className="inp-turma-dados"
            id="inp-editar-docente"
            placeholder="Docente"
            name="docente"
            value={formData.docente || ''}
            onChange={handleChange}
            isInvalid={!!formData.errors?.docente}
          />
          <Form.Control.Feedback type="invalid" id="error-editar-docente">
            {formData.errors?.docente}
          </Form.Control.Feedback>
        </InputGroup>

        {/* INPUT DOCENTE */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Docente</InputGroup.Text>
          <Form.Control
            type="text"
            className="inp-turma-dados"
            id="inp-editar-curso"
            placeholder="Curso"
            name="curso"
            value={formData.curso || ''}
            onChange={handleChange}
            isInvalid={!!formData.errors?.curso}
          />
          <Form.Control.Feedback type="invalid" id="error-editar-curso">
            {formData.errors?.curso}
          </Form.Control.Feedback>
        </InputGroup>

        {/* INPUT LOTAÇÃO */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Lotação</InputGroup.Text>
          <Form.Control
            type="number"
            className="inp-turma-dados"
            id="inp-editar-lotacao"
            placeholder="Lotação"
            name="lotacao"
            min="1"
            value={formData.lotacao || ''}
            onChange={handleChange}
            isInvalid={!!formData.errors?.lotacao}
          />
          <Form.Control.Feedback type="invalid" id="error-editar-lotacao">
            {formData.errors?.lotacao}
          </Form.Control.Feedback>
        </InputGroup>

        {/* BOTÕES */}
        <div className="btn-group" role="group">
          <Button type="submit" size="sm" variant="outline-primary" className="btn-turma-dados">
            Editar
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline-danger"
            className="btn-turma-dados"
            onClick={handleDelete}
            data-bs-toggle="modal"
            data-bs-target="#modal-deletar-turma"
          >
            Deletar
          </Button>
        </div>
      </div>
    </Form>
  );
}

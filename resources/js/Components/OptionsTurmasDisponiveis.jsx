export default function OptionsTurmasDisponiveis({ turmas }) {

  if(!turmas) return null;
  console.log("Turmas Options");
  return (
    <>
      {turmas.map((turma) => (
        <option key={turma.id} value={turma.id}>
          {turma.nome} 
        </option>
      ))}
    </>
  );
}
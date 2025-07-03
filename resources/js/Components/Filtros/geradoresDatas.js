import { DateTime } from 'luxon';

function gerarDatasGraduacao(dataInicialStr, dataFinalStr, semanas) {
  const dias = [];
  let dataInicial = DateTime.fromISO(dataInicialStr);

  if (dataFinalStr) {
    const dataFinal = DateTime.fromISO(dataFinalStr);
    while (dataInicial <= dataFinal) {
      dias.push(dataInicial.toISODate()); // 'YYYY-MM-DD'
      dataInicial = dataInicial.plus({ weeks: 1 });
    }
  } else {
    for (let i = 0; i < semanas; i++) {
      dias.push(dataInicial.toISODate());
      dataInicial = dataInicial.plus({ weeks: 1 });
    }
  }

  return dias;
}

function gerarDatasFIC(dataInicialStr, dataFinalStr, semanas) {
  const dias = [];
  let data = DateTime.fromISO(dataInicialStr);
  const fimSemana = [6, 7]; // sábado = 6, domingo = 7 (Luxon usa 1 = segunda ... 7 = domingo)

  if (dataFinalStr) {
    const dataFinal = DateTime.fromISO(dataFinalStr);
    while (data <= dataFinal) {
      if (!fimSemana.includes(data.weekday)) {
        dias.push(data.toISODate());
      }
      data = data.plus({ days: 1 });
    }
  } else {
    let i = 0;
    const limite = semanas * 5;
    while (i < limite) {
      if (!fimSemana.includes(data.weekday)) {
        dias.push(data.toISODate());
        i++;
      }
      data = data.plus({ days: 1 });
    }
  }

  return dias;
}

function gerarDatasPos(dataInicialStr, diasSemana, semanas) {
  const dias = [];
  if (!diasSemana || diasSemana.length === 0) return dias;

  let data = DateTime.fromISO(dataInicialStr);
  const totalAulas = semanas * diasSemana.length;

  let i = 0;
  while (i < totalAulas) {
    if (diasSemana.includes(String(data.weekday % 7))) {
      // Luxon: segunda=1, domingo=7 → ajustando para 0-6
      dias.push(data.toISODate());
      i++;
    }
    data = data.plus({ days: 1 });
  }

  return dias;
}

export function filtrosSalasDisponiveis(formData) {
  const filtros = {};

  if (formData.reserva_tipo) filtros['reserva_tipo'] = formData.reserva_tipo;
  if (formData.turno) filtros['turno'] = formData.turno;
  if (formData.numero) filtros['numero'] = `Sala ${formData.numero}` ;
  if (formData.unidade) filtros['unidade'] = `Unidade ${formData.unidade}`;
  if (formData.tipo) filtros['tipo'] = formData.tipo;
  if (formData.maquinas_qtd)
    filtros['maquinas_qtd'] = `${formData.maquinas_qtd} maquinas`;
  if (formData.maquinas_tipo)
    filtros['maquinas_tipo'] = formData.maquinas_tipo;
  if (formData.lotacao)
    filtros['lotacao'] = `${formData.lotacao} lugares`;

  const dataInicio = formData.data_inicio;
  const dataFim = formData.data_fim || null;
  const semanas = formData.semanas ? parseInt(formData.semanas) : null;
  const diasSemana = formData.dias_semana || [];

  let datas = [];

  switch (formData.reserva_tipo) {
    case 'Avulsa':
      datas = dataInicio ? [DateTime.fromISO(dataInicio).toISODate()] : [];
      break;

    case 'Graduação':
      datas = gerarDatasGraduacao(dataInicio, dataFim, semanas);
      break;

    case 'FIC':
      datas = gerarDatasFIC(dataInicio, dataFim, semanas);
      break;

    case 'Pos-graduacao':
      datas = gerarDatasPos(dataInicio, diasSemana, semanas);
      break;

    default:
      break;
  }

  return {
    filtros,
    datas
  };
}

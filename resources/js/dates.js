import { DateTime } from 'luxon';

/**
 * Converte uma data ISO (ex: "2025-06-22") para o formato brasileiro "dd/MM/yyyy".
 */
export function converterData(data) {
  if (!data) return "";
  return DateTime
    .fromISO(data, { zone: 'utc' })
    .setLocale('pt-BR')
    .toFormat('dd/MM/yyyy');
}

/**
 * Retorna o nome do dia da semana em português a partir de uma data no formato ISO ou BR.
 */
export function diaSemana(data) {
  if (!data) return "";

  let dateTime;

  // Verifica se a data está no formato brasileiro (com barras)
  if (data.includes("/")) {
    const [dia, mes, ano] = data.split("/");
    dateTime = DateTime.fromObject({ day: +dia, month: +mes, year: +ano });
  } else {
    // Assume formato ISO (yyyy-MM-dd)
    dateTime = DateTime.fromISO(data);
  }

  return dateTime.setLocale('pt-BR').toFormat('cccc'); // ex: Segunda-feira

}

export function diaSemanaAtual() {
  return DateTime.now().setLocale('pt-BR').toFormat('cccc');
}
/**
 * Retorna a data atual no formato "dd/MM/yyyy"
 */
export function dataAtual(type) {
  if (type == "ISO") {
    return DateTime
      .now()
      .toFormat('yyyy-MM-dd');
  } else {
    return DateTime
      .now()
      .setLocale('pt-BR')
      .toFormat('dd/MM/yyyy');
  }
}
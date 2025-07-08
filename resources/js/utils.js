// Capitaliza apenas a primeira letra
export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Capitaliza cada palavra de uma string
export function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
}

// Formata uma data no formato pt-BR (DD/MM/AAAA)
export function formatDateBR(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return date.toLocaleDateString('pt-BR');
}

// Verifica se um valor está vazio
export function isEmpty(value) {
    return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
    );
}

// Retorna um número inteiro com zero à esquerda se < 10
export function padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

// Retorna dia da semana em português (Domingo, Segunda, etc.)
export function getWeekdayPT(dateStr) {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const date = new Date(dateStr);
    return dias[date.getDay()] || '';
}

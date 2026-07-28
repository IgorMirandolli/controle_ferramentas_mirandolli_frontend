export const STATUS = {
  disponivel: 'Disponivel',
  no_trabalho: 'No trabalho',
  mal_funcionamento: 'Mal funcionamento',
  em_manutencao: 'Em manutencao',
  emprestada: 'Emprestada',
};

export function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(valor));
}

export function formatarDataDeAtualizacao() {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());
}

export function formatarDia(data) {
  const [, mes, dia] = data.split('-');
  return `${dia}/${mes}`;
}

export function formatarDataEHora(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(data));
}

export function textoSeguro(valor) {
  const elemento = document.createElement('span');
  elemento.textContent = valor || '';
  return elemento.innerHTML;
}

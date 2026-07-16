import { STATUS, formatarValor, textoSeguro } from '../util/formatadores.js';

function detalhesDaFerramenta(ferramenta) {
  if (ferramenta.status === 'no_trabalho') {
    return `<strong>Local do trabalho</strong>${textoSeguro(
      ferramenta.local_trabalho
    )}`;
  }

  if (ferramenta.status === 'emprestada') {
    return `<strong>Emprestada para</strong>${textoSeguro(
      ferramenta.emprestado_para_nome
    )}<br />${textoSeguro(ferramenta.emprestado_para_telefone)}`;
  }

  if (ferramenta.observacao) {
    return `<strong>Observacao</strong>${textoSeguro(ferramenta.observacao)}`;
  }

  return '<strong>Informacao</strong>Sem observacoes no momento.';
}

export function renderizarCartoesDeFerramentas(ferramentas) {
  if (!ferramentas.length) {
    return `
      <div class="empty-state">
        <strong>Nenhuma ferramenta encontrada.</strong>
        <span>Altere a busca, escolha outro status ou cadastre uma ferramenta.</span>
      </div>
    `;
  }

  return ferramentas
    .map(
      (ferramenta) => `
        <article class="tool-card">
          <div class="tool-card-header">
            <div>
              <h3>${textoSeguro(ferramenta.nome)}</h3>
              <p class="tool-brand">${textoSeguro(ferramenta.marca)}</p>
            </div>
            <span class="status-badge status-${ferramenta.status}">
              ${STATUS[ferramenta.status]}
            </span>
          </div>
          <div class="tool-details">${detalhesDaFerramenta(ferramenta)}</div>
          <div class="tool-card-footer">
            <p class="tool-value">${formatarValor(ferramenta.valor)}</p>
            <button class="edit-button" data-id="${ferramenta.id}" type="button">
              Editar
            </button>
          </div>
        </article>
      `
    )
    .join('');
}

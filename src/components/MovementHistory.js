import { STATUS, formatarDataEHora, textoSeguro } from '../util/formatadores.js';

function descricaoDaMovimentacao(movimentacao) {
  if (movimentacao.status_novo === 'no_trabalho') {
    return `Obra: ${movimentacao.local_trabalho || 'Nao informada'}`;
  }

  if (movimentacao.status_novo === 'emprestada') {
    const nome = movimentacao.emprestado_para_nome || 'Pessoa nao informada';
    const telefone = movimentacao.emprestado_para_telefone
      ? ` (${movimentacao.emprestado_para_telefone})`
      : '';
    return `Emprestada para: ${nome}${telefone}`;
  }

  return movimentacao.observacao || 'Atualizacao de status.';
}

export function renderizarDialogoDeHistorico() {
  return `
    <dialog class="history-dialog" id="history-dialog" aria-labelledby="history-dialog-title">
      <div class="history-dialog-content">
        <div class="dialog-heading">
          <div>
            <p class="eyebrow">Historico de movimentacoes</p>
            <h2 id="history-dialog-title"></h2>
          </div>
          <button class="icon-button" id="close-history-button" type="button" aria-label="Fechar">×</button>
        </div>
        <div class="movement-list" id="history-container" aria-live="polite"></div>
      </div>
    </dialog>
  `;
}

export function renderizarListaDeMovimentacoes(movimentacoes) {
  if (!movimentacoes.length) {
    return '<p class="chart-empty">Esta ferramenta ainda nao possui movimentacoes.</p>';
  }

  return movimentacoes
    .map(
      (movimentacao) => `
        <article class="movement-item">
          <time>${formatarDataEHora(movimentacao.created_at)}</time>
          <div class="movement-statuses">
            <span class="status-badge status-${movimentacao.status_novo}">${
              STATUS[movimentacao.status_novo]
            }</span>
            ${
              movimentacao.status_anterior
                ? `<span class="movement-change">antes: ${
                    STATUS[movimentacao.status_anterior]
                  }</span>`
                : '<span class="movement-change">cadastro inicial</span>'
            }
          </div>
          <p>${textoSeguro(descricaoDaMovimentacao(movimentacao))}</p>
        </article>
      `
    )
    .join('');
}

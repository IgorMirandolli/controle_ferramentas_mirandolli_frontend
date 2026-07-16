export function renderizarResumoDeStatus() {
  return `
    <section class="status-summary" aria-label="Resumo das ferramentas">
      <button class="summary-card summary-all is-active" data-status="" type="button">
        <span>Total</span>
        <strong id="count-total">0</strong>
      </button>
      <button class="summary-card" data-status="disponivel" type="button">
        <span>Disponiveis</span>
        <strong id="count-disponivel">0</strong>
      </button>
      <button class="summary-card" data-status="no_trabalho" type="button">
        <span>No trabalho</span>
        <strong id="count-no_trabalho">0</strong>
      </button>
      <button class="summary-card" data-status="em_manutencao" type="button">
        <span>Em manutencao</span>
        <strong id="count-em_manutencao">0</strong>
      </button>
      <button class="summary-card" data-status="emprestada" type="button">
        <span>Emprestadas</span>
        <strong id="count-emprestada">0</strong>
      </button>
    </section>
  `;
}

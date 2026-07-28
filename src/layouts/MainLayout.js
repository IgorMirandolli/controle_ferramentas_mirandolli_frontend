import { renderizarResumoDeStatus } from '../components/StatusSummary.js';
import { renderizarConfirmacaoDeExclusao } from '../components/DeleteConfirm.js';
import { renderizarAreaDosGraficos } from '../components/DashboardCharts.js';
import { renderizarDialogoDeHistorico } from '../components/MovementHistory.js';
import { renderizarFormularioDeFerramenta } from '../components/ToolForm.js';

export function renderizarLayoutPrincipal() {
  return `
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Controle de Ferramentas">
        <span class="brand-mark">M</span>
        <span><strong>Mirandolli</strong><small>Controle de ferramentas</small></span>
      </a>
      <button class="button button-primary" id="new-tool-button" type="button">
        <span aria-hidden="true">+</span>Adicionar ferramenta
      </button>
    </header>
    <main id="top">
      <section class="hero" aria-labelledby="page-title">
        <div>
          <p class="eyebrow">Painel de controle</p>
          <h1 id="page-title">Suas ferramentas, sempre localizadas.</h1>
          <p class="hero-description">Veja o que esta disponivel, em obra, em manutencao ou emprestado.</p>
        </div>
        <p class="last-update" id="last-update">Carregando informacoes...</p>
      </section>
      ${renderizarResumoDeStatus()}
      ${renderizarAreaDosGraficos()}
      <section class="inventory" aria-labelledby="inventory-title">
        <div class="inventory-heading">
          <div><p class="eyebrow">Inventario</p><h2 id="inventory-title">Ferramentas cadastradas</h2></div>
          <div class="filters">
            <label class="search-field" for="search-input">
              <span class="sr-only">Buscar ferramenta</span><span aria-hidden="true">⌕</span>
              <input id="search-input" type="search" placeholder="Buscar por nome ou marca" />
            </label>
            <label class="sr-only" for="status-filter">Filtrar por status</label>
            <select id="status-filter">
              <option value="">Todos os status</option>
              <option value="disponivel">Disponivel</option>
              <option value="no_trabalho">No trabalho</option>
              <option value="mal_funcionamento">Mal funcionamento</option>
              <option value="em_manutencao">Em manutencao</option>
              <option value="emprestada">Emprestada</option>
            </select>
          </div>
        </div>
        <div class="tools-grid" id="tools-container" aria-live="polite"><p class="loading-message">Carregando ferramentas...</p></div>
      </section>
    </main>
    ${renderizarFormularioDeFerramenta()}
    ${renderizarConfirmacaoDeExclusao()}
    ${renderizarDialogoDeHistorico()}
    <div class="feedback" id="feedback" role="status" aria-live="polite"></div>
  `;
}

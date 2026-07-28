import { formatarDia, textoSeguro } from '../util/formatadores.js';

function renderizarBarras(itens, formatarRotulo) {
  if (!itens.length) {
    return '<p class="chart-empty">Ainda nao ha dados para mostrar.</p>';
  }

  const maiorTotal = Math.max(...itens.map((item) => item.total), 1);

  return `
    <div class="bar-chart">
      ${itens
        .map((item) => {
          const largura = Math.max((item.total / maiorTotal) * 100, item.total ? 6 : 0);
          const rotulo = formatarRotulo(item);
          return `
            <div class="chart-row">
              <span class="chart-label" title="${textoSeguro(rotulo)}">${textoSeguro(rotulo)}</span>
              <span class="chart-track"><span class="chart-bar" style="width: ${largura}%"></span></span>
              <strong>${item.total}</strong>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

export function renderizarAreaDosGraficos() {
  return `
    <section class="dashboard" aria-labelledby="dashboard-title">
      <div class="dashboard-heading">
        <div>
          <p class="eyebrow">Acompanhamento</p>
          <h2 id="dashboard-title">Movimentacao das ferramentas</h2>
        </div>
        <p>Resumo atualizado a cada alteracao.</p>
      </div>
      <div class="dashboard-grid" id="dashboard-container">
        <p class="loading-message">Carregando graficos...</p>
      </div>
    </section>
  `;
}

export function renderizarGraficosDoDashboard(resumo) {
  const totalDeMovimentacoes = resumo.movimentacoesPorDia.reduce(
    (total, item) => total + item.total,
    0
  );
  const totalDeFerramentas = resumo.localizacoes.reduce(
    (total, item) => total + item.total,
    0
  );

  return `
    <article class="chart-panel">
      <div class="chart-heading">
        <div><p class="eyebrow">Ultimos 7 dias</p><h3>Movimentacoes</h3></div>
        <span class="chart-total">${totalDeMovimentacoes}</span>
      </div>
      ${renderizarBarras(resumo.movimentacoesPorDia, (item) => formatarDia(item.data))}
    </article>
    <article class="chart-panel">
      <div class="chart-heading">
        <div><p class="eyebrow">Situacao atual</p><h3>Onde estao as ferramentas</h3></div>
        <span class="chart-total">${totalDeFerramentas}</span>
      </div>
      ${renderizarBarras(resumo.localizacoes, (item) => item.rotulo)}
    </article>
  `;
}

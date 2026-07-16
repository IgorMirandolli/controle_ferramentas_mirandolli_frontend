import { useFerramentas } from '../composables/useFerramentas.js';
import { renderizarCartoesDeFerramentas } from '../components/ToolCard.js';
import { formatarDataDeAtualizacao } from '../util/formatadores.js';

export function iniciarPaginaDeFerramentas() {
  const ferramentasStore = useFerramentas();
  let feedbackTimeout;

  const elements = {
    container: document.querySelector('#tools-container'),
    dialog: document.querySelector('#tool-dialog'),
    form: document.querySelector('#tool-form'),
    toolId: document.querySelector('#tool-id'),
    dialogTitle: document.querySelector('#dialog-title'),
    dialogKicker: document.querySelector('#dialog-kicker'),
    newToolButton: document.querySelector('#new-tool-button'),
    closeDialogButton: document.querySelector('#close-dialog-button'),
    cancelDialogButton: document.querySelector('#cancel-dialog-button'),
    statusInput: document.querySelector('#status'),
    searchInput: document.querySelector('#search-input'),
    statusFilter: document.querySelector('#status-filter'),
    workLocationField: document.querySelector('#work-location-field'),
    loanFields: document.querySelector('#loan-fields'),
    workLocationInput: document.querySelector('#local_trabalho'),
    loanNameInput: document.querySelector('#emprestado_para_nome'),
    loanPhoneInput: document.querySelector('#emprestado_para_telefone'),
    feedback: document.querySelector('#feedback'),
    lastUpdate: document.querySelector('#last-update'),
    saveButton: document.querySelector('#save-tool-button'),
  };

  function ferramentasFiltradas() {
    const busca = elements.searchInput.value.trim().toLocaleLowerCase('pt-BR');
    const status = elements.statusFilter.value;

    return ferramentasStore.todas().filter((ferramenta) => {
      const correspondeAoStatus = !status || ferramenta.status === status;
      const textoDaFerramenta = `${ferramenta.nome} ${ferramenta.marca}`.toLocaleLowerCase(
        'pt-BR'
      );
      return correspondeAoStatus && (!busca || textoDaFerramenta.includes(busca));
    });
  }

  function renderizarFerramentas() {
    elements.container.innerHTML = renderizarCartoesDeFerramentas(
      ferramentasFiltradas()
    );
  }

  function renderizarResumo() {
    const contagem = ferramentasStore.todas().reduce(
      (resultado, ferramenta) => {
        resultado[ferramenta.status] += 1;
        return resultado;
      },
      {
        disponivel: 0,
        no_trabalho: 0,
        mal_funcionamento: 0,
        em_manutencao: 0,
        emprestada: 0,
      }
    );

    document.querySelector('#count-total').textContent = ferramentasStore.todas().length;
    Object.entries(contagem).forEach(([status, quantidade]) => {
      const contador = document.querySelector(`#count-${status}`);
      if (contador) contador.textContent = quantidade;
    });
  }

  function atualizarResumoAtivo() {
    document.querySelectorAll('.summary-card').forEach((card) => {
      card.classList.toggle(
        'is-active',
        card.dataset.status === elements.statusFilter.value
      );
    });
  }

  function atualizarCamposCondicionais() {
    const estaNoTrabalho = elements.statusInput.value === 'no_trabalho';
    const estaEmprestada = elements.statusInput.value === 'emprestada';
    elements.workLocationField.hidden = !estaNoTrabalho;
    elements.loanFields.hidden = !estaEmprestada;
    elements.workLocationInput.required = estaNoTrabalho;
    elements.loanNameInput.required = estaEmprestada;
    elements.loanPhoneInput.required = estaEmprestada;
  }

  function abrirDialogo(ferramenta = null) {
    elements.form.reset();
    elements.toolId.value = '';

    if (ferramenta) {
      elements.dialogKicker.textContent = 'Editar cadastro';
      elements.dialogTitle.textContent = 'Editar ferramenta';
      elements.toolId.value = ferramenta.id;
      elements.form.nome.value = ferramenta.nome;
      elements.form.marca.value = ferramenta.marca;
      elements.form.valor.value = ferramenta.valor;
      elements.form.status.value = ferramenta.status;
      elements.form.local_trabalho.value = ferramenta.local_trabalho || '';
      elements.form.emprestado_para_nome.value = ferramenta.emprestado_para_nome || '';
      elements.form.emprestado_para_telefone.value = ferramenta.emprestado_para_telefone || '';
      elements.form.observacao.value = ferramenta.observacao || '';
    } else {
      elements.dialogKicker.textContent = 'Novo cadastro';
      elements.dialogTitle.textContent = 'Adicionar ferramenta';
      elements.form.status.value = 'disponivel';
    }

    atualizarCamposCondicionais();
    elements.dialog.showModal();
    window.setTimeout(() => elements.form.nome.focus(), 50);
  }

  function mostrarFeedback(mensagem, tipo = 'sucesso') {
    window.clearTimeout(feedbackTimeout);
    elements.feedback.textContent = mensagem;
    elements.feedback.classList.toggle('is-error', tipo === 'erro');
    elements.feedback.classList.add('is-visible');
    feedbackTimeout = window.setTimeout(() => {
      elements.feedback.classList.remove('is-visible');
    }, 4200);
  }

  async function carregarFerramentas() {
    elements.container.innerHTML = '<p class="loading-message">Carregando ferramentas...</p>';
    try {
      await ferramentasStore.carregar();
      renderizarResumo();
      renderizarFerramentas();
      elements.lastUpdate.textContent = `Atualizado em ${formatarDataDeAtualizacao()}`;
    } catch (_erro) {
      elements.container.innerHTML = `
        <div class="empty-state">
          <strong>Nao foi possivel conectar a API.</strong>
          <span>Inicie o backend e tente atualizar a pagina.</span>
        </div>
      `;
      elements.lastUpdate.textContent = 'API indisponivel';
    }
  }

  async function salvarFerramenta(evento) {
    evento.preventDefault();
    const id = elements.toolId.value;
    const dados = {
      nome: elements.form.nome.value,
      marca: elements.form.marca.value,
      valor: Number(elements.form.valor.value),
      status: elements.form.status.value,
      observacao: elements.form.observacao.value,
    };

    if (dados.status === 'no_trabalho') {
      dados.local_trabalho = elements.form.local_trabalho.value;
    }

    if (dados.status === 'emprestada') {
      dados.emprestado_para_nome = elements.form.emprestado_para_nome.value;
      dados.emprestado_para_telefone = elements.form.emprestado_para_telefone.value;
    }

    elements.saveButton.disabled = true;
    elements.saveButton.textContent = 'Salvando...';
    try {
      await ferramentasStore.salvar(dados, id || null);
      elements.dialog.close();
      mostrarFeedback(
        id ? 'Ferramenta atualizada com sucesso.' : 'Ferramenta adicionada com sucesso.'
      );
      renderizarResumo();
      renderizarFerramentas();
      elements.lastUpdate.textContent = `Atualizado em ${formatarDataDeAtualizacao()}`;
    } catch (erro) {
      mostrarFeedback(erro.message, 'erro');
    } finally {
      elements.saveButton.disabled = false;
      elements.saveButton.textContent = 'Salvar ferramenta';
    }
  }

  elements.newToolButton.addEventListener('click', () => abrirDialogo());
  elements.closeDialogButton.addEventListener('click', () => elements.dialog.close());
  elements.cancelDialogButton.addEventListener('click', () => elements.dialog.close());
  elements.statusInput.addEventListener('change', atualizarCamposCondicionais);
  elements.form.addEventListener('submit', salvarFerramenta);
  elements.searchInput.addEventListener('input', renderizarFerramentas);
  elements.statusFilter.addEventListener('change', () => {
    renderizarFerramentas();
    atualizarResumoAtivo();
  });

  document.querySelectorAll('.summary-card').forEach((card) => {
    card.addEventListener('click', () => {
      elements.statusFilter.value = card.dataset.status;
      renderizarFerramentas();
      atualizarResumoAtivo();
    });
  });

  elements.container.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.edit-button');
    if (!botao) return;
    const ferramenta = ferramentasStore
      .todas()
      .find((item) => item.id === Number(botao.dataset.id));
    if (ferramenta) abrirDialogo(ferramenta);
  });

  carregarFerramentas();
}

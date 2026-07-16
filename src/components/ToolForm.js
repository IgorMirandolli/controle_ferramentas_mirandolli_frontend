export function renderizarFormularioDeFerramenta() {
  return `
    <dialog class="tool-dialog" id="tool-dialog" aria-labelledby="dialog-title">
      <form id="tool-form">
        <div class="dialog-heading">
          <div>
            <p class="eyebrow" id="dialog-kicker">Novo cadastro</p>
            <h2 id="dialog-title">Adicionar ferramenta</h2>
          </div>
          <button class="icon-button" id="close-dialog-button" type="button" aria-label="Fechar">×</button>
        </div>
        <input id="tool-id" type="hidden" />
        <div class="form-grid">
          <label>Nome da ferramenta<input id="nome" name="nome" maxlength="150" required autocomplete="off" /></label>
          <label>Marca<input id="marca" name="marca" maxlength="120" required autocomplete="off" /></label>
          <label>Valor aproximado (R$)<input id="valor" name="valor" type="number" min="0" step="0.01" required /></label>
          <label>
            Status
            <select id="status" name="status" required>
              <option value="disponivel">Disponivel</option>
              <option value="no_trabalho">No trabalho</option>
              <option value="mal_funcionamento">Mal funcionamento</option>
              <option value="em_manutencao">Em manutencao</option>
              <option value="emprestada">Emprestada</option>
            </select>
          </label>
        </div>
        <div class="conditional-field" id="work-location-field" hidden>
          <label>
            Em qual trabalho esta?
            <input id="local_trabalho" name="local_trabalho" maxlength="255" placeholder="Ex.: Reforma da casa da Ana" autocomplete="off" />
          </label>
        </div>
        <div class="form-grid conditional-field" id="loan-fields" hidden>
          <label>
            Nome de quem pegou emprestado
            <input id="emprestado_para_nome" name="emprestado_para_nome" maxlength="150" autocomplete="off" />
          </label>
          <label>
            Telefone
            <input id="emprestado_para_telefone" name="emprestado_para_telefone" maxlength="30" inputmode="tel" placeholder="(00) 00000-0000" autocomplete="tel" />
          </label>
        </div>
        <label class="notes-field">
          Observacao
          <textarea id="observacao" name="observacao" rows="3" placeholder="Ex.: precisa trocar o disco"></textarea>
        </label>
        <div class="dialog-actions">
          <button class="button button-secondary" id="cancel-dialog-button" type="button">Cancelar</button>
          <button class="button button-primary" id="save-tool-button" type="submit">Salvar ferramenta</button>
        </div>
      </form>
    </dialog>
  `;
}

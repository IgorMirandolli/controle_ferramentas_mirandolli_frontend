export function renderizarConfirmacaoDeExclusao() {
  return `
    <dialog class="confirm-dialog" id="delete-dialog" aria-labelledby="delete-dialog-title">
      <div class="confirm-dialog-content">
        <p class="eyebrow">Confirmar exclusao</p>
        <h2 id="delete-dialog-title">Excluir ferramenta?</h2>
        <p class="confirm-message">
          A ferramenta <strong id="delete-tool-name"></strong> sera removida do inventario.
          Esta acao nao pode ser desfeita.
        </p>
        <div class="dialog-actions">
          <button class="button button-secondary" id="cancel-delete-button" type="button">Cancelar</button>
          <button class="button button-danger" id="confirm-delete-button" type="button">Excluir ferramenta</button>
        </div>
      </div>
    </dialog>
  `;
}

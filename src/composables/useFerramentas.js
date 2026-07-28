import {
  excluirFerramenta,
  listarFerramentas,
  salvarFerramenta,
} from '../boot/api.js';

export function useFerramentas() {
  let ferramentas = [];

  async function carregar() {
    ferramentas = await listarFerramentas();
    return ferramentas;
  }

  async function salvar(dados, id) {
    await salvarFerramenta(dados, id);
    return carregar();
  }

  async function excluir(id) {
    await excluirFerramenta(id);
    return carregar();
  }

  return {
    carregar,
    excluir,
    salvar,
    todas: () => ferramentas,
  };
}

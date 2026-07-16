import { listarFerramentas, salvarFerramenta } from '../boot/api.js';

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

  return {
    carregar,
    salvar,
    todas: () => ferramentas,
  };
}

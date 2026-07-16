const apiUrl =
  window.location.hostname === 'localhost' && window.location.port !== '3333'
    ? 'http://localhost:3333/api'
    : `${window.location.origin}/api`;

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${apiUrl}${caminho}`, opcoes);
  const dados = resposta.status === 204 ? null : await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados?.erro || 'Nao foi possivel concluir a operacao.');
  }

  return dados;
}

export function listarFerramentas() {
  return requisitar('/ferramentas');
}

export function salvarFerramenta(dados, id = null) {
  return requisitar(id ? `/ferramentas/${id}` : '/ferramentas', {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
}

import { renderizarLayoutPrincipal } from './layouts/MainLayout.js';
import { iniciarRouter } from './router/index.js';

export function iniciarApp() {
  document.querySelector('#app').innerHTML = renderizarLayoutPrincipal();
  iniciarRouter();
}

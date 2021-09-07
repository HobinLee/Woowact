import { renderDOM } from './lib/woowact/core/VDOM';
import { App } from './lib/woowact/app/App';

renderDOM(App(), document.getElementById('App'));
import { renderWoowactElement } from './lib/woowact/core/VDOM';
import { App } from './lib/woowact/app/App';

renderWoowactElement(App(), document.getElementById('App'));
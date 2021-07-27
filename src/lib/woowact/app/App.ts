import Component from '../core/Component';

export default class App extends Component {
  constructor(component: Component) {
    try {
      super({});

      const $app = document.getElementById('App');

      if (!$app) {
        throw new Error(`html doesn't have #app element`);
      }

      $app.appendChild(component.getElement() as Node);
    } catch (e) {
      console.error(e);
    }
  }
}

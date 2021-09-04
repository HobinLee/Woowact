import ExampleComponent from '../components/ExampleComponent';
import { Component } from '../lib/woowact/index';
import { numberStore } from '../models/Number';
import './index.scss';

export default class Page2 extends Component {
  constructor() {
    super({});

    numberStore.subscribe(this);

    this.init();
  }

  render(): string {
    return `
    <div>
      <h1>
        PAGE 2
      </h1>
    </div>
    `;
  }
}

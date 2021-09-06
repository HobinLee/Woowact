import ExpensiveComponent from '../components/ExampleComponent';
import { Component } from '../lib/woowact/index';
import { numberStore } from '../models/Number';

type ExamplePageState = {
  count: number;
};

export default class ExamplePage extends Component<{}, ExamplePageState> {
  $list: {
    [key: string]: Component;
  } = {};
  constructor() {
    super({});

    numberStore.subscribe(this);

    this.state = {
      count: 2,
    };

    this.init();
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          count: this.state.count + 1,
        }),
      500,
    );
  }

  componentDidUpdate() {
    if (this.state.count < 30) {
      setTimeout(
        () =>
          this.setState({
            count: this.state.count + 1,
          }),
        500,
      );
    }
  }

  generateList(): string {
    const count = this.state.count;
    return Array.from(Array(count).keys())
      .map(
        i =>
          `<li key = ${i}>${
            this.addComponent(ExpensiveComponent, { count: i }).html
          }</li>`,
      )
      .join('');
  }

  render(): string {
    return `
    <div>
      <h1>
        ${numberStore.data.pickedNumber} years old.
      </h1>
      <ul>
        ${this.generateList()}
        </ul>
    </div>
    `;
  }
}

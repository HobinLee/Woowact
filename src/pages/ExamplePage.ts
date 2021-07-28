import ExampleComponent from '../components/ExampleComponent';
import { Component } from '../lib/woowact/index';

type ExamplePageState = {
  count: number;
};

export default class ExamplePage extends Component<{}, ExamplePageState> {
  $list: {
    [key: string]: Component;
  } = {};
  constructor() {
    super({});

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
          `<li key = ${i}>${Component._(
            this.addComponent(ExampleComponent, { count: i }),
          )}</li>`,
      )
      .join('');
  }

  render(): string {
    return `
      <div id='id${this.state.count}' class='class1 class2'>
        <ul>
          ${this.generateList()}
        </ul>
      </div>
    `;
  }
}

import { Component } from '../lib/woowact/index';

type ExamplePageState = {
  count: number;
};

export default class ExamplePage extends Component<{}, ExamplePageState> {
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
      1000,
    );
    setTimeout(
      () =>
        this.setState({
          count: this.state.count + 1,
        }),
      3000,
    );
  }
  render(): string {
    return `
      <div id='id${this.state.count}' class='class1 class2'>
        ${this.state.count}
      </div>
    `;
  }
}

import { Component } from '../lib/woowact/index';

type ExamplePageState = {
  count: number;
};

export default class ExamplePage extends Component<{}, ExamplePageState> {
  constructor() {
    super({});

    this.state = {
      count: 0,
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
    return `<div>${this.state.count}</div>`;
  }
}

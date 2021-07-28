import { Component } from '../lib/woowact/index';

type ExampleComponentProps = {
  count: number;
};

export default class ExampleComponent extends Component<ExampleComponentProps> {
  constructor(props: ExampleComponentProps) {
    super(props);

    this.init();
  }

  componentDidMount() {}

  render() {
    return `
      <div>${this.props.count}</div>
    `;
  }
}

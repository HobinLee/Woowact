import { Component } from '../lib/woowact/index';

type ExampleComponentProps = {
  count: number;
};

export default class ExampleComponent extends Component<ExampleComponentProps> {
  constructor(props: ExampleComponentProps) {
    super(props);

    this.init();
  }

  componentDidMount() {
    this.$element.addEventListener('click', () => alert(this.props.count));
  }

  render() {
    return `
      <div>${this.props.count}</div>
    `;
  }
}

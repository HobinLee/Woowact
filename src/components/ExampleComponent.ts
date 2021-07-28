import { Component } from '../lib/woowact/index';
import { numberStore } from '../models/Number';

type ExampleComponentProps = {
  count: number;
};

export default class ExampleComponent extends Component<ExampleComponentProps> {
  constructor(props: ExampleComponentProps) {
    super(props);

    this.init();
  }

  componentDidMount() {
    this.$element.addEventListener('click', () => {
      numberStore.updateData({ pickedNumber: this.props.count });
    });
  }

  render() {
    return `
      <div>${this.props.count}</div>
    `;
  }
}

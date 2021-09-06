import { Component } from '../lib/woowact/index';
import { CHANGE_NUMBER, numberStore } from '../models/Number';

type ExpensiveComponentProps = {
  count: number;
};

export default class ExpensiveComponent extends Component<ExpensiveComponentProps> {
  constructor(props: ExpensiveComponentProps) {
    super(props);

    this.init();
  }

  componentDidMount() {
    this.$element.addEventListener('click', () => {
      numberStore.dispatch(CHANGE_NUMBER, this.props.count);
    });
  }

  render() {
    return `
      <div>${this.props.count}<span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span><span>ㅣ</span></div>
    `;
  }
}

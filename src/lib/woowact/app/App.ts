import ExampleComponent from '../../../components/ExampleComponent';
import ExamplePage from '../../../pages/ExamplePage';
import { $ } from '../../../utils/selector';
import Component from '../core/Component';
import { Route, Router } from '../core/Router';

export default class App extends Component {
  $app: HTMLElement;

  constructor() {
    super({});

    this.$app = this.getRootApp();
    this.init();
  }

  getRootApp(): HTMLElement {
    const $app = document.getElementById('App');

    if (!$app) {
      console.error(`html doesn't have #app element`);
    }

    return $app ?? document.createElement('error');
  }

  componentDidMount() {
    this.$app.append(this.$element);
    this.setRouter();
  }

  setRouter() {
    console.log('a');
    const $content = $('.content', this.$element);

    if ($content) {
      const route: Route = {
        '/': new ExamplePage(),
      };
      new Router(route, $content);
    }
  }

  render(): string {
    return `<div>
    <nav>
      <ul>
        <a href="/">home</a>
        <a href="/1">link1</a>
        <a href="/2">link2</a>
      </ul>
    </nav>
    <div class='content'></div>
    </div>`;
  }
}

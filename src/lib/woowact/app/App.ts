import ExampleComponent from '../../../components/ExampleComponent';
import ExamplePage from '../../../pages/ExamplePage';
import Page2 from '../../../pages/Page2';
import { $ } from '../../../utils/selector';
import Component from '../core/Component';
import Link, { Route, Router } from '../core/Router';

export default class App extends Component {
  $app: HTMLElement;

  LinkTo1: Component;
  LinkTo2: Component;

  constructor() {
    super({});

    this.LinkTo1 = this.addComponent(Link, { to: '1' });
    this.LinkTo2 = this.addComponent(Link, { to: '2' });

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
    this.setEvents();
    this.$app.append(this.$element);
    this.setRouter();
  }

  setEvents() {
    this.$element.addEventListener('click', (e: Event) => {
      const aTarget = (e.target as HTMLElement).closest('.route-btn');
      if (!aTarget) return;

      window.history.pushState({}, '', '2');
    });
  }

  setRouter() {
    const $content = $('.content', this.$element);

    if ($content) {
      const route: Route = {
        '/': new ExamplePage(),
        '/2': new Page2(),
      };
      new Router(route, $content);
    }
  }

  render(): string {
    return `<div>
    <nav>
      <ul>
        ${this.LinkTo1.html}
        ${this.LinkTo2.html}
      </ul>
    </nav>
    <div class='content'></div>
    </div>`;
  }
}

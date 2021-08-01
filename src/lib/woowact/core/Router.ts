import Component from './Component';

export type Route = {
  [key: string]: Component;
};

const DEFAULT_PATH: string = '/';

export type LinkProps = {
  to: string;
  //component: Component;
};

export default class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super(props);

    this.init();
    this.$element.addEventListener('click', this.onClick.bind(this));
  }

  render() {
    return `<div>${this.props.to}</div>`;
  }

  onClick() {
    const routeEvent = new CustomEvent('pushstate', {
      detail: {
        pathname: this.props.to,
      },
    });

    window.dispatchEvent(routeEvent);
  }
}

export class Router {
  $root: HTMLElement;
  routes: Route;
  history: string[];

  constructor(routes: Route, $root: HTMLElement) {
    if (!routes[DEFAULT_PATH])
      console.error('default directory should be exist');

    this.routes = routes;
    this.$root = $root;
    this.history = [];

    this.initEvent();
    this.handleRoute();
  }

  initEvent(): void {
    window.addEventListener('pushstate', (e: any) => {
      const path = e.detail.pathname;
      window.history.pushState({}, '', path);
      this.history.push(path);
      this.handleRoute();
    });

    window.addEventListener('popstate', (e: any) => {
      /*
      const path = this.history.pop();
      console.log(path);
      if (path) {
        window.history.pushState({}, '', path);
        this.history.push(path);
        this.handleRoute();
      }
      */
    });
  }

  getPath(): string {
    return this.routes[window.location.pathname]
      ? window.location.pathname
      : DEFAULT_PATH;
  }

  getRoute(): HTMLElement {
    const path = this.getPath();
    return this.routes[path].$element;
  }

  handleRoute(): void {
    const $currRoute: HTMLElement = this.getRoute();
    this.$root.replaceWith($currRoute);
    this.$root = $currRoute;
  }
}

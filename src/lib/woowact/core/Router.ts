import Component from './Component';

export type Route = {
  [key: string]: Component;
};

const DEFAULT_PATH: string = '/';

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
    window.addEventListener('pushstate', (e: Event) => {
      e.preventDefault();
      console.log('a');
      this.handleRoute();
    });

    window.addEventListener('popstate', (e: Event) => {
      e.preventDefault();
      console.log('b');
      this.handleRoute();
    });
  }

  getPath(): string {
    return '/';
  }

  getRoute(): HTMLElement {
    const path = this.getPath();
    return this.routes[path].$element ?? this.routes[DEFAULT_PATH].$element;
  }

  handleRoute(): void {
    const $currRoute: HTMLElement = this.getRoute();
    this.$root.replaceWith($currRoute);
  }
}

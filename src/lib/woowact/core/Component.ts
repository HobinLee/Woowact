import { checkSame } from '../../../utils/json';
import Diff from './Diff';
import { parseJSX } from './myJSX';

export interface PropsType {}
export interface StateType {}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type ComponentId = string;

const TAG: string = 'C-';

export default class Component<
  P extends PropsType = PropsType,
  S extends StateType = StateType,
> {
  props: P;
  state: S;

  public id: ComponentId = TAG + Component.ID;
  private _$element: HTMLElement | null = null;

  static ID: number = 0;

  protected $components: {
    [key: string]: Component;
  } = {};

  constructor(props: P) {
    ++Component.ID;
    this.props = props;
    this.state = {} as S;
  }

  // this should be called in constructor of 'Child Class Component'
  protected init() {
    this._$element = parseJSX(this.render(), this.$components);
    this.componentDidMount();
  }

  get $element(): HTMLElement {
    try {
      if (this._$element === null) {
        throw new Error(
          `component doesn't have element. please call init() in its constructor.`,
        );
      }

      return this._$element;
    } catch (e) {
      console.error(e.message);

      //it doen't work
      return document.createElement('error');
    }
  }

  protected componentDidUpdate() {}
  protected componentDidMount() {}

  protected addComponent<PT = PropsType>(component: any, props: PT): Component {
    const newComponent: Component = new component(props);

    this.$components[newComponent.id] = newComponent;

    return newComponent;
  }

  protected render(): string {
    throw new Error('need to be implemented');
  }

  private update(): void {
    try {
      const $new = parseJSX(this.render(), this.$components);

      if (this._$element === null) {
        this._$element = $new;

        throw new Error(
          `component doesn't have element. please call init() in its constructor.`,
        );
      }

      this._$element = Diff.reconciliation(this.$element, $new);
      this.componentDidUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  protected setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState };

    if (checkSame(this.state, nextState)) return;

    this.state = { ...this.state, ...newState };

    this.update();
  }

  protected static _($component: Component): string {
    return `<${$component.id}></${$component.id}>`;
  }
}

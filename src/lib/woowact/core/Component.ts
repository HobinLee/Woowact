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
  private $element: HTMLElement | null = null;

  static ID: number = 0;

  private $components: {
    [key: string]: Component;
  } = {};

  constructor(props: P) {
    ++Component.ID;
    this.props = props;
    this.state = {} as S;
  }

  // this should be called in constructor of 'Child Class Component'
  protected init() {
    this.$element = parseJSX(this.render(), this.$components);
    this.componentDidMount();
  }

  public getElement(): HTMLElement {
    try {
      if (this.$element === null) {
        throw new Error(
          `component doesn't have element. please call init() in its constructor.`,
        );
      }

      return this.$element;
    } catch (e) {
      console.error(e.message);

      //it doen't work
      return document.createElement('error');
    }
  }

  protected componentDidMount() {}

  protected addComponent<PT = PropsType>(
    component: any,
    props: PT,
  ): ComponentId {
    const newComponent = new component(props);

    this.$components[newComponent.id] = newComponent;

    return newComponent.id;
  }

  protected render(): string {
    throw new Error('need to be implemented');
  }

  private update(): void {
    try {
      const $new = parseJSX(this.render(), this.$components);

      if (this.$element === null) {
        this.$element = $new;

        throw new Error(
          `component doesn't have element. please call init() in its constructor.`,
        );
      }

      this.$element = Diff.reconciliation(this.$element, $new);
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
}

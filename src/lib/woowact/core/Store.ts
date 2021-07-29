import Component from './Component';
export interface IData {
  [key: string]: any;
}

export abstract class Store<Data extends IData> {
  protected _data: Data;
  protected abstract actions: { [key: string]: (args?: any) => Partial<Data> };
  protected abstract updateStore: (action: string, data: Partial<Data>) => void;

  private subscribers: Component[] = [];

  constructor(data: Data) {
    this._data = data;
  }

  public subscribe = (component: Component) => {
    this.subscribers.push(component);
  };

  public unsubscribe = (component: Component) => {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== component,
    );
  };

  public dispatch = (action: string, args?: any) => {
    try {
      if (!this.actions[action]) {
        throw new Error(action);
      }

      this.updateStore(action, this.actions[action](args));

      this.updateSubscribers();
    } catch (e) {
      console.error(e);
    }
  };

  protected updateData = (partialData: Partial<Data>) => {
    this._data = {
      ...this._data,
      ...partialData,
    };
  };

  private updateSubscribers = () => {
    this.subscribers.forEach((subscriber: Component) =>
      subscriber.updateBy(this._data),
    );
  };

  get data(): Data {
    return this._data;
  }
}

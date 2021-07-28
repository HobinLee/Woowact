import Component from './Component';

export abstract class Store<StoreData> {
  protected _data: StoreData;

  private subscribers: Component[] = [];

  constructor(data: StoreData) {
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

  public updateData = (partialData: Partial<StoreData>) => {
    this._data = {
      ...this._data,
      ...partialData,
    };

    this.updateSubscribers();
  };

  private updateSubscribers = () => {
    this.subscribers.forEach((subscriber: Component) =>
      subscriber.updateBy(this._data),
    );
  };

  get data(): StoreData {
    return this._data;
  }
}

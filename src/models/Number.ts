import { Store } from '../lib/woowact/core/Store';

type NumberStore = {
  pickedNumber: number;
};

class Number extends Store<NumberStore> {
  constructor(numberStore: NumberStore) {
    super(numberStore);
  }
}

export const numberStore: Number = new Number({ pickedNumber: 0 });

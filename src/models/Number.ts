import { Store } from '../lib/woowact/core/Store';

export const CHANGE_NUMBER = 'Number/CHANGE' as const;

type NumberData = {
  pickedNumber: number;
};

class NumberStore extends Store<NumberData> {
  constructor(numberStore: NumberData) {
    super(numberStore);
  }

  actions = {
    [CHANGE_NUMBER]: this.changeCurrentNumber,
  };

  changeCurrentNumber(number: number): NumberData {
    return {
      pickedNumber: number,
    };
  }

  updateStore = (action: string, args: Partial<NumberData>) => {
    switch (action) {
      case CHANGE_NUMBER:
        this.updateData(args);
        break;
      default:
        break;
    }
  };
}

export const numberStore: NumberStore = new NumberStore({ pickedNumber: 0 });

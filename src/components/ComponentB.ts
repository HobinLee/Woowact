import { Woowact } from '../lib/woowact/core/Hooks';
import { WoowactElement } from '../lib/woowact/core/VDOM';

export const ComponentB = (): WoowactElement => {
  const [num, setNum] = Woowact.useState<number>(0);
  const [count, setCount] = Woowact.useState<boolean>(false);
  const timer = setTimeout(() => {count && setNum(num + 1)}, 500);

  const handleClick = () => {
    if (count) {
      clearTimeout(timer);
    }
    setCount(!count);
  }
  
  return {
    tag: 'div',
    children: [{
        tag: 'h3',
        children: [num.toString()]
      }, {
        tag: 'button',
        children: [(count ? 'stop' : 'start')],
        attributes: {
          'onclick': handleClick
        }
      }
    ]
  }
}
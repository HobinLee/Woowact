import { Woowact } from '../lib/woowact/core/Hooks';
import { WoowactNode } from '../lib/woowact/core/VDOM';

export const ComponentA = (initValue: number): WoowactNode => {
  const [count, setCount] = Woowact.useState<number>(initValue);

  const handleClick = () => {
    alert(count);
    setCount(count + 1);
  }
  
  return {
    tag: 'div',
    children: [{
        tag: 'h3',
        children: [count.toString()],
      }, {
        tag: 'button',
        children: ['+'],
        attributes: {
          'onclick': handleClick
        }
      }
    ], attributes: {
      'attA': count.toString()
    }
  }
}
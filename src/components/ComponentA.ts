import { Woowact } from '../lib/woowact/core/Hooks';
import { WoowactNode } from '../lib/woowact/core/VDOM';

export const ComponentA = (initValue: number): WoowactNode => {
  const [count, setCount] = Woowact.useState<number>(initValue);

  const handleClick = () => {
    setCount(count + 1);
  }

  const list = Array.from({length: count + 1}).map((v, i) => i.toString() + ' ');
  
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
      }, {
        tag: 'div',
        children: list
      }
    ], attributes: {
      'attA': count.toString()
    }
  }
}
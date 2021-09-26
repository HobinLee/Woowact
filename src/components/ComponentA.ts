import { Woowact } from '../lib/woowact/core/Hooks';
import { WoowactElement, WoowactNode } from '../lib/woowact/core/VDOM';

export const ComponentA = (initValue: number): WoowactElement => {
  const [count, setCount] = Woowact.useState<number>(initValue);

  const handleClick = () => {
    setCount(count + 1);
  }

  const list = Array.from({length: 11 - count}).map((v, i): WoowactNode => {
    return {
      tag: 'span',
      children: [i.toString() + ' ']
    }
  });
  
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
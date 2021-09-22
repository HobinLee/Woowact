import { Woowact } from '../lib/woowact/core/Hooks';
import { WoowactNode } from '../lib/woowact/core/VDOM';

export const ComponentA = (initValue: number): WoowactNode => {
  const [count, setCount] = Woowact.useState<number>(initValue);

  const handleClick = () => {
    setCount(count + 1);
  }
  
  return {
    tag: 'div',
    children: [{
        tag: 'h3',
        children: [count.toString()]
      }, {
        tag: 'button',
        children: ['+'],
        attributes: new Map().set('onclick', handleClick)
      }
    ]
  }
}
import { useState } from '../core/Hooks';
import { WoowactElement } from '../core/VDOM';

export const App = (): WoowactElement => {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count() + 1);
  }
  
  return {
    tag: 'div',
    children: [{
        tag: 'h3',
        children: [count().toString()]
      }, {
        tag: 'button',
        children: ['+'],
        attributes: new Map().set('onclick', handleClick)
      }
    ]
  }
}
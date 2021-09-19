import { Woowact } from '../core/Hooks';
import { WoowactElement } from '../core/VDOM';

export const App = (): WoowactElement => {
  const [count, setCount] = Woowact.useState<number>(0);
  const [age, setAge] = Woowact.useState<number>(100);

  const handleClick = () => {
    setCount(count + 1);
  }

  const handleAgeClick = () => {
    setAge(age + 1);
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
      }, {
        tag: 'button',
        children: ['++'],
        attributes: new Map().set('onclick', handleAgeClick)
      }
    ]
  }
}
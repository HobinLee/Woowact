import { ComponentA } from '../../../components/ComponentA';
import { ComponentB } from '../../../components/ComponentB';
import { WoowactElement } from '../core/VDOM';

export const App = (): WoowactElement => {
  return {
    tag: 'div',
    children: [
      ComponentA(0),
      ComponentA(10),
      ComponentB(),
    ]
  }
}
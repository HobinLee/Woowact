import { ComponentA } from '../../../components/ComponentA';
import { ComponentB } from '../../../components/ComponentB';
import { createElement, WoowactNode } from '../core/VDOM';

export const App = (): string => {
  let count = 20;
  const handleClick = () => {
    alert(`count is ${count ++}`);
  }
  
  return createElement(`<div>
    <h3>Hello! this is test page</h3>
    <button onclick="aa">+</button>
    ${ComponentA('testA')}
    ${ComponentA('testB')}

    ${ComponentB(count)}
  </div>`);
}
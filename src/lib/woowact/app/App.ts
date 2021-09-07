import { ComponentA } from '../../../components/ComponentA';
import { ComponentB } from '../../../components/ComponentB';
import { createElement, WoowactNode } from '../core/VDOM';

export const App = (): string => {
  return createElement(`<div>
    <h3>Hello! this is test page</h3>

    ${ComponentA('testA')}
    ${ComponentA('testB')}

    ${ComponentB(20)}
  </div>`);
}
import { createElement, WoowactNode } from '../core/VDOM';

export const App = (): WoowactNode => {
  return createElement(`<div>
    <h3>Hello! this is test component</h3>
    <ul id="list">
      <li key='1'>1</li>
      <li key='2'>2</li>
      <li key='3'>3</li>
      <li key='4'>4</li>
      <li key='5'>5</li>
    </ul>
  </div>`);
}
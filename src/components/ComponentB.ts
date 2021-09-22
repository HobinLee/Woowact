import { createElement, WoowactNode } from '../lib/woowact/core/VDOM';
import { getArrayN } from '../utils/array';

export const ComponentB = (length: number): WoowactNode => {
 
  const generateList = getArrayN(length).map(i => `<li key =${i}>${i}</li>`).join('');
  
  return createElement(`<div>
    <h3>ComponentB</h3>
    ${generateList}
  </div>`);
}
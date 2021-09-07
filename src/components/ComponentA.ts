import { createElement, WoowactNode } from '../lib/woowact/core/VDOM';

export const ComponentA = (text: string): WoowactNode => {
  return createElement(`<div>
    <h5>This is Component A ${text}</h5>
  </div>`);
}
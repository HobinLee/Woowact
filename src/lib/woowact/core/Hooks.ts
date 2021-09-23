import { updateRender, WoowactComponent, WoowactElement, WoowactNode } from "./VDOM";
import { renderWoowactElement } from './VDOM';

export const Woowact = (function(){
  let hooks: any[] = [];
  let idx: number = 0;
  let rootComponent: WoowactComponent;
  let $origin: WoowactElement;

  function useState<T> (initVaule: T): [T, (newValue: T) => void] {
    const state: T = hooks[idx] || initVaule;

    const _idx = idx;
  
    function setState(newValue: T) {
      hooks[_idx] = newValue;
      render();
    }

    idx ++;
    
    return [state, setState];
  }

  function render() {
    idx = 0;
    $origin = updateRender($origin, rootComponent());    
  }

  function renderDOM(appComponent: WoowactComponent) {
    rootComponent = appComponent;
    $origin = rootComponent();
    renderWoowactElement($origin, document.getElementById('App'));
  }

  return { useState, renderDOM }
}());
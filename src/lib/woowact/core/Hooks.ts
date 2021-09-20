import { WoowactNode } from "./VDOM";

export const Woowact = (function(){
  let hooks: any[] = [];
  let idx = 0;

  function useState<T> (initVaule: T): [T, (newValue: T) => void] {
    const state: T = hooks[idx] || initVaule;

    const _idx = idx;
  
    function setState(newValue: T) {
      hooks[_idx] = newValue;
    }

    idx ++;
    
    return [state, setState];
  }

  function render(node: WoowactNode) {
    idx = 0;
    return node;
  }

  return { useState, render }
}());
<<<<<<< HEAD
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

  return {useState, render}
}())
=======
export function useState<T> (initVaule: T): [() => T, (newValue: T) => void] {
  let _val: T = initVaule;

  function state(): T {
    return _val;
  }
  
  function setState(newValue: T) {
    _val = newValue;
  }
  
  return [state, setState];
}
>>>>>>> 027716d4f8a520decaa8591fb5604bc9ec2d48a2

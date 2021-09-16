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
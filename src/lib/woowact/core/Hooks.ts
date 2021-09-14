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

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return {
    click: () => setCount(count() + 1),
    render: () => console.log('render', { count: count()})
  }
}
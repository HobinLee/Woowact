export enum WNodeType {
  'div',
  'ul',
  'li',
  'span',
  'a',
  'article',
  'small',
}

export type VirtualDOM = {
  type: WNodeType;
  props: Props;
  children: VirtualDOM[];
};

export type Props = any;

export const createDOM = (
  type: WNodeType,
  props: Props,
  ...children: VirtualDOM[]
): VirtualDOM => {
  return {
    type,
    props,
    children,
  };
};

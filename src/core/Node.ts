export type VirtualDOM = {
  tag: string;
  props: Props;
  children: VirtualDOM[];
};

export type Props = any;

export const createDOM = (
  tag: string,
  props: Props,
  ...children: VirtualDOM[]
): VirtualDOM => {
  return {
    tag,
    props,
    children,
  };
};

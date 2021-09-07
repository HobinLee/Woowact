import Component from "./Component";
import { getTagName, parseJSX } from "./Parser";

type Key = string | number;

export type WoowactElement = {
  tag: string;
  attributes?: Attributes,
  children: WoowactNode[];
  key?: Key | null;
} | null;

export type WoowactText = string | number;

export type WoowactNode = WoowactElement | WoowactText | undefined;

export const $elements: {
  [key: string]: WoowactNode
} = {};
let i = 0;

export const createElement = (renderTemplate: string, components?: {
  [key: string]: Component | WoowactNode | undefined;
} ): string => {
  const $node = parseJSX(renderTemplate);
  const name = `component${i++}`;
  $elements[name] = $node;

  return `<${name} />`;
}

type AttributeKey = string;
type AttributeValue = string;

export type Attributes = Map<AttributeKey, AttributeValue>;

export const renderDOM = (nodeName: string, $el: HTMLElement | null) => {
  try {
    if (!$el) {
      throw Error('Cannot append HTML element to parent. Please check id or class of Element');
    }
    const $componentElement = changeToHTMLElement($elements[getTagName(nodeName)?.slice(0, -1) ?? '']);
    $componentElement && $el.appendChild($componentElement);
  } catch(e) {
    console.error(e);
    return null;
  }
}

const changeToHTMLElement = ($woowactNode: WoowactNode): Node | undefined => {
  if (!$woowactNode) return;

  if (typeof $woowactNode === 'string') {
    return document.createTextNode($woowactNode);
  }

  if (typeof $woowactNode === 'number') {
    return document.createTextNode($woowactNode.toString());
  }

  return createHTMLElement($woowactNode);
}

const createHTMLElement = ($woowactElement: WoowactElement): HTMLElement | undefined => {
  if (!$woowactElement) return;

  const $htmlElement = document.createElement($woowactElement?.tag);

  $woowactElement.attributes?.forEach((value, key) => $htmlElement.setAttribute(key, value))

  $woowactElement.children?.forEach($woowactNode => {
    const $node = changeToHTMLElement($woowactNode);
    $node && $htmlElement.appendChild($node);
  })

  return $htmlElement;
}

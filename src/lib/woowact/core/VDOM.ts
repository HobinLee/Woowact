import Component from "./Component";
import { getTagName, parseJSX } from "./Parser";

type Key = string | number;

export type WoowactElement = {
  tag: string;
  attributes?: Attributes,
  children: WoowactNode[];
  key?: Key | null;
  $el?: Node;
} | null;

export type WoowactText = string | number;

export type WoowactNode = WoowactElement | WoowactText | undefined;

export const $elements: {
  [key: string]: WoowactNode
} = {};
let i = 0;

export type WoowactComponent = () => WoowactElement;

export const createElement = (renderTemplate: string, components?: {
  [key: string]: Component | WoowactNode | undefined;
} ): string => {
  const $node = parseJSX(renderTemplate);
  const name = `component${i++}`;
  $elements[name] = $node;

  return `<${name} />`;
}

type EventHandler = (e: Event | null) => void;

type AttributeKey = string;
type AttributeValue = string | EventHandler;

export type Attributes = Map<AttributeKey, AttributeValue>;

export const renderDOM = (nodeName: string, $el: HTMLElement | null) => {
  try {
    if (!$el) {
      throw Error('Cannot append HTML element to parent. Please check id or class of Element');
    }
    const tagName = getTagName(nodeName)?.slice(0, -1) ?? '';
    
    const $componentElement = changeToHTMLElement($elements[tagName]);

    $componentElement && $el.appendChild($componentElement);
  } catch(e) {
    console.error(e);
    return null;
  }
}

export const reconciliation = ($old: WoowactElement, $new: WoowactElement): WoowactElement => {
  if (!$new) return $old;

  const $componentElement = changeToHTMLElement($new);
    
  if (!$old?.$el || !$componentElement) return $old;

  $new.$el = $componentElement;

  ($old.$el as HTMLElement).replaceWith($componentElement);

  return $new;
}

export const renderWoowactElement = (node: WoowactElement, $el: HTMLElement | null) => {
  try {
    if (!$el) {
      throw Error('Cannot append HTML element to parent. Please check id or class of Element');
    }
    if (!node) return;
    
    const $componentElement = changeToHTMLElement(node);
    
    if (!$componentElement) return;

    node.$el = $componentElement;

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

type Events = 'onclick' | 'onmousemove' | 'onchange' | 'oninput' | 'onmouseover'

const createHTMLElement = ($woowactElement: WoowactElement): HTMLElement | undefined => {
  if (!$woowactElement) return;

  const $htmlElement: HTMLElement = document.createElement($woowactElement?.tag);

  $woowactElement.attributes?.forEach((value, key) => {
    if(typeof value === 'string') {
      $htmlElement.setAttribute(key, value);
      return;
    }
    const event = checkEventHandler(key);
    event && ($htmlElement[event] = value);
  })

  $woowactElement.children?.forEach($woowactNode => {
    const $node = changeToHTMLElement($woowactNode);
    $node && $htmlElement.appendChild($node);
  })

  return $htmlElement;
}


const checkEventHandler = (attr: string): Events | null => {
  if(attr === 'onclick' ||
  attr === 'onmousemove' ||
  attr === 'onchange' ||
  attr === 'oninput' ||
  attr === 'onmouseover') return attr;

  return null;
}
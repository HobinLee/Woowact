import Component from "./Component";
import { parseJSX } from "./Parser";

type Key = string | number;

export type WoowactElement = {
  tag: string;
  attributes?: Attributes,
  children: WoowactNode[];
  key?: Key | null;
} | null;

export type WoowactText = string | number;

export type WoowactNode = WoowactElement | WoowactText | undefined;

export const createElement = (renderTemplate: string, components?: {
  [key: string]: Component | WoowactNode | undefined;
} ): WoowactElement | undefined => {
  
  return parseJSX(renderTemplate);
}

type AttributeKey = string;
type AttributeValue = string;

export type Attributes = Map<AttributeKey, AttributeValue>;

export const renderDOM = ($wNode: WoowactNode, $el: HTMLElement | null) => {
  try {
    if (!$el) {
      throw Error('Cannot append HTML element to parent. Please check id or class of Element');
    }
    const $componentElemet = changeToHTMLElement($wNode);
    $componentElemet && $el.appendChild($componentElemet);
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

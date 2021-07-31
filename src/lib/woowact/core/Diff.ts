import { getArrayN } from '../../../utils/array';

type TKeyElement = {
  [key: string]: Element;
};

const getAttNameList = (attributes: NamedNodeMap): string[] => {
  if (!attributes) {
    return [];
  }

  const attributeList: string[] = [];

  Array.prototype.forEach.call(attributes, (attr: Attr) => {
    attributeList.push(attr.nodeName);
  });

  return attributeList;
};

const replaceAttributes = ($origin: HTMLElement, $new: HTMLElement): void => {
  const attrNames: string[] = Array.from(
    new Set([
      ...getAttNameList($origin.attributes),
      ...getAttNameList($new.attributes),
    ]),
  );

  for (const attrName of attrNames) {
    const originAttr: string | null = $origin.getAttribute(attrName);
    const newAttr: string | null = $new.getAttribute(attrName);

    //add attribute when attribute is not exist in old element
    //replace attribute when attributes are differnet
    if (newAttr && (!originAttr || originAttr !== newAttr)) {
      $origin.setAttribute(attrName, newAttr);
      continue;
    }

    //remove attribute when attribute is not exist in new element
    if (originAttr && !newAttr) {
      $origin.removeAttribute(attrName);
      continue;
    }
  }
};

const replaceNodeValue = ($origin: HTMLElement, $new: HTMLElement): void => {
  if ($origin.nodeValue !== $new.nodeValue) {
    $origin.nodeValue = $new.nodeValue;
  }
};

const replaceChildren = ($origin: HTMLElement, $new: HTMLElement): void => {
  if ($origin.tagName === 'UL' || $origin.tagName === 'OL') {
    replaceByKeys($origin, $new);
    return;
  }

  replaceStartToEnd($origin, $new);
};

const getKeyNodes = ($element: HTMLElement): { [key: number]: Element } => {
  const keyNodes: TKeyElement = {};
  Array.from($element.children).forEach(child => {
    const key: string | null = (child as HTMLElement).getAttribute('key');

    if (!key) {
      console.error('child component must have key');
      return;
    }

    keyNodes[key] = child as HTMLElement;
  });
  return keyNodes;
};

const replaceByKeys = ($origin: HTMLElement, $new: HTMLElement) => {
  const $originKeyNodes: TKeyElement = getKeyNodes($origin);
  const newKeyArray = Array.from($new.children);

  $origin.innerHTML = '';

  newKeyArray.forEach(child => {
    const key: string | null = (child as HTMLElement).getAttribute('key');

    if (!key) {
      console.error('child component must have key');
      return;
    }

    if ($originKeyNodes[key]) {
      $origin.appendChild($originKeyNodes[key]);
    } else {
      $origin.appendChild(child);
    }
  });
};

const replaceStartToEnd = ($origin: HTMLElement, $new: HTMLElement) => {
  const $originChildren = Array.from($origin.childNodes);
  const $newChildren = Array.from($new.childNodes);

  const max = Math.max($originChildren.length, $newChildren.length);

  getArrayN(max).forEach((i: number) => {
    const $originChild = $originChildren[i];
    const $newChild = $newChildren[i];

    if ($originChild && !$newChild) {
      $originChild.remove();
      return;
    }

    if (!$originChild && $newChild) {
      $origin.appendChild($newChild);
      return;
    }

    reconciliation(
      $originChildren[i] as HTMLElement,
      $newChildren[i] as HTMLElement,
    );
  });
};

/**
 * reference - https://ko.reactjs.org/docs/reconciliation.html
 *
 * try using Heuristic algorithm
 *
 * @param $old (origin node)
 * @param $new (new node)
 * @returns $replacedElement
 */
const reconciliation = (
  $origin: HTMLElement,
  $new: HTMLElement,
): HTMLElement => {
  /**
    엘리먼트의 타입이 다른 경우

    두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다. <a>에서 <img>로, <Article>에서 <Comment>로, 혹은 <Button>에서 <div>로 바뀌는 것 모두 트리 전체를 재구축하는 경우입니다.

    트리를 버릴 때 이전 DOM 노드들은 모두 파괴됩니다. 컴포넌트 인스턴스는 componentWillUnmount()가 실행됩니다. 새로운 트리가 만들어질 때, 새로운 DOM 노드들이 DOM에 삽입됩니다. 그에 따라 컴포넌트 인스턴스는 UNSAFE_componentWillMount()가 실행되고 componentDidMount()가 이어서 실행됩니다. 이전 트리와 연관된 모든 state는 사라집니다.

    루트 엘리먼트 아래의 모든 컴포넌트도 언마운트되고 그 state도 사라집니다. 예를 들어, 아래와 같은 비교가 일어나면,
  **/
  if ($origin.tagName !== $new.tagName) {
    $origin.replaceWith($new);
    $origin.remove();
    return $new;
  }

  /*
   * Check attributes and replace it
   */
  replaceAttributes($origin, $new);

  replaceNodeValue($origin, $new);

  replaceChildren($origin, $new);

  return $origin;
};

export default { reconciliation };

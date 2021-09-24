import { getArrayN } from '../../../utils/array';
import { WoowactElement, changeToHTMLElement } from './VDOM';

const replaceAttributes = ($origin: WoowactElement, $new: WoowactElement): void => {
//   const originAttr: string[] = $origin?.attributes. ?? [];
//   const newAttr: st
//   const attrNames: string[] = Array.from(
//     new Set([
//       ...$origin?.attributes,
//       ...$new?.attributes,
//     ]),
//   );

//   for (const attrName of attrNames) {
//     const originAttr: string | null = $origin.getAttribute(attrName);
//     const newAttr: string | null = $new.getAttribute(attrName);

//     //add attribute when attribute is not exist in old element
//     //replace attribute when attributes are differnet
//     if (newAttr && (!originAttr || originAttr !== newAttr)) {
//       $origin.setAttribute(attrName, newAttr);
//       continue;
//     }

//     //remove attribute when attribute is not exist in new element
//     if (originAttr && !newAttr) {
//       $origin.removeAttribute(attrName);
//       continue;
//     }
//   }
};

const replaceChildren = ($origin: WoowactElement, $new: WoowactElement): void => {
  const max = Math.max($origin?.children.length || 0, $new?.children?.length || 0);

  getArrayN(max).forEach(i => {
    const $originChild = $origin?.children[i];
    const $newChild = $new?.children[i];
    
    if($originChild && !$newChild) {
      //origin Child 지우기
      //$originChild.remove();
      return;
    }

    if (!$originChild && $newChild) {
      //origin에 추가하기
      //$origin.appendChild($newChild);
      return;
    }

    reconciliation(
      $origin?.children[i] as WoowactElement,
      $new?.children[i] as WoowactElement,
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
export const reconciliation = (
  $origin: WoowactElement,
  $new: WoowactElement,
): WoowactElement => {
  if (!$origin || !$new) {
    return $origin;
  }
  /**
    엘리먼트의 타입이 다른 경우

    두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다. <a>에서 <img>로, <Article>에서 <Comment>로, 혹은 <Button>에서 <div>로 바뀌는 것 모두 트리 전체를 재구축하는 경우입니다.

    트리를 버릴 때 이전 DOM 노드들은 모두 파괴됩니다. 컴포넌트 인스턴스는 componentWillUnmount()가 실행됩니다. 새로운 트리가 만들어질 때, 새로운 DOM 노드들이 DOM에 삽입됩니다. 그에 따라 컴포넌트 인스턴스는 UNSAFE_componentWillMount()가 실행되고 componentDidMount()가 이어서 실행됩니다. 이전 트리와 연관된 모든 state는 사라집니다.

    루트 엘리먼트 아래의 모든 컴포넌트도 언마운트되고 그 state도 사라집니다. 예를 들어, 아래와 같은 비교가 일어나면,
  **/
  if ($origin?.tag !== $new?.tag) {
    //$origin.unmount();
    const $el = changeToHTMLElement($new);
    $el && ($origin.$el as HTMLElement).replaceWith($el);
    return $new;
  }

  /*
   * Check attributes and replace it
   */
  replaceAttributes($origin, $new);

  replaceChildren($origin, $new);

  return $origin;
};

export default { reconciliation };

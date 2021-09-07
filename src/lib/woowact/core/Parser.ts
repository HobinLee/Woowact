import { Attributes, WoowactElement, WoowactNode } from "./VDOM";

const checkCloseTag = (tagName: string) => {
  return tagName[0] === '/';
};

const checkSelfCloseTag = (tagName: string) => {
  return tagName.indexOf('/') >= 0;
};

const parseHTML = (markup: string) => {
  const htmlRegex = /<("[^"]*"|'[^']*'|[^'">])*>|[^<>]*/gi;

  const matches = markup.match(htmlRegex);

  return matches?.map(res => res.trim()).filter(res => res !== '');
};

export const parseJSX = (markup: string): WoowactElement | undefined => {
  const htmlStack: WoowactElement[] = [];

  const getLastTag = (): WoowactElement => {
    return htmlStack[htmlStack.length - 1];
  };

  try {
    const controlNonCloseTag = (tag: string, tagName?: string) => {
      // textNode일 때
      if (!tagName) {
        getLastTag()?.children.push(tag);
        return;
      }

      // </aaa> 같이 close tag 인지 확인
      if (!checkCloseTag(tagName)) {
        const $wElement: WoowactElement = {
          tag: tagName,
          attributes: parseAttributes(tag),
          children: []
        }

        getLastTag()?.children.push($wElement);
        htmlStack.push($wElement);
      }
    };

    const controlCloseTag = (tagName: string) => {
      if (checkSelfCloseTag(tagName)) {
        //console.log(tagName.replace('/', ''), getLastTag()?.tag);
        //닫는 태그가 열려있는 태그와 일치하는지 확인하기!

        if (tagName.replace('/', '') !== getLastTag()?.tag) {
          throw new Error(`클로징 태그가 없습니다. ${getLastTag()?.tag}`);
        }

        if (htmlStack.length === 1) {
           return (htmlStack[0]);
        }

        htmlStack.pop();
      }
    };

    const tags = parseHTML(markup);

    if (!tags) {
      throw new Error('HTML 파싱에 실패했습니다. 마크업을 다시 확인 해주세요');
    }

    tags.forEach(tag => {
      const tagName = getTagName(tag);

      controlNonCloseTag(tag, tagName);

      tagName && controlCloseTag(tagName);
    });


    console.log(htmlStack);

    return htmlStack[0];
  } catch (e) {
    console.error(e);
    //cb(null);
  }
};

/***
 * @param {string} tag - <tag class="class1 class2" id = "id"> 형식
 *
 * attributes: Map<string,string> {
 *    "class": "class1 class2",
 *    "id": "id"
 * } 맵으로 파싱하는 함수
 */
const parseAttributes = (tag: string): Attributes | undefined => {
  const regex = /(\S*)[ ]*=[ ]*((?:\"([^"]+)\")|(?:\'([^']+)\'))/gi;``
  const attributes = tag.match(regex);
  
  if (!attributes) return;

  let attributeMap = new Map<string, string>();
  attributes.forEach((attribute) => {
    const newAttr = parseAttribute(attribute);
    
    if (!newAttr) return;

    attributeMap.set(newAttr.key, newAttr.value);
  });

  return attributeMap;
};

type Attribute = {
  key: string,
  value: string
}
/***
 * @param {string} attribute - 'class="class1 class2"' 형식을
 * Attribute {
 *    key: 'class',
 *    value: 'class1 class2'
 * } 오브젝트로 바꿔주는 함수
 */

const parseAttribute = (attribute: string): Attribute | undefined => {
  const ATTRIBUTE_KEY = 1;
  const ATTRIBUTE_VALUE = 2;
  const ATTRIBUTE_NOT_EXIST = 3;

  try {
    const regex = /(\S*)[ ]*=[ ]*(?:(?:\"(.+)\")|(?:\'(.+)\'))/gi;
    const res = regex.exec(attribute);

    if (!res || res.length < 1) {
      throw new Error(`어트리부트 에러! ${attribute}`);
    }

    return {
      key: res[ATTRIBUTE_KEY],
      value: res[ATTRIBUTE_VALUE] ?? res[ATTRIBUTE_NOT_EXIST]
    };
  } catch (e) {
    console.error(e);
  }
};

/***
 * @param {string} markup - <tag class="class1 class2" id = "id">
 * 형식의 마크업에서 innerText, closing tag, self closing tag등을 체크해서 tag name 반환
 *
 * innertText: tadfsasd
 */
export const getTagName = (markup: string): string | undefined => {
  try {
    const getCloseTagName = () => {
      const regexResult = /<(\/\w+).*/gi.exec(markup);

      if (!regexResult || regexResult.length < 1) {
        throw new Error(`Error: 올바른 입력 양식이 아닙니다. ${markup}`);
        return '';
      }

      return regexResult[1];
    };

    const getCommonTagName = () => {
      const regexResult = /<(\w+).*/gi.exec(markup);

      if (!regexResult || regexResult.length < 1) {
        throw new Error(`Error: 올바른 입력 양식이 아닙니다. ${markup}`);
      }

      const tagName = regexResult[1];

      //셀프 closing 태그 이름(ex. img/)으로 반환
      if (checkSelfCloseTag(markup)) {
        return tagName + '/';
      }

      return tagName;
    };

    if (markup[0] !== '<') {
      return;
    }
    if (markup[1] === '/') {
      return getCloseTagName();
    }

    return getCommonTagName();
  } catch (e) {
    console.error(e);
    return '';
  }
};

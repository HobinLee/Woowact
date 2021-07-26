import { createDOM, Props, VirtualDOM } from './Node';

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

export const parseJSX = (markup: string, cb: Function) => {
  const htmlStack: VirtualDOM[] = [];

  const getLastTag = (): VirtualDOM => {
    return htmlStack[htmlStack.length - 1];
  };

  try {
    const controlNonCloseTag = (tag: string, tagName: string) => {
      // </aaa> 같이 close tag 인지 확인
      if (!checkCloseTag(tagName)) {
        const props =
          tagName === 'txt/' ? { innerText: tag } : parseProperties(tag);
        const newDOM = createDOM(tagName.replace('/', ''), props);

        getLastTag()?.children.push(newDOM);
        htmlStack.push(newDOM);
      }
    };

    const constrolCloseTag = (tagName: string) => {
      if (checkSelfCloseTag(tagName)) {
        console.log(tagName.replace('/', ''), getLastTag().tag);
        //닫는 태그가 열려있는 태그와 일치하는지 확인하기!
        if (tagName.replace('/', '') !== getLastTag().tag) {
          throw new Error(`클로징 태그가 없습니다. ${getLastTag().tag}`);
        }

        if (htmlStack.length === 1) {
          cb(htmlStack[0]);
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
      if (tagName === '') return null;

      controlNonCloseTag(tag, tagName);

      constrolCloseTag(tagName);
    });
  } catch (e) {
    console.error(e);
    cb(null);
  }
};

/***
 * @param {string} tag - <tag class="class1 class2" id = "id"> 형식
 *
 * props {
 *    class: "class1 class2",
 *    id: "id"
 * } 오브젝트로 파싱하는 함수
 */
const parseProperties = (tag: string): Props => {
  const regex = /(\S*)[ ]*=[ ]*((?:\"([^"]+)\")|(?:\'([^']+)\'))/gi;
  const properties = tag.match(regex);

  let props = {};

  if (properties) {
    properties.forEach((property: Props) => {
      props = { ...props, ...parseProperty(property) };
    });
  }

  return props;
};

/***
 * @param {string} property - 'class="class1 class2"' 형식을
 * props {
 *    class: "class1 class2",
 * } 오브젝트로 바꿔주는 함수
 */
const parseProperty = (property: string): Props => {
  try {
    const regex = /(\S*)[ ]*=[ ]*(?:(?:\"(.+)\")|(?:\'(.+)\'))/gi;
    const res = regex.exec(property);
    const props: Props = {};

    if (!res || res.length < 1) {
      throw new Error(`프로퍼티 에러! ${property}`);
    }

    props[res[1]] = res[2] ?? res[3];

    return props;
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
const getTagName = (markup: string) => {
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
      return 'txt/';
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

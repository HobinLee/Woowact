import { parseJSX } from './core/Parser';
import './styles/index.scss';

const root = document.getElementById('root');

const num: Number = 10;
const str: string = 'a';

if (root) {
  parseJSX(
    `
    <html id='hello' class='test1 test2'>hello<header></header>
      <body>
        <div>자기소개</div>
        <img src ='https://www.naver.com'/>
        <ul>
          <li>안녕</li>
          <li>나는</li>
          <li>호빈이야</li>
        </ul>
      </body>
    </html>
    `,
    ($dom: any) => console.log($dom),
  );
}

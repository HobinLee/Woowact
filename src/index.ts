import './styles/index.scss';

const root = document.getElementById('root');

const num: Number = 10;
const str: string = 'a';

if (root) {
  console.log(
    num + str + num + str + num + str + num + str + num + str + num + str,
  );
  root.innerHTML = '웹팩 설정하기! 테스트중';
}

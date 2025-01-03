Day 1 셋팅하기
참고 : 베이직반 10회차 (2024/11/22)
- Next.js의 폴더로 경로 지정하는 것과 헷갈림

Day 2 layout
참고 :
- 색상 대비 사이트 : https://color.adobe.com/ko/create/color-wheel
- 색상 대비 사이트2 : https://webaim.org/resources/contrastchecker/
min-h-full vs min-h-screen
full은 부모태그 기준으로 100% 채움(예: 부모태그의 h가 100px 이면 100px의 100%)
screen은 부모태그 관계없이 100vh(view height) 즉, 보이는 화면 전체를 꾸밀 수 있음
모든 페이지에 색을 주는 방법
1) main.tsx에서 App을 div 태그로 한 번 더 감싸서 className으로 모든 페이지에 색을 주는 방법
2) index.css 에서 body{} 안에 @apply를 사용해서 tailwind 언어를 사용하게 만든 후 색을 주는 방법

tailwind 커스텀 색 넣고 사용하는 방법 배움
tailwind.config.js 에 extend:{} 안에 colors:{} 안에 내가 사용할 색 이름을 만들어서 값을 지정해주고 그 색 이름을 사용하면 된다!!!

Day 3 SignUp
참고 : 베이직반 8회차 (2024/11/18) - 회원가입


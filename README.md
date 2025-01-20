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
트러블 슈팅
회원가입은 됐는데 supabase에 유저 데이터가 안 들어감
supabase로 회원가입 할 때 닉네임도 사용해야할 때 즉, 아이디와 비밀번호 외에 추가할 때 로직을 검색해서 찾았음
const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: { nickname },
      }
    );
외국인이 작성한 로직이었는데 자세히 보니 However, there is not documentation about it. 라고... 
튜터님의 라이브 코딩으로 공식문서에 있는 방법으로 고침 공식문서 짱!

회원가입 기능을 구현했는데 오류가 뜸 supabase에 users 오타로 인해 undefined 가 뜨다가 고쳤더니 다시
null value in column "img_url" of relation "users" violates not-null constraint
이런 오류가 뜸 유저스에 이미지 콜롬이 널 값이기 때문에 안된다 라는 것 하지만 회원가입시 이미지를 넣지 않기 때문에 supabase설정에서 널 값을 허용토록 변경해야한다
supabase public-users 콜롬 설정에서 Allow Nullable 체크를 안해서 이런 오류가 떴었음 -> 체크를 해서 이미지 값이 null 이어도 가능함을 설정해주었음

css width, height 값을 정할 때 부모태그에서 너비를 지정해야 그 안에서 조절할 수 있다는 걸 아는데 잘 안돼서 문제점을 찾아보니 tailwind는 공식문서에 나와있는 값만 사용할 수 있음 공식문서에 없는 값을 사용하고 싶을 땐 대괄호[]를 사용해서 그 안에 값을 넣어서 사용하면 된다.!!!! ex w-[500px]

Day 4 login
supabase.auth.onAuthStateChange
실시간 인증상태 감지 - 사용자가 로그인 / 로그아웃하거나 세션이 갱신될 때 이벤트 감지
UI 동기화 - 인증 상태에 따라 화면(UI)을 업데이트하여 사용자 경험을 개선
자동 세션 관리 - 세션이 만료되었거나 로그아웃된 경우, 자동으로 사용자 상태를 감지하고 리다이렉트할 수 있음
> 이 로직은 login 페이지에서만 사용가능한 로직.

트러블 슈팅
로그인 로직을 짰는데 뭐가 문제인지 모르겠음 회원가입한 정보를 가져다가 로그인을 했는데 로그인이 실패했다고 뜸
supabase > Authentication > Providers > Confirm Email 체크 풀어서 해결
Confirm Email이 이메일 인증해야 회원가입이 완료가 되는 그것!

면접 카타
Q1. Javascript에 비해 Typescript의 장점은 무엇이라고 생각하시나요?
A1. 컴파일을 통해 코드의 오류를 사전에 방지할 수 있고, 코드의 가독성과 유지보수성을 향상 시킬 수 있습니다. 또한 타입이 지정되면 변수나 함수의 자동 완성을 통해 생산성을 높이고 코드의 안정성을 향상 시킵니다.
왜 코드 가독성과 유지 보수성을 향상 시킬 수 있는지???


Q2. MPA(Multi Page Application)에 비해 SPA(Single Page Application)의 장단점에 대해서 설명해주세요.
A2. SPA의 장점은 빠른 속도, 개발 간소화. 단점으로는 초기 구동 속도, 검색엔진 최적화 이슈, 보안 문제가 있습니다.
속도는 전반적인 사용자 경험을 향상시키는데 중요한 요소입니다. 전체 페이지를 렌더링하지 않고 변경되는 부분만울 갱신하므로 새로고침이 발생하지 않아 네이티브앱과 유사한 사용자 경험을 제공합니다. 개발 간소화는 서버에서 페이지를 렌더링하기 위해 코드를 작성할 필요가 없습니다. SPA는 보다 "현대적인" 것으로 간주되며 오늘날의 민첩한 개발 요구 사항에 적합합니다.
SPA는 웹 애플리케이션에 필요한 모든 정적 리소스를 최초 접근시 단 한번 다운로드하기 때문에 초기 구동 속도가 상대적으로 느립니다. SPA는 JavaScript로 구축됩니다.(CSR 방식) 자바스크립트를 읽지 못하는 검색엔진에 대해서 크롤링이 되지않아 색인이 되지 않는 문제가 발생할 수 있습니다.
XSS(교차 사이트 스크립팅)로 인해 공격자가 다른 사용자가 웹 응용 프로그램에 클라이언트 측 스크립트를 삽입할 수 있는 위험이 있습니다.
- 초기 구동 속도라든지, 보안이 왜 문제인지 더 구체적으로
페이지를 이동할 때 필요한 부분 갱신
초기 로딩속도는 느리지만 페이지 이동시 빠름

Day 7 250109 Detail UI
컴포넌트로 분리하는 와중에 
'Comment'은(는) JSX 구성 요소로 사용할 수 없습니다.
  해당 '() => void' 형식은 올바른 JSX 요소 형식이 아닙니다.
    '() => void' 형식은 '(props: any, deprecatedLegacyContext?: any) => ReactNode' 형식에 할당할 수 없습니다.
      'void' 형식은 'ReactNode' 형식에 할당할 수 없습니다.
라는 오류가 뜬다. 찾아봐도 나와 같은 문제로 인한 오류는 없기에 다시 잘 찾아보았다.
Comment.tsx를 다시 잘 보았다. 평소에는 rafce와 같은 자동완성으로 만들었는데 이번에는 일일이 만들어보느라 함수 안에 return을 빼먹었다.
설마 이것 때문인가? 하고 리턴을 줘 봤더니 잘 되었다... 매우 기본적인 문제라 트러블 슈팅이라고 하기에도 뭐하지만... 그럼에도 남겨본다 나같은 사람은 없길 바라면서ㅜ

Day 8 250110 Create & Update UI
CSS 너무 어렵고 헷갈린다 내가 하고 싶은 정렬은 한 태그 안에 있는 것들을 한번에 중앙 정렬시키고자 할 때
flex-row 일 경우 justify-center를 사용하면 된다.
flex-col 일 경우 text-align: center;을 사용하면 된다. (tailwind언어로 text-center)
이게 flex-row 일 때와 flex-col 일 때의 기준이 달라버려서 그거에 맞는 정렬을 둬야한다.

재사용성
너무 어렵다

Day 9 250113 Tanstack Query1
Feed.tsx에서 data.map is not a function 이라는 오류 발생
검색해보니 X.map()은 배열 메서드인데 그렇다면 X는 배열이 아니다
console.log로 찍어보니 역시나 data는 배열이 아니였고 data를 가져온 Api에서 res를 console로 찍어보니
여기서부터 문제였다. 즉, Api를 가져오는 함수부터가 잘못되었다.
const res = await instance.get("/posts");
문제. axios로 사용함 즉, 불러오는 방법부터 잘못됨
해결. supabase로 제대로 불러오기 (supabase.from().select()) > useQuery로 사용하기
사용방법을 제대로 숙지할 것. 코드 제대로 사용할 것

Day 10 250114 Tanstack Query2

Day 11 250115 상세 페이지 데이터 불러오기
참고 : 베이직 10회 차 수업 - 상세 페이지 이동하기
useParams 에서 id는 string | undefined 인데
내가 지정한 타입은 string이다. 따라서 에러가 나는데 이를 해결하기 위해서
강제로 타입 지정하거나 (id!) id가 없을리가 없어!! - 권장하지 않음
에러를 줘서 해결하는 방법이 있다

Day 12 250116 
오류 발생 : React Hook "useQuery" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?

isLoading 대신 isPending 사용하기

Day 13 250117 mutation1
참고 : 베이직반 12회차 수업 - react-query로 서버 상태 관리하기

Day 14 250120 mutation2
props로 주는거 잊지 말기!







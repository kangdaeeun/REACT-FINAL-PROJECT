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

회원가입 기능을 구현했는데 오류가 뜸 supabase에 users 오타로 인해 undefind 가 뜨다가 고쳤더니 다시
null value in column "img_url" of relation "users" violates not-null constraint
이런 오류가 뜸 유저스에 이미지 콜롬이 널 값이기 때문에 안된다 라는 것 하지만 회원가입시 이미지를 넣지 않기 때문에 supabase설정에서 널 값을 허용토록 변경해야한다
supabase public-users 콜롬 설정에서 Allow Nullable 체크를 안해서 이런 오류가 떴었음 -> 체크를 해서 이미지 값이 null 이어도 가능함을 설정해주었음

css width, height 값을 정할 때 부모태그에서 너비를 지정해야 그 안에서 조절할 수 있다는 걸 아는데 잘 안돼서 문제점을 찾아보니 tailwind는 공식문서에 나와있는 값만 사용할 수 있음 공식문서에 없는 값을 사용하고 싶을 땐 대괄호[]를 사용해서 그 안에 값을 넣어서 사용하면 된다.!!!! ex w-[500px]
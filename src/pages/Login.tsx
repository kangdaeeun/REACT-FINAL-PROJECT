import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // useEffect 내에서 외부 데이터 조회(API 요청)
  useEffect(() => {
    // 사용자가 로그인, 로그아웃, 세션 갱신 등의 작업을 하면 이 메서드가 호출됨
    // 콜백 함수로 _event, session 을 받음 (session에는 사용자 정보와 토큰이, _event는 SIGNED_IN, SIGNED_OUT등 이벤트의 종류를 나타냄)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN") {
        alert("사용자가 로그인 했습니다.");
      } else if (_event === "SIGNED_OUT") {
        alert("사용자가 로그아웃했습니다.");
      } else if (_event === "USER_UPDATED") {
        alert("사용자 정보가 업데이트 되었습니다.");
      }
      // session이 존재하면 setUser(session.user)을 호출하여 사용자 정보를 user 상태에 저장
      // 세션이 없으면(로그아웃된 경우) setUser(null)로 사용자 상태를 초기화
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    // 컴포넌트가 언마운트될 때 구독을 해제하여 메모리 누수를 방지(이는 리액트의 클린업 함수로, 불필요한 인증 상태 감지를 막는 역할)
    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data.user);

    //유효성 검사
    if (!email || !password) {
      alert("빈칸을 모두 채워주세요");
      return;
    }

    if (email.includes("@") === false) {
      alert("아이디는 이메일 형식으로 입력해주세요");
      return;
    }

    // 클라이언트 사이드 유효성 검사
    // if (!validateEmail(email)) {
    //   alert("유효한 이메일 주소를 입력하세요");
    //   return;
    // }
    // if (!validatePassword(password)) {
    //   alert("비밀번호는 8자 이상입니다.");
    //   return;
    // }

    if (error) {
      alert(`로그인에 실패했습니다. ${error.message}`);
      return;
    }

    alert("로그인 성공");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold">Login</div>
      <div className="p-1 m-1 w-3/4 h-2/3 border-2 rounded border-selected-white">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center w-full h-full"
        >
          <div className="flex flex-col gap-2 w-[300px]">
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="text"
              placeholder="email"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="password"
              placeholder="password"
              value={password}
              onChange={onChangePassword}
            />
            <p className="flex ">
              <button
                type="submit"
                className="className=py-2 px-4 bg-blue-400 rounded-md text-selected-white hover:bg-gray-mint"
              >
                LOGIN
              </button>
            </p>
          </div>
        </form>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="className=py-2 px-4 bg-red-400 rounded-md text-selected-white hover:bg-black-blue"
          >
            BACK
          </button>
          <Link to="../signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

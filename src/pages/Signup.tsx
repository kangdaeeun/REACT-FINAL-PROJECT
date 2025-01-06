import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const Signup = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const signUpNewUser = async (e: FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    e.preventDefault();

    // 유효성 검사
    if (!nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (nickname.length <= 2) {
      alert("닉네임은 3글자 이상이어야 합니다");
      return;
    }

    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email)) {
      alert("이메일 형식이 올바르지 않습니다");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다");
      return;
    }

    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    // 1. supabase 회원가입
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      alert(`회원가입에 실패했습니다. ${error.message}`);
      return;
    }

    // 2. users 테이블에도 넣어준다
    const { error: userError } = await supabase.from("users").insert({
      id: data.user?.id,
      email: email,
      nickname: nickname,
    });

    if (userError) {
      alert(`유저 생성에 실패했습니다. ${userError.message}`);
      return;
    }

    alert("회원가입에 성공했습니다");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold">SignUp</div>
      <div className="p-1 m-1 w-3/4 h-2/3 border-2 border-solid rounded border-selected-white">
        <form
          onSubmit={signUpNewUser}
          className="flex items-center justify-center w-full h-full"
        >
          <div className="flex flex-col gap-2 w-[300px]">
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={onChangeNickname}
              required
            />
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="text"
              placeholder="email"
              value={email}
              onChange={onChangeEmail}
              required
            />
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="password"
              placeholder="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="password"
              placeholder="check password"
              value={checkPassword}
              onChange={onChangeCheckPassword}
              required
            />
            <p className="flex justify-around">
              <button
                className="className=py-2 px-4 bg-blue-400 rounded-md text-black hover:bg-selected-white"
                type="submit"
              >
                SIGN UP
              </button>
              <Link
                to="/"
                className="className=py-2 px-4 bg-gray-mint rounded-md text-black hover:bg-selected-white"
              >
                BACK
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import { ChangeEvent, FormEvent, useState } from "react";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유효성 검사
    if (!email) {
      alert("이메일을 입력해 주세요");
      return;
    }

    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email)) {
      alert("이메일 형식이 올바르지 않습니다");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해 주세요");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다");
      return;
    }

    // supabase 로그인
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`로그인에 실패했습니다. ${error.message}`);
      return;
    }

    alert("로그인 성공");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="p-1 m-1 w-3/4 h-2/3 border-2 rounded border-selected-white">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center w-full h-full"
        >
          <div className="flex flex-col gap-2 w-[300px]">
            <input
              className="border-2 border-gray-mint rounded-md p-2 hover:border-black-blue hover:border-2"
              type="email"
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
            <p className="flex justify-center gap-x-5">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-400 rounded-md text-selected-white hover:bg-gray-mint"
              >
                LOGIN
              </button>
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 items-center justify-center bg-red-400 rounded-md text-selected-white hover:bg-black-blue"
              >
                BACK
              </button>
              <Link to="/signup" className="py-2 px-4 bg-gray-mint rounded-md text-selected-white hover:bg-black-blue">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

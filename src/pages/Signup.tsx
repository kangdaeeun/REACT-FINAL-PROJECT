import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const Signup = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [user, setUser] = useState(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const signUpNewUser = async (e) => {
    // 새로고침 방지
    e.preventDefault();

    // 유효성 검사
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(email)) {
      alert("이메일 형식이 올바르지 않습니다");
    }

    if (nickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (checkPassword === "") {
      alert("비밀번호 확인을 입력해주세요");
      return;
    }

    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: { nickname },
      }
    );
    console.log("signup: ", { data, error });
    setUser(data.user);

    setNickname("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
  };

  const onSignup = () => {
    if(signUpNewUser()) {
      alert('회원가입이 완료되었습니다')
    }
    navigate("/");
  };

  return (
    <form onSubmit={signUpNewUser}>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={onChangeNickname}
      />
      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={onChangeEmail}
      />
      <input
        type="text"
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
      />
      <input
        type="text"
        placeholder="비밀번호 확인"
        value={checkPassword}
        onChange={onChangeCheckPassword}
      />
      <button onClick={onSignup}>회원가입</button>
    </form>
  );
};

export default Signup;

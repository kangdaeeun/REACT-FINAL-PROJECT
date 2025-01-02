import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <section>
      <nav className="flex justify-between">
        <span>
          <button onClick={() => navigate("/")}>
            <img src="1.png">1</img>
          </button>
        </span>
        <span>
          Mypage
          {/* {!user ? (
            <>
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/mypage")}>마이페이지</button>
              <button onClick={() => navigate("/")}>로그아웃</button>
            </>
          )} */}
        </span>
      </nav>
    </section>
  );
};

export default Header;

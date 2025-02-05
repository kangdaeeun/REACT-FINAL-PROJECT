import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import useAuthStore from "../stores/useAuthStore";

const Header = () => {
  // 전
  // const { user } = useAuthStore();
  // 후
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    // 전
    // await supabase.auth.signOut();
    // 후
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`로그아웃에 실패했습니다. ${error.message}`);
    }

    alert("로그아웃 되었습니다");
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <section>
      <nav className="flex justify-between bg-black-blue p-1 border-b items-center">
        <span>
          <button
            className="w-16 h-16 border-2 border-selected-white rounded-full items-center hover:bg-gray-mint"
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="logo" />
          </button>
        </span>
        <span className="flex gap-2 items-center">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn-head hover:bg-gray-mint"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn-head hover:bg-gray-mint"
              >
                SignUp
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/mypage")}
                className="text-sm text-selected-white hover:text-black"
              >
                {user.nickname}
              </button>
              <button
                onClick={handleLogout}
                className="btn-head hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}
        </span>
      </nav>
    </section>
  );
};

export default Header;

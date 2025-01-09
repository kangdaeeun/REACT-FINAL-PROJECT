import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import useAuthStore from "../stores/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();

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
                className="text-sm text-selected-white border border-selected-white rounded-lg px-4 py-2 font-medium hover:bg-gray-mint"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-sm text-selected-white border border-selected-white rounded-lg px-4 py-2 font-medium hover:bg-gray-mint"
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
                className="text-sm text-selected-white border border-selected-white rounded-lg px-4 py-2 hover:bg-red-500 font-medium"
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

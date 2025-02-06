import { useEffect } from "react";
import supabase from "../utils/supabase";
import useAuthStore from "../stores/useAuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session && session.user.email) {
        // user 테이블에서 가져와서 넣는다.
        supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .then(({ data, error }) => {
            if (error || !data?.length) {
              setUser(null);
              return;
            }

            setUser({
              id: data[0].id,
              email: data[0].email,
              nickname: data[0].nickname,
              img_url: data[0].img_url,
            });
          })
      } else {
        setUser(null);
      }
    });
  }, [setUser]);
  return <>{children}</>;
};

export default AuthProvider;

import supabase from "../utils/supabase";

// 데이터 가져오기
export const fetchPosts = async () => {
  const res = await supabase.from("feeds").select("*")
  return res.data;
};


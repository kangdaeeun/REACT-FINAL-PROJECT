import supabase from "../utils/supabase";

// 데이터 가져오기
export const getFeeds = async () => {
  const { data, error } = await supabase.from("feeds").select("*");
  if (error) {
    throw new Error(`feed 데이터를 조회 하는 중 에러가 발생했습니다. ${error.message}`)
  }
  return data;
};

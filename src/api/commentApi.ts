import supabase from "../utils/supabase";

export const getComments = async () => {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) {
    throw new Error(
      `comment 조회하는 중 에러가 발생했습니다. ${error.message}`
    );
  }
  return data;
};

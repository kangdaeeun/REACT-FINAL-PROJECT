import supabase from "../utils/supabase";

export const getUpVotes = async () => {
  const { data, error } = await supabase.from("upVotes").select("*");
  if (error) {
    throw new Error(
      `upvote 조회 하는 중 에러가 발생했습니다. ${error.message}`
    );
  }
  return data;
};

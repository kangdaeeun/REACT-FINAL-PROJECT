import supabase from "../utils/supabase";

// 데이터 가져오기
export const getFeeds = async () => {
  const { data, error } = await supabase.from("feeds").select("*");
  if (error) {
    throw new Error(
      `feed 데이터를 조회 하는 중 에러가 발생했습니다. ${error.message}`
    );
  }
  return data;
};

export const getFeedById = async (id: string) => {
  const { data, error } = await supabase.from("feeds").select("*").eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  if (data.length === 0) {
    throw new Error("해당 글이 존재하지 않습니다.");
  }
  return data[0];
};

// feed 추가
export const addFeed = async ({
  userId,
  content,
  title,
}: {
  userId: string;
  content: string;
  title: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .insert({ user_id: userId, content, title });

  if (error) {
    throw new Error(`게시글 추가하는데 에러가 발생했습니다. ${error.message}`);
  }
};

// feed 수정
export const updateFeed = async ({
  id,
  content,
  title,
}: {
  id: string;
  content: string;
  title: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .update({ content, title })
    .eq("id", id);

  if (error) {
    throw new Error(`게시글 수정하는데 에러가 발생했습니다. ${error.message}`);
  }
};

// feed 삭제
export const deleteFeed = async (id: string) => {
  const { error } = await supabase.from("feeds").delete().eq("id", id);

  if (error) {
    throw new Error(`게시글 삭제하는데 에러가 발생했습니다. ${error.message}`);
  }
};

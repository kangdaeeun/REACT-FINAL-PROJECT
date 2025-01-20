import supabase from "../utils/supabase";

export const getCommentsCount = async (feedId: string) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) {
    throw new Error("댓글 조회 실패");
  }
  return count;
};

export const getCommentsByFeedId = async (feedId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select(`*, user: user_id(id, email, nickname, img_url)`)
    .eq("feed_id", feedId);
  if (error) throw new Error("댓글 조회 실패");
  return data;
};

// 댓글 추가하기
export const addComment = async ({
  feedId,
  userId,
  content,
  createdAt,
}: {
  feedId: string | undefined;
  userId: string | undefined;
  content: string;
  createdAt: number;
}) => {
  const { error } = await supabase
    .from("comments")
    .insert({
      feed_id: feedId,
      user_id: userId,
      content: content,
      created_at: createdAt,
    });
  if (error) throw new Error(`댓글 추가 실패: ${error.message}`);
};

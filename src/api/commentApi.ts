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

// 댓글 추가하기 (시간은 실시간으로 적용되게 설정해서 안 써도 됨)
export const addComment = async ({
  feedId,
  userId,
  content,
}: {
  feedId: string;
  userId: string;
  content: string;
}) => {
  const { error } = await supabase.from("comments").insert({
    feed_id: feedId,
    user_id: userId,
    content,
  });
  if (error) throw new Error(`댓글 추가 실패: ${error.message}`);
};

// 댓글 삭제
export const deleteComment = async (id: string) => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) throw new Error(`댓글 삭제 실패: ${error.message}`);
    alert("댓글이 삭제 되었습니다.");
  }
};

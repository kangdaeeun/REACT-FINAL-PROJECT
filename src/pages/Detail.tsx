import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { getFeedById } from "../api/feedApi";
import { getCommentsByFeedId } from "../api/commentApi";
import { getUpvotesByFeedId, toggleUpvote } from "../api/upvoteApi";
import { FaAngleUp, FaCommentDots } from "react-icons/fa";
import useAuthStore from "../stores/useAuthStore";

const Detail = () => {
  // 주소에 있는 id 가져오기
  const { id } = useParams();
  const { user } = useAuthStore();

  // id를 이용하여 api 요쳥하기
  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds", id],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getFeedById(id);
    },
  });

  // 게시글의 id가 일치하는 댓글들을 가져온다.
  const { data: comments, isLoading: isCommnetsLoading } = useQuery({
    // 이름표
    // 리액트 쿼리 개발자들이 이 이름표 이용 > 캐싱(임시저장)
    queryKey: ["feeds", id, "comments"],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getCommentsByFeedId(id);
    },
  });

  // 1. 좋아요 데이터 가져오기
  const { data: upvotes, isLoading: isUpvotesLoading } = useQuery({
    queryKey: ["upvotes", id],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getUpvotesByFeedId(id);
    },
  });

  // 2. 내가 좋아요 했는지 확인
  const isUpvotedByMe = upvotes?.some((upvote) => upvote.user_id === user?.id);

  // useQueryClient로 queryClient 변수 생성
  const queryClient = useQueryClient();
  // 3. 좋아요 추가 혹은 삭제
  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert("로그인 후 이용해주세요");
        return;
      }

      if (data.user_id === user.id) {
        alert("자추 금지");
        return;
      }
      // 내가 좋아요를 누른 적이 있는지 확인
      // 좋아요 데이터를 다 가져온 후 -> 내가 한 게 있는지 확인
      if (!id || isUpvotedByMe === undefined) {
        return alert("좋아요 데이터를 불러오는 중 오류가 발생했습니다.");
      }
      // 내가 좋아요를 누른 상태면 -> 좋아요 취소
      // 내가 좋아요를 누르지 않은 상태면 -> 좋아요 추가
      await toggleUpvote({
        feedId: id,
        userId: user.id,
        isUpvoted: isUpvotedByMe,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upvotes", id] });
    },
    onError: () => {
      alert("좋아요 추가 혹은 삭제 실패");
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8">
      {/* 뒤로가기 버튼 & 수정, 삭제 버튼 */}
      <div className="flex justify-between items-center">
        <Link to="/" className="flex gap-2 text-sm">
          <span className="text-black-blue font-bold">{`<`}</span>
          <span className="text-black-blue">BACK</span>
        </Link>
        {/* 수정, 삭제 버튼 */}
        <div className="flex gap-2">
          <Link
            to="/feeds/update/1"
            className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue"
          >
            수정
          </Link>
          <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
            삭제
          </button>
        </div>
      </div>
      {/* 글 내용 */}
      <div className="flex flex-row bg-selected-white rounded-lg shadow-md p-6">
        <div>
          <button
            onClick={() => toggleMutation.mutate()}
            className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950"
          >
            <FaAngleUp className="text-xs text-center font-bold" />
            <div className="font-bold">
              {isUpvotesLoading ? (
                <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div>
              ) : (
                <span
                  className={`font-bold ${isUpvotedByMe ? "text-red-500" : ""}`}
                >
                  {upvotes?.length}
                </span>
              )}
            </div>
          </button>
        </div>
        <div className="flex-1 px-10 min-x-0 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-950 text-xl font-bold">{data.title}</h2>
            <p className="text-gray-600 truncate text-md">{data.content}</p>
          </div>
          <p className="text-right text-xs text-gray-600">
            작성일: {new Date(data.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-1 p-3 text-gray-600">
          <FaCommentDots className="text-gray-500 font-bold text-xl" />
          <div className="font-bold">
            {isCommnetsLoading ? (
              <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div>
            ) : (
              comments?.length
            )}
          </div>
        </div>
      </div>
      {/* 댓글 목록 */}
      <div className="flex flex-col p-6 my-6 bg-selected-white rounded-lg shadow-md">
        <h3 className="my-2">
          {isCommnetsLoading ? (
            <div className="animate-pulse w-4 h-4 bg-slate-200 rounded-full"></div>
          ) : (
            comments?.length
          )}{" "}
          Comments
        </h3>
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      {/* 댓글 작성 폼 */}
      <CommentForm feedId={id} />
    </div>
  );
};

export default Detail;

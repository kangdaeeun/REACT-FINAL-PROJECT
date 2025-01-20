import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";
import { useParams } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { getFeedById } from "../api/feedApi";

const CommentForm = () => {
  // 주소에 있는 id 가져오기
  const { id } = useParams();
  const { user } = useAuthStore();

  // id를 이용하여 api 요쳥하기
  const { isLoading, error } = useQuery({
    queryKey: ["feeds", id],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getFeedById(id);
    },
  });

  // useQueryClient로 queryClient 변수 생성
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해 주세요.");
      }

      await addComment({
        feedId: id,
        userId: id,
        content: content,
        createdAt: created_at,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },

    onError: () => {
      alert("댓글 추가 실패");
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="flex flex-col bg-selected-white shadow-md p-6 my-6 rounded-lg">
      <h3 className="">댓글 작성</h3>
      <form className="flex flex-col gap-3">
        <textarea className="my-4 border-2 rounded-lg w-full h-[100px] resize-none" />
        <div className="flex w-full justify-end">
          <button
            type="submit"
            onClick={() => addMutation.mutate()}
            className="bg-gray-mint rounded-md w-[60px] h-[30px] hover:bg-black-blue"
          >
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

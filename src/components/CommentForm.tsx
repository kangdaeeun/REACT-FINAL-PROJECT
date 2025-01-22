import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";

const CommentForm = ({ feedId }: { feedId: string | undefined }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  // useQueryClient로 queryClient 변수 생성
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해 주세요.");
      }
      if (!feedId) {
        throw new Error("게시물 아이디가 없습니다.");
      }

      await addComment({
        feedId,
        userId: user.id,
        content: comment,
      });
    },

    onSuccess: () => {
      // queryKey는 사용하는것과 같아야 함
      queryClient.invalidateQueries({
        queryKey: ["feeds", feedId, "comments"],
      });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // supabase 코드
    addCommentMutation.mutate();
    // setComment("");
  };

  return (
    <div className="flex flex-col bg-selected-white shadow-md p-6 my-6 rounded-lg">
      <h3 className="">댓글 작성</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={comment}
          onChange={handleChange}
          className="my-4 border-2 rounded-lg w-full h-[100px] resize-none"
        />
        <div className="flex w-full justify-end">
          <button
            type="submit"
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

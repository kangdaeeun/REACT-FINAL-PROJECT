import { IoPersonCircleOutline } from "react-icons/io5";
import useAuthStore from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, editComment } from "../api/commentApi";
import { useState } from "react";

interface CommentProps {
  id: string;
  content: string;
  created_at: string;
  feed_id: string;
  user_id: string;
  user: {
    id: string;
    nickname: string;
    email: string;
    img_url: string;
  };
}

const Comment = ({ comment }: { comment: CommentProps }) => {
  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // 수정 버튼 클릭 시 isEditing을 true로 바꾸는 함수
  // -> 내용을 textarea로 바꾸기
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", comment.feed_id, "comments"],
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: () =>
      editComment({
        content: editContent,
        commentId: comment.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", comment.feed_id, "comments"],
      });
      // textarea 닫기
      setIsEditing(false);
    },
    onError: (error) => {
      alert(`댓글 수정 실패: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate();
    }
  };

  const handleEditSubmit = () => {
    editMutation.mutate();
  };

  return (
    <>
      <div className="my-2">
        <div className="flex flex-row justify-between items-center gap-4">
          <span>
            {comment.user.img_url ? (
              <img
                src={comment.user.img_url}
                alt="profile"
                className="w-14 h-14 border-2 border-gray-mint rounded-full"
              />
            ) : (
              <IoPersonCircleOutline className="w-14 h-14 rounded-full" />
            )}
          </span>
          <div className="flex-1">
            <h3 className="font-bold">
              {comment.user.nickname
                ? comment.user.nickname
                : comment.user.email}
            </h3>
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full text-gray-500 border border-gray-400 p-2 rounded-md resize-none text-sm"
              />
            ) : (
              <h3>{comment.content}</h3>
            )}
          </div>
          <div>
            {/* 내 댓글에만 수정, 삭제 버튼 뜨게 하는 작업 */}
            {user?.id === comment.user_id ? (
              <div className="flex font-bold items-end gap-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditCancel}
                      className="btn-feedform bg-selected-gray"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="btn-feedform bg-yellow-500"
                    >
                      완료
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEdit}
                      className="btn-feedform bg-gray-mint  hover:bg-black-blue"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn-feedform bg-red-500   hover:bg-red-400"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <hr className="my-2 border-t border-selected-gray" />
      </div>
    </>
  );
};

export default Comment;

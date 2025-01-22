import { IoPersonCircleOutline } from "react-icons/io5";
import useAuthStore from "../stores/useAuthStore";

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
            <h3>{comment.content}</h3>
          </div>
          <div>
            {/* 내 댓글에만 수정, 삭제 버튼 뜨게 하는 작업 */}
            {user?.id === comment.user_id ? (
              <div className="flex text-xs font-bold items-end gap-2">
                <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                  수정
                </button>
                <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                  삭제
                </button>
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

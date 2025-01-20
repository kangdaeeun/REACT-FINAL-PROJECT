import { IoPersonCircleOutline } from "react-icons/io5";
import useAuthStore from "../stores/useAuthStore";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFeedById } from "../api/feedApi";

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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

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
            {user !== data.id ? (
              ""
            ) : (
              <div className="flex text-xs font-bold items-end gap-2">
                <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                  수정
                </button>
                <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="my-2 border-t border-selected-gray" />
      </div>
    </>
  );
};

export default Comment;

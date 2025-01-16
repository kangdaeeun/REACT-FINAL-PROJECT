import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { getFeedById } from "../api/feedApi";
import Feed from "../components/Feed";
import { getCommentsCount } from "../api/commentApi";

export interface FeedProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

const Detail = () => {
  // 주소에 있는 id 가져오기
  const { id } = useParams();

  // id를 이용하여 api 요쳥하기
  const {
    data: feed,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feeds", id],
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getFeedById(id);
    },
  });

  // 댓글 수 가져오기
  const { data: commentsCount, isLoading: isCommnetsLoading } = useQuery({
    queryKey: ["comments", id], // api 요청에 대한 이름짓기
    queryFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.");
      }
      return getCommentsCount(id);
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
      {/* feed */}
      <Feed feed={feed} />
      {/* 댓글 목록 */}
      <div className="flex flex-col p-6 my-6 bg-selected-white rounded-lg shadow-md">
        <h3 className="my-2">
          {isCommnetsLoading ? "..." : commentsCount} Comments
        </h3>
        <Comment />
        <Comment />
        <Comment />
      </div>
      {/* 댓글 작성 폼 */}
      <CommentForm />
    </div>
  );
};

export default Detail;

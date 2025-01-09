import { Link } from "react-router-dom";
import { FaAngleUp, FaCommentDots } from "react-icons/fa";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const Detail = () => {
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
          <Link to="/feeds/update/1" className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">수정</Link>
          <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">삭제</button>
        </div>
      </div>
      <div className="flex justify-between bg-selected-white shadow-md p-6 rounded-lg">
        <div>
          <button className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
            <FaAngleUp className="text-xs text-center font-bold" />
            <div className="font-bold">1</div>
          </button>
        </div>
        <div className="flex-1 px-10 min-x-0 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-blue-950 text-xl font-bold">제목</h2>
            <p className="text-gray-600 truncate text-md">내용</p>
          </div>
          <p className="text-right text-xs text-gray-600">작성일: 2024.10.24</p>
        </div>
        <div className="flex items-center gap-1 p-3 text-gray-600">
          <FaCommentDots className="text-gray-500 font-bold text-xl" />
          <div className="font-bold">1</div>
        </div>
      </div>
      {/* 댓글 목록 */}
      <div className="flex flex-col p-6 my-6 bg-selected-white rounded-lg shadow-md">
        <h3 className="my-2">4 Comments</h3>
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

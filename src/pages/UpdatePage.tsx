import { Link } from "react-router-dom";

const UpdatePage = () => {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-2xl font-bold pb-8">게시글 수정</h1>
      <div>
        <h3 className="text-xl font-bold">제목</h3>
        <textarea
          placeholder="제목"
          className="my-4 border-2 rounded-lg w-full h-auto resize-none"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">내용</h3>
        <textarea
          placeholder="내용"
          className="my-4 border-2 rounded-lg w-full h-[300px] resize-none"
        />
      </div>
      <div className="flex flex-row gap-2">
        <button className="text-lg font-bold bg-gray-mint rounded-md w-full h-[35px] hover:bg-black-blue">
          수정하기
        </button>
        <Link
          to="/feeds/1"
          className="text-lg font-bold bg-red-500 rounded-md w-full h-[35px] hover:bg-selected-white flex justify-center items-center"
        >
          취소하기
        </Link>
      </div>
    </div>
  );
};

export default UpdatePage;

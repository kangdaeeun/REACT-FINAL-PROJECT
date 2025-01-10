import { Link } from "react-router-dom";

const FeedForm = ({ purpose }: { purpose: string }) => {
  return (
    <div className="flex flex-col text-center">
      {purpose === "작성" && (
        <Link to="/" className="absolute gap-2 text-sm">
          <span className="text-black-blue font-bold">{`<`}</span>
          <span className="text-black-blue">BACK</span>
        </Link>
      )}
      <h1 className="text-2xl font-bold pb-8">
        {purpose === "작성" ? "게시글 작성" : "게시글 수정"}
      </h1>
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
      <div>
        <button className="text-lg font-bold bg-gray-mint rounded-md w-full h-[35px] hover:bg-black-blue">
          작성
        </button>
      </div>
    </div>
  );
};

export default FeedForm;

import { Link } from "react-router-dom";
import { FaAngleUp, FaCommentDots } from "react-icons/fa";

const Detail = () => {
  return (
    <div>
      <Link to="/">back</Link>
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
      <h3 className="my-2">4 Comments</h3>
      <div className="flex flex-col p-6 bg-selected-white rounded-lg shadow-md">
        <div className="my-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 h-14 border-2 border-gray-mint rounded-full"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold">nickname1</h3>
              <h3>comments1</h3>
            </div>
            <div className="text-xs font-bold">
              <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                수정
              </button>
              <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 h-14 border-2 border-gray-mint rounded-full"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold">email2@email.com</h3>
              <h3>comments2</h3>
            </div>
            <div className="text-xs font-bold">
              <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                수정
              </button>
              <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 h-14 border-2 border-gray-mint rounded-full"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold">nickname3</h3>
              <h3>comments3</h3>
            </div>
            <div className="text-xs font-bold">
              <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                수정
              </button>
              <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 h-14 border-2 border-gray-mint rounded-full"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold">email4@email.com</h3>
              <h3>comments4</h3>
            </div>
            <div className="text-xs font-bold">
              <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
                수정
              </button>
              <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-selected-white shadow-md p-6 my-6 rounded-lg">
        <h3 className="">댓글 작성</h3>
        <input type="text" className="my-4 border-2 w-full h-auto" />
        <div className="flex w-full justify-end">
          <button className="bg-gray-mint rounded-md w-[60px] h-[30px] hover:bg-black-blue">
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

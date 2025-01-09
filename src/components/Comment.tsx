const Comment = () => {
  return (
    <>
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
          <div className="text-xs font-bold items-end">
            <button className="bg-gray-mint rounded-md px-2 py-1 hover:bg-black-blue">
              수정
            </button>
            <button className="bg-red-500 rounded-md px-2 py-1 hover:bg-selected-white">
              삭제
            </button>
          </div>
        </div>
        <hr className="my-2 border-t border-selected-gray" />
      </div>
    </>
  );
};

export default Comment;

const CommentForm = () => {
  return (
    <div className="flex flex-col bg-selected-white shadow-md p-6 my-6 rounded-lg">
      <h3 className="">댓글 작성</h3>
      <form className="flex flex-col gap-3">
        <textarea className="my-4 border-2 rounded-lg w-full h-[100px] resize-none" />
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

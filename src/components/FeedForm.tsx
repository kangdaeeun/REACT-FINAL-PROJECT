import { Link } from "react-router-dom";
import Btn from "./Btn";

const FeedForm = ({
  purpose,
  title,
  content,
  handleTitleChange,
  handleContentChange,
  handleSubmit,
}: {
  purpose: string;
  title: string;
  content: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center">
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
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">내용</h3>
        <textarea
          placeholder="내용"
          className="my-4 border-2 rounded-lg w-full h-[300px] resize-none"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      {/* 버튼 UI가 같아서 한번만 사용하는 방법 알아오기 > 한번 더 분리해서 사용하라는 뜻 */}
      {purpose === "작성" ? (
        <div>
          <Btn BtnName="작성" />
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <Btn BtnName="수정하기" />
          <Link
            to="/feeds/{`/feeds/${feed.id}`}"
            className="text-lg font-bold bg-red-500 rounded-md w-full h-[35px] hover:bg-selected-white flex justify-center items-center"
          >
            취소하기
          </Link>
        </div>
      )}
    </form>
  );
};

export default FeedForm;

// 병수 튜터님 방법
// 프롭스랑 췰드런 준거 공부하기
// export default function FeedForm({
// 	pageTitle,
// 	children,
// }: {
// 	pageTitle: string;
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<div className="max-w-3xl mx-auto">
// 			<h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
// 			<form
// 				className="flex flex-col gap-6">
// 				<div className="flex flex-col gap-2">
// 					<label htmlFor="title" className="text-lg font-bold text-gray-800">
// 						제목
// 					</label>
// 					<input
// 						type="text"
// 						name="title"
// 						id="title"
// 						placeholder="제목"
// 						className="p-3 rounded-lg border border-gray-300"
// 					/>
// 				</div>
// 				<div className="flex flex-col gap-2">
// 					<label htmlFor="content" className="text-lg font-bold text-gray-800">
// 						내용
// 					</label>
// 					<textarea
// 						id="content"
// 						name="content"
// 						placeholder="내용"
// 						className="p-3 rounded-lg border border-gray-300 h-[400px] resize-none"
// 					/>
// 				</div>
// 				{children}
// 			</form>
// 		</div>
// 	)
// }

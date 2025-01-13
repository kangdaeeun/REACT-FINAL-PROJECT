import { FaAngleUp, FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/feedApi";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <Link
      to="/feeds/1"
      className="flex justify-between bg-selected-white shadow-md p-6 rounded-lg"
    >
      {data?.map((post) => (
        <div key={post.id} className="flex flex-col">
          <div>
            <button className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
              <FaAngleUp className="text-xs text-center font-bold" />
              <div className="font-bold">1</div>
            </button>
          </div>
          <div className="flex-1 px-10 min-x-0 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-blue-950 text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600 truncate text-md">{post.content}</p>
            </div>
            <p className="text-right text-xs text-gray-600">
              작성일: {post.created_at}
            </p>
          </div>
          <div className="flex items-center gap-1 p-3 text-gray-600">
            <FaCommentDots className="text-gray-500 font-bold text-xl" />
            <div className="font-bold">1</div>
          </div>
        </div>
      ))}
    </Link>
  );
};

export default Feed;

import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import { useQuery } from "@tanstack/react-query";
import { getFeeds } from "../api/feedApi";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds"],
    queryFn: getFeeds,
  });

  // 스켈레톤 적용 전
  // if (isLoading) return <div>로딩 중 ...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">글 목록</h1>
        <Link
          to="/feeds/create"
          className="bg-gray-mint rounded-md px-4 py-2 hover:bg-black-blue"
        >
          글쓰기
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {/* 스켈레톤 적용 후 */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="w-full h-32 bg-gray-200 animate-pulse"></div>
            <div className="w-full h-32 bg-gray-200 animate-pulse"></div>
            <div className="w-full h-32 bg-gray-200 animate-pulse"></div>
            <div className="w-full h-32 bg-gray-200 animate-pulse"></div>
          </div>
        ) : (
          data?.map((item) => <Feed key={item.id} feed={item} />)
        )}
      </div>
    </>
  );
};

export default Home;

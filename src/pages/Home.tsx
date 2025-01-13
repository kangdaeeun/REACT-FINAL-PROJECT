import { Link } from "react-router-dom";
import Feed from "../components/Feed";

const Home = () => {
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
        <Feed />
      </div>
    </>
  );
};

export default Home;

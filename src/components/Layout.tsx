import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="max-x-screen-lg mx-auto px-10 mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

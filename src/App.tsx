import { Outlet } from "react-router-dom";
import { Categories, Header, ScrollTop } from "./components";

const App: React.FC = () => {
  return (
    <div className="bg-pink-200 min-h-screen">
      <div
        className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl w-full 
        bg-white mx-auto h-full min-h-screen flex flex-col gap-y-8 p-6
      "
      >
        <Header></Header>
        <Categories />
        <div>
          <Outlet />
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default App;

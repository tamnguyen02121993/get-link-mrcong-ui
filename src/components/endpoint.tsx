import { createPortal } from "react-dom";
import { IoMdSwap } from "react-icons/io";
import { SiVercel, SiRender } from "react-icons/si";
import { useApiEndpointStore } from "../store";
import { DEFAULT_ENDPOINTS } from "../commons";

function Endpoint() {
  const { selectedEndpoint, setSelectedEndpoint } = useApiEndpointStore(
    (state) => state
  );
  const handleChangeEndpoint = () => {
    if (selectedEndpoint.name === "Vercel") {
      setSelectedEndpoint(DEFAULT_ENDPOINTS[1]);
    } else {
      setSelectedEndpoint(DEFAULT_ENDPOINTS[0]);
    }
  };
  return createPortal(
    <div className="shadow-md fixed bottom-[60px] lg:bottom-[80px] right-5">
      <div
        className="flex flex-col items-center px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg cursor-pointer"
        onClick={handleChangeEndpoint}
      >
        {selectedEndpoint.name === "Vercel" ? (
          <SiVercel size={30} />
        ) : (
          <SiRender size={30} />
        )}
        <span className="font-light text-sm select-none">
          {selectedEndpoint.name}
        </span>
        <IoMdSwap size={24} />
      </div>
    </div>,
    document.querySelector("body")!
  );
}

export default Endpoint;

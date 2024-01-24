import { createPortal } from "react-dom";
import { IoMdSwap } from "react-icons/io";
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
    <div className="fixed top-0 right-0 w-[140px] h-6 px-2 bg-pink-300 text-white">
      <div className="flex items-center justify-between">
        <span className="text-sm">Server: {selectedEndpoint.name}</span>
        <IoMdSwap
          className="cursor-pointer hover:text-pink-400"
          size={20}
          onClick={handleChangeEndpoint}
        />
      </div>
    </div>,
    document.querySelector("body")!
  );
}

export default Endpoint;

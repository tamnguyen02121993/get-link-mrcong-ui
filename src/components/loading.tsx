import ReactLoading from "react-loading";
import colors from "tailwindcss/colors";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full">
      <ReactLoading
        type="bars"
        color={colors.pink[300]}
        height={64}
        width={64}
      />
    </div>
  );
};
export default Loading;

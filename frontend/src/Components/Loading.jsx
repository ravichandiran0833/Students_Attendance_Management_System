import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <TailSpin
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loading;
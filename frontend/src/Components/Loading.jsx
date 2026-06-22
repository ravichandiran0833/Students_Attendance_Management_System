import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
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
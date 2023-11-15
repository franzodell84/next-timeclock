import { FaCircleNotch } from "react-icons/fa";

const LoadingDialog = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="form-control w-full max-w-xs">&nbsp;</div>
      <div className="animate-spin text-4xl">
        <FaCircleNotch />
      </div>
    </div>
  );
};

export default LoadingDialog;

import { BeatLoader } from "react-spinners";
function LoadingPage() {
  return (
    <div>
      <div className="bg-slate-800 bg-opacity-80 w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center">
            <BeatLoader color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;

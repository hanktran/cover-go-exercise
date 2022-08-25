import { useNavigate } from "react-router-dom";

interface AgeIsOverErrorProps {}

const AgeIsOverError: React.FC<AgeIsOverErrorProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-orange-300 py-32 px-10">
      <div className="text-center w-full">
        <h2 className="text-4xl text-gray-900 font-bold title-font mb-7">
          Ooops!
        </h2>
        <p className="leading-relaxed mb-7">
          Your age is over our accepted limit.
          <br />
          We are sorry but we cannot insure you now.
        </p>
        <button
          type="button"
          className="w-64 inline-flex justify-center text-white bg-[#050708] hover:bg-[#050708]/90 font-medium rounded-lg text-sm px-5 py-2.5 ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708]"
          onClick={() => navigate("/")}
        >
          Ok:(
        </button>
      </div>
    </div>
  );
};

export default AgeIsOverError;

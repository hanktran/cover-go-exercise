import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetRegisterInfo } from "../features/register/slice";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRegisterInfo());
  }, [dispatch]);

  return (
    <div className="w-full py-32 px-10">
      <div className="text-center w-full">
        <h2 className="text-5xl text-gray-900 font-bold title-font mb-10">
          Hello There!
        </h2>
        <p className="leading-relaxed mb-10">
          Let's buy some insurance. It is going to take only a few steps
        </p>
        <button
          type="button"
          className="w-48 inline-flex justify-center text-white bg-[#050708] hover:bg-[#050708]/90 font-medium rounded-lg text-sm px-5 py-2.5 ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708]"
          onClick={() => navigate("/register")}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;

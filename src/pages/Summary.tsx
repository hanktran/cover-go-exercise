import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

interface SummaryProps {}

const Summary: React.FC<SummaryProps> = () => {
  const navigate = useNavigate();

  const registerInfo = useSelector(
    (state: RootState) => state.register.registerInfo
  );

  const formattedInfo = useMemo(() => {
    let premium = "";
    if (registerInfo.package) {
      premium = `${
        registerInfo.package?.["price"] + registerInfo.package?.["extraFee"]
      }${registerInfo.package?.["currencyCode"]}`;
    }

    return [
      { label: "Name", value: registerInfo.name },
      { label: "Age", value: registerInfo.age },
      { label: "Country", value: registerInfo.country?.["name"] },
      { label: "Package", value: registerInfo.package?.["name"] },
      { label: "Premium", value: premium },
    ];
  }, [registerInfo]);

  return (
    <div className="w-full py-32 px-10">
      <div className="w-full">
        <h2 className="text-5xl text-center  text-gray-900 font-bold title-font mb-10">
          Summary
        </h2>
        <ul className="w-48 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 mb-8 mx-auto">
          {formattedInfo.map((field, index) => {
            return (
              <li
                key={index}
                className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
              >
                {field.label}: <span className="font-bold">{field.value}</span>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center">
          <button
            type="button"
            className="w-32 bg-white py-2 px-2 border border-gray-300 rounded-md shadow-sm font-bold text-gray-700 hover:bg-gray-50 ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708]"
            onClick={() => navigate("/register")}
          >
            Back
          </button>
          <button
            type="button"
            className="ml-3 w-32 inline-flex justify-center py-2 px-2 border border-transparent shadow-sm font-bold rounded-lg text-white bg-[#050708] hover:bg-[#050708]/90 font-medium ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigate("/")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;

import { useNavigate } from "react-router-dom";
import { RegisterState, COUNTRIES } from "../type";

interface FormProps {
  data: RegisterState;
  disabledNext: boolean;
  packages: any;
  handleNext: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({
  data,
  disabledNext,
  packages,
  handleNext,
  handleInputChange,
  handleSelectChange,
  handleRadioChange,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full max-w-xs mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={data?.name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="age"
            type="text"
            placeholder="Age"
            name="age"
            value={data?.age}
            onChange={(e) => {
              const value = e.target.value;
              const isNumber = /^\d+$/.test(e.target.value);
              if (value && !isNumber) return;
              handleInputChange(e);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Where do you live?
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="country"
              value={data?.country?.currencyCode}
              onChange={(e) => handleSelectChange(e)}
            >
              {COUNTRIES.map((country) => (
                <option key={country.currencyCode} value={country.currencyCode}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {data.age && (
        <div className="w-full py-10 px-10">
          <div className="flex flex-col items-center mb-10">
            {packages.map((p: any) => (
              <div key={p.name} className="flex w-full max-w-xs mx-auto mb-4">
                <input
                  id={p.name}
                  type="radio"
                  name="package"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  checked={p.name === data.package?.name}
                  value={p.name}
                  onChange={(e) => handleRadioChange(e)}
                />
                <label
                  htmlFor={p.name}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {`${p.name} ${
                    p.rate
                      ? `(+${p.extraFee}${p.currencyCode}, ${p.rate * 100}%)`
                      : ""
                  }`}
                </label>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 text-sm font-bold mb-10">
            Your premium is: $
            {data.package && data.package?.price + data.package?.extraFee}
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-32 bg-white py-2 px-2 border border-gray-300 rounded-md shadow-sm font-bold text-gray-700 hover:bg-gray-50 ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708]"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              type="button"
              className="ml-3 w-32 inline-flex justify-center py-2 px-2 border border-transparent shadow-sm font-bold rounded-lg text-white bg-[#050708] hover:bg-[#050708]/90 font-medium ring-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#050708] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabledNext}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;

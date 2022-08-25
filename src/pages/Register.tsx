import { useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../app/store";
import { saveRegisterInfo } from "../features/register/slice";
import {
  formReducer,
  INITIAL_STATE,
  Package,
  ActionTypes,
  COUNTRIES,
} from "../features/register/type";

import AgeIsOverError from "../features/register/components/AgeIsOverError";
import Form from "../features/register/components/Form";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const registerInfo = useSelector(
    (state: RootState) => state.register.registerInfo
  );
  const dispatch = useDispatch();
  const [state, reducerDispatch] = useReducer(
    formReducer,
    registerInfo || INITIAL_STATE
  );
  const [ageIsOver, setAgeIsOver] = useState<boolean>(false);

  const packages: Package[] = useMemo(() => {
    if (!state.country.currencyCode || !state.age) return [];

    const currencyCode = state.country.currencyCode;
    const result = [
      { name: "Standard", currencyCode, rate: 0 },
      { name: "Safe", currencyCode, rate: 0.5 },
      {
        name: "Super Safe",
        currencyCode,
        rate: 0.75,
      },
    ].map((p) => {
      const price = 10 * Number(state.age) * state.country.rate;
      const extraFee = price * p.rate;
      return {
        ...p,
        price,
        extraFee,
      };
    });

    reducerDispatch({
      type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { name: "package", value: { ...result[0] } },
    });

    return result;
  }, [state.country.currencyCode, state.country.rate, state.age]);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reducerDispatch({
      type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const country = COUNTRIES.filter((c) => c.currencyCode === value)[0];
    reducerDispatch({
      type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { name: e.target.name, value: country },
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const p = packages.filter((p) => p.name === value)[0];
    reducerDispatch({
      type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { name: e.target.name, value: p },
    });
  };

  const handleNext = () => {
    if (Number(state.age) > 100) {
      setAgeIsOver(true);
    } else {
      dispatch(saveRegisterInfo(state));
      navigate("/summary");
    }
  };

  const disabledNext = useMemo(() => {
    return !state.name?.trim() || !state.age?.trim();
  }, [state.name, state.age]);

  return (
    <>
      {!ageIsOver && (
        <>
          <h2 className="text-5xl text-center text-gray-900 font-bold title-font mb-10">
            Tell us about youself
          </h2>
          <Form
            data={state}
            disabledNext={disabledNext}
            packages={packages}
            handleNext={handleNext}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleRadioChange={handleRadioChange}
          />
        </>
      )}

      {ageIsOver && <AgeIsOverError />}
    </>
  );
};

export default Register;

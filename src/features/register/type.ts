export enum ActionTypes {
  FORM_FIELD_CHANGE = "FORM_FIELD_CHANGE",
}

export type Country = {
  name: string;
  currencyCode: string;
  rate: number;
};

export type Package = {
  name: string;
  rate: number;
  price: number;
  extraFee: number;
  currencyCode: string;
};

export const COUNTRIES: Country[] = [
  {
    name: "Hong Kong",
    currencyCode: "HKD",
    rate: 1,
  },
  {
    name: "USA",
    currencyCode: "USD",
    rate: 2,
  },
  {
    name: "Australia",
    currencyCode: "AUD",
    rate: 3,
  },
];

export type RegisterState = {
  name: string;
  age: string;
  country: Country;
  package: Package | null;
};

export type RegisterAction = {
  type: ActionTypes;
  payload?: any;
};

export const INITIAL_STATE = {
  name: "",
  age: "",
  country: {
    name: "Hong Kong",
    currencyCode: "HKD",
    rate: 1,
  },
  package: null,
};

export const formReducer = (state: RegisterState, action: RegisterAction) => {
  switch (action.type) {
    case ActionTypes.FORM_FIELD_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

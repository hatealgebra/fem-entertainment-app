import { IAppContext } from "./AppContext";

export enum EActions {
  SET_USER,
  SET_SEARCH_STRING,
  SEARCH_MEDIA,
}

const appReducer = (state: IAppContext, action: any) => {
  switch (action.type) {
    case EActions.SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;

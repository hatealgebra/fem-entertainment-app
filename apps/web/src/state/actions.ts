import { EActions } from "./appReducer";

export type TSearchParams = {
  isTrending?: boolean;
  category?: string;
  isBookmarked?: boolean;
};
export const setSearchString = (query: string) => ({
  type: EActions.SET_SEARCH_STRING,
  payload: {
    query,
  },
});

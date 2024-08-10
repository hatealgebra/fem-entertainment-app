import useSWR from "swr";
import { getUserInfo } from "../services/client/user.services";

const useFetchUser = () => {
  const { isLoading, data: userData, error } = useSWR("/api/user", getUserInfo);

  return { isLoading, userData, error };
};

export default useFetchUser;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetMeQuery, userApi } from "../user/userApi";
import { setAuthenticated, setUnauthenticated } from "./authSlice";

export const useAuthInitialization = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.auth.status);
  const user = useAppSelector(userApi.endpoints.getMe.select()).data;

  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: status !== "unknown" || location.pathname === "/login",
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuthenticated());
    }

    if (isError) {
      dispatch(setUnauthenticated());
    }
  }, [isSuccess, isError, data, dispatch, location, user]);
};

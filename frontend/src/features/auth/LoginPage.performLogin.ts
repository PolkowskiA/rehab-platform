import { userApi } from "../user/userApi";
import { resetAuth } from "./authSlice";
import type { LoginCredentials } from "./LoginPage";

export async function performLogin(
  credentials: LoginCredentials,
  login: any,
  dispatch: any,
  navigate: any,
) {
  await login(credentials).unwrap();

  dispatch(userApi.util.resetApiState());
  dispatch(resetAuth());

  navigate("/", { replace: true });
}

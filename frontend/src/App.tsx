import AppRouter from "./app/router";
import { useAuthInitialization } from "./features/auth/useAuthInitialization ";

export const App = () => {
  useAuthInitialization();
  return <AppRouter />;
};

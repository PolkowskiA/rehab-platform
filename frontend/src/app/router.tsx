import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { ExerciseSimulation } from "../features/exercises/ExerciseSimulation";
import { EditProfileForm } from "../features/user/EditProfileForm";
import { AppLayout } from "./layout/AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="/profile" element={<EditProfileForm />} />
        <Route path="/exercise/:id" element={<ExerciseSimulation />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter;

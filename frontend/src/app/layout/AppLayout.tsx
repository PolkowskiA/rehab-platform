import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApi";
import { setUnauthenticated } from "../../features/auth/authSlice";
import { userApi } from "../../features/user/userApi";
import { useAppDispatch, useAppSelector } from "../hooks";

export const AppLayout = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userApi.endpoints.getMe.select()).data;

  const handleLogout = async () => {
    await logout().unwrap();

    dispatch(userApi.util.resetApiState());
    dispatch(setUnauthenticated());

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="min-h-screen flex bg-slate-50">
        <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <h1 className="text-lg font-semibold text-blue-600">Rehab Panel</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Profil
            </Link>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <div className="text-sm text-slate-500">Panel rehabilitacji</div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                className="text-sm text-red-500 hover:text-red-600 transition"
                onClick={handleLogout}
              >
                Wyloguj
              </button>
            </div>
          </header>

          <main className="flex-1 p-6 ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

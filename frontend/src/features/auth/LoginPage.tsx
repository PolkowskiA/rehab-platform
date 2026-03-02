import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "./authApi";
import { performLogin } from "./LoginPage.performLogin";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) return;

    try {
      await performLogin({ email, password }, login, dispatch, navigate);
    } catch {
      setLocalError("Nieprawidłowe dane uwierzytelniające");
    }
  };

  const displayError = localError || error;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        aria-labelledby="login-heading"
        noValidate
      >
        <h2
          id="login-heading"
          className="text-2xl font-semibold mb-6 text-center"
        >
          Login
        </h2>

        <div className="space-y-4">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full border rounded-lg px-4 py-2"
          />

          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {displayError && (
          <p role="alert" className="text-red-500 text-sm mt-4">
            Nieprawidłowe dane uwierzytelniające
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {isLoading ? "Logowanie..." : "Zaloguj"}
        </button>

        <footer className="mt-6 text-center text-sm text-slate-600">
          <span>Nie masz konta?</span>
          <Link to="/register" className="text-blue-600 font-medium ml-2">
            Zarejestruj się!
          </Link>
        </footer>
      </form>
    </main>
  );
};

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApi";

type RegisterFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange =
    (field: keyof RegisterFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const validationError = useMemo(() => {
    if (!form.firstName.trim()) return "Imię jest wymagane";
    if (!form.lastName.trim()) return "Nazwisko jest wymagane";
    if (!form.email.trim()) return "Email jest wymagany";
    if (!form.password) return "Hasło jest wymagane";
    if (form.password.length < 6) return "Hasło musi mieć minimum 6 znaków";
    if (form.password !== form.repeatPassword)
      return "Hasła muszą być takie same";
    return null;
  }, [form]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (validationError) return;

    try {
      await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      }).unwrap();

      navigate("/", { replace: true });
    } catch (err: any) {
      setApiError(
        err?.data?.message ?? "Nie udało się zarejestrować użytkownika",
      );
    }
  };

  const isSubmitDisabled = Boolean(validationError) || isLoading;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <section
        aria-labelledby="register-heading"
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8"
      >
        <header className="mb-8 text-center">
          <h1
            id="register-heading"
            className="text-2xl font-semibold text-slate-800"
          >
            Utwórz konto
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Rejestracja do systemu rehabilitacji
          </p>
        </header>

        <form
          noValidate
          className="space-y-5"
          onSubmit={handleSubmit}
          data-testid="register-form"
        >
          <Input
            id="firstName"
            name="firstName"
            label="Imię"
            value={form.firstName}
            onChange={handleChange("firstName")}
            required
          />

          <Input
            id="lastName"
            name="lastName"
            label="Nazwisko"
            value={form.lastName}
            onChange={handleChange("lastName")}
            required
          />

          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            autoComplete="email"
            onChange={handleChange("email")}
            required
          />

          <Input
            id="password"
            name="password"
            label="Hasło"
            type="password"
            value={form.password}
            autoComplete="new-password"
            onChange={handleChange("password")}
            required
          />

          <Input
            id="repeatPassword"
            name="repeatPassword"
            label="Powtórz hasło"
            type="password"
            value={form.repeatPassword}
            autoComplete="new-password"
            onChange={handleChange("repeatPassword")}
            required
          />

          {validationError && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-sm text-red-600"
              data-testid="validation-error"
            >
              {validationError}
            </p>
          )}

          {apiError && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-sm text-red-600"
              data-testid="api-error"
            >
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            aria-busy={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition"
          >
            {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-slate-600">
          <span>Masz już konto? </span>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Zaloguj się
          </Link>
        </footer>
      </section>
    </main>
  );
};

type InputProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: InputProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

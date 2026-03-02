import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterPage } from "./RegisterPage";

const mockRegister = vi.fn();

vi.mock("./authApi", () => ({
  useRegisterMutation: () => [mockRegister, { isLoading: false }],
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>,
  );

describe("RegisterPage", () => {
  beforeEach(() => {
    mockRegister.mockReset();
  });

  it("renders form fields", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /utwórz konto/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/imię/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nazwisko/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^hasło$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/powtórz hasło/i)).toBeInTheDocument();
  });

  it("disables submit when form is invalid", () => {
    renderComponent();

    const submitButton = screen.getByRole("button", {
      name: /zarejestruj się/i,
    });

    expect(submitButton).toBeDisabled();
  });

  it("calls register mutation with correct payload", async () => {
    mockRegister.mockReturnValue({
      unwrap: () => Promise.resolve(),
    });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/imię/i), {
      target: { value: "Jan" },
    });

    fireEvent.change(screen.getByLabelText(/nazwisko/i), {
      target: { value: "Kowalski" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jan@test.pl" },
    });

    fireEvent.change(screen.getByLabelText(/^hasło$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/powtórz hasło/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /zarejestruj się/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan@test.pl",
        password: "123456",
      });
    });
  });

  it("shows api error when register fails", async () => {
    mockRegister.mockReturnValue({
      unwrap: () => Promise.reject(new Error("Email already exists")),
    });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/imię/i), {
      target: { value: "Jan" },
    });

    fireEvent.change(screen.getByLabelText(/nazwisko/i), {
      target: { value: "Kowalski" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jan@test.pl" },
    });

    fireEvent.change(screen.getByLabelText(/^hasło$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/powtórz hasło/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /zarejestruj się/i }));

    expect(await screen.findByTestId("api-error")).toBeInTheDocument();
  });
});

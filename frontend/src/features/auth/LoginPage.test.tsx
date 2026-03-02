import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "./LoginPage";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

let mockMutationState: {
  isLoading: boolean;
  error: unknown;
};

vi.mock("./authApi", () => ({
  useLoginMutation: () => [mockLogin, mockMutationState],
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("../user/userApi", () => ({
  userApi: {
    util: {
      resetApiState: () => ({}),
    },
  },
}));

vi.mock("./authSlice", () => ({
  resetAuth: () => ({}),
}));

describe("LoginPage UI", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
    mockDispatch.mockReset();

    mockMutationState = {
      isLoading: false,
      error: null,
    };
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

  it("renders form fields", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("does not call login when fields are empty", () => {
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows error message when login fails", async () => {
    mockLogin.mockReturnValue({
      unwrap: () => Promise.reject(new Error("Invalid credentials")),
    });

    renderPage();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "a@a.pl" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    mockMutationState.isLoading = true;

    renderPage();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});

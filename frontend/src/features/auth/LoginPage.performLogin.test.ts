import { describe, expect, it, vi } from "vitest";
import { performLogin } from "./LoginPage.performLogin";

describe("performLogin", () => {
  it("calls login, dispatches reset actions and navigates", async () => {
    const mockLogin = vi.fn().mockReturnValue({
      unwrap: () => Promise.resolve(),
    });

    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();

    await performLogin(
      { email: "test@test.pl", password: "123456" },
      mockLogin,
      mockDispatch,
      mockNavigate,
    );

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@test.pl",
      password: "123456",
    });

    expect(mockDispatch).toHaveBeenCalledTimes(2);

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("throws if login fails", async () => {
    const mockLogin = vi.fn().mockReturnValue({
      unwrap: () => Promise.reject(new Error("fail")),
    });

    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();

    await expect(
      performLogin(
        { email: "a", password: "b" },
        mockLogin,
        mockDispatch,
        mockNavigate,
      ),
    ).rejects.toThrow();

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

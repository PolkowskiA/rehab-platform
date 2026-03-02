import { expect, test } from "@playwright/test";

test("user can login and see dashboard", async ({ page }) => {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({}),
    });
  });

  await page.route("**/me", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        id: "1",
        firstName: "Jan",
        lastName: "Kowalski",
      }),
    });
  });

  await page.goto("/login");

  await page.fill('input[placeholder="Email"]', "test@test.com");
  await page.fill('input[placeholder="Password"]', "123456");
  await page.click('button:has-text("Zaloguj")');

  await expect(page).toHaveURL("/");
  await expect(page.getByText(/dashboard/i)).toBeVisible();
});

test("shows error when login fails", async ({ page }) => {
  await page.route("**/auth/login", async (route) => {
    await route.fulfill({
      status: 401,
    });
  });

  await page.goto("/login");

  await page.fill('input[placeholder="Email"]', "wrong@test.com");
  await page.fill('input[placeholder="Password"]', "wrong");
  await page.click('button:has-text("Zaloguj")');

  await expect(page.getByRole("alert")).toBeVisible();
});

test("user can logout", async ({ page }) => {
  await page.route("**/me", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ id: "1" }),
    });
  });

  await page.goto("/");

  await page.click('button:has-text("Wyloguj")');

  await expect(page).toHaveURL(/login/);
});

test("user can start exercise", async ({ page }) => {
  await page.route("**/me", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ id: "1" }),
    });
  });

  await page.route("**/exercises", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: "123",
          name: "Rotor",
          status: "Do zrobienia",
        },
      ]),
    });
  });

  await page.route("**/exercises/123/start", async (route) => {
    await route.fulfill({ status: 200 });
  });

  await page.goto("/");

  await page.click('button:has-text("Rozpocznij")');

  await expect(page).toHaveURL(/exercise/);
});

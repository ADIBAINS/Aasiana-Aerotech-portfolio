import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("renders all required fields and submits successfully", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("heading", { name: /tell us what needs/i })).toBeVisible();

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="company"]', "Test Corp");
    await page.fill('input[name="phone"]', "+91 9999999999");
    await page.selectOption('select[name="service"]', { index: 1 });
    await page.fill('textarea[name="message"]', "This is a test enquiry message.");

    await page.click('button[type="submit"]');

    await expect(page.getByText(/thank you|sent|received/i)).toBeVisible({ timeout: 10000 });
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.goto("/contact");

    await page.click('button[type="submit"]');

    await expect(page.getByText(/please check/i)).toBeVisible({ timeout: 5000 });
  });

  test("renders contact details with correct phone and email", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByText(/\+91 8130030112/i)).toBeVisible();
    await expect(page.getByText(/adibains06@gmail.com/i)).toBeVisible();
  });
});

import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('should sign up, sign out, and sign back in', async ({ page }, testInfo) => {
    const email = `e2e-${testInfo.project.name}-${Date.now()}@example.com`;
    const password = 'correct-horse-battery-staple';

    await page.goto('/signup');
    await page.getByLabel('First Name').fill('E2E');
    await page.getByLabel('Last Name').fill('User');
    await page.getByLabel('Mobile Number').fill('+919876543210');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Confirm Password').fill(password);
    await page.getByRole('button', { name: 'Create Account', exact: true }).click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await page.goto('/logout');
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByRole('link', { name: 'Project Management & Task Tracking', exact: true })
    ).toBeVisible();
  });

  test('should redirect an unauthenticated visitor to login', async ({ page }) => {
    await page.goto('/dashboard');

    const loginUrl = new URL(page.url());

    expect(loginUrl.pathname).toBe('/login');
    expect(loginUrl.searchParams.get('callbackUrl')).toBe('/dashboard');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  });
});

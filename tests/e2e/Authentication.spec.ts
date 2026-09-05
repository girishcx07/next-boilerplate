import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('should sign in and reach the protected dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('person@example.com');
    await page.getByLabel('Password').fill('secret');
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
    expect(loginUrl.searchParams.get('callbackUrl')).toBe('http://localhost:3000/dashboard');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  });
});

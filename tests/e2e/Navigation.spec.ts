import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText('Welcome to our Home page')).toBeVisible();
    });

    test('should take screenshot of the about page', async ({ page }) => {
      await page.goto('/about');

      await expect(
        page.getByRole('link', {
          name: 'About',
        })
      ).toBeVisible();
    });

    test('should render a portfolio detail page', async ({ page }) => {
      await page.goto('/portfolio/3');

      await expect(page.getByRole('heading', { name: 'Portfolio 3' })).toBeVisible();
    });

    test('should return a healthy response through the rewrite', async ({ page }) => {
      const response = await page.goto('/health');

      expect(response?.status()).toBe(200);
      await expect(page.locator('body')).toContainText('"status":"Ok"');
    });
  });
});

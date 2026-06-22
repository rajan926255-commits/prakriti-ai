import { test, expect } from '@playwright/test';

test.describe('Calculator Flow', () => {
  test('full calculator flow', async ({ page }) => {
    // Go to home page
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/PRAKRITI AI/);

    // Go to calculator page
    await page.getByRole('link', { name: /calculate my footprint/i }).click();

    // Wait for calculator page to fully load
    await page.waitForURL('**/calculator**', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // ── Step 1: Transport ──────────────────────────────────────
    await expect(
      page.getByRole('heading', { name: /how do you get around/i })
    ).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /next/i }).click();

    // ── Step 2: Home Energy ────────────────────────────────────
    await expect(
      page.getByRole('heading', { name: /home energy usage/i })
    ).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /next/i }).click();

    // ── Step 3: Diet ───────────────────────────────────────────
    await expect(
      page.getByRole('heading', { name: /dietary habits/i })
    ).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /next/i }).click();

    // ── Step 4: Shopping ───────────────────────────────────────
    await expect(
      page.getByRole('heading', { name: /shopping & lifestyle/i })
    ).toBeVisible({ timeout: 15000 });

    // Click See Results
    await page.getByRole('button', { name: /see results/i }).click();

    // ── Results Page ───────────────────────────────────────────
    await page.waitForURL('**/results**', { timeout: 20000 });
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByText(/your carbon mirror/i)
    ).toBeVisible({ timeout: 15000 });

    await expect(
      page.getByText(/your grade/i)
    ).toBeVisible({ timeout: 15000 });
  });
});
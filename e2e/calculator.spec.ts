import { test, expect } from '@playwright/test';

test.describe('Calculator Flow', () => {
  test('full calculator flow', async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

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
      page.locator('h2', { hasText: /how do you get around/i })
    ).toBeVisible({ timeout: 15000 });
    
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step1.png' });

    // ── Step 2: Home Energy ────────────────────────────────────
    await expect(async () => {
      if (!(await page.locator('h2', { hasText: /home energy usage/i }).isVisible())) {
        await page.getByRole('button', { name: /next/i }).click();
        await expect(page.locator('h2', { hasText: /home energy usage/i })).toBeVisible({ timeout: 2000 });
      }
    }).toPass({ timeout: 15000 });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step2.png' });

    // ── Step 3: Diet ───────────────────────────────────────────
    await expect(async () => {
      if (!(await page.locator('h2', { hasText: /dietary habits/i }).isVisible())) {
        await page.getByRole('button', { name: /next/i }).click();
        await expect(page.locator('h2', { hasText: /dietary habits/i })).toBeVisible({ timeout: 2000 });
      }
    }).toPass({ timeout: 15000 });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step3.png' });

    // ── Step 4: Shopping ───────────────────────────────────────
    await expect(async () => {
      if (!(await page.locator('h2', { hasText: /shopping & lifestyle/i }).isVisible())) {
        await page.getByRole('button', { name: /next/i }).click();
        await expect(page.locator('h2', { hasText: /shopping & lifestyle/i })).toBeVisible({ timeout: 2000 });
      }
    }).toPass({ timeout: 15000 });

    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step4.png' });

    // Click See Results
    await expect(async () => {
      if (!(await page.getByText(/your carbon mirror/i).isVisible())) {
        await page.getByRole('button', { name: /see results/i }).click();
        await expect(page.getByText(/your carbon mirror/i)).toBeVisible({ timeout: 2000 });
      }
    }).toPass({ timeout: 15000 });

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
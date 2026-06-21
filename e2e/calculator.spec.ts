import { test, expect } from '@playwright/test';

test('full calculator flow', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PRAKRITI AI/);
  
  // Go to calculator
  await page.click('text=Calculate My Footprint');
  await expect(page.locator('text=How do you get around?')).toBeVisible();

  // Wait for React hydration
  await page.waitForTimeout(1000);

  // Step 1: Transport
  await page.getByRole('button', { name: /next/i }).click();
  
  // Step 2: Energy
  await expect(page.locator('text=Home Energy Usage')).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /next/i }).click();
  
  // Step 3: Diet
  await expect(page.locator('text=Dietary Habits')).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /next/i }).click();
  
  // Step 4: Shopping
  await expect(page.locator('text=Shopping & Lifestyle')).toBeVisible({ timeout: 10000 });
  
  // Finish
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /see results/i }).click();
  
  // Wait for results
  await expect(page.locator('text=Your Carbon Mirror')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=Your Grade')).toBeVisible();
});

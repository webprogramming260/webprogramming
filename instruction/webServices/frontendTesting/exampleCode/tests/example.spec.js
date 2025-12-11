import { test, expect } from '@playwright/test';

function getRandomName(prefix) {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

test('complete flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading')).toContainText('Login');

  const userName = getRandomName('user');
  const password = 'toomanysecrets';

  // Register
  await page.locator('input[type="text"]').fill(userName);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByRole('heading')).toContainText('Profile');
  await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('heading')).toContainText('Login');

  // Duplicate registration
  await page.locator('input[type="text"]').fill(userName);
  await page.locator('input[type="password"]').fill(password);

  page.once('dialog', async (dialog) => {
    await expect(dialog.message()).toContain('Authentication failed');
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Register' }).click();

  // Login
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('heading')).toContainText('Profile');
  await expect(page.getByRole('main')).toContainText(`Logged in as: ${userName}`);
});

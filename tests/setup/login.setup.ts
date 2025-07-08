import { test as setup, expect } from '@playwright/test';
import { credentials } from "../../fixtures/credentials";
import { common } from "../../fixtures/common";

const authFile = 'e2e/.auth/user.json';

setup('token generate', async ({ page }) => {
  const loginInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  const trainerLogin = credentials.trainer.validlogin;
  const trainerPassword = credentials.trainer.validPassword;
  const loginButton = page.locator('.auth-button');

  await page.goto(common.url.e2e.login)
  await loginInput.fill(trainerLogin);
  await expect(loginInput).toHaveValue(trainerLogin);
  await passwordInput.fill(trainerPassword);
  await expect(passwordInput).toHaveValue(trainerPassword);
  await loginButton.click();
  await expect(page).toHaveURL(common.url.e2e.landing);
  await page.context().storageState({ path: authFile });
});

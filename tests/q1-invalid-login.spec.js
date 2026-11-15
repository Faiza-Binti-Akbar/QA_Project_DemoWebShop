
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Q1 - Invalid login should display error', async ({ page }) => {
  const loginPage = new LoginPage(page);

 
  await loginPage.navigateToLogin();

 
  await loginPage.login(
    'invaliduser@example.com',
    'WrongPassword123!'
  );

  
  await expect(loginPage.errorMessage).toBeVisible();

  await expect(loginPage.errorMessage)
    .toContainText('Login was unsuccessful');

 
  await expect(loginPage.loginLink).toBeVisible();
  await expect(loginPage.logoutLink).toHaveCount(0);

  
  await test.info().attach('invalid-login-screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

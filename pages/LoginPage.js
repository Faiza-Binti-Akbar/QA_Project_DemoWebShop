
class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginLink = page.locator('a.ico-login');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');
    this.errorMessage = page.locator('.validation-summary-errors');
    this.logoutLink = page.locator('a.ico-logout');
  }

  async navigateToLogin() {
    await this.page.goto('/');
    await this.loginLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };

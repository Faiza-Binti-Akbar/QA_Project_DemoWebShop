
const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;

    this.registerLink = page.locator('a.ico-register');
    this.genderMale = page.locator('#gender-male');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
    this.continueButton = page.locator('input.register-continue-button');
  }

  
async navigateToRegister() {
  await this.page.goto('/register', {
    waitUntil: 'domcontentloaded',
    timeout: 45000
  });

  await this.firstName.waitFor({
    state: 'visible',
    timeout: 15000
  });
}


  async registerUser(user) {
    await this.genderMale.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.successMessage)
      .toContainText('Your registration completed');
  }
}

module.exports = { RegisterPage };

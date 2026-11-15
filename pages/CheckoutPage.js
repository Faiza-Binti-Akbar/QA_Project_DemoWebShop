
const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async acceptTermsAndCheckout() {
    await this.page.locator('#termsofservice').check();
    await this.page.locator('#checkout').click();

    await expect(this.page).toHaveURL(/checkout/);
  }

  async fillBillingAddress(user) {
    const country = this.page.locator('#BillingNewAddress_CountryId');

    await country.waitFor({ state: 'visible' });

    await this.page.locator('#BillingNewAddress_FirstName')
      .fill(user.firstName);

    await this.page.locator('#BillingNewAddress_LastName')
      .fill(user.lastName);

    await this.page.locator('#BillingNewAddress_Email')
      .fill(user.email);

    await country.selectOption({ label: 'United States' });

    await this.page.locator('#BillingNewAddress_City')
      .fill('New York');

    await this.page.locator('#BillingNewAddress_Address1')
      .fill('123 Test Street');

    await this.page.locator('#BillingNewAddress_ZipPostalCode')
      .fill('10001');

    await this.page.locator('#BillingNewAddress_PhoneNumber')
      .fill('1234567890');

    await this.page.locator(
      '#billing-buttons-container input.new-address-next-step-button'
    ).click();
  }

  async continueShippingAddress() {
    const button = this.page.locator(
      '#shipping-buttons-container input.new-address-next-step-button'
    );

    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async continueShippingMethod() {
    const button = this.page.locator(
      '#shipping-method-buttons-container input.shipping-method-next-step-button'
    );

    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async continuePaymentMethod() {
    await this.page.locator('#paymentmethod_0').check();

    await this.page.locator(
      '#payment-method-buttons-container input.payment-method-next-step-button'
    ).click();
  }

  async continuePaymentInformation() {
    const button = this.page.locator(
      '#payment-info-buttons-container input.payment-info-next-step-button'
    );

    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async confirmOrder() {
    const button = this.page.locator(
      '#confirm-order-buttons-container input.confirm-order-next-step-button'
    );

    await button.waitFor({ state: 'visible' });
    await button.click();

    await expect(
      this.page.locator('.order-completed')
    ).toContainText('Your order has been successfully processed');
  }

  async openOrderDetails() {
    await this.page.locator('.order-completed a').click();

    await expect(this.page).toHaveURL(/orderdetails/);
  }
}

module.exports = { CheckoutPage };

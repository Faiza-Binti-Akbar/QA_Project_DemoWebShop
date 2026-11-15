
const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.product-name h1');
  }

  async verifyProduct(productName) {
    await expect(this.productTitle).toHaveText(productName);
  }

  async addToCart(quantity = 1) {
    const quantityInput = this.page.locator(
      'input.qty-input'
    );

    await quantityInput.fill(String(quantity));

    await this.page
      .locator('input.add-to-cart-button')
      .click();

    await expect(
      this.page.locator('.bar-notification.success')
    ).toBeVisible();
  }
}

module.exports = { ProductPage };

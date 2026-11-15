
const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async openCart() {
    await this.page.goto('/cart');
  }

  async verifyProductInCart(productName, quantity) {
    const productRow = this.page
      .locator('tr.cart-item-row')
      .filter({ hasText: productName });

    await expect(productRow).toBeVisible();

    await expect(
      productRow.locator('td.product a')
    ).toHaveText(productName);

    await expect(
      productRow.locator('input.qty-input')
    ).toHaveValue(String(quantity));
  }
}

module.exports = { CartPage };

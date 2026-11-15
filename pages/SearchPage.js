
const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator(
      'input.search-box-button'
    );
    this.results = page.locator('.product-item');
  }

  async searchProduct(productName) {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded'
    });

    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchResult(productName) {
    const productLink = this.page.getByRole('link', {
      name: productName,
      exact: true
    });

    await expect(productLink).toBeVisible();
  }

  async openProduct(productName) {
    await this.page.getByRole('link', {
      name: productName,
      exact: true
    }).click();
  }
}

module.exports = { SearchPage };

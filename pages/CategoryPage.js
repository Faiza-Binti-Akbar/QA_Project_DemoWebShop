
class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  async openBooksCategory() {
    await this.page.goto('/books', {
      waitUntil: 'domcontentloaded'
    });
  }

  async selectProduct(productName) {
    await this.page
      .locator('.product-item')
      .getByRole('link', {
        name: productName,
        exact: true
      })
      .click();
  }
}

module.exports = { CategoryPage };


const { test, expect } = require('@playwright/test');

const { RegisterPage } = require('../pages/RegisterPage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Q3 - Complete end-to-end checkout', async ({ page }) => {
  test.setTimeout(180000);

  const registerPage = new RegisterPage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const user = {
    firstName: 'Faiza',
    lastName: 'Akbar',
    email: `faiza${Date.now()}@example.com`,
    password: 'Test@12345'
  };

  const productName = 'Computing and Internet';
  const quantity = 3;

  await test.step('Register a new customer', async () => {
    await registerPage.navigateToRegister();
    await registerPage.registerUser(user);
    await registerPage.verifyRegistrationSuccess();
  });

  await test.step('Search and open product', async () => {
    await searchPage.searchProduct(productName);
    await searchPage.verifySearchResult(productName);
    await searchPage.openProduct(productName);
    await productPage.verifyProduct(productName);
  });

  await test.step('Increase quantity and add to cart', async () => {
    await productPage.addToCart(quantity);
    await cartPage.openCart();
    await cartPage.verifyProductInCart(productName, quantity);
  });

  await test.step('Accept terms and start checkout', async () => {
    await checkoutPage.acceptTermsAndCheckout();
  });

  await test.step('Complete billing information', async () => {
    await checkoutPage.fillBillingAddress(user);
  });

  await test.step('Complete shipping information', async () => {
    await checkoutPage.continueShippingAddress();
    await checkoutPage.continueShippingMethod();
  });

  await test.step('Complete payment information', async () => {
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInformation();
  });

  await test.step('Confirm order', async () => {
    await checkoutPage.confirmOrder();

    await test.info().attach('q3-order-confirmation', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });

  await test.step('Verify order details', async () => {
    await checkoutPage.openOrderDetails();

    await expect(
      page.locator('.order-details-page')
    ).toBeVisible();

    await test.info().attach('q3-order-details', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
});

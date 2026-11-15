
const { test, expect } = require('@playwright/test');

const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { CategoryPage } = require('../pages/CategoryPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test('Q2 - Register and add product to cart', async ({ page }) => {

    test.setTimeout(120000);

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const categoryPage = new CategoryPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const uniqueEmail = `faiza${Date.now()}@example.com`;

  const user = {
    firstName: 'Faiza',
    lastName: 'Akbar',
    email: uniqueEmail,
    password: 'Test@12345'
  };

  const productName = 'Computing and Internet';
  const quantity = 2;

  
  await registerPage.navigateToRegister();
  await registerPage.registerUser(user);
  await registerPage.verifyRegistrationSuccess();

  
  await page.locator('a.ico-logout').click();

  
  await loginPage.navigateToLogin();
  await loginPage.login(user.email, user.password);

  await expect(page.locator('a.ico-logout')).toBeVisible();
  await expect(page.locator('.header-links .account'))
    .toHaveText(user.email);

  
  await categoryPage.openBooksCategory();

  
  await categoryPage.selectProduct(productName);

  
  await productPage.verifyProduct(productName);

 
  await productPage.addToCart(quantity);


  await cartPage.openCart();

  
  await cartPage.verifyProductInCart(productName, quantity);

  
  await test.info().attach('q2-cart-verification', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });
});

# Demo Web Shop — UI Automation & API Testing

A Quality Assurance automation project developed using **Playwright, JavaScript, Postman, Newman, and Allure**.

This project automates key user workflows on the Demo Web Shop website and validates REST API operations using JSONPlaceholder.

## 1. Project Overview

The project covers three UI automation scenarios and two API requests.

**Application Under Test:** https://demowebshop.tricentis.com/

**API Under Test:** https://jsonplaceholder.typicode.com/

### UI Automation Scenarios

| Scenario | Description |
|---|---|
| Q1 — Invalid Login | Verify that invalid login credentials display an error and do not authenticate the user. |
| Q2 — Registration and Cart | Register a new customer, log out, log back in, select a product from a category, add it to the cart, and verify the product and quantity. |
| Q3 — End-to-End Checkout | Register a customer, search for a product, verify search results, increase quantity, add to cart, accept terms, complete checkout, confirm the order, and verify order details. |

### API Testing Scenarios

| Request | Validation |
|---|---|
| GET `/users` | Verify HTTP 200, non-empty response array, and required user fields (`id`, `name`, `email`). |
| PUT `/users/{id}` | Dynamically update user information and validate HTTP status, matching ID, updated name, email, company name, and non-empty phone. |

The API tests use collection variables to transfer data between requests. JSONPlaceholder is a mock API, so PUT updates are simulated and are not permanently stored.

## 2. Technology Stack

- JavaScript (Node.js)
- Playwright Test
- Page Object Model (POM)
- Postman Collection
- Newman CLI
- Newman HTML Extra Reporter
- Playwright HTML Reporter
- Allure Playwright Reporter
- Allure Command Line
- Git and GitHub
- Visual Studio Code

## 3. Project Structure

```text
QA_Project_DemoWebShop/
├── api-tests/
│   └── DemoWebShop-API.postman_collection.json
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── CategoryPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── SearchPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── q1-invalid-login.spec.js
│   ├── q2-register-add-cart.spec.js
│   └── q3-e2e-checkout.spec.js
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Generated report folders are excluded from Git tracking.

## 4. Prerequisites

Install the following software:

- Node.js and npm
- Git
- Visual Studio Code
- Java JDK (for Allure CLI)
- Postman (optional for running the collection through its graphical interface)

## 5. Installation and Setup

Clone the public repository:

```bash
git clone https://github.com/Faiza-Binti-Akbar/QA_Project_DemoWebShop.git
```

Open the project:

```bash
cd QA_Project_DemoWebShop
```

Install project dependencies:

```bash
npm ci
```

Install Playwright Chromium:

```bash
npx playwright install chromium
```

Verify installations:

```bash
npx playwright --version
npx newman --version
npx allure --version
```

Allure requires a working Java installation and correctly configured `JAVA_HOME`.

## 6. Run UI Tests Individually

### Q1 — Invalid Login

```bash
npm run test:q1
```

### Q2 — Registration and Add to Cart

```bash
npm run test:q2
```

### Q3 — Complete End-to-End Checkout

```bash
npm run test:q3
```

To execute an individual test with a visible Chromium browser, use:

```bash
npx playwright test tests/q3-e2e-checkout.spec.js --headed
```

## 7. Run All UI Tests Together

```bash
npm test
```

Alternatively:

```bash
npm run test:all
```

The Playwright configuration uses a single worker and disables full parallel execution to run the scenarios sequentially.

All three scenarios can also run independently.

## 8. Playwright HTML Report

Playwright automatically generates an HTML report after test execution.

Run the tests:

```bash
npm test
```

Open the HTML report:

```bash
npm run report:html
```

The report contains test results, execution details, and available screenshot attachments.

Default report directory:

```text
playwright-report/
```

## 9. Allure Report

Execute UI tests to generate Allure result files:

```bash
npm test
```

Generate the Allure HTML report:

```bash
npm run report:allure
```

Open the report:

```bash
npm run report:allure:open
```

Allure output directories:

```text
allure-results/
allure-report/
```

The report includes test status, execution steps, and available attachments.

## 10. API Testing with Newman

The Postman collection contains two requests:

1. GET Users
2. PUT Update User

The GET request validates the response and saves a selected user ID and phone number.

The PUT request uses that ID and dynamically generated values to update the user's name, email, and company name, while including the phone number in the request body.

Run the API collection:

```bash
npm run test:api
```

The collection executes nine automated assertions.

## 11. Newman HTML Report

Generate the API HTML report:

```bash
npm run report:api
```

The generated report is saved at:

```text
newman/api-report.html
```

On Windows PowerShell, open it using:

```powershell
Start-Process newman/api-report.html
```

## 12. GitHub Workflow

This project follows a feature-branch workflow.

Development branches include:

- `feature/q1-invalid-login`
- `feature/q2-register-add-cart`
- `feature/q3-e2e-checkout`
- `feature/q4-api-testing`
- `feature/allure-reporting`
- `fix/q1-test-updates`
- `docs/readme-documentation`

Each major task is developed separately, committed with a meaningful message, pushed to GitHub, and integrated into the `main` branch through a Pull Request.

The commit history reflects incremental development rather than a single combined commit.

## 13. Test Evidence and Reports

The automation framework provides:

- Playwright execution results
- HTML test reports
- Allure reports
- Screenshot attachments
- Newman CLI results
- Newman HTML reports
- Git commit history and merged Pull Requests

Generated report folders are ignored by Git and can be recreated locally using the commands documented above.

## 14. Notes

- UI automation requires internet access to the Demo Web Shop website.
- API automation requires internet access to JSONPlaceholder.
- New customer email addresses are generated dynamically to avoid duplicate-registration conflicts.
- Test execution may vary depending on website response times and network conditions.
- JSONPlaceholder PUT requests simulate updates and do not persist changes.

## 15. Repository

**GitHub:** https://github.com/Faiza-Binti-Akbar/QA_Project_DemoWebShop

**Project Type:** Quality Assurance — UI and API Automation

**Automation Framework:** Playwright with JavaScript and Page Object Model

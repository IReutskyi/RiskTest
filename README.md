# 💄 Registration Form Tests - makeup.com.ua

Automated tests for the user registration form on [makeup.com.ua](https://makeup.com.ua/ua/register/).  
Built with **Playwright + TypeScript**.

---

## 📁 Project Structure

- `tests/` - all test scenarios (positive & negative)
- `pages/` - Page Object for the registration form
- `controls/` - UI control abstractions (Textbox, Button, etc.)
- `tools/` - test data generation using Faker
- `fixtures/` - custom Playwright fixtures (e.g., `registerPage`)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run all tests
```bash
npx playwright test
```

### 3. Run specific test group
```bash
npx playwright test --grep "Valid Registration"
npx playwright test --grep "Negative scenarios - Validation errors"
```

### 4. Open HTML report
```bash
npx playwright show-report
```

---


### ✔ Positive Scenario:
- Successful registration with valid data

### ❌ Negative Scenarios:
- Required fields left empty
- Invalid email format
- Invalid phone number
- Email already in use

---

## 🛠 Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Faker.js](https://github.com/faker-js/faker)

---

## 👤 Author

[Your Name or GitHub Profile](https://github.com/your-username)
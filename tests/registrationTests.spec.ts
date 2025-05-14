import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { generateValidUser } from '../tools/dataGenerator';

test.describe('Valid Registration', () => {
  test('User can register successfully', async ({ registrationPage }) => {
    const user = generateValidUser();
    await registrationPage.goto();
    await registrationPage.registerWith(user);
    await registrationPage.shouldBeRegisteredSuccessfully();
  });
});

test.describe('Negative scenarios - Validation errors', () => {
  test('Should not register without required fields', async ({ registrationPage }) => {
    await registrationPage.goto();
    await registrationPage.registerButton.click();

    const requiredFields = [
      'first_name',
      'last_name',
      'phone',
      'email',
      'cust_password1',
      'cust_password2',
    ];

    for (const field of requiredFields) {
      await registrationPage.shouldBeMarkedInvalid(field);
    }
  });

  const invalidEmails = [
    'test',
    'test@',
    '@domain.com',
    'test@domain',
    'test@.com',
    'test@domain..com',
  ];

  for (const email of invalidEmails) {
    test(`Should not register with invalid email: ${email}`, async ({ registrationPage }) => {
      const user = generateValidUser();
      user.email = email;

      await registrationPage.goto();
      await registrationPage.registerWith(user, true);

      await registrationPage.shouldBeMarkedInvalid('email');
      await expect(registrationPage.successMessage.locator).not.toBeVisible();
    });
  }

  const invalidPhones = [
    '123',
    '+38',
    '+380999',
    'abcdefg',
  ];

  for (const phone of invalidPhones) {
    test(`Should not register with invalid phone: ${phone}`, async ({ registrationPage }) => {
      const user = generateValidUser();
      user.phone = phone;

      await registrationPage.goto();
      await registrationPage.registerWith(user, true);

      await registrationPage.shouldBeMarkedInvalid('phone');
      await expect(registrationPage.successMessage.locator).not.toBeVisible();
    });
  }

  test('Should not register with already registered email', async ({ page, registrationPage }) => {
    const user = generateValidUser();

    await registrationPage.goto();
    await registrationPage.registerWith(user, true);
    await registrationPage.shouldBeRegisteredSuccessfully();

    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await registrationPage.goto();
    const duplicateUser = { ...generateValidUser(), email: user.email }; // копия, но тот же email
    await registrationPage.registerWith(duplicateUser, true);

    // 3. Проверка: форма НЕ прошла
    await registrationPage.shouldBeMarkedInvalid('email');
    await expect(registrationPage.successMessage.asLocator).not.toBeVisible();
  });

});
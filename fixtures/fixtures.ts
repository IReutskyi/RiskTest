import { test as baseTest } from '@playwright/test';
import { RegisterPage } from '../pages/registrationPage';

export type Fixtures = {
    registrationPage: RegisterPage;
};

export const test = baseTest.extend<Fixtures>({
    registrationPage: async ({ page }, use) => {
        const p = new RegisterPage(page);
        await use(p);
    },
});
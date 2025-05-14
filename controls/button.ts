import { BaseControl } from './baseControl';
import { Locator, test } from '@playwright/test';

export class Button extends BaseControl {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async clickAndWaitForNavigation() {
        await test.step(`Click ${this.name} and wait for navigation`, async () => {
            await Promise.all([
                this.locator.page().waitForNavigation(),
                this.locator.click(),
            ]);
        });
    }
}
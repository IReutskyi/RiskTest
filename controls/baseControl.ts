import { Locator, expect, test } from '@playwright/test';

export class BaseControl {
    constructor(
        public readonly locator: Locator,
        public readonly name: string
    ) { }

    async click() {
        await test.step(`Click ${this.name}`, async () => {
            await this.locator.click();
        });
    }

    async hover() {
        await test.step(`Hover ${this.name}`, async () => {
            await this.locator.hover();
        });
    }

    async isVisible(timeout = 5_000): Promise<boolean> {
        await test.step(`Check visibility of ${this.name}`, async () => {
            await this.locator.waitFor({ state: 'visible', timeout });
        });
        return true;
    }

    async shouldBeVisible() {
        await test.step(`Assert ${this.name} is visible`, async () => {
            await expect(this.locator).toBeVisible();
        });
    }

    async getText(): Promise<string> {
        return await test.step(`Get text of ${this.name}`, async () => {
            return (await this.locator.textContent())?.trim() ?? '';
        });
    }

    get asLocator(): Locator {
        return this.locator;
    }
}
import { Locator, test } from '@playwright/test';
import { BaseControl } from './baseControl';

export class TextBox extends BaseControl {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async fill(value: string) {
        await test.step(`Fill ${this.name} with "${value}"`, async () => {
            await this.locator.fill(value);
        });
    }

    async typeSlowly(value: string, delay = 100) {
        await test.step(`Type slowly into ${this.name}`, async () => {
            await this.locator.click();
            for (const char of value) {
                await this.locator.type(char, { delay });
            }
        });
    }

    async clear() {
        await test.step(`Clear ${this.name}`, async () => {
            await this.locator.fill('');
        });
    }

    async getValue(): Promise<string> {
        return test.step(`Get value of ${this.name}`, async () => {
            return this.locator.inputValue();
        });
    }
}
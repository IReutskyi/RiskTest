import { Locator, test } from '@playwright/test';
import { BaseControl } from './baseControl';

export class Label extends BaseControl {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async getText(): Promise<string> {
        return test.step(`Get text of ${this.name}`, async () => {
            return super.getText();
        });
    }
}
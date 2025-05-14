import test, { expect, Locator, Page } from '@playwright/test';
import { Button } from '../controls/button';
import { Label } from '../controls/label';
import { TextBox } from '../controls/Textbox';
import { User } from '../models/user';
import strict from 'node:assert/strict';

export class RegisterPage {
    constructor(private readonly page: Page) { }

    private _firstNameTextBox?: TextBox;
    get firstNameTextBox(): TextBox {
        return this._firstNameTextBox ??= new TextBox(this.page.locator('input[name="first_name"]'), 'First Name');
    }

    private _lastNameTextBox?: TextBox;
    get lastNameTextBox(): TextBox {
        return this._lastNameTextBox ??= new TextBox(this.page.locator('input[name="last_name"]'), 'Last Name');
    }

    private _birthdayTextBox?: TextBox;
    get birthdayTextBox(): TextBox {
        return this._birthdayTextBox ??= new TextBox(this.page.locator('input[name="date"]'), 'Birth Day');
    }

    private _yearSelector?: Locator;
    get yearSelector(): Locator {
        return this._yearSelector ??= this.page.locator('div.calendar').nth(1).locator('span.down-year div.custom-select');
    }

    private _firstAvailableDate?: Locator;
    get firstAvailableDate(): Locator {
        return this._firstAvailableDate ??= this.page.locator('div.calendar').nth(1).locator('table tr td span.day').first();
    }


    private _phoneTextBox?: TextBox;
    get phoneTextBox(): TextBox {
        return this._phoneTextBox ??= new TextBox(this.page.locator('div.registration-wrap input[name="phone"]'), 'Phone');
    }

    private _emailTextBox?: TextBox;
    get emailTextBox(): TextBox {
        return this._emailTextBox ??= new TextBox(this.page.locator('div.registration-wrap input[name="email"]'), 'Email');
    }

    private _passwordTextBox?: TextBox;
    get passwordTextBox(): TextBox {
        return this._passwordTextBox ??= new TextBox(this.page.locator('input[name="cust_password1"]'), 'Password');
    }

    private _confirmPasswordTextBox?: TextBox;
    get confirmPasswordTextBox(): TextBox {
        return this._confirmPasswordTextBox ??= new TextBox(this.page.locator('input[name="cust_password2"]'), 'Password');
    }

    private _registerButton?: Button;
    get registerButton(): Button {
        return this._registerButton ??= new Button(this.page.locator("//button[text()='Зареєструватися']"), 'Register Button');
    }

    private _successMessage?: Label;
    get successMessage(): Label {
        return this._successMessage ??= new Label(this.page.locator('div.registration-done >> text=Реєстрація пройшла успішно!'), 'Success Message');
    }

    // private _emailError?: Label;
    // get emailError(): Label {
    //     return this._emailError ??= new Label(this.page.locator('#register_email-error'), 'Email Error');
    // }

    // private _phoneError?: Label;
    // get phoneError(): Label {
    //     return this._phoneError ??= new Label(this.page.locator('#register_phone-error'), 'Phone Error');
    // }

    // private _passwordError?: Label;
    // get passwordError(): Label {
    //     return this._passwordError ??= new Label(this.page.locator('#register_password-error'), 'Password Error');
    // }

    // private _duplicateEmailError?: Label;
    // get duplicateEmailError(): Label {
    //     return this._duplicateEmailError ??= new Label(this.page.locator('.error-message'), 'Duplicate Email Error');
    // }

    async goto() {
        await this.page.goto('https://makeup.com.ua/ua/register/');
    }

    async registerWith(user: User, skipBirthday = false, p0?: boolean) {
        await this.firstNameTextBox.fill(user.firstName);
        await this.lastNameTextBox.fill(user.lastName);

        if (!skipBirthday) {
            await this.birthdayTextBox.click();
            const year = user.birthday.split('-')[2];
            await this.yearSelector.click();
            const yearOption = this.page.locator('div.calendar').nth(1).locator(`.custom-select__item >> text=${year}`);
            await yearOption.scrollIntoViewIfNeeded();
            await yearOption.click();
            await this.firstAvailableDate.waitFor({ state: 'visible' });
            await this.firstAvailableDate.click();
            await this.firstAvailableDate.waitFor({ state: 'hidden' });
        }

        await this.phoneTextBox.typeSlowly(user.phone);
        await this.emailTextBox.fill(user.email);
        await this.passwordTextBox.fill(user.password);
        await this.confirmPasswordTextBox.fill(user.password);
        await this.registerButton.click();
    }

    async shouldBeRegisteredSuccessfully() {
        await test.step('Validate successful registration', async () => {
            await expect(this.successMessage.locator).toBeVisible();
        });
    }


    async shouldBeMarkedInvalid(field: string) {
        let wrapper: Locator;

        switch (field) {
            case 'first_name':
                wrapper = this.firstNameTextBox.locator.locator('..');
                break;
            case 'last_name':
                wrapper = this.lastNameTextBox.locator.locator('..');
                break;
            case 'phone':
                wrapper = this.phoneTextBox.locator.locator('..');
                break;
            case 'email':
                wrapper = this.emailTextBox.locator.locator('..');
                break;
            case 'cust_password1':
                wrapper = this.passwordTextBox.locator.locator('..');
                break;
            case 'cust_password2':
                wrapper = this.confirmPasswordTextBox.locator.locator('..');
                break;
            default:
                throw new Error(`Field not supported: ${field}`);
        }

        await test.step(`Field [${field}] should be marked as invalid`, async () => {
            await expect(wrapper).toHaveClass(/invalid/);
        });
    } ы

}
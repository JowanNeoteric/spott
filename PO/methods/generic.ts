import { expect, Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";

export class generic {
  readonly rndInt: number;

  constructor(private page: Page) {
    this.rndInt = Math.floor(Math.random() * 100) + 1;
  }

  async visitPage(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
  }

  async waitForPageToFullLoad() {
    await this.page.waitForLoadState('load', { timeout: 60000 });
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
  }

  async clickElement(element: Locator) {
    await element.click();
  }

  async hooverElement(element: Locator) {
    await element.hover();
  }

  async verifyText(element: Locator, text: string | RegExp) {
    await expect(element).toHaveText(text);
  }

  async containsText(element: Locator, text: string | RegExp) {
    await expect(element).toContainText(text);
  }

  async compareText(source: string | RegExp, compared: string | RegExp) {
    await expect(source).toEqual(compared);
  }

  async isVisible(element: Locator) {
    await expect(element).toBeVisible({ timeout: 60000 });
  }

  async isNotVisible(element: Locator) {
    await expect(element).not.toBeVisible({ timeout: 60000 });
  }

  async typeText(element: Locator, input: string) {
    await this.isVisible(element);
    await element.fill(input);
    await element.blur();
    await expect(element).toHaveText(input);
  }

  async isNotChecked(element: Locator) {
    await expect(element).not.toBeChecked();
  }

  async isChecked(element: Locator) {
    await expect(element).toBeChecked();
  }

  async isDisabled(element: Locator) {
    await expect(element).toBeDisabled();
  }

  async isNotDisabled(element: Locator) {
    await expect(element).not.toBeDisabled();
  }

  async typeAndVerifyInput(element: Locator, value: string) {
    await this.isVisible(element);
    await element.fill(value);
    await element.blur();
    await expect(element).toHaveValue(value);
  }

  async verifyLink(element: Locator, link: string) {
    await this.isVisible(element);
    await expect(element).toHaveAttribute(common.selector.attribute.name.href, link)
  }

  async isEmpty(element: Locator) {
    await expect(element).toBeEmpty();
  }

  async haveValidClass(element: Locator, valid: string | RegExp) {
    await this.isVisible(element);
    await expect(element).toHaveClass(valid);
  }

  async haveAttribute(element: Locator, attribute: string, value: string | RegExp) {
    await expect(element).toHaveAttribute(attribute, value);
  }

  async nothaveAttribute(element: Locator, attribute: string, value: string | RegExp) {
    await expect(element).not.toHaveAttribute(attribute, value);
  }

  async haveInvalidClass(element: Locator, invalid: string | RegExp) {
    await this.isVisible(element);
    await expect(element).not.toHaveClass(invalid);
  }

  async verifyLogoAndTitle(logo: Locator) {
    await this.isVisible(logo);
    await expect(this.page).toHaveTitle(common.text.pageTitle);
  }

  async verifyUrl(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }

  async verifyData(element: Locator, source: string[]) {
    for (let i = 0; i < source.length; i++) {
      await this.verifyText(element.nth(i), source[i]);
    }
  }

  async haveElementsCount(element: Locator, count: number) {
    await expect(element).toHaveCount(count);
  }
}

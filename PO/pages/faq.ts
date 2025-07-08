import { Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";
import { Generic } from "../methods/generic"

export class faqPage {
  readonly header: Locator;
  readonly logo: Locator;
  readonly paragraph: Locator;
  readonly singleSection: Locator;
  readonly section: Locator;
  readonly pointBolded: Locator;
  readonly point: Locator;
  readonly dash: Locator;

  readonly generic = new Generic(this.page);

  constructor(private page: Page) {
    this.header = page.getByTestId(common.selector.faqPage.header);
    this.logo = page.getByTestId(common.selector.generic.logo);
    this.paragraph = page.getByTestId(common.selector.faqPage.paragraph);
    this.singleSection = page.getByTestId(common.selector.faqPage.singleSection);
    this.section = page.getByTestId(common.selector.faqPage.section);
    this.pointBolded = page.getByTestId(common.selector.faqPage.bolded);
    this.point = page.getByTestId(common.selector.faqPage.point);
    this.dash = page.getByTestId(common.selector.faqPage.dash);
  }
}

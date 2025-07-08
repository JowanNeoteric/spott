import { test } from '@playwright/test';
import { common } from "../../../fixtures/common";
import { Generic } from '../../../PO/methods/generic';
import { faqPage } from '../../../PO/pages/faq';
import * as path from 'path';

const description = JSON.parse(JSON.stringify(require(path.join(__dirname, '../../../fixtures/e2e/faq.json'))));

test.describe('FAQ page', () => {
  let method: Generic;
  let faq: faqPage;

  test.beforeEach(async ({ page }) => {
    method = new Generic(page);
    faq = new faqPage(page);

    await method.visitPage(common.url.e2e.faq);
    await method.waitForPageToFullLoad();
    await page.route('**', route => route.continue());
  });

  test.describe('Page content: ', () => {
    test.describe("Description", async () => {
      test('Header', async () => {
        await method.isVisible(faq.header);
        await method.verifyText(faq.header, common.text.faq.header);
      });

      test('Sections', async () => {
        for (let i = 0; i < description.section.length; i++) {
          await method.verifyText(faq.section.nth(i).locator('h3'), description.section[i]);
        }
      });

      test('Section headers', async () => {
        for (let i = 0; i < description.header.length; i++) {
          await method.verifyText(faq.singleSection.nth(i).locator(common.selector.generic.button), description.header[i]);
        }
      });

      test('Paragraphs', async () => {
        for (let i = 0; i < description.paragraph.length; i++) {
          await method.verifyText(faq.paragraph.nth(i), description.paragraph[i]);
        }
      });

      test('Bolded points', async () => {
        for (let i = 0; i < description.points.bolded.length; i++) {
          await method.verifyText(faq.pointBolded.nth(i), description.points.bolded[i]);
        }
      });

      test('Regular points', async () => {
        for (let i = 0; i < description.points.regular.length; i++) {
          await method.verifyText(faq.point.nth(i), description.points.regular[i]);
        }
      });

      test('Dash points', async () => {
        for (let i = 0; i < description.points.dash.length; i++) {
          await method.verifyText(faq.dash.nth(i), description.points.dash[i]);
        }
      });
    });

    test.describe("Component", async () => {
      test('Collapse action', async () => {
        await method.isVisible(faq.singleSection.first());
        await method.haveValidClass((faq.singleSection.locator(common.selector.generic.button).first()), common.class.collapsed);
      });

      test('Expand action', async () => {
        await method.clickElement(faq.singleSection.first());
        await method.isVisible(faq.singleSection.locator(common.selector.generic.button).first());
        await method.haveValidClass((faq.singleSection.locator(common.selector.generic.button).first()), common.class.expanded);
      });
    });
  });
});

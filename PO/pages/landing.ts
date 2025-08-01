import { Locator, Page } from "@playwright/test"
import { Generic } from "../methods/generic"
import { common } from "../../fixtures/common";

export class landingPage {
  readonly userMenuToggle: Locator;
  readonly userMenuList: Locator;
  readonly signOutButton: Locator;
  readonly createSessionMainButton: Locator;
  readonly confirmationPopup: Locator;
  pwTestSessionEntity: Locator;
  readonly deleteSessionButton: Locator;
  readonly confirmPopupButton: Locator;
  readonly cancelPopupButton: Locator;
  readonly sessionSingleParticipantDetails: Locator;
  readonly sessionActivityTypeDetails: Locator;
  readonly sessionTypeDetails: Locator;
  readonly sessionTitle: string;
  readonly calendarSpinner: Locator;
  readonly sessionSingleParticipantJoined: Locator;
  readonly showMoreButton: Locator;
  readonly joinSessionButton: Locator;
  readonly sessionDetailsPopup: Locator;

  readonly generic: Generic;

  constructor(private page: Page) {
    this.generic = new Generic(this.page);
    this.showMoreButton = page.getByText(/^\+[0-9]+\s[A-Za-z]+$/, { exact: true }).last();
    this.userMenuToggle = page.getByTestId(common.selector.landingPage.userMenuToggle);
    this.userMenuList = page.getByTestId(common.selector.landingPage.userMenuList);
    this.signOutButton = page.getByTestId(common.selector.landingPage.userMenuLogout);
    this.createSessionMainButton = page.getByTestId(common.selector.landingPage.createSessionModalButton);
    this.confirmationPopup = page.locator(common.selector.landingPage.confirmationPopup);
    this.deleteSessionButton = page.getByTestId(common.selector.landingPage.popup.button.delete);
    this.confirmPopupButton = page.getByRole('button', { name: common.text.confirm });
    this.cancelPopupButton = page.getByRole('button', { name: common.text.cancel });
    this.sessionSingleParticipantDetails = page.getByTestId('sessionDetailsPopup').locator(common.selector.landingPage.popup.sessionSingleData).nth(2);
    this.sessionSingleParticipantJoined = page.getByTestId('sessionDetailsPopup').locator(common.selector.landingPage.popup.sessionSingleData).nth(3);
    this.sessionActivityTypeDetails = page.getByTestId('sessionDetailsPopup').locator(common.selector.landingPage.popup.sessionSingleData).nth(4);
    this.sessionTypeDetails = page.getByTestId('sessionDetailsPopup').locator(common.selector.landingPage.popup.sessionSingleData).first();
    this.calendarSpinner = page.locator(common.selector.generic.calendarSpinner);
    this.joinSessionButton = page.getByTestId(common.selector.landingPage.joinSessionButton);
    this.sessionDetailsPopup = page.getByTestId('sessionDetailsPopup');
  }

  async verifyConfirmationPopup(text: string) {
    await this.generic.verifyText(this.confirmationPopup, text);
    await this.generic.isNotVisible(this.confirmationPopup);
  }

  async isSessionRemoved() {
    await this.generic.isNotVisible(this.pwTestSessionEntity);
  }

  async verifySessionDetails(sessionType: string | RegExp, sessionCustomer: string | RegExp, participantJoined: string | RegExp, sessionActivity: string | RegExp) {
    await this.generic.clickElement(this.pwTestSessionEntity);
    await this.generic.verifyText(this.sessionTypeDetails, `${common.text.sessionDetails.label.sessionType} ${sessionType}`);
    await this.generic.verifyText(this.sessionSingleParticipantDetails, sessionCustomer);
    await this.generic.verifyText(this.sessionSingleParticipantJoined, participantJoined);
    await this.generic.verifyText(this.sessionActivityTypeDetails, sessionActivity);
  }

  async removeSession() {
    await this.generic.isVisible(this.sessionDetailsPopup);
    await this.generic.clickElement(this.deleteSessionButton);
    await this.generic.clickElement(this.confirmPopupButton);
  }

  async findSessionInCalendar(generatedTitle: string) {
    this.pwTestSessionEntity = this.page.getByText(generatedTitle, { exact: true }).last();
    if (await this.pwTestSessionEntity.isVisible()) {
      await this.pwTestSessionEntity.click();
      await this.generic.isVisible(this.sessionDetailsPopup);
      return;
    }
    if (await this.showMoreButton.isVisible()) {
      const sessionInList = this.page.locator('.fc-events-list-container').getByText(generatedTitle, { exact: true }).last();
      const sessionList = this.page.locator('.fc-events-list-container');

      await this.generic.clickElement(this.showMoreButton);
      await this.generic.isVisible(sessionList);
      await this.generic.isVisible(sessionInList);
      await this.generic.clickElement(sessionInList);
      await this.generic.isVisible(this.sessionDetailsPopup);
    }
  }



}

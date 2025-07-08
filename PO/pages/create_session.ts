import { Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";
import { Generic } from "../methods/generic"
import dayjs from 'dayjs';
import { landingPage } from "./landing";

export class createSessionPage {
  readonly sessionTitleInput: Locator;
  readonly sessionTitleLabel: Locator;
  readonly activityTypeLabel: Locator;
  readonly activityTypeDropdown: Locator;
  readonly sessionClients: Locator;
  readonly sessionTypeRemote: Locator;
  readonly sessionTypeInPerson: Locator;
  readonly createSessionWindowButton: Locator;
  readonly sessionClientsInput: Locator;
  readonly sessionClientsLabel: Locator;
  readonly startTime: Locator;
  readonly startTimeDropdown: Locator;
  readonly datepicker: Locator;
  readonly datepickerIcon: Locator;
  readonly datepickerLabel: Locator;
  readonly selectedDay: Locator;
  readonly startTimeSet: Locator;
  readonly futureStartTime: string;
  readonly actualStartTime: string;
  readonly actualEndTime: string;
  readonly futureStartDate: string;
  readonly sessionTypeName: string;
  readonly singleClient: Locator;
  readonly outsideClients: Locator;
  readonly createSessionModalTitle: Locator;
  readonly createSessionModalPreTitle: Locator;
  readonly spinnerButton: Locator;
  readonly currentDate: Locator;
  readonly sessionImageRemote: Locator;
  readonly sessionImagePerson: Locator;
  readonly cancelSessionButton: Locator;
  readonly durationPicker: Locator;
  readonly endTime: Locator;
  readonly sessionTimeZoneComponent: Locator;
  readonly singleTimeZone: Locator;
  readonly sessionRepeat: Locator;
  readonly lineDivider: Locator;
  readonly presetTimerFlow: Locator;
  readonly switchComponent: Locator;
  readonly sessionNotes: Locator;
  readonly presetTimerSelector: Locator;
  readonly sessionNotesInput: Locator;
  readonly activityDropdownList: Locator;
  readonly dropdownOption: Locator;
  readonly durationDropdownList: Locator;
  readonly textBox: Locator;
  readonly sessionNotesSwitch: Locator;
  readonly combobox: Locator;
  readonly startTimeDropdownList: Locator;

  readonly generic = new Generic(this.page);
  readonly landing = new landingPage(this.page);

  readonly now = dayjs();
  readonly datepickerActualDate = dayjs().format('ddd, DD-MMM-YY').toString();

  constructor(private page: Page) {
    this.startTimeDropdownList = page.locator("#time-dropdown-time-start");
    this.combobox = page.getByRole("combobox");
    this.textBox = page.getByRole("textbox");
    this.durationDropdownList = page.locator("#duration-select");
    this.dropdownOption = page.getByRole("option");
    this.activityDropdownList = page.locator('#activity-type');
    this.sessionNotesInput = page.getByTestId(common.selector.landingPage.createSessionModal.sessionNotesInput);
    this.presetTimerSelector = page.getByTestId(common.selector.landingPage.createSessionModal.presetTimerSelector);
    this.sessionNotes = page.getByTestId(common.selector.landingPage.createSessionModal.sessionNotes);
    this.switchComponent = page.getByTestId(common.selector.landingPage.createSessionModal.switchComponent);
    this.presetTimerFlow = page.getByTestId(common.selector.landingPage.createSessionModal.presetTimerFlow);
    this.lineDivider = page.getByTestId(common.selector.landingPage.createSessionModal.lineDivider);
    this.durationPicker = page.getByTestId('durationPicker');
    this.cancelSessionButton = page.getByTestId(common.selector.landingPage.createSessionModal.cancelSessionButton);
    this.sessionImageRemote = page.getByRole('img', { name: 'live-remote' });
    this.sessionImagePerson = page.getByRole('img', { name: 'in-person' });
    this.activityTypeLabel = page.getByTestId(common.selector.landingPage.createSessionModal.activityTypeDropdown).locator(common.selector.generic.label);
    this.activityTypeDropdown = page.getByTestId(common.selector.landingPage.createSessionModal.activityTypeDropdown).locator(this.combobox);
    this.spinnerButton = page.locator(common.selector.generic.spinner);
    this.sessionTitleInput = page.getByPlaceholder('Session title');
    this.sessionTitleLabel = page.getByTestId(common.selector.landingPage.createSessionModal.sessionTitleComponent).locator(common.selector.generic.label);
    this.sessionClientsInput = page.getByTestId(common.selector.landingPage.createSessionModal.sessionClients).locator(this.textBox);
    this.sessionClientsLabel = page.getByTestId(common.selector.landingPage.createSessionModal.sessionClients).locator(common.selector.generic.label);
    this.sessionTypeRemote = page.getByTestId(common.selector.landingPage.createSessionModal.sessionTypeSlider).first();
    this.sessionTypeInPerson = page.getByTestId(common.selector.landingPage.createSessionModal.sessionTypeSlider).last();
    this.createSessionWindowButton = page.getByTestId(common.selector.landingPage.createSessionModal.createSessionButton);
    this.sessionClients = page.getByTestId(common.selector.landingPage.createSessionModal.sessionClients);
    this.singleClient = page.locator(common.selector.landingPage.createSessionModal.singleClient).nth(0);
    this.startTime = page.getByTestId("timePicker").first();
    this.endTime = page.getByTestId("timePicker").last();
    this.startTimeDropdown = page.locator(common.selector.landingPage.createSessionModal.startTimeDropdown);
    this.datepicker = page.getByTestId(common.selector.generic.datepicker);
    this.datepickerIcon = page.getByTestId(common.selector.generic.datepicker).locator(common.selector.landingPage.createSessionModal.datepickerIcon);
    this.datepickerLabel = page.getByTestId(common.selector.generic.datepicker).locator(common.selector.generic.label);
    this.currentDate = page.getByTestId(common.selector.generic.datepicker).locator(common.selector.landingPage.createSessionModal.selectedValue);
    this.futureStartDate = this.now.add(1, 'day').format('dddd, MMMM D, YYYY').toString();
    this.selectedDay = page.getByLabel(this.futureStartDate);
    this.actualEndTime = (this.roundToNearest5Minutes(this.now)).add(50, 'minutes').format('HH:mm').toString();
    this.actualStartTime = (this.roundToNearest5Minutes(this.now)).add(5, 'minutes').format('HH:mm').toString();
    this.futureStartTime = (this.roundToNearest5Minutes(this.now)).add(15, 'minutes').format('HH:mm').toString();
    this.startTimeSet = page.getByRole('option', { name: this.futureStartTime });
    this.createSessionModalTitle = page.getByTestId(common.selector.landingPage.createSessionModal.title);
    this.createSessionModalPreTitle = page.getByTestId("createSessionPreTitle");
    this.sessionRepeat = page.getByTestId(common.selector.landingPage.createSessionModal.sessionRepeat);
    this.sessionTimeZoneComponent = page.getByTestId(common.selector.landingPage.createSessionModal.sessionTimeZone);
    this.singleTimeZone = page.getByTestId(common.selector.landingPage.createSessionModal.singleTimeZone);
  }

  async waitForClientsList() {
    const responsePromise = this.page.waitForResponse('**/api/clients');
    await responsePromise;
  }

  roundToNearest5Minutes(time) {
    const roundedMinute = (time.minute() - time.minute() % 5);
    return time.set('minutes', roundedMinute);
  };

  async openSessionModal() {
    await this.generic.clickElement(this.landing.createSessionMainButton);
  }

  async selectSessionType(sessionType) {
    await this.generic.clickElement(sessionType);
  }

  async fillSessionTitle(element: Locator, title: string) {
    await this.generic.clickElement(element);
    await this.generic.typeAndVerifyInput(element, title);
  }

  async selectSessionClients(clients: number) {
    await this.generic.clickElement(this.sessionClientsInput);
    for (let i = 0; i < clients; i++) {
      await this.generic.clickElement(this.singleClient);
    }
    await this.generic.clickElement(this.createSessionModalTitle);
    return clients
  }

  async getSelectedClient() {
    const singleClient = this.sessionClients.locator(common.selector.landingPage.createSessionModal.singlePill);
    const selectedClient = await singleClient.innerText();
    return selectedClient
  }

  async selectFutureDay() {
    await this.generic.clickElement(this.datepicker);
    await this.generic.clickElement(this.selectedDay);
  }

  async setFutureStartTime() {
    await this.generic.clickElement(this.startTime);
    await this.generic.isVisible(this.startTimeDropdown);
    await this.generic.clickElement(this.startTimeSet);
  }

  generateSessionTitle(title: string) {
    title = title + this.generic.rndInt
    return title;
  };
}

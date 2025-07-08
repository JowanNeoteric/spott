import { test } from '@playwright/test';
import { common } from "../../../fixtures/common";
import { Generic } from '../../../PO/methods/generic';
import { landingPage } from '../../../PO/pages/landing';
import { createSessionPage } from '../../../PO/pages/create_session';

const activities = JSON.parse(JSON.stringify(require("../../../fixtures/e2e/activities.json")));
const duration = JSON.parse(JSON.stringify(require("../../../fixtures/e2e/duration.json")));
const startTime = JSON.parse(JSON.stringify(require("../../../fixtures/e2e/startTime.json")));
const timezones = JSON.parse(JSON.stringify(require("../../../fixtures/e2e/timeZone.json")));

test.describe('Create Session modal', () => {
  let method: Generic;
  let landing: landingPage;
  let createSession: createSessionPage;

  test.beforeEach(async ({ page }) => {
    method = new Generic(page);
    landing = new landingPage(page);
    createSession = new createSessionPage(page);

    await method.visitPage(common.url.e2e.landing);
    await method.isNotVisible(landing.calendarSpinner);
    await method.isVisible(landing.createSessionMainButton);
    await createSession.openSessionModal();
    await method.waitForPageToFullLoad();
  });

  test("Component verification", async () => {
    test.step('Headers', async () => {
      await method.isVisible(createSession.createSessionModalPreTitle);
      await method.verifyText(createSession.createSessionModalPreTitle, "Ready, Set, Go!")
      await method.isVisible(createSession.createSessionModalTitle);
      await method.verifyText(createSession.createSessionModalTitle, "Create a Session")
    });

    test.step('Switcher', async () => {
      await method.isVisible(createSession.sessionTypeRemote);
      await method.verifyText(createSession.sessionTypeRemote, "Live Remote")
      await method.haveAttribute(createSession.sessionTypeRemote, "active", "true");
      await method.isVisible(createSession.sessionTypeInPerson);
      await method.verifyText(createSession.sessionTypeInPerson, "Live In-Person");
      await method.nothaveAttribute(createSession.sessionTypeInPerson, "active", "true");
    });

    test.step('Session title component', async () => {
      await method.isVisible(createSession.sessionTitleLabel);
      await method.verifyText(createSession.sessionTitleLabel, "Session Title")
      await method.isVisible(createSession.sessionTitleInput);
    });

    test.step('Activity type component', async () => {
      await method.isVisible(createSession.activityTypeLabel);
      await method.verifyText(createSession.activityTypeLabel, "Activity Type");
      await method.isVisible(createSession.activityTypeDropdown);
      await method.verifyText(createSession.activityTypeDropdown.locator(common.selector.landingPage.createSessionModal.selectedValue), "Basic");
    });

    test.step('Session clients component', async () => {
      await method.isVisible(createSession.sessionClientsLabel);
      await method.verifyText(createSession.sessionClientsLabel, " Clients ");
      await method.isEmpty(createSession.sessionClientsInput);
      await method.haveAttribute(createSession.sessionClientsInput, "data-placeholder", "Start typing to add clients...");
    });

    test.step('Session datepicker component', async () => {
      await method.isVisible(createSession.datepicker);
      await method.verifyText(createSession.datepickerLabel, "Date")
      await method.isVisible(createSession.currentDate);
      await method.verifyText(createSession.currentDate, createSession.datepickerActualDate);
      await method.isVisible(createSession.datepickerIcon);
    });

    test.step('Duration picker', async () => {
      await method.isVisible(createSession.durationPicker);
      await method.verifyText(createSession.durationPicker.locator(common.selector.generic.label), "Duration");
      await method.verifyText(createSession.durationPicker.locator(common.selector.landingPage.createSessionModal.selectedValue), "45 min");
    });

    test.step('Start Time', async () => {
      await method.isVisible(createSession.startTime);
      await method.verifyText(createSession.startTime.locator(common.selector.generic.label), "Start Time");
      await method.verifyText(createSession.startTime.locator(common.selector.landingPage.createSessionModal.selectedValue), /^[0-9]+:[0-9]+$/);
    });

    test.step('End Time', async () => {
      await method.isVisible(createSession.endTime);
      await method.verifyText(createSession.endTime.locator(common.selector.generic.label), "End Time");
      await method.verifyText(createSession.endTime.locator(common.selector.landingPage.createSessionModal.selectedValue), /^[0-9]+:[0-9]+$/);
      await method.haveAttribute((createSession.endTime.locator(common.selector.generic.button)), "disabled", "disabled");
    });

    test.step('TimeZone component', async () => {
      await method.isVisible(createSession.sessionTimeZoneComponent);
      await method.verifyText(createSession.sessionTimeZoneComponent.locator(common.selector.landingPage.createSessionModal.selectedValue), "(GMT+01:00) Warsaw");
      await method.isVisible(createSession.sessionTimeZoneComponent.locator(common.selector.generic.arrow));
    });

    test.step('Session repeat component', async () => {
      await method.isVisible(createSession.sessionRepeat);
      await method.verifyText(createSession.sessionRepeat, "Add Recurrence");
    });

    test.step('Divider component', async () => {
      await method.isVisible(createSession.lineDivider);
    });

    test.step('Timer preset flow component', async () => {
      await method.isVisible(createSession.presetTimerFlow);
      await method.verifyText(createSession.presetTimerFlow.locator(common.selector.generic.inputLabel), "Add Timer & HR Flow");
      await method.isVisible(createSession.switchComponent.first());
    });

    test.step('Cancel Session button', async () => {
      await method.isVisible(createSession.cancelSessionButton);
      await method.verifyText(createSession.cancelSessionButton, "Cancel")
      await method.isNotDisabled(createSession.cancelSessionButton);
    });

    test.step('Create Session button', async () => {
      await method.isVisible(createSession.createSessionWindowButton);
      await method.verifyText(createSession.createSessionWindowButton, "Create Session");
    });
  });

  test.describe("Action verification", async () => {

    test('Session type images', async () => {
      await method.isVisible(createSession.sessionImageRemote);
      await method.haveAttribute(createSession.sessionImageRemote, "alt", "live-remote");
      await createSession.selectSessionType(createSession.sessionTypeInPerson);
      await method.isVisible(createSession.sessionImagePerson);
      await method.haveAttribute(createSession.sessionImagePerson, "alt", "in-person");
    });

    test('Session clients chooser', async () => {
      await method.isVisible(createSession.sessionClientsInput);
      await method.haveAttribute(createSession.sessionClientsInput, "aria-placeholder", "Start typing to add clients...");
      await method.clickElement(createSession.sessionClientsInput);
    });

    test('Timer preset switched on', async () => {
      await method.isVisible(createSession.presetTimerFlow.locator(createSession.switchComponent));
      await method.clickElement(createSession.presetTimerFlow.locator(createSession.switchComponent));
      await method.isVisible(createSession.presetTimerSelector);
      await method.verifyText(createSession.presetTimerSelector.locator(common.selector.landingPage.createSessionModal.selectedValue), "Select Timer & HR Flow");
    });
  });

  test.describe("Data verification", async () => {
    test('Activity types', async () => {
      await method.clickElement(createSession.activityTypeDropdown);
      await method.isVisible(createSession.activityDropdownList);
      await method.verifyData((createSession.activityDropdownList.locator(createSession.dropdownOption)), activities.types);
    });

    test('Duration time', async () => {
      await method.clickElement(createSession.durationPicker);
      await method.isVisible(createSession.durationDropdownList);
      await method.verifyData((createSession.durationDropdownList.locator(createSession.dropdownOption)), duration.time);
    });

    test('Start time', async () => {
      await method.clickElement(createSession.startTime);
      await method.isVisible(createSession.startTimeDropdownList);
      await method.verifyData((createSession.startTimeDropdownList.locator(createSession.dropdownOption)), startTime.time);
    });

    test('Timezones', async () => {
      await method.clickElement(createSession.sessionTimeZoneComponent);
      await method.verifyData(createSession.singleTimeZone, timezones.zone);
    });
  });
});

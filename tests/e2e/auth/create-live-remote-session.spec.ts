import { test } from '@playwright/test';
import { common } from "../../../fixtures/common";
import { generic } from '../../../PO/methods/generic';
import { landingPage } from '../../../PO/pages/landing';
import { createSessionPage } from '../../../PO/pages/create_Session';

test.describe('Create and Remove Session', () => {
  let method: generic;
  let landing: landingPage;
  let createSession: createSessionPage;

  test.beforeEach(async ({ page }) => {
    method = new generic(page);
    landing = new landingPage(page);
    createSession = new createSessionPage(page);

    await method.visitPage(common.url.e2e.landing);
    await method.waitForPageToFullLoad();
    await page.route('**', route => route.continue());
  });

  test.describe('Live Remote:', () => {
    test('Single client - Basic activitiy', async () => {
      await method.isNotVisible(landing.calendarSpinner);
      await method.isVisible(landing.createSessionMainButton);
      await createSession.openSessionModal();
      await createSession.waitForClientsList();
      await method.isNotVisible(landing.calendarSpinner.first());
      await createSession.selectSessionType(createSession.sessionTypeRemote);
      const generatedTitle = await createSession.generateSessionTitle(common.text.title.remote);
      await createSession.fillSessionTitle(createSession.sessionTitleInput, generatedTitle);
      await createSession.selectSessionClients(1);
      const selectedClient = await createSession.getSelectedClient();
      await createSession.selectFutureDay();
      await createSession.setFutureStartTime();
      await method.isNotDisabled(createSession.createSessionWindowButton);
      await method.clickElement(createSession.createSessionWindowButton);
      await method.isVisible(createSession.spinnerButton);
      await landing.verifyConfirmationPopup(common.text.confirmationPopup.success);
      await landing.findSessionInCalendar(generatedTitle);
      await landing.verifySessionDetails(common.text.sessionDetails.type.remote, `${common.text.sessionDetails.label.singleParticipant} ${selectedClient}`, `${common.text.sessionDetails.label.joined} ${0}`, `${common.text.sessionDetails.label.activityType} ${common.text.activities.basic}`)
      await landing.removeSession();
      await landing.verifyConfirmationPopup(common.text.confirmationPopup.removed);
      await landing.isSessionRemoved();
    });

    test('Multi clients - Basic activity', async () => {
      await method.isNotVisible(landing.calendarSpinner);
      await method.isVisible(landing.createSessionMainButton);
      await createSession.openSessionModal();
      await createSession.waitForClientsList();
      await method.isNotVisible(landing.calendarSpinner.first());
      await createSession.selectSessionType(createSession.sessionTypeRemote);
      const generatedTitle = await createSession.generateSessionTitle(common.text.title.remote);
      await createSession.fillSessionTitle(createSession.sessionTitleInput, generatedTitle);
      const participants = await createSession.selectSessionClients(19);
      await createSession.selectFutureDay();
      await createSession.setFutureStartTime();
      await method.isNotDisabled(createSession.createSessionWindowButton);
      await method.clickElement(createSession.createSessionWindowButton);
      await method.isVisible(createSession.spinnerButton);
      await landing.verifyConfirmationPopup(common.text.confirmationPopup.success);
      await landing.findSessionInCalendar(generatedTitle);
      await landing.verifySessionDetails(common.text.sessionDetails.type.remote, `${common.text.sessionDetails.label.multiParticipants} ${participants}`, `${common.text.sessionDetails.label.joined} ${0}`, `${common.text.sessionDetails.label.activityType} ${common.text.activities.basic}`);
      await landing.removeSession();
      await landing.verifyConfirmationPopup(common.text.confirmationPopup.removed);
      await landing.isSessionRemoved();
    });
  });
});

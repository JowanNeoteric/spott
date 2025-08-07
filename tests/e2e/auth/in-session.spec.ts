import { test } from '@playwright/test';
import { lobbyRoom } from '../../../PO/pages/lobby_Room';
import { common } from "../../../fixtures/common";
import { generic } from '../../../PO/methods/generic';
import { landingPage } from '../../../PO/pages/landing';
import { createSessionPage } from '../../../PO/pages/create_Session';
import { inSessionPage } from '../../../PO/pages/in_Session';

test.describe('Validates In Session', () => {
    let method: generic;
    let landing: landingPage;
    let createSession: createSessionPage;
    let lobby: lobbyRoom;
    let inSession: inSessionPage;

    test.beforeEach(async ({ page }) => {
        method = new generic(page);
        landing = new landingPage(page);
        createSession = new createSessionPage(page);
        lobby = new lobbyRoom(page);
        inSession = new inSessionPage(page);

        await method.visitPage(common.url.e2e.landing);
        await method.waitForPageToFullLoad();
        await page.route('**', route => route.continue());
    });

    test('Live Remote', async () => {
        let generatedTitle: string;
        let selectedClient: string;

        await test.step('Create a new session', async () => {
            await method.isNotVisible(landing.calendarSpinner);
            await method.isVisible(landing.createSessionMainButton);
            await createSession.openSessionModal();
            await createSession.waitForClientsList();
            await method.isNotVisible(landing.calendarSpinner.first());
            await createSession.selectSessionType(createSession.sessionTypeRemote);
            generatedTitle = await createSession.generateSessionTitle(common.text.title.remote);
            await createSession.fillSessionTitle(createSession.sessionTitleInput, generatedTitle);
            await createSession.selectSessionClients(1);
            selectedClient = await createSession.getSelectedClient();
            await createSession.selectDuration(5);
            await method.isNotDisabled(createSession.createSessionWindowButton);
            await method.clickElement(createSession.createSessionWindowButton);
            await method.isVisible(createSession.spinnerButton);
            await landing.verifyConfirmationPopup(common.text.confirmationPopup.success);
            await landing.findSessionInCalendar(generatedTitle);
            await method.clickElement(landing.joinSessionButton);
        });

        await test.step('Validates join permission', async () => {
            await lobby.joinSession();
            await method.verifyUrl(/^http:\/\/localhost:\d\d\d\d\/[A-Za-z]+\/view\/[0-9]+\/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?Z$/);
        });

        await test.step('Room preparing', async () => {
            await method.verifyText(inSession.loadingText, common.text.inSession.preparation1);
            await method.verifyText(inSession.loadingText, common.text.inSession.preparation2);
            await method.verifyText(inSession.loadingText, common.text.inSession.preparation3);
        });

        await test.step('Validates in session components - emergency button', async () => {
            await method.isVisible(inSession.emergencyButton);
            await method.hooverElement(inSession.emergencyButton);
            await method.verifyText(inSession.emergencyButton, common.text.inSession.emergencyDetails);
            await method.clickElement(inSession.emergencyButton);
            await method.haveValidClass(inSession.emergencyButton, common.class.toggled);
        });

        await test.step('Validates in session components - trainer video', async () => {
            await method.isVisible(inSession.videoElement);
            await method.haveValidClass(inSession.videoElement, common.class.videoEnabled);
            await method.isVisible(inSession.participantName);
            await method.verifyText(inSession.participantName, common.text.sessionDetails.trainer);
            await method.haveValidClass(inSession.audioIcon, common.class.microphone);
        });

        await test.step('Validates in session components - Timer', async () => {
            await method.isVisible(inSession.timerComponent);
            await method.isVisible(inSession.timerCircleIcon);
            await method.isVisible(inSession.timerCountdown);
            await method.verifyText(inSession.timerCountdown, common.text.inSession.timerCountdown);
            await method.isVisible(inSession.timerInterval);
            await method.verifyText(inSession.timerInterval, common.text.inSession.timerInterval);
            await method.isVisible(inSession.timerStatusIcon);
            await method.verifyText(inSession.currentTimerTitle, common.text.inSession.timerNames.testTimer1);
            await method.isVisible(inSession.refreshTimerButton);
            await method.isVisible(inSession.timerDropdownButton);
        });
    });
});

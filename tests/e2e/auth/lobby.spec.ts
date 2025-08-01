import { test, Locator } from '@playwright/test';
import { LobbyRoom } from '../../../PO/pages/LobbyRoom.ts.ts';
import { common } from "../../../fixtures/common";
import { Generic } from '../../../PO/methods/generic';
import { landingPage } from '../../../PO/pages/landing';
import { createSessionPage } from '../../../PO/pages/create_session';

test.describe('Lobby Room Page', () => {
    let method: Generic;
    let landing: landingPage;
    let createSession: createSessionPage;
    let lobby: LobbyRoom;

    test.beforeEach(async ({ page }) => {
        method = new Generic(page);
        landing = new landingPage(page);
        createSession = new createSessionPage(page);
        lobby = new LobbyRoom(page);

        await method.visitPage(common.url.e2e.landing);
        await method.waitForPageToFullLoad();
        await page.route('**', route => route.continue());
    });

    test('Live Remote Lobby Room - current session', async () => {
        let generatedTitle: string;
        let selectedClient: string;
        let componentsList: Locator[] = [
            lobby.title,
            lobby.subtitle,
            lobby.backButton,
            lobby.clientButtons,
            lobby.micIcon,
            lobby.videoIcon,
            lobby.stopwatchIcon,
            lobby.webcamDropdown,
            lobby.micDropdown,
            lobby.speakerDropdown,
            lobby.activityDropdown,
            lobby.timerSwitch,
            lobby.hrFlowDropdown,
            lobby.joinButton,
            lobby.videoPlaceholder
        ];
        let deviceIcons = [lobby.micIcon, lobby.videoIcon, lobby.stopwatchIcon];

        await test.step('Create a new remote session', async () => {
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
            await method.isNotDisabled(createSession.createSessionWindowButton);
            await method.clickElement(createSession.createSessionWindowButton);
            await method.isVisible(createSession.spinnerButton);
            await landing.verifyConfirmationPopup(common.text.confirmationPopup.success);
            await landing.findSessionInCalendar(generatedTitle);
            await method.clickElement(landing.joinSessionButton);
        });

        await test.step('Verify lobby components - visibility', async () => {
            for (let i = 0; i < componentsList.length; i++) {
                await method.isVisible(componentsList[i]);
            }
        });

        await test.step('Verify lobby components - text', async () => {
            await method.verifyText(lobby.title, generatedTitle);
            await method.verifyText(lobby.joinButton, common.text.waitingRoom.joinButton);
            await lobby.verifyClients(selectedClient);
        });

        await test.step('Verify lobby dropdowns options', async () => {
            await method.haveElementsCount(lobby.activityOptions, 31);
            await method.haveElementsCount(lobby.hrFlowOptions, 12);
        });

        await test.step('Verify lobby components functionality - toggle on by default', async () => {
            for (let icon of deviceIcons) {
                await method.haveAttribute(icon, 'src', new RegExp('^(?!.*off).*'));
            }
        });

        await test.step('Verify lobby components functionality - toggle off', async () => {
            for (let icon of deviceIcons) {
                await lobby.toggleDevice(icon);
                await method.haveAttribute(icon, 'src', /.*off.*/);
                await lobby.toggleDevice(icon); // Toggle back on
            }
        });
    });

    test('Live Remote Lobby Room - future session', async () => {
        let time: { days: number; hours: number; minutes: number; seconds: number };
        let generatedTitle: string;
        let selectedClient: string;
        let startTime: string;
        let selectedDay: string;
        let componentsList: Locator[] = [
            lobby.title,
            lobby.subtitle,
            lobby.backButton,
            lobby.clientButtons,
            lobby.micIcon,
            lobby.videoIcon,
            lobby.stopwatchIcon,
            lobby.webcamDropdown,
            lobby.micDropdown,
            lobby.speakerDropdown,
            lobby.activityDropdown,
            lobby.timerSwitch,
            lobby.hrFlowDropdown,
            lobby.countdownTitle,
            lobby.countdownDisclaimer,
            lobby.daysCircle,
            lobby.hoursCircle,
            lobby.minutesCircle,
            lobby.secondsCircle,
            lobby.videoPlaceholder
        ];
        let deviceIcons = [lobby.micIcon, lobby.videoIcon, lobby.stopwatchIcon];

        await test.step('Create a new remote session', async () => {
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
            selectedDay = await createSession.selectFutureDay();
            startTime = await createSession.setFutureStartTime();
            await method.isNotDisabled(createSession.createSessionWindowButton);
            await method.clickElement(createSession.createSessionWindowButton);
            await method.isVisible(createSession.spinnerButton);
            await landing.verifyConfirmationPopup(common.text.confirmationPopup.success);
            await landing.findSessionInCalendar(generatedTitle);
            await method.clickElement(landing.joinSessionButton);
        });

        await test.step('Verify lobby components - visibility', async () => {
            for (let i = 0; i < componentsList.length; i++) {
                await method.isVisible(componentsList[i]);
            }
        });

        await test.step('Verify lobby components - text', async () => {
            await method.containsText(lobby.subtitle, `${selectedDay}`);
            await method.containsText(lobby.subtitle, `${startTime}`);
            await method.verifyText(lobby.title, generatedTitle);
            await method.verifyText(lobby.scheduledStart, common.text.waitingRoom.scheduled);
            await method.verifyText(lobby.daysCircle.locator(common.selector.landingPage.lobby.future.timerCountdown), /^[0-9]+$/);
            await method.verifyText(lobby.hoursCircle.locator(common.selector.landingPage.lobby.future.timerCountdown), /^[0-9]+$/);
            await method.verifyText(lobby.minutesCircle.locator(common.selector.landingPage.lobby.future.timerCountdown), /^[0-9]+$/);
            await method.verifyText(lobby.secondsCircle.locator(common.selector.landingPage.lobby.future.timerCountdown), /^[0-9]+$/);
            await method.verifyText(lobby.daysCircle.locator(common.selector.landingPage.lobby.future.labelText), common.text.waitingRoom.days);
            await method.verifyText(lobby.hoursCircle.locator(common.selector.landingPage.lobby.future.labelText), common.text.waitingRoom.hours);
            await method.verifyText(lobby.minutesCircle.locator(common.selector.landingPage.lobby.future.labelText), common.text.waitingRoom.minutes);
            await method.verifyText(lobby.secondsCircle.locator(common.selector.landingPage.lobby.future.labelText), common.text.waitingRoom.seconds);
            await lobby.verifyClients(selectedClient);
        });

        await test.step('Verify lobby dropdowns options', async () => {
            await method.haveElementsCount(lobby.activityOptions, 31);
            await method.haveElementsCount(lobby.hrFlowOptions, 12);
        });

        await test.step('Verify lobby components functionality - toggle on by default', async () => {
            for (let icon of deviceIcons) {
                await method.haveAttribute(icon, 'src', new RegExp('^(?!.*off).*'));
            }
        });

        await test.step('Verify lobby components functionality - toggle off', async () => {
            for (let icon of deviceIcons) {
                await lobby.toggleDevice(icon);
                await method.haveAttribute(icon, 'src', /.*off.*/);
                await lobby.toggleDevice(icon); // Toggle back on
            }
        });

        await test.step('shows countdown and validates join permission', async () => {
            time = await lobby.verifyCountdownTime();
            console.log(`Time remaining: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        });

        await test.step('Cleanup - delete session from calendar', async () => {
            //workaround for the issue with the calendar not showing the session
            await method.visitPage(common.url.e2e.landing);
            await method.waitForPageToFullLoad();
            await landing.findSessionInCalendar(generatedTitle);
            await landing.removeSession();
            await landing.verifyConfirmationPopup(common.text.confirmationPopup.removed);
            await landing.isSessionRemoved();
        });
    });
});

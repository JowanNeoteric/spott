import { Page, Locator } from 'playwright';

export class inSessionPage {
    readonly page: Page;
    readonly timerComponent: Locator;
    readonly timerCircleIcon: Locator;
    readonly timerCountdown: Locator;
    readonly timerInterval: Locator;
    readonly timerStatusIcon: Locator;
    readonly timerDropdownButton: Locator;
    readonly currentTimerTitle: Locator;
    readonly refreshTimerButton: Locator;
    readonly floatingTimersList: Locator;
    readonly closeFloatingListButton: Locator;
    readonly floatingTimerItems: Locator;
    readonly participantName: Locator;
    readonly videoElement: Locator;
    readonly audioElement: Locator;
    readonly emergencyButton: Locator;
    readonly loadingContainer: Locator;
    readonly spinner: Locator;
    readonly loadingText: Locator;
    readonly audioIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.timerComponent = page.locator('.video-timer');
        this.timerCircleIcon = page.locator('.video-timer-circle');
        this.timerCountdown = page.locator('.time-countdown');
        this.timerInterval = page.locator('.number-interval');
        this.timerStatusIcon = page.locator('.video-timer-status-icon');
        this.timerDropdownButton = page.locator('.timers-list-button');
        this.currentTimerTitle = page.locator('.current-timer-title');
        this.refreshTimerButton = page.locator('.timer-refresh-button');
        this.floatingTimersList = page.locator('.floating-timers-list');
        this.closeFloatingListButton = page.locator('.ft-close-btn');
        this.floatingTimerItems = page.locator('.ft-list__item.selectable');
        this.participantName = page.locator('.video-participant-name');
        this.videoElement = page.locator('.video-trainer');
        this.audioElement = page.locator('.video-participant audio');
        this.audioIcon = page.locator('.video-participant .fa-microphone');
        this.emergencyButton = page.locator('.video-emergency-btn');
        this.loadingContainer = page.locator('.video-conference-loading');
        this.loadingText = page.locator('.video-conference-loading span');

    }

    async getCurrentTimer(): Promise<string> {
        return await this.currentTimerTitle.textContent() ?? '';
    }

    async openTimerMenu() {
        await this.timerDropdownButton.click();
        await this.floatingTimersList.waitFor({ state: 'visible' });
    }

    async selectTimerByName(name: string) {
        await this.openTimerMenu();
        await this.page.locator(`.ft-list__item.selectable:has-text("${name}")`).click();
        await this.floatingTimersList.waitFor({ state: 'hidden' });
    }

    async refreshTimer() {
        await this.refreshTimerButton.click();
    }

    async getCountdown(): Promise<string> {
        return await this.timerCountdown.textContent() ?? '';
    }

    async getIntervalLabel(): Promise<string> {
        return await this.timerInterval.textContent() ?? '';
    }

    async getParticipantName(): Promise<string> {
        return await this.participantName.textContent() ?? '';
    }

    async isEmergencyButtonVisible(): Promise<boolean> {
        return await this.emergencyButton.isVisible();
    }
}
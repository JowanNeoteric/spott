import { Page } from 'playwright';
import { expect, Locator } from '@playwright/test';
import { common } from "../../fixtures/common";
import { Generic } from "../methods/generic"

export class LobbyRoom {
  readonly activityDropdown: Locator;
  readonly activityOptions: Locator;
  readonly backButton: Locator;
  readonly cameraStatus: Locator;
  readonly clientButtons: Locator;
  readonly countdownDisclaimer: Locator;
  readonly countdownTitle: Locator;
  readonly daysCircle: Locator;
  readonly generic: Generic;
  readonly hoursCircle: Locator;
  readonly hrFlowDropdown: Locator;
  readonly hrFlowOptions: Locator;
  readonly joinButton: Locator;
  readonly micDropdown: Locator;
  readonly micIcon: Locator;
  readonly minutesCircle: Locator;
  readonly page: Page;
  readonly scheduledStart: Locator;
  readonly secondsCircle: Locator;
  readonly speakerDropdown: Locator;
  readonly stopwatchIcon: Locator;
  readonly subtitle: Locator;
  readonly timerHRFlow: string;
  readonly timerSwitch: Locator;
  readonly title: Locator;
  readonly videoIcon: Locator;
  readonly videoPlaceholder: Locator;
  readonly webcamDropdown: Locator;

  constructor(page: Page) {
    this.activityDropdown = page.locator('button[aria-controls="activity-type"]');
    this.activityOptions = page.locator('#activity-type .ts-select-option');
    this.backButton = page.locator('.waiting-room-back');
    this.cameraStatus = page.locator('.camera-status');
    this.clientButtons = page.locator('.clients-list-menu-button');
    this.countdownDisclaimer = page.locator('.waiting-room-status-disclaimer');
    this.countdownTitle = page.locator('.waiting-room-status-title');
    this.daysCircle = page.locator('.pulse-container').nth(0);
    this.hrFlowDropdown = page.locator('button[aria-controls="timer-hr-flow"]');
    this.hrFlowOptions = page.locator('#timer-hr-flow .dropdown-timer-name');
    this.hoursCircle = page.locator('.pulse-container').nth(1);
    this.joinButton = page.locator('button:has-text("Joining Session: Live Remote")');
    this.micDropdown = page.locator('.device-input').nth(1);
    this.micIcon = page.locator('img[src*="mic"]').nth(0);
    this.minutesCircle = page.locator('.pulse-container').nth(2);
    this.scheduledStart = page.locator(common.selector.landingPage.lobby.future.scheduledStart);
    this.secondsCircle = page.locator('.pulse-container').nth(3);
    this.speakerDropdown = page.locator('.device-input').nth(2);
    this.stopwatchIcon = page.locator('img[src*="stopwatch"]').nth(0);
    this.subtitle = page.locator('.waiting-room-subtitle');
    this.timerHRFlow = common.text.waitingRoom.timerHrFlow;
    this.timerSwitch = page.getByTestId(common.selector.landingPage.createSessionModal.switchComponent);
    this.title = page.locator('.waiting-room-title');
    this.videoIcon = page.locator('img[src*="videocam"]').nth(0);
    this.videoPlaceholder = page.locator('.camera-preview');
    this.webcamDropdown = page.locator('.device-input').nth(0);
    this.page = page;
    this.generic = new Generic(this.page);
  }

  async getClientNames(): Promise<string[]> {
    return await this.page.locator('.client-element-name').allTextContents();
  }

  async getCountdownTime(): Promise<{ days: number, hours: number; minutes: number; seconds: number }> {
    const days = parseInt(await this.daysCircle.locator(common.selector.landingPage.lobby.future.timerCountdown).textContent() || '0', 10);
    const hours = parseInt(await this.hoursCircle.locator(common.selector.landingPage.lobby.future.timerCountdown).textContent() || '0', 10);
    const minutes = parseInt(await this.minutesCircle.locator(common.selector.landingPage.lobby.future.timerCountdown).textContent() || '0', 10);
    const seconds = parseInt(await this.secondsCircle.locator(common.selector.landingPage.lobby.future.timerCountdown).textContent() || '0', 10);
    return { days, hours, minutes, seconds };
  }

  async isCameraOff(): Promise<boolean> {
    const text = await this.cameraStatus.textContent();
    return text?.includes('off') ?? false;
  }

  async isJoinAllowed(): Promise<boolean> {
    const time = await this.getCountdownTime();
    const totalMinutes = time.hours * 60 + time.minutes + (time.seconds > 0 ? 1 : 0);
    return totalMinutes <= 10;
  }

  async joinSession() {
    await expect(this.joinButton).not.toBeDisabled();
    await this.joinButton.click();
  }

  async selectActivity(name: string) {
    await this.activityDropdown.click();
    await this.page.locator(`#activity-type .ts-select-option:has-text("${name}")`).click();
  }

  async selectHRFlowByName(name: string) {
    await this.hrFlowDropdown.click();
    await this.page.locator(`#timer-hr-flow .dropdown-timer-name:has-text("${name}")`).click();
  }

  async toggleDevice(device: Locator) {
    await device.click();
  }

  async toggleHRFlow(enabled: boolean) {
    const isChecked = await this.timerSwitch.isChecked();
    if (isChecked !== enabled) {
      await this.timerSwitch.click();
    }
  }

  async verifyClients(selectedClient: string) {
    const clientNames = await this.getClientNames();
    await expect(clientNames.length).toBeGreaterThan(0);
    await expect(clientNames).toContain(selectedClient);
  }

  async verifyCountdownTime() {
    const countdown = await this.getCountdownTime();
    const joinAllowed = await this.isJoinAllowed();

    if (joinAllowed) {
      await expect(this.joinButton).toBeVisible();
    } else {
      await expect(this.joinButton).not.toBeVisible();
    }
    return countdown
  }
}

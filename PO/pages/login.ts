import { Locator, Page } from "@playwright/test"
import { common } from "../../fixtures/common";
import { credentials } from "../../fixtures/credentials";
import { Generic } from "../methods/generic"

export class loginPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordLabel: Locator;
  readonly trainerLogin: string;
  readonly invalidTrainerLogin: string;
  readonly incompleteTrainerLogin: string;
  readonly trainerPassword: string;
  readonly invalidPassword: string;
  readonly authButton: Locator;
  readonly loginLabel: Locator;
  readonly eyeButton: Locator;
  readonly passwordForgot: Locator;
  readonly resetPasswordButton: Locator;
  readonly register: Locator;
  readonly newPasswordInput: Locator;
  readonly newPasswordLabel: Locator;
  readonly backToSignIn: Locator;
  readonly login: Locator;
  readonly divider: Locator;
  readonly googleLogo: Locator;
  readonly googleButton: Locator;
  readonly validation: Locator;
  readonly feedback: Locator;
  readonly termsAgreement: Locator;
  readonly termsAgreementCheckbox: Locator;
  readonly disclaimer: Locator;
  readonly codeLabel: Locator;
  readonly codeInput: Locator;
  readonly resendCode: Locator;
  readonly header: Locator;
  readonly subHeader: Locator;
  readonly logo: Locator;
  readonly paragraph: Locator;
  readonly getHelpButton: Locator;
  readonly getHelpIcon: Locator;
  readonly sendCode: Locator;
  readonly invalidEmail: Locator;

  readonly generic = new Generic(this.page);

  constructor(private page: Page) {
    this.loginInput = page.getByTestId(common.input.email).locator(common.selector.generic.input);
    this.passwordInput = page.getByTestId(common.input.password).locator(common.selector.generic.input);
    this.trainerLogin = credentials.trainer.validlogin
    this.invalidTrainerLogin = credentials.trainer.invalidLogin;
    this.incompleteTrainerLogin = credentials.trainer.incompleteLogin;
    this.trainerPassword = credentials.trainer.validPassword;
    this.invalidPassword = credentials.trainer.invalidPassword;
    this.authButton = page.locator(common.selector.button.auth);
    this.loginLabel = page.getByTestId(common.input.email).locator(common.selector.generic.label);
    this.passwordLabel = page.getByTestId(common.input.password).locator(common.selector.generic.label);
    this.eyeButton = page.getByTestId(common.selector.loginPage.eyeButton);
    this.register = page.getByTestId(common.selector.loginPage.register);
    this.backToSignIn = page.getByTestId(common.selector.loginPage.backToSignIn);
    this.newPasswordLabel = page.getByTestId(common.selector.loginPage.newPassword).locator(common.selector.generic.label);
    this.newPasswordInput = page.getByTestId(common.selector.loginPage.newPassword).locator(common.selector.generic.input);
    this.login = page.getByTestId(common.selector.loginPage.login);
    this.passwordForgot = page.getByTestId(common.selector.loginPage.passwordForgot);
    this.divider = page.getByTestId(common.selector.generic.divider);
    this.googleButton = page.getByTestId(common.selector.loginPage.googleButton);
    this.googleLogo = page.getByTestId(common.selector.loginPage.googleButton).locator(common.selector.loginPage.googleLogo);
    this.validation = page.getByTestId(common.selector.generic.validation);
    this.feedback = page.getByTestId(common.selector.generic.errorFeedback);
    this.termsAgreement = page.getByTestId(common.selector.loginPage.terms);
    this.termsAgreementCheckbox = page.getByTestId(common.selector.generic.checkbox);
    this.disclaimer = page.getByTestId(common.selector.loginPage.authenticationDisclaimer);
    this.codeLabel = page.getByTestId(common.selector.loginPage.confirmationCode).locator(common.selector.generic.label);
    this.codeInput = page.getByTestId(common.selector.loginPage.confirmationCode).locator(common.selector.generic.input);
    this.resendCode = page.getByTestId(common.selector.loginPage.resendCode);
    this.header = page.locator(common.selector.generic.header);
    this.subHeader = page.locator(common.selector.generic.subHeader);
    this.logo = page.getByTestId(common.selector.generic.logo);
    this.paragraph = page.locator(common.selector.generic.paragraph);
    this.resetPasswordButton = page.getByTestId(common.selector.loginPage.resetPassword);
    this.sendCode = page.getByTestId(common.selector.loginPage.sendVerificationCode);
    this.invalidEmail = page.getByTestId(common.selector.loginPage.invalidEmail);
  }
}

import { test } from '@playwright/test';
import { common } from "../../../fixtures/common";
import { Generic } from '../../../PO/methods/generic';
import { loginPage } from '../../../PO/pages/login';
import { landingPage } from '../../../PO/pages/landing';

test.describe('Login page', () => {
  let method: Generic;
  let login: loginPage;
  let landing: landingPage;

  test.beforeEach(async ({ page }) => {
    method = new Generic(page);
    login = new loginPage(page);
    landing = new landingPage(page);

    await method.visitPage(common.url.e2e.login);
    await method.waitForPageToFullLoad();
    await page.route('**', route => route.continue());
  });

  test.describe('Verify: ', () => {
    test("Component", async () => {
      test.step('Spott logo and Title', async () => {
        await method.isVisible(login.logo);
        await method.verifyLogoAndTitle(login.logo);
      });

      test.step('Spott logo and Title', async () => {
        await method.isVisible(login.logo);
        await method.verifyLogoAndTitle(login.logo);
      });

      test.step('Header', async () => {
        await method.isVisible(login.header);
        await method.verifyText(login.header, common.text.signIn)
      });

      test.step('Subheader', async () => {
        await method.isVisible(login.subHeader);
        await method.verifyText(login.subHeader, common.text.subHeader.missingAccount)
      });

      test.step('SignUp and href', async () => {
        await method.isVisible(login.register);
        await method.verifyText(login.register, common.text.signUp);
        await method.verifyLink(login.register, common.href.register);
      });

      test.step('Login input label', async () => {
        await method.isVisible(login.loginLabel);
        await method.verifyText(login.loginLabel, common.text.email);
      });

      test.step('Login empty input', async () => {
        await method.isVisible(login.loginInput);
        await method.isEmpty(login.loginInput);
      });

      test.step('Password input label', async () => {
        await method.isVisible(login.passwordLabel);
        await method.verifyText(login.passwordLabel, common.text.password);
      });

      test.step('Password empty input', async () => {
        await method.isVisible(login.passwordInput);
        await method.isEmpty(login.passwordInput);
      });

      test.step('Password filled input', async () => {
        await method.isVisible(login.passwordInput);
        await method.isEmpty(login.passwordInput);
        await method.typeAndVerifyInput(login.passwordInput, login.trainerPassword)
      });

      test.step('Eye button', async () => {
        await method.isVisible(login.eyeButton);
      });

      test.step('Login button', async () => {
        await method.isVisible(login.authButton);
        await method.verifyText(login.authButton, common.text.signIn)
      });

      test.step('Forgot password and href', async () => {
        await method.isVisible(login.passwordForgot);
        await method.verifyText(login.passwordForgot, common.text.forgot)
        await method.verifyLink(login.passwordForgot, common.href.forgot)
      });

      test.step('OR divider', async () => {
        await method.isVisible(login.divider);
        await method.verifyText(login.divider, common.text.or)
      });

      test.step('SignIn with Google button', async () => {
        await method.isVisible(login.googleButton);
        await method.verifyText(login.googleButton, common.text.googleSignIn)
        await method.isVisible(login.googleLogo);
      });
    });

    test('Eye button - hide', async () => {
      await method.isVisible(login.eyeButton);
      await method.haveInvalidClass(login.eyeButton, common.class.visible)
    });

    test('Eye button - unhide', async () => {
      await method.isVisible(login.eyeButton);
      await method.clickElement(login.eyeButton);
      await method.haveValidClass(login.eyeButton, common.class.visible);
    });

    test('Login filled input', async () => {
      await method.isVisible(login.loginInput);
      await method.isEmpty(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.trainerLogin);
    });

    test('Missing login validation', async () => {
      await method.isVisible(login.loginInput);
      await method.isEmpty(login.loginInput);
      await method.typeAndVerifyInput(login.passwordInput, login.trainerPassword);
      await method.clickElement(login.authButton);
      await method.verifyText(login.validation, common.text.validation.missingLogin)
    });

    test('Invalid login validation', async () => {
      await method.isVisible(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.invalidTrainerLogin);
      await method.typeAndVerifyInput(login.passwordInput, login.trainerPassword);
      await method.clickElement(login.authButton);
      await method.verifyText(login.validation, common.text.validation.invalidCredentials);
    });

    test('Login incomplete validation', async () => {
      await method.isVisible(login.loginInput);
      await method.isEmpty(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.incompleteTrainerLogin);
      await login.loginInput.blur();
      await method.verifyText(login.feedback, common.text.validation.incompleteEmail);
    });

    test('Missing password validation', async () => {
      await method.isVisible(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.trainerLogin);
      await method.isEmpty(login.passwordInput);
      await method.clickElement(login.authButton);
      await method.verifyText(login.validation, common.text.validation.missingPassword);
    });

    test('Invalid password validation', async () => {
      await method.isVisible(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.trainerLogin);
      await method.typeAndVerifyInput(login.passwordInput, login.invalidPassword);
      await method.clickElement(login.authButton);
      await method.verifyText(login.validation, common.text.validation.invalidCredentials)
    });

    test('Missing login and password validation', async () => {
      await method.isVisible(login.loginInput);
      await method.isEmpty(login.loginInput);
      await method.isEmpty(login.passwordInput);
      await method.clickElement(login.authButton);
      await method.verifyText(login.validation, common.text.validation.missingLogin);
    });

    test('SignUp form', async () => {
      await method.isVisible(login.register);
      await method.clickElement(login.register);
      await method.verifyText(login.header, common.text.signUp);
      await method.verifyText(login.subHeader, common.text.subHeader.existingAccount);
      await method.verifyLink(login.login, common.href.login);
      await method.verifyText(login.login, common.text.signIn);
      await method.verifyText(login.loginLabel, common.text.email);
      await method.isEmpty(login.loginInput);
      await method.verifyText(login.passwordLabel, common.text.password);
      await method.isEmpty(login.passwordInput);
      await method.haveInvalidClass(login.eyeButton, common.class.visible);
      await method.clickElement(login.eyeButton);
      await method.haveValidClass(login.eyeButton, common.class.visible);
      await method.verifyText(login.termsAgreement, common.text.agreement);
      await method.isNotChecked(login.termsAgreementCheckbox);
      await method.clickElement(login.termsAgreementCheckbox);
      await method.isChecked(login.termsAgreementCheckbox);
      await method.verifyText(login.authButton, common.text.signUp);
      await method.isDisabled(login.authButton);
      await method.verifyText(login.divider, common.text.or);
      await method.isVisible(login.googleLogo);
      await method.verifyText(login.googleButton, common.text.googleSignUp);
    });

    test('Password Forgot form', async () => {
      await method.isVisible(login.passwordForgot);
      await method.clickElement(login.passwordForgot);
      await method.verifyLogoAndTitle(login.logo);
      await method.verifyText(login.header, common.text.forgot);
      await method.verifyText(login.paragraph, common.text.subHeader.email);
      await method.verifyText(login.loginLabel, common.text.email);
      await method.isEmpty(login.loginInput);
      await method.verifyText(login.sendCode, common.text.sendCode);
      await method.verifyText(login.backToSignIn, common.text.back);
    });

    test('Password forgot form - Set new password', async () => {
      await method.isVisible(login.passwordForgot);
      await method.clickElement(login.passwordForgot);
      await method.typeAndVerifyInput(login.loginInput, "spotttrainer@gmail.com")
      await method.clickElement(login.sendCode);
      await method.verifyLogoAndTitle(login.logo);
      await method.verifyText(login.header, common.text.setPassword);
      await method.verifyText(login.subHeader, "Please enter the confirmation code that we’ve just sent to: spotttrainer@gmail.com")
      await method.verifyText(login.codeLabel, common.text.code);
      await method.isEmpty(login.codeInput);
      await method.verifyText(login.newPasswordLabel, common.text.newPassword);
      await method.isEmpty(login.newPasswordInput);
      await method.verifyText(login.resetPasswordButton, common.text.resetPassword);
      await method.isDisabled(login.resetPasswordButton);
      await method.verifyText(login.divider, common.text.emailReceive);
      await method.verifyText(login.disclaimer, common.text.disclaimer);
      await method.verifyText(login.resendCode, common.text.resendCode);
      await method.verifyText(login.invalidEmail, common.text.emailInvalid);
    });

    test('Password forgot form - not existing trainer validation', async () => {
      await method.isVisible(login.passwordForgot);
      await method.clickElement(login.passwordForgot);
      await method.typeAndVerifyInput(login.loginInput, "notexistingtrainer@gmail.com");
      await method.clickElement(login.sendCode);
      await method.isVisible(login.validation);
      await method.verifyText(login.validation, common.text.validation.missingUsername);
    });
  });

  test.describe('Functional: ', () => {
    test('Properly logs in and logs out', async () => {
      await method.isVisible(login.loginInput);
      await method.typeAndVerifyInput(login.loginInput, login.trainerLogin);
      await method.typeAndVerifyInput(login.passwordInput, login.trainerPassword);
      await method.clickElement(login.authButton);
      await method.verifyUrl(common.url.e2e.landing);
      await method.clickElement(landing.userMenuToggle);
      await method.clickElement(landing.signOutButton);
      await method.verifyUrl(common.url.e2e.login);
    });
  });
});

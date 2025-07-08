import { BASE_FRONTEND_URL } from "../playwright.config";

export const common = {
	selector: {
		generic: {
			paragraph: 'p',
			header: 'h1',
			logo: 'spottLogo',
			subHeader: '.large-paragraph',
			label: 'label',
			inputLabel: '.ts-input-label',
			link: '.link',
			divider: 'orDivider',
			validation: 'validationError',
			errorFeedback: 'invalidFeedback',
			checkbox: 'checkboxComponent',
			input: '.ts-input',
			autocompleteInput: 'autocompleteInput',
			tagifyInput: '.tagify__input',
			span: 'span',
			datepicker: 'sessionDatepicker',
			spinner: '.ts-button__loader',
			calendarSpinner: '.spinner-border',
			button: 'button',
			arrow: '.arrow',
		},
		loginPage: {
			googleLogo: '.logo',
			eyeButton: 'showHidePasswordButton',
			register: 'registerAccountLink',
			login: 'loginAccountLink',
			googleButton: 'googleButton',
			terms: 'spottTermsOfService',
			passwordForgot: 'forgotPasswordLink',
			backToSignIn: 'backToSignInLink',
			confirmationCode: 'confirmationCode',
			newPassword: 'newPassword',
			resetPassword: 'resetPassword',
			authenticationDisclaimer: 'authenticationDisclaimer',
			sendVerificationCode: 'sendVerificationCode',
			resendCode: 'resendCodeButton',
			invalidEmail: 'invalidEmailLink'
		},
		faqPage: {
			header: 'faqHeader',
			section: 'faqSection',
			paragraph: 'faqParagraphText',
			point: 'faqParagraphPoint',
			dash: 'faqParagraphDash',
			bolded: 'faqBoldedPoint',
			singleSection: 'faqSingleSection'
		},
		landingPage: {
			userMenuToggle: 'userMenuButton',
			userMenuList: 'userMenuListItems',
			userMenuTrainerAccount: 'trainerAccountMenuItem',
			userMenuClub: 'clubMenuItem',
			userMenuMembership: 'membershipMenuItem',
			userMenuLogout: 'logoutMenuItem',
			userMenuItem: '.ts-user-menu-item',
			createSessionModalButton: "createSessionModalButton",
			confirmationPopup: '.custom-swal-title',
			calendarSession: '.fc-event-title',
			popup: {
				sessionSingleData: '.fc-event-info',
				button: {
					delete: 'sessionCancelButton',
				}
			},
			createSessionModal: {
				title: 'createSessionTitle',
				sessionTitleComponent: 'sessionTitleComponent',
				activityTypeDropdown: 'activityTypeDropdown',
				clientsInput: '#clients tags',
				sessionTypeSlider: 'sessionTypeSlider',
				createSessionButton: 'createSessionEntityButton',
				cancelSessionButton: 'cancelCreatingSessionButton',
				sessionClients: 'sessionClientsComponent',
				singleClient: '.tagify__dropdown__item ',
				startTimeDropdown: "#time-dropdown-time-start",
				singlePill: 'tag',
				selectedValue: ".selected-value",
				datepickerIcon: '.calendar-icon',
				sessionTimeZone: "sessionTimezoneDropdown",
				singleTimeZone: "timezoneSelectOption",
				sessionRepeat: "sessionRepeatButton",
				lineDivider: "lineDivider",
				presetTimerFlow: "presetTimerFlow",
				presetTimerSelector: "sessionTimerAndHrFlowSelector",
				sessionNotes: "sessionNotes",
				sessionNotesInput: "sessionNotesInput",
				switchComponent: "switchComponent",
			}
		},
		button: {
			auth: '.auth-button'
		},
		attribute: {
			name: {
				href: 'href',
			},
			value: {
			}
		},
		className: {

		},
	},
	input: {
		email: 'loginInput',
		password: 'passwordInput',
	},
	class: {
		visible: /show/,
		collapsed: /collapsed/,
		expanded: /not-collapsed/
	},
	text: {
		confirmationPopup: {
			success: 'Session created successfully',
			removed: 'Session cancelled successfully'
		},
		type: {
			liveRemote: "Live  Remote",
			liveInPerson: "Live  In-Person",
			prescribed: "Prescribed"
		},
		title: {
			inPerson: 'PW Test In Person Session',
			remote: 'PW Test Remote Session',
			prescribed: 'PW Test Prescribed Session'
		},
		faq: {
			header: 'Frequently Asked Questions'
		},
		sessionDetails: {
			label: {
				sessionType: "Session Type:",
				time: "Time:",
				singleParticipant: "Invited:",
				multiParticipants: "Invited:",
				joined: "Joined:",
				activityType: "Activity type:"
			},
			type: {
				inPerson: "Live In-Person",
				remote: "Live Remote"
			}
		},
		activities: {
			basic: 'Basic'
		},
		createSession: 'Create Session',
		agreement: "I agree to The Spott's Licence Agreement and Privacy Policy",
		or: 'OR',
		disclaimer: "You won't be receiving an email from us if you haven't signed up with the same email address before",
		pageTitle: "The Spott",
		signIn: 'Sign In',
		signUp: 'Sign Up',
		signOut: 'Sign Out',
		subHeader: {
			existingAccount: 'Already have an account? Sign In',
			missingAccount: 'Don’t have an account? Sign Up',
			email: "Please provide the email associated with the account."
		},
		cancel: 'Cancel',
		confirm: 'Confirm',
		delete: 'Delete',
		back: "Back to Sign In",
		sendCode: "Send Verification Code",
		resendCode: 'Resend the code',
		email: 'Email Address',
		emailReceive: "Didn't receive an email?",
		emailInvalid: 'Invalid email address?',
		password: 'Password',
		code: 'Confirmation Code',
		setPassword: "Set new password",
		newPassword: 'New password',
		forgot: 'Forgot password?',
		resetPassword: 'Reset password',
		googleSignIn: 'Sign In with Google',
		googleSignUp: 'Sign Up with Google',
		validation: {
			missingPassword: 'Password cannot be empty',
			missingLogin: 'Email cannot be empty',
			invalidCredentials: 'Oops! Invalid username or password. Please try again.',
			incompleteEmail: "Please make sure the email address is correct.",
			missingUsername: "Username not found"
		}
	},
	url: {
		e2e: {
			login: `${BASE_FRONTEND_URL}/login`,
			landing: `${BASE_FRONTEND_URL}/sessions`,
			faq: `${BASE_FRONTEND_URL}/FAQ`
		},
		api: {
			login: {
				init: "https://trainer.dev.the-spott.com/api/init",
				locale: "https://euc-widget.freshworks.com/widgetBase/locales/en.json",
				amazonId: "https://cognito-identity.eu-west-1.amazonaws.com/",
			},
			landing: {
				trainerInit: "https://trainer.dev.the-spott.com/api/trainer-init",
				club: {
					validId: "https://trainer.dev.the-spott.com/api/club?id=2443",
					notExistingId: "https://trainer.dev.the-spott.com/api/club?id=22222",
					invalidId: "https://trainer.dev.the-spott.com/api/club?id=invalid_id",
				},
				clients: "https://trainer.dev.the-spott.com/api/clients/",
				sessions: {
					withoutParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1",
					validParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1?start=2024-09-29T22%3A00%3A00.000Z&end=2024-11-10T23%3A00%3A00.000Z",
					invalidParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1?start=invalid&end=date"
				},
				create: {
					session: "https://trainer.dev.the-spott.com/apiv2/sessions/session/1"
				},
				cancel: {
					session: 'https://trainer.dev.the-spott.com/apiv2/sessions/cancel-single-recurrence/1?id='
				}
			}
		}
	},
	href: {
		login: '/login',
		register: '/register',
		forgot: '/forgot-password',
	},
	api: {
		params: {
			clients: {
				valid: { "page": 1, "perPage": 25, "search": "" },
				invalid: { "page": 'invalid', "perPage": 'parameters', "search": "test" }
			}
		}
	}
};

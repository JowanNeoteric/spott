import { BASE_FRONTEND_URL } from "../playwright.config";

export const common = {
	class: {
		collapsed: /collapsed/,
		disabled: /disabled/,
		expanded: /not-collapsed/,
		hidden: /hidden/,
		loading: /loading/,
		microphone: /fa-microphone/,
		toggled: /toggled/,
		videoDisabled: /video-disabled/,
		videoEnabled: /video-enabled/,
		visible: /show/,
	},
	href: {
		forgot: '/forgot-password',
		login: '/login',
		register: '/register',
	},
	input: {
		email: 'loginInput',
		password: 'passwordInput',
	},
	api: {
		params: {
			clients: {
				invalid: { "page": 'invalid', "perPage": 'parameters', "search": "test" },
				valid: { "page": 1, "perPage": 25, "search": "" }
			}
		}
	},
	selector: {
		attribute: {
			name: {
				href: 'href',
				source: 'src',
			},
			value: {
				off: /.*off.*/,
			}
		},
		button: {
			auth: '.auth-button'
		},
		className: {

		},
		faqPage: {
			bolded: 'faqBoldedPoint',
			dash: 'faqParagraphDash',
			header: 'faqHeader',
			paragraph: 'faqParagraphText',
			point: 'faqParagraphPoint',
			section: 'faqSection',
			singleSection: 'faqSingleSection'
		},
		generic: {
			arrow: '.arrow',
			autocompleteInput: 'autocompleteInput',
			button: 'button',
			calendarSpinner: '.spinner-border',
			checkbox: 'checkboxComponent',
			datepicker: 'sessionDatepicker',
			divider: 'orDivider',
			errorFeedback: 'invalidFeedback',
			header: 'h1',
			input: '.ts-input',
			inputLabel: '.ts-input-label',
			label: 'label',
			link: '.link',
			logo: 'spottLogo',
			paragraph: 'p',
			span: 'span',
			spinner: '.ts-button__loader',
			subHeader: '.large-paragraph',
			tagifyInput: '.tagify__input',
			validation: 'validationError',
		},
		landingPage: {
			calendarSession: '.fc-event-title',
			confirmationPopup: '.custom-swal-title',
			createSessionModalButton: "createSessionModalButton",
			joinSessionButton: 'joinSessionButton',
			sessionDetailsPopup: 'sessionDetailsPopup',
			sessionList: '.fc-events-list-container',
			lobby: {
				current: {
				},
				future: {
					labelText: '.label-text',
					scheduledStart: '.waiting-room-status-title',
					timerCountdown: '.pulse-text',
				}
			},
			createSessionModal: {
				activityTypeDropdown: 'activityTypeDropdown',
				cancelSessionButton: 'cancelCreatingSessionButton',
				clientsInput: '#clients tags',
				createSessionButton: 'createSessionEntityButton',
				datepickerIcon: '.calendar-icon',
				lineDivider: "lineDivider",
				presetTimerFlow: "presetTimerFlow",
				presetTimerSelector: "sessionTimerAndHrFlowSelector",
				selectedValue: ".selected-value",
				sessionClients: 'sessionClientsComponent',
				sessionNotes: "sessionNotes",
				sessionNotesInput: "sessionNotesInput",
				sessionRepeat: "sessionRepeatButton",
				sessionTimeZone: "sessionTimezoneDropdown",
				sessionTitleComponent: 'sessionTitleComponent',
				singleClient: '.tagify__dropdown__item ',
				singlePill: 'tag',
				singleTimeZone: "timezoneSelectOption",
				startTimeDropdown: "#time-dropdown-time-start",
				switchComponent: "switchComponent",
				title: 'createSessionTitle',
				sessionTypeSlider: 'sessionTypeSlider',
			},
			popup: {
				sessionSingleData: '.fc-event-info',
				button: {
					delete: 'sessionCancelButton',
				}
			},
			userMenuClub: 'clubMenuItem',
			userMenuItem: '.ts-user-menu-item',
			userMenuList: 'userMenuListItems',
			userMenuLogout: 'logoutMenuItem',
			userMenuMembership: 'membershipMenuItem',
			userMenuToggle: 'userMenuButton',
			userMenuTrainerAccount: 'trainerAccountMenuItem',
		},
		loginPage: {
			authenticationDisclaimer: 'authenticationDisclaimer',
			backToSignIn: 'backToSignInLink',
			confirmationCode: 'confirmationCode',
			eyeButton: 'showHidePasswordButton',
			googleButton: 'googleButton',
			googleLogo: '.logo',
			invalidEmail: 'invalidEmailLink',
			login: 'loginAccountLink',
			newPassword: 'newPassword',
			passwordForgot: 'forgotPasswordLink',
			register: 'registerAccountLink',
			resetPassword: 'resetPassword',
			resendCode: 'resendCodeButton',
			sendVerificationCode: 'sendVerificationCode',
			terms: 'spottTermsOfService',
		},
	},
	text: {
		activities: {
			basic: 'Basic'
		},
		agreement: "I agree to The Spott's Licence Agreement and Privacy Policy",
		back: "Back to Sign In",
		cancel: 'Cancel',
		code: 'Confirmation Code',
		confirm: 'Confirm',
		confirmationPopup: {
			removed: 'Session cancelled successfully',
			success: 'Session created successfully'
		},
		createSession: 'Create Session',
		delete: 'Delete',
		disclaimer: "You won't be receiving an email from us if you haven't signed up with the same email address before",
		email: 'Email Address',
		emailInvalid: 'Invalid email address?',
		emailReceive: "Didn't receive an email?",
		faq: {
			header: 'Frequently Asked Questions'
		},
		forgot: 'Forgot password?',
		googleSignIn: 'Sign In with Google',
		googleSignUp: 'Sign Up with Google',
		inSession: {
			emergencyDetails: 'Emergency details',
			preparation1: 'Checking if you can join the room...',
			preparation2: 'Preparing the room...',
			preparation3: 'Connecting...',
			timerCountdown: '00:10',
			timerInterval: '1 of 3',
			timerNames: {
				testTimer1: 'Test Timer1',
				testTimer2: 'Test Timer2',
				testTimer3: 'Test Timer3'
			}
		},
		newPassword: 'New password',
		or: 'OR',
		pageTitle: "The Spott",
		password: 'Password',
		resetPassword: 'Reset password',
		resendCode: 'Resend the code',
		sendCode: "Send Verification Code",
		sessionDetails: {
			label: {
				activityType: "Activity type:",
				joined: "Joined:",
				multiParticipants: "Invited:",
				sessionType: "Session Type:",
				singleParticipant: "Invited:",
				time: "Time:"
			},
			trainer: 'Spott T.',
			type: {
				inPerson: "Live In-Person",
				remote: "Live Remote"
			}
		},
		setPassword: "Set new password",
		signIn: 'Sign In',
		signOut: 'Sign Out',
		signUp: 'Sign Up',
		subHeader: {
			email: "Please provide the email associated with the account.",
			existingAccount: 'Already have an account? Sign In',
			missingAccount: 'Don’t have an account? Sign Up'
		},
		title: {
			inPerson: 'PW Test In Person Session',
			prescribed: 'PW Test Prescribed Session',
			remote: 'PW Test Remote Session'
		},
		type: {
			liveInPerson: "Live  In-Person",
			liveRemote: "Live  Remote",
			prescribed: "Prescribed"
		},
		validation: {
			incompleteEmail: "Please make sure the email address is correct.",
			invalidCredentials: 'Oops! Invalid username or password. Please try again.',
			missingLogin: 'Email cannot be empty',
			missingPassword: 'Password cannot be empty',
			missingUsername: "Username not found"
		},
		waitingRoom: {
			days: 'days',
			hours: 'hours',
			joinButton: 'Joining Session: Live Remote ',
			minutes: 'minutes',
			scheduled: 'This session is scheduled to start in:',
			seconds: 'seconds',
			timerHrFlow: 'Timer & HR Flow'
		}
	},
	url: {
		api: {
			landing: {
				cancel: {
					session: 'https://trainer.dev.the-spott.com/apiv2/sessions/cancel-single-recurrence/1?id='
				},
				club: {
					invalidId: "https://trainer.dev.the-spott.com/api/club?id=invalid_id",
					notExistingId: "https://trainer.dev.the-spott.com/api/club?id=22222",
					validId: "https://trainer.dev.the-spott.com/api/club?id=2443",
				},
				clients: "https://trainer.dev.the-spott.com/api/clients/",
				create: {
					session: "https://trainer.dev.the-spott.com/apiv2/sessions/session/1"
				},
				sessions: {
					invalidParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1?start=invalid&end=date",
					validParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1?start=2024-09-29T22%3A00%3A00.000Z&end=2024-11-10T23%3A00%3A00.000Z",
					withoutParameters: "https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1",
				},
				trainerInit: "https://trainer.dev.the-spott.com/api/trainer-init",
			},
			login: {
				amazonId: "https://cognito-identity.eu-west-1.amazonaws.com/",
				init: "https://trainer.dev.the-spott.com/api/init",
				locale: "https://euc-widget.freshworks.com/widgetBase/locales/en.json",
			}
		},
		e2e: {
			faq: `${BASE_FRONTEND_URL}/FAQ`,
			landing: `${BASE_FRONTEND_URL}/sessions`,
			login: `${BASE_FRONTEND_URL}/login`,
		}
	}
};

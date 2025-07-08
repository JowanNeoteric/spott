import { test } from '@playwright/test';
import { common } from "../../fixtures/common";
import { GenerateToken } from '../../PO/api/token';
import { ApiCall } from '../../PO/api/call';
import { Payload } from '../../fixtures/api/params';
const translation = JSON.parse(JSON.stringify(require("../../fixtures/api/json/en_locale.json")));
const session = JSON.parse(JSON.stringify(require("../../fixtures/api/json/session_error.json")));
const club = JSON.parse(JSON.stringify(require("../../fixtures/api/json/club_error.json")));
const clients = JSON.parse(JSON.stringify(require("../../fixtures/api/json/clients_error.json")));
const date = JSON.parse(JSON.stringify(require("../../fixtures/api/json/date_format_error.json")));
const requiredDate = JSON.parse(JSON.stringify(require("../../fixtures/api/json/date_required_error.json")));
const invalidId = JSON.parse(JSON.stringify(require("../../fixtures/api/json/club_invalid_id_error.json")));

test.describe('Login page API tests', () => {
  let token: GenerateToken;
  let apiCall: ApiCall;
  let payload: Payload;

  test.beforeEach(async ({ request }) => {
    token = new GenerateToken;
    apiCall = new ApiCall(request);
    payload = new Payload;
  });

  test.describe('Verify status codes: ', () => {
    test('page init request', async () => {
      const init = await apiCall.getRequest(common.url.api.login.init)
      await apiCall.expectedStatus(init, 200);
    });

    test('translation json', async () => {
      const json = await apiCall.getRequest(common.url.api.login.locale);
      await apiCall.expectedStatus(json, 200);
    });

    test('cognito request with token IdentityId', async () => {
      const identityId = await apiCall.postRequest(common.url.api.login.amazonId, null, payload.IdentityId);
      await apiCall.expectedStatus(identityId, 200);
    });

    test('cognito request with tokenPool', async () => {
      const tokenPool = await apiCall.postRequest(common.url.api.login.amazonId, null, payload.IdentityPoolId);
      await apiCall.expectedStatus(tokenPool, 200);
    });

    test('getTrainer', async () => {
      const addToken = await token.getToken();
      const getTrainer = await apiCall.getRequest(common.url.api.landing.trainerInit, addToken);
      await apiCall.expectedStatus(getTrainer, 200);
    });

    test('getClub - valid ClubId', async () => {
      const addToken = await token.getToken();
      const getClub = await apiCall.getRequest(common.url.api.landing.club.validId, addToken);
      await apiCall.expectedStatus(getClub, 200);
    });

    test('getClub - not existing Clubid', async () => {
      const addToken = await token.getToken();
      const getNonExistingClub = await apiCall.getRequest(common.url.api.landing.club.notExistingId, addToken);
      await apiCall.expectedStatus(getNonExistingClub, 410);
    });

    test('getClub - invalid Clubid', async () => {
      const addToken = await token.getToken();
      const getInvalidClubId = await apiCall.getRequest(common.url.api.landing.club.invalidId, addToken);
      await apiCall.expectedStatus(getInvalidClubId, 422);
    });

    test('getClients', async () => {
      const addToken = await token.getToken();
      const getClients = await apiCall.postRequest(common.url.api.landing.clients, addToken, common.api.params.clients.valid);
      await apiCall.expectedStatus(getClients, 200);
    });

    test('getClients - invalid parameters', async () => {
      const addToken = await token.getToken();
      const getClients = await apiCall.postRequest(common.url.api.landing.clients, addToken, common.api.params.clients.invalid);
      await apiCall.expectedStatus(getClients, 422);
    });

    test('getSessions', async () => {
      const addToken = await token.getToken();
      const getSessions = await apiCall.getRequest(common.url.api.landing.sessions.validParameters, addToken, null);
      await apiCall.expectedStatus(getSessions, 200);
    });

    test('getSessions - invalid date', async () => {
      const addToken = await token.getToken();
      const getSessions = await apiCall.getRequest(common.url.api.landing.sessions.invalidParameters, addToken);
      await apiCall.expectedStatus(getSessions, 422);
    });
  });

  test.describe('Body of response: ', () => {
    test('page init request', async () => {
      const response = (await apiCall.getRequest(common.url.api.login.init));
      await apiCall.expectedProperty(response, "data.feature_flags.cohort_code", false);
    });

    test('translation json', async () => {
      const response = (await apiCall.getRequest(common.url.api.login.locale));
      await apiCall.jsonCompare(response, translation)
    });

    test('getTrainer', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.trainerInit, addToken);
      await apiCall.expectedProperty(response, "data.user.first_name", "Spott");
      await apiCall.expectedProperty(response, "data.user.last_name", "Trainer");
    });

    test('getSessions - without parameters', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.sessions.withoutParameters, addToken);
      await apiCall.jsonCompare(response, requiredDate);
    });

    test('getSessions - invalid parameters', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.sessions.invalidParameters, addToken);
      await apiCall.jsonCompare(response, date)
    });

    test('getClients - valid parameters', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.postRequest(common.url.api.landing.clients, addToken, common.api.params.clients.valid);
      await apiCall.expectedProperty(response, "data.items[0].club_id", 2443);
    });

    test('getClients - invalid parameters', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.postRequest(common.url.api.landing.clients, addToken, common.api.params.clients.invalid);
      await apiCall.jsonCompare(response, clients)
    });

    test('getClub - valid parameters', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.club.validId, addToken);
      await apiCall.expectedProperty(response, "data.id", 2443);
      await apiCall.expectedProperty(response, "data.name", "Test Club");
    });

    test('getClub - not existing id', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.club.notExistingId, addToken);
      await apiCall.jsonCompare(response, club)
    });

    test('getClub - invalid id', async () => {
      const addToken = await token.getToken();
      const response = await apiCall.getRequest(common.url.api.landing.club.invalidId, addToken);
      await apiCall.jsonCompare(response, invalidId)
    });
  });
});

import { test } from '@playwright/test';
import { common } from "../../fixtures/common";
import { GenerateToken } from '../../PO/api/token';
import { ApiCall } from '../../PO/api/call';
import { Payload } from '../../fixtures/api/params';
const sessionSuccess = JSON.parse(JSON.stringify(require("../../fixtures/api/json/session_success.json")));
const sessionCanceled = JSON.parse(JSON.stringify(require("../../fixtures/api/json/session_canceled.json")));
const sessionMissingData = JSON.parse(JSON.stringify(require("../../fixtures/api/json/session_missing_data.json")));

test.describe('Create and remove session API tests', () => {
  let token: GenerateToken;
  let apiCall: ApiCall;
  let payload: Payload;

  test.beforeEach(async ({ request }) => {
    token = new GenerateToken;
    apiCall = new ApiCall(request);
    payload = new Payload;
  });

  test.describe('Live Remote', () => {
    test('Single client - Basic activity', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, payload.liveRemoteSingle);
      await apiCall.expectedStatus(createSession, 200);
      await apiCall.jsonCompare(createSession, sessionSuccess);
      const details = await apiCall.getCurrentSession(payload.liveRemoteSingle.name, addToken);
      await apiCall.verifySession(addToken, details.sessionId, 200);
      const cancelSession = await apiCall.patchRequest(common.url.api.landing.cancel.session + `${details.sessionId}`, addToken, payload.cancelSession)
      await apiCall.expectedStatus(cancelSession, 200);
      await apiCall.jsonCompare(cancelSession, sessionCanceled);
      await apiCall.verifySession(addToken, details.sessionId, 410);
    });

    test('Single client - empty payload', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, null);
      await apiCall.expectedStatus(createSession, 422);
      await apiCall.jsonCompare(createSession, sessionMissingData);
    });

    test('Multi clients - Running activity', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, payload.liveRemoteMulti);
      await apiCall.expectedStatus(createSession, 200);
      await apiCall.jsonCompare(createSession, sessionSuccess);
      const details = await apiCall.getCurrentSession(payload.liveRemoteMulti.name, addToken);
      await apiCall.verifySession(addToken, details.sessionId, 200);
      const cancelSession = await apiCall.patchRequest(common.url.api.landing.cancel.session + `${details.sessionId}`, addToken, payload.cancelSession)
      await apiCall.expectedStatus(cancelSession, 200);
      await apiCall.jsonCompare(cancelSession, sessionCanceled);
      await apiCall.verifySession(addToken, details.sessionId, 410);
    });
  });

  test.describe('Live In Person', () => {
    test('Single client - Basic activity', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, payload.liveInPersonSingle);
      await apiCall.expectedStatus(createSession, 200);
      await apiCall.jsonCompare(createSession, sessionSuccess);
      const details = await apiCall.getCurrentSession(payload.liveInPersonSingle.name, addToken);
      await apiCall.verifySession(addToken, details.sessionId, 200);
      const cancelSession = await apiCall.patchRequest(common.url.api.landing.cancel.session + `${details.sessionId}`, addToken, payload.cancelSession)
      await apiCall.expectedStatus(cancelSession, 200);
      await apiCall.jsonCompare(cancelSession, sessionCanceled);
      await apiCall.verifySession(addToken, details.sessionId, 410);
    });

    test('Single client - empty payload', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, {});
      await apiCall.expectedStatus(createSession, 422);
      await apiCall.jsonCompare(createSession, sessionMissingData);
    });

    test('Multi clients - Walking activity', async () => {
      const addToken = await token.getToken();
      const createSession = await apiCall.postRequest(common.url.api.landing.create.session, addToken, payload.liveInPersonMulti);
      await apiCall.expectedStatus(createSession, 200);
      await apiCall.jsonCompare(createSession, sessionSuccess);
      const details = await apiCall.getCurrentSession(payload.liveInPersonMulti.name, addToken);
      await apiCall.verifySession(addToken, details.sessionId, 200);
      const cancelSession = await apiCall.patchRequest(common.url.api.landing.cancel.session + `${details.sessionId}`, addToken, payload.cancelSession)
      await apiCall.expectedStatus(cancelSession, 200);
      await apiCall.jsonCompare(cancelSession, sessionCanceled);
      await apiCall.verifySession(addToken, details.sessionId, 410);
    });
  });
});

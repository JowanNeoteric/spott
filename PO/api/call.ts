import { expect, APIRequestContext } from '@playwright/test';

export class ApiCall {
    private requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async getRequest(url: string, token?: any, payload?: any) {
        const response = await this.requestContext.get(url, {
            data: payload,
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    }

    async postRequest(url: string, token: any, payload?: any) {
        const response = await this.requestContext.post(url, {
            data: payload,
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    }

    async patchRequest(url: string, token: any, payload?: any) {
        const response = await this.requestContext.patch(url, {
            data: payload,
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    }

    async putRequest(url: string, token: any, payload: any) {
        const response = await this.requestContext.put(url, {
            data: payload,
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    }

    async deleteRequest(url: string, token: any, payload: any) {
        const response = await this.requestContext.delete(url, {
            data: payload,
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    }

    async expectedStatus(response: any, code: number) {
        expect(response.status()).toEqual(code);
    }

    async expectedProperty(responseBody: any, propertyName: any, propertyValue?: RegExp | boolean | string | number) {
        const responseJson = await responseBody.json();
        expect(responseJson).toHaveProperty(propertyName, propertyValue);
    }

    async notExpectedProperty(responseBody: any, propertyName: any, propertyValue?: RegExp | boolean | string | number) {
        const responseJson = await responseBody.json();
        expect(responseJson).not.toHaveProperty(propertyName, propertyValue);
    }

    async jsonCompare(responseBody: any, inputJson: any) {
        const responseJson = await responseBody.json();
        expect(inputJson).toStrictEqual(responseJson);
    }

    async verifySession(token: any, id: number, code: number) {
        const responseBody = await this.getRequest(`https://trainer.dev.the-spott.com/apiv2/sessions/session/1?id=${id}`, token);
        await this.expectedStatus(responseBody, code)
    }

    async getLatestSessionDetails(token: any) {
        const responseBody = await this.getRequest("https://trainer.dev.the-spott.com/apiv2/sessions/sessions/1", token);
        const parseJson = await responseBody.json();
        const data = parseJson.data.pop();
        const sessionId = data.id;
        const clients = data.participants;
        const activity = data.metType;

        return { sessionId, clients, activity }
    }

    async getCurrentSession(name: string, token: any) {
        const encodedName = encodeURIComponent(name);
        const responseBody = await this.getRequest(`https://trainer.dev.the-spott.com/apiv3/session/recurrence?future=true&keyword=${encodedName}`, token);
        const parseJson = await responseBody.json();
        const sessionId = await parseJson.sessions[0].id;
        const clients = await parseJson.sessions[0].participants;
        const activity = await parseJson.sessions[0].metType;

        return { sessionId, clients, activity }
    }
}

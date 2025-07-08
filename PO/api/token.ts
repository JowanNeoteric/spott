import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { credentials } from "../../fixtures/credentials";

export class GenerateToken {

    async tokenGenerate() {
        const userPool = await new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: credentials.cognito.UserPoolId,
            ClientId: credentials.cognito.ClientId
        });
        const cognitoUser = await new AmazonCognitoIdentity.CognitoUser({
            Username: credentials.trainer.validlogin,
            Pool: userPool
        });
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: credentials.trainer.validlogin,
            Password: credentials.trainer.validPassword
        });
        const token = await new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    const idToken = result.getIdToken().getJwtToken();

                    resolve(idToken);
                },
                onFailure: (error) => {
                    reject(error);
                },
            });
        });
        return token
    }

    async getToken() {
        const generatedToken = this.tokenGenerate();
          return generatedToken
    }
}

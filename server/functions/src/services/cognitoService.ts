import { cognitoClient } from "../config/awsConfig";
import { AuthFlowType, ConfirmSignUpCommand, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";

dotenv.config(); // This loads the variables from .env into process.env

const clientId = process.env.AWS_USERPOOL_APP_CLIENT_ID;
const userpoolId = process.env.AWS_USERPOOL_ID;

if (!clientId) {
    throw new Error("AWS_USERPOOL_APP_CLIENT_ID is not defined in the environment variables");
}
if (!userpoolId) {
    throw new Error("AWS_USERPOOL_ID is not defined in the environment variables");
}

export const register = async (username: string, email: string, password: string) => {
    const params = {
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [
            { Name: "email", Value: email },
        ],
    };

    try {
        const signUpCommand = new SignUpCommand(params);
        const result = await cognitoClient.send(signUpCommand);
        console.log("User registration successful:", result);
        return result;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const registerConfirm = async ({ username, code }: { username: string; code: string }) => {
    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: username,
      ConfirmationCode: code,
    });

    try {
      const result = await cognitoClient.send(command);
      console.log("User confirmed successfully:", result);
      return result;
    } catch (error) {
      console.error("Error confirming user:", error);
      throw error;
    }
  };

export const loginAuth = async ({ username, password }: { username: string; password: string }) => {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: clientId,
    });

    try {
      const result = await cognitoClient.send(command);
      return result;
    } catch (error) {
      console.error("Error initiating auth:", error);
      throw error;
    }
  };

// export const loginUser = async (email: string, password: string) => {
//     const params = {
//         AuthFlow: "USER_PASSWORD_AUTH",
//         ClientId: clientId,
//         UserPoolId: userpoolId,
//         AuthParameters: {
//             USERNAME: email,
//             PASSWORD: password,
//         },
//     };

//     try {
//         const authCommand = new InitiateAuthCommand(params);
//         const result = await cognitoClient.send(authCommand);
//         console.log("User login successful:", result);
//         return result.AuthenticationResult; // 包含访问令牌（AccessToken）、身份令牌（IdToken）等
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         throw error;
//     }
// };

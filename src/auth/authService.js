// src/auth/authService.js
import {
    CognitoIdentityProviderClient,
    SignUpCommand,
    ConfirmSignUpCommand,
    InitiateAuthCommand,
  } from "@aws-sdk/client-cognito-identity-provider";
  
  const REGION = process.env.REACT_APP_AWS_REGION;
  const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;
  
  const client = new CognitoIdentityProviderClient({ region: REGION });
  
  export async function signUp(email, password) {
    const cmd = new SignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }],
    });
    return await client.send(cmd);
  }
  
  export async function confirmSignUp(email, code) {
    const cmd = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    });
    return await client.send(cmd);
  }
  
  export async function signIn(username, password) {
    const cmd = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });
  
    const response = await client.send(cmd);
    console.log("Cognito signIn response:", response);
  
    const tokens = response.AuthenticationResult;
    console.log("AuthenticationResult:", tokens);
  
    // Optional: Add null check
    if (!tokens?.IdToken) {
      console.warn("⚠️ No IdToken returned in response");
    }
  
    localStorage.setItem("accessToken", tokens.AccessToken);
    localStorage.setItem("idToken", tokens.IdToken); // ← this may be undefined
    localStorage.setItem("refreshToken", tokens.RefreshToken);
  
    return tokens;
  }
  
  
  export async function refreshSession() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;
  
    const cmd = new InitiateAuthCommand({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });
  
    const response = await client.send(cmd);
    const tokens = response.AuthenticationResult;
  
    localStorage.setItem("accessToken", tokens.AccessToken);
    localStorage.setItem("idToken", tokens.IdToken);
  
    return tokens;
  }
  
  export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
  }
  
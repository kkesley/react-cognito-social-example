This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> The app in this example is far from production ready. This example only demonstrates how to login to cognito with social auth in react.
>
> **it's designed only for education purposes**

All relevant codes are in `/src/App.js`.

# Introduction

This is an example how to use cognito's social auth in ReactJS.

A prior `IdentityPool` is required.

# Social Auth configuration

## Google Signin

Follow this tutorial: [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in)

Then, go to `credentials` ([https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)) to get the `ClientID`.

The `ClientID` is in the form of **"xxxxxxxxxx.apps.googleusercontent.com"**.

### For development purposes.

You need to enable the domain of your website. This includes your `localhost`.

Click edit on your credentials, then insert these URIs in **"Authorized JavaScript origins"** and **"Authorized redirect URIs"**

1. https://localhost:3000
2. https://localhost
3. http://localhost:3000
4. http://localhost

Include `http` and `https` as facebook requires https. And include address with React's port (default to `3000`) and the default localhost.

## Facebook Signin

Follow this tutorial: [https://developers.facebook.com/docs/facebook-login/](https://developers.facebook.com/docs/facebook-login/)

In the `App`, you need your `App ID` to login.


# Special cases for this repo

The Google Signin in this repo is an example of **linking another social provider to an existing identity in cognito**. Therefore, if you want to run this app, you need to login with `Facebook` first, then login with `Google`.

Your identity will have 2 linked logins afterwards.


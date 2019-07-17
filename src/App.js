import React from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import AWS from 'aws-sdk'
import GoogleLogin from 'react-google-login';
AWS.config.region = 'ap-southeast-2'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FacebookLogin
          appId="xxxxxxxxxxxxxxxxxxx"
          autoLoad={true}
          callback={response => {
            console.log(response)
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'region:pool-id',
                Logins: {
                  'graph.facebook.com': response.accessToken
                }
              });
          
              // Obtain AWS credentials
              AWS.config.credentials.get(function(err){
                console.log(err)
                  // Access AWS resources here.
                  console.log(AWS.config.credentials)
              });
          }} />
        <GoogleLogin
          clientId="xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={response => {
            //EXAMPLE LINKING TO EXISTING ACCOUNT!

            console.log(response)
              // Obtain AWS credentials
              AWS.config.credentials.get(function(){
                  // Access AWS resources here.
                  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'region:pool-id',
                    IdentityId: 'region:identity-id',
                    Logins: {
                      ...AWS.config.credentials.params.Logins,
                      'accounts.google.com': response.tokenId
                    }
                  });
                  AWS.config.credentials.get(function(err){
                    //account linked
                  })
              });
          }}
          onFailure={f => console.log(f)}
          cookiePolicy={'single_host_origin'}
      />
      </header>
    </div>
  );
}

export default App;

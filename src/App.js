import React from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import AWS from 'aws-sdk'
import GoogleLogin from 'react-google-login';
import aws4 from 'aws4'
import axios from 'axios'
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

                  // Below is how to sign aws request using `aws4` lib
                  var creds = {
                    secretAccessKey: AWS.config.credentials.secretAccessKey,
                    accessKeyId: AWS.config.credentials.accessKeyId,
                    sessionToken: AWS.config.credentials.sessionToken,
                  }

                  const body = {
                    foo: 'bar'
                  }

                  let request = {
                    host: 'example.com', //API host
                    service: 'execute-api',
                    region: 'ap-southeast-2', //AWS region
                    method: 'POST',
                    url: `https://example.com/prod/http`, //combination of host and path
                    data: body, // the body of this request
                    body: JSON.stringify(body), // aws4 looks for body; axios for data
                    path: '/prod/http', //API path (include the stage)
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }

                  var signedReq = aws4.sign(request, creds)

                  //delete the Host and Content-Length as it throws error in browsers
                  delete signedReq.headers['Host']
                  delete signedReq.headers['Content-Length']
                  axios(signedReq)
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
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

import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

import Main from "./components/Main";

Amplify.configure(awsconfig);

export type UserData = {
  username: string,
  attributes?: {
    email?: string,
  },
  signInUserSession: {
    idToken: {
      jwtToken: string,
    },
  },
};

const App = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, UserData) => {
          setAuthState(nextAuthState);
          setUser(UserData as UserData);
      });
  }, []);

return authState === AuthState.SignedIn && user ? (
    <div className="App">
        <AmplifySignOut />
        <Main userData={user}/>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "password" },
          { type: "email" }
        ]}
      />
    </AmplifyAuthenticator>
);
}

export default App;

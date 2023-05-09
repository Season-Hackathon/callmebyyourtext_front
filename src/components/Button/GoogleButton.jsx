import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const clientId =
  '96603120658-bd8fbq32n1p9ee455a3v5efvj5281kmr.apps.googleusercontent.com';

const GoogleButton = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(res) => {
          console.log(res);
        }}
        onFailure={(err) => {
          console.log(err);
        }}
      />
    </>
  );
};

export default GoogleButton;

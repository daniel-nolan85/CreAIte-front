import { useEffect, useState } from 'react';
import { facebookLoginHandler } from '../requests/social';

const FacebookUploader = ({ onPost }) => {
  const [sdkInitialized, setSdkInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: `${import.meta.env.VITE_FACEBOOK_APP_ID}`,
        xfbml: true,
        version: 'v19.0',
      });
      setSdkInitialized(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePost = () => {
    if (typeof onPost === 'function') {
      onPost();
    }
  };

  const login = async () => {
    if (!sdkInitialized) {
      return;
    }

    window.FB.login(
      (res) => {
        console.log(res);
        if (res.status === 'connected') {
          console.log(res.authResponse.accessToken);
          facebookLoginHandler(res.authResponse.accessToken).then((res) =>
            console.log({ res })
          );
        }
      },
      {
        scope: 'public_profile,pages_read_engagement',
      }
    );
  };

  return (
    <div>
      <button onClick={handlePost}>Post to Facebook</button>
      <button onClick={login}>Log In</button>
    </div>
  );
};

export default FacebookUploader;

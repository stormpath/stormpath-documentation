import com.stormpath.sdk.oauth;

AccessToken accessToken = oAuthGrantRequestAuthenticationResult.getAccessToken();
accessToken.delete();

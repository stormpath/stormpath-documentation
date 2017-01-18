.. _appendix:

********
Appendix
********

This appendix contains documentation for features and workflows that have been deprecated.

.. _generate-oauth-token-old:

Generating an OAuth 2.0 Access Token
------------------------------------

.. note::

  The recommended way of generating an OAuth 2.0 token is with the Client API's ``/oauth/token`` endpoint. For information about, please see `the Client API Guide <https://docs.stormpath.com/client-api/product-guide/latest/authentication.html#oauth-2-0-login>`__. The information below is about an alternate and older way of generating an OAuth 2.0 token.

.. only:: rest

  Stormpath exposes an endpoint for each Application resource to support the OAuth 2.0 protocol:

  ``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token``

  This endpoint is used to generate an OAuth token for any valid Account or API Key associated with the specified Application. For Account's, it uses the same validation as the ``/loginAttempt`` endpoint, as described in :ref:`how-login-works`.

The first three kinds of OAuth Grant Types differ only in what credentials are passed to Stormpath in order to generate the token. The Stormpath Factor Challenge Type requires a Challenge ``href`` and ``code`` that you get as part of the :ref:`Multi-Factor Authentication process <mfa>`. For more information on those, keep reading. For more information about the Refresh Grant Type, see :ref:`below <refresh-oauth-token>`.

**Targeting a Specific Account Store**

It is possible to target token generation against a particular Directory, Group, or Organization. You do this either by passing the Account Store's ``href``, or the Organization's ``nameKey``.

``grant_type=password&username=tom@stormpath.com&password=Secret1&accountStore=https://api.stormpath.com/v1/directories/1bcd23ec1d0a8wa6``

``grant_type=password&username=tom@stormpath.com&password=Secret1&nameKey=anOrganization``

This allows you to bypass the usual default Account Store and login priority and instead send the token generation to a particular Account Store.


.. todo::

  Need examples for the other languages!

Client Credentials
""""""""""""""""""

For the **Client Credentials Grant Type**, you pass the **Client ID** and **Secret**:

``grant_type=client_credentials&client_id=2ZFMV4WVVexample&client_secret=XEPJolhnMYexample``

Social
""""""

For the **Social Grant Type** you must pass:

- The **Provider ID** which matches the Provider ID of the :ref:`Social Directory <social-authn>` (e.g. `facebook` or `github`)
- A ``redirectUri`` as a parameter that specifies the URL that the user will be redirected to after authentication
- And either the Authorization **Code** or
- The **Access Token** for that Social Provider

All together, this would look like this:

``grant_type=stormpath_social&providerId=facebook&accessToken=EAA68kW...&redirectUri=https%3A%2F%2...``

Password
"""""""""

Finally, for the **Password Grant Type**, you pass the user's **username** and **password**:

``grant_type=password&username=tom%40stormpath.com&password=Secret1``

Stormpath Factor Challenge
""""""""""""""""""""""""""

For this grant type, you will need:

- The **URL of a Stormpath Challenge Resource**. Currently, this can only be a Challenge related to an SMS Factor.
- And the challenge code that the user received on their phone.

``grant_type=stormpath_factor_challenge&challenge=https://api.stormpath.com/v1/challenges/$CHALLENGE_ID&code=123456``

For more information about these resources and how to obtain them, please see :ref:`mfa`.

Token Generation Example
"""""""""""""""""""""""""

In this example we will demonstrate the Password Grant Type:

- The user inputs their credentials into a form and submits them.
- Your application in turn takes the credentials and formulates the OAuth 2.0 Access Token request to Stormpath.
- When Stormpath returns with the Access Token Response, you can then return the Access Token and/or the Refresh Token to the client.

.. only:: not nodejs

  So you would send the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$YOUR_APPLICATION_ID/oauth/token HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/x-www-form-urlencoded

    grant_type=password&username=tom%40stormpath.com&password=Secret1

  .. note::

    Just like with logging-in a user, it is possible to generate a token against a particular Application's Account Store or Organization. To do so, specify the Account Store's ``href`` or Organization's ``nameKey`` as a parameter in the body::

      grant_type=password&username=tom@stormpath.com&password=Secret1&accountStore=https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp

      grant_type=password&username=tom@stormpath.com&password=Secret1&organizationNameKey=companyA

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/generate_oauth_token_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/generate_oauth_token_req.vb
        :language: vbnet

  .. note::

    Just like with logging-in a user, it is possible to generate a token against a particular Application's Account Store resource. To do so, use the ``SetAccountStore()`` method when you are building the request.

.. only:: java

  .. literalinclude:: code/java/authentication/generate_oauth_token_req.java
      :language: java

  .. note::

    Just like with logging-in a user, it is possible to generate a token against a particular Application's Account Store resource. To do so, use the ``setAccountStore(AccountStore accountStore)`` method when you are building the request.

.. only:: nodejs

  The first step is to create a re-usable password grant authenticator. This authenticator is bound to an Application, so you must pass an Application instance to it:

  .. literalinclude:: code/nodejs/authentication/create_password_grant_authenticator.js
      :language: javascript

  Once you have an authenticator, you can pass authentication attempts to it.

  If the users credentials are correct, you will receive an authentication result, which contains the access token:

  .. literalinclude:: code/nodejs/authentication/generate_oauth_token_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/generate_oauth_token_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/generate_oauth_token_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/generate_oauth_token_req.rb
    :language: ruby

.. only:: rest

  Which would result in this response:

  .. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: application/json;charset=UTF-8

    {
      "access_token": "eyJraWQiOiIyWkZNV...TvUt2WBOl3k",
      "refresh_token": "eyJraWQiOiIyWkZNV...8TvvrB7cBEmNF_g",
      "token_type": "Bearer",
      "expires_in": 1800,
      "stormpath_access_token_href": "https://api.stormpath.com/v1/accessTokens/1vHI0jBXDrmmvPqEXaMPle"
    }

  This is an **OAuth 2.0 Access Token Response** and includes the following:

  .. list-table::
      :widths: 15 10 60
      :header-rows: 1

      * - Attribute
        - Type
        - Description

      * - access_token
        - String (JSON Web Token)
        - The access token for the response.

      * - refresh_token
        - String (JSON Web Token)
        - The refresh token that can be used to get refreshed Access Tokens. (Only available via the Password Grant Type)

      * - token_type
        - String
        - The type of token returned.

      * - expires_in
        - Number
        - The time in seconds before the token expires.

      * - stormpath_access_token_href
        - String
        - The href location of the token in Stormpath.

.. only:: (csharp or vbnet)

  The ``IOauthGrantAuthenticationResult`` response contains the following properties and methods:

  .. list-table::
      :widths: 15 10 60
      :header-rows: 1

      * - Member
        - Type
        - Description

      * - AccessTokenString
        - String (JSON Web Token)
        - The access token for the response.

      * - AccessTokenHref
        - String
        - The href location of the token in Stormpath.

      * - RefreshTokenString
        - String (JSON Web Token)
        - The refresh token that can be used to get refreshed Access Tokens. (Only available via the Password Grant Type)

      * - TokenType
        - String
        - The type of token returned.

      * - ExpiresIn
        - Long
        - The time in seconds before the token expires.

      * - GetAccessTokenAsync()
        - ``Task<IAccessToken>``
        - Retrieves the generated access token as an ``IAccessToken`` object.

.. only:: java

  Which would result in this response:

  .. literalinclude:: code/java/authentication/generate_oauth_token_resp.java
      :language: javascript

.. only:: nodejs

  Which would print the access token in the terminal:

  .. literalinclude:: code/nodejs/authentication/generate_oauth_token_resp.js
      :language: javascript

.. only:: php

  Which would result in this response:

  .. literalinclude:: code/php/authentication/generate_oauth_token_resp.php
    :language: php

  This is an **OAuth 2.0 Access Token Response** and includes the following:

  .. list-table::
      :widths: 15 10 60
      :header-rows: 1

      * - Attribute
        - Type
        - Description

      * - accessToken
        - Object (Stormpath\Resource\AccessToken)
        - The Access Token as an object.

      * - accessTokenString
        - String (JSON Web Token)
        - The Access Token as a JWT-formatted string.

      * - refreshToken
        - Object (Stormpath\Resource\RefreshToken)
        - The Refresh Token as an object. (Only available via the Password Grant Type)

      * - refreshTokenString
        - String (JSON Web Token)
        - The Refresh Token as a JWT-formatted string.

      * - accessTokenHref
        - String
        - The href location of the token in Stormpath.

      * - tokenType
        - String
        - The type of token that was returned (Typically Bearer)

      * - expiresIn
        - Number
        - The time in seconds before the token expires.

.. only:: python

  Which would result in a ``None`` response (on failure), or an object on
  success.  If the authentication attempt succeeds, you can access the following
  properties from the ``PasswordAuthenticationResult`` object:

  - ``result.app`` - The Stormpath Application.
  - ``result.stormpath_access_token`` - The Stormpath ``AuthToken`` object.
  - ``result.expires_in`` - The time in seconds before this token expires.
  - ``result.token_type`` - The type of token.
  - ``result.refresh_token`` - The ``RefreshToken`` object.
  - ``result.account`` - The Stormpath Account object for the authenticated user.

.. only:: ruby

  Which would result in a ``Stormpath::Error`` response (on failure), or an object on
  success.  If the authentication attempt succeeds, you can access the following
  properties from the ``Stormpath::Oauth::AccessTokenAuthenticationResult`` object:

  - ``response.access_token`` - The Stormpath access token
  - ``response.refresh_token`` - The Stormpath refresh token
  - ``response.token_type`` - The type of token
  - ``response.expires_in`` - The time in seconds before this token expires
  - ``response.stormpath_access_token_href`` - The href for the returned access token

.. _social-authn-old:

Social Login (Deprecated)
=========================

This documentation covers the social login flow that existed before the release of the Client API.

.. _authn-google-old:

Google
------

.. note::

  This is the pre-Client API version of Step 3 of :ref:`the Google social login flow <authn-google>`. We recommend that you use the new flow.

Once the Authorization Code is gathered, you send this request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/YOUR_APP_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
        "providerData": {
          "providerId": "google",
          "code": "YOUR_GOOGLE_AUTH_CODE"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_account_google_providerdata_code.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_account_google_providerdata_code.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_google_providerdata_code.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_google_providerdata_code.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_google_providerdata_code.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_google_providerdata_code.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_google_providerdata_code.rb
    :language: ruby

If you have already exchanged an Authorization Code for an Access Token, this can be passed to Stormpath in a similar fashion:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/YOUR_APP_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
        "providerData": {
          "providerId": "google",
          "accessToken": "%ACCESS_TOKEN_FROM_GOOGLE%"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_account_google_providerdata_access_token.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_account_google_providerdata_access_token.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_google_providerdata_access_token.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_google_providerdata_access_token.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_google_providerdata_access_token.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_google_providerdata_access_token.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_google_providerdata_access_token.rb
    :language: ruby

Either way, Stormpath will use the code or access token provided to retrieve information about your Google Account, then return a Stormpath Account.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  In order to know if the Account was created or if it already existed in Stormpath's Google Directory you can use the ``isNewAccount()`` method on the ``ProviderAccountResult`` object. It will return ``true`` if it is a newly created Account, or ``false`` if it already existed.

.. only:: nodejs

  In order to know if the Account was created or if it already existed in Stormpath's Google Directory you can use the ``_isNew`` property on the result ``account`` object. It will return ``true`` if it is a newly created Account, or ``false`` if it already existed.

.. only:: php

  In order to know if the Account was created or if it already existed in the Stormpath’s Google Directory you can use the ``isNewAccount();`` method on the result object. It will return ``true`` if it is a newly created Account, or ``false`` if it already existed.


.. _authn-facebook-old:

Facebook
---------

.. note::

  This is the pre-Client API version of Step 3 of :ref:`the Facebook social login flow <authn-facebook>`. We recommend that you use the new flow.

To access or create an Account in your new Facebook Directory, you need to gather a **User Access Token** from Facebook before submitting it to Stormpath. This is possible either by using a `Facebook SDK Library <https://developers.facebook.com/docs/facebook-login/access-tokens/#usertokens>`_, or `Facebook’s Graph Explorer <https://developers.facebook.com/tools/explorer/>`_ for testing.

Once the User Access Token is gathered, you send this request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
        "providerData": {
          "providerId": "facebook",
          "accessToken": "USER_ACCESS_TOKEN_FROM_FACEBOOK"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_account_fb_providerdata_access_token.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_account_fb_providerdata_access_token.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_fb_providerdata_access_token.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_fb_providerdata_access_token.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_fb_providerdata_access_token.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_fb_providerdata_access_token.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_fb_providerdata_access_token.rb
    :language: ruby

Stormpath will use the Access Token provided to retrieve information about your Facebook Account, then return a Stormpath Account. If you would like to get back an OAuth token instead, please see the :ref:`Generating an OAuth 2.0 Access Token <generate-oauth-token>`.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  In order to know if the Account was created or if it already existed in Stormpath's Facebook Directory you can use the ``isNewAccount()`` method on the ``ProviderAccountResult`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: nodejs

  In order to know if the Account was created or if it already existed in Stormpath's Facebook Directory you can use the ``_isNew`` property on the result ``account`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: php

  In order to know if the Account was created or if it already existed in Stormpath’s Facebook Directory you can use the ``isNewAccount();`` method on the result object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. _authn-github-old:

GitHub
------

.. note::

  This is the pre-Client API version of Step 3 of :ref:`the Facebook social login flow <authn-facebook>`. We recommend that you use the new flow.

To access or create an Account in your new Github Directory, you must gather a Github **Authorization Code** on behalf of the user. This requires leveraging `Github's OAuth 2.0 protocol <https://developer.github.com/v3/oauth>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to Github. Once the user has authenticated, Github will redirect the response to your application, including the **Authorization Code**. This is documented in detail `here <https://developer.github.com/v3/oauth/#web-application-flow>`_.

.. note::

    It is required that your GitHub application requests the ``user:email`` scope from GitHub. If the access token does not grant ``user:email`` scope, you will not be able to get an Account with an access token. For more information about this see `Github's documentation on OAuth scopes <https://developer.github.com/v3/oauth/#scopes>`_.

Once the Authorization Code is gathered, you need to use the `Github Access Token Endpoint <https://developer.github.com/v3/oauth/#2-github-redirects-back-to-your-site>`_ to exchange this code for an access token.  Then you can send this information to Stormpath:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "providerData": {
        "providerId": "github",
        "accessToken": "ACCESS_TOKEN_FROM_GITHUB"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_account_github_providerdata_access_token.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_account_github_providerdata_access_token.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_github_providerdata_access_token.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_github_providerdata_access_token.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_github_providerdata_access_token.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_github_providerdata_access_token.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_github_providerdata_access_token.rb
    :language: ruby

Stormpath will use the Access Token provided to retrieve information about your GitHub Account, then return a Stormpath Account. If you would like to get back an OAuth token instead, please see the :ref:`Generating an OAuth 2.0 Access Token above <generate-oauth-token>`.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

 In order to know if the Account was created or if it already existed in Stormpath's GitHub Directory you can use the ``isNewAccount()`` method on the ``ProviderAccountResult`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: nodejs

  In order to know if the Account was created or if it already existed in Stormpath's GitHub Directory you can use the ``_isNew`` property on the result ``account`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: php

  In order to know if the Account was created or if it already existed in the Stormpath’s GitHub Directory you can use the isNewAccount(); method on the result object. It will return true if it is a newly created account; false otherwise.

.. _authn-linkedin-old:

LinkedIn
--------

.. note::

  This is the pre-Client API version of Step 3 of :ref:`the Facebook social login flow <authn-facebook>`. We recommend that you use the new flow.

To access or create an Account in your new LinkedIn Directory, you must gather a LinkedIn **Authorization Code** on behalf of the user. This requires leveraging `LinkedIn's OAuth 2.0 protocol <https://developer.linkedin.com/docs/oauth2>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to LinkedIn. Once the user has authenticated, LinkedIn will redirect the response to your application, along with an Authorization Code. This is documented in detail in LinkedIn's `Authenticating with OAuth 2.0 page <https://developer.linkedin.com/docs/oauth2#hero-par_longformtext_3_longform-text-content-par_resourceparagraph_3>`_. Note that it is also possible for you to use the Authorization Code to retrieve an Access Token yourself.

.. note::

    It is required that your LinkedIn application requests the ``r_basicprofile`` and ``r_emailaddress`` scopes (or "fields") from LinkedIn. If the Authorization Code does not grant these scopes, you will not be able to get an Account. For more information about LinkedIn scopes, see `LinkedIn's "Profile Fields" documentation <https://developer.linkedin.com/docs/fields>`_.

Once the Authorization Code is gathered, you can send it to Stormpath:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "providerData": {
        "providerId": "linkedin",
        "code": "YOUR_LINKEDIN_AUTH_CODE"
      }

.. only:: csharp or vbnet

  .. warning::

    The ability to post an authorization code to LinkedIn is not yet available in the .NET SDK. For updates, you can follow `ticket #183 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/183>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/create_account_linkedin_providerdata_auth_code.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/create_account_linkedin_providerdata_auth_code.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_linkedin_providerdata_auth_code.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_linkedin_providerdata_auth_code.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_linkedin_providerdata_auth_code.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_linkedin_providerdata_auth_code.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_linkedin_providerdata_auth_code.rb
    :language: ruby

If you have already exchanged the code for an Access Token, you can send that instead:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "providerData": {
        "providerId": "linkedin",
        "accessToken": "ACCESS_TOKEN_FROM_LINKEDIN"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_account_linkedin_providerdata_access_token.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_account_linkedin_providerdata_access_token.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_account_linkedin_providerdata_access_token.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_account_linkedin_providerdata_access_token.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_account_linkedin_providerdata_access_token.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_account_linkedin_providerdata_access_token.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_account_linkedin_providerdata_access_token.rb
    :language: ruby

Stormpath will use the ``code`` or ``accessToken`` provided to retrieve information about your LinkedIn Account, then return a Stormpath Account. If you would like to get back an OAuth token instead, please see the :ref:`Generating an OAuth 2.0 Access Token above <generate-oauth-token>`.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  In order to know if the Account was created or if it already existed in Stormpath's LinkedIn Directory you can use the ``isNewAccount()`` method on the ``ProviderAccountResult`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: nodejs

  In order to know if the Account was created or if it already existed in Stormpath's LinkedIn Directory you can use the ``_isNew`` property on the result ``account`` object. It will return ``true`` if it is a newly-created Account, or ``false`` if it already existed.

.. only:: php

  In order to know if the Account was created or if it already existed in the Stormpath’s LinkedIn Directory you can use the isNewAccount(); method on the result object. It will return true if it is a newly created account; false otherwise.
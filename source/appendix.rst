.. _appendix:

********
Appendix
********

This appendix contains documentation for features and workflows that have been deprecated.

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
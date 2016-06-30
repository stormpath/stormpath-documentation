.. _authn:

*****************************************
4. Authenticating Accounts with Stormpath
*****************************************

Authentication is the process by which a system identifies that someone is who they say they are. Perhaps the most accessible example of this process is at the airport, where you must present your passport and your plane ticket. The passport is used to authenticate you, that you are who you present yourself to be, and the plane ticket represents your authorization to board a specific flight.

In this chapter you will cover three of the ways that Stormpath allows you to authenticate users: :ref:`password authentication <password-authn>`, :ref:`token authentication <token-authn>`, and :ref:`social authentication <social-authn>`.

.. _password-authn:

4.1. How Password Authentication Works in Stormpath
===================================================

.. contents::
  :local:
  :depth: 2

Probably the single most common way of authenticating a user is to ask them for their account credentials. When a user creates an Account in Stormpath, it is required that they provide a username (or email) and a password. Those credentials can then be provided in order to authenticate that Account.

4.1.1. Authenticating An Account
--------------------------------

After an Account resource has been created, you can authenticate it given an input of a ``username``/``email`` and a ``password`` from the end-user. When authentication occurs, you are authenticating an Account within a specific Application against that Application’s Organizations, Directories and Groups (more on that :ref:`below <how-login-works>`). The key point is that the Application resource is the starting point for authentication attempts.

.. only:: rest

  Once you have the Application resource you may attempt authentication by sending a POST request to the Application’s ``/loginAttempts`` endpoint and providing a base64 encoded ``username``/``email`` and ``password`` pair that is separated with a colon (for example ``testuser``:``testpassword``). Stormpath requires that the ``username``/``email`` and ``password`` are base64 encoded so that these values are not passed as clear text. For more information about the ``/loginAttempts`` endpoint please see the :ref:`Reference Chapter <ref-loginattempts>`.

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would first need to take the combination of his ``username`` and ``password`` ("first2shoot:Change+me1") and then Base64 encode them: ``Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ==``.

  You would issue the following POST to your Application with ID ``1gk4Dxzi6o4PbdleXaMPLE``:

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4PbdleXaMPLE/loginAttempts HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "type": "basic",
      "value": "Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ==",
      "accountStore": {
         "href": "https://api.stormpath.com/v1/groups/2SKhstu8Plaekcaexample"
       }
    }

  You are using the Base64 encoded ``value`` from above, and specifying that the Account can be found in the "Captains" Directory from :ref:`earlier <about-cloud-dir>`.

  On success you would get back the ``href`` for the "Han Solo" Account:

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid
    Content-Type: application/json;charset=UTF-8

    {
      "account": {
        "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid"
      }
    }

  The reason this succeeds is because there is an existing **Account Store Mapping** between the "Han Solo" Account's "Captains" Directory and your Application. This mapping is what allows this Account to log in to the Application.

  .. note::

    Instead of just receiving an Account's ``href`` after successful authentication, it is possible to receive the full Account resource in the JSON response body. To do this, simply add the **expand=account** parameter to the end of your authentication query:

      ``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/loginAttempts?expand=account``

    For more information about link expansion, please see :ref:`the Reference chapter <about-links>`.

.. only:: csharp or vbnet

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``AuthenticateAccountAsync()`` method on the ``IApplication`` object.

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/login_attempt_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/login_attempt_req.vb
        :language: vbnet

  If the authentication succeeds, you receive an ``IAuthenticationResult`` that contains a link you can traverse to retrieve the Account details. If the authentication fails, a ``ResourceException`` will be thrown.

  To retrieve Account details, call ``GetAccountAsync()``. To avoid making a separate network request, you can request the Account details during authentication by making an expanded request (assuming you have caching enabled):

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/login_attempt_req_expand_account.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/login_attempt_req_expand_account.vb
      :language: vbnet

  .. note::
    It's also possible to specify a specific Account Store to authenticate against, instead of relying on the default login flow (see below). To do this, use the ``SetAccountStore()`` method on the ``UsernamePasswordRequestBuilder`` syntax shown above.

.. only:: java

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would... (java.todo)

  .. literalinclude:: code/java/authentication/login_attempt_req.java
      :language: java

  .. note::

    Instead of just receiving an authentication result, it is possible to receive the full Account object. To do this... (todo)

    .. literalinclude:: code/java/authentication/login_attempt_req_expand_account.java
      :language: java

  If authentication succeeded, you would receive back... (todo)

  .. literalinclude:: code/java/authentication/login_attempt_resp.java
      :language: java

.. only:: nodejs

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would... (node.todo)

  .. literalinclude:: code/nodejs/authentication/login_attempt_req.js
      :language: javascript

  .. note::

    Instead of just receiving an authentication result, it is possible to receive the full Account object. To do this... (todo)

    .. literalinclude:: code/nodejs/authentication/login_attempt_req_expand_account.js
      :language: javascript

  If authentication succeeded, you would receive back ... (todo)

  .. literalinclude:: code/nodejs/authentication/login_attempt_resp.js
      :language: javascript

.. only:: php

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``UsernamePasswordRequest`` class

    .. literalinclude:: code/php/authentication/login_attempt_req.php
      :language: php

  .. note::

    Instead of just receiving an authentication result, it is possible to receive the full Account object. To do this, change your result code to include ``->account`` at the end of the line.

    .. literalinclude:: code/php/authentication/login_attempt_req_expand_account.php
      :language: php

  If authentication succeeded, You will either see just the ``href`` referencing the Account, or the full Account object.

    .. literalinclude:: code/php/authentication/login_attempt_resp.php
      :language: php

.. only:: python

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would... (python.todo)

  .. literalinclude:: code/python/authentication/login_attempt_req.py
      :language: python

  .. note::

    Instead of just receiving an authentication result, it is possible to receive the full Account object. To do this... (todo)

    .. literalinclude:: code/python/authentication/login_attempt_req_expand_account.py
      :language: python

  If authentication succeeded, you would receive back ... (todo)

  .. literalinclude:: code/python/authentication/login_attempt_resp.py
      :language: python

.. _how-login-works:

4.1.2. How Login Attempts Work in Stormpath
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When the "Han Solo" Account tries to log in to the Application, the user submits a request to the Application’s ``/loginAttempts`` endpoint. Stormpath then consults the Application’s assigned **Account Stores** (Organizations, Directories, and Groups) in the order that they are assigned to the Application. When a matching Account is discovered in a mapped Account Store, it is used to verify the authentication attempt and all subsequent Account Stores are ignored. In other words, Accounts are matched for Application login based on a "first match wins" policy.

Let's look at an example to illustrate this behavior. Assume that two Account Stores, a "Customers" Directory and an "Employees" Directory, have been assigned (mapped) to a "Foo" application. "Customers" was assigned first, and "Employees" was assigned next, and this will dictate the order in which they are checked.

The following flow chart shows what happens when an Account attempts to log in to the Foo application:

.. figure:: images/auth_n/LoginAttemptFlow.png
    :align: center
    :scale: 100%
    :alt: Login Attempt Flow

    *The Login Attempt Flow*

As you can see, Stormpath tries to find the Account in the "Customers" Directory first because it has a higher priority than the "Employees" directory. If not found, the "Employees" Directory is tried next as it has a lower priority.

You can map multiple Account Stores to an Application, but only one is required to enable login for an Application. Mapping multiple Account Stores to an Application, as well as configuring their priority, allows you precise control over the Account populations that may log in to your Application.

.. _mirror-login:

How Login Works with Master Directories
"""""""""""""""""""""""""""""""""""""""

If you require a number of Mirror Directories, then you recommend that you have a master Directory alongside them. Any login attempts should be directed to the Mirror Directory. If the attempt succeeds, your application should then perform a :ref:`search <about-search>` of the master Directory to see if there is an Account already there that links to this Account in the Mirror Directory.

If such an Account is already in the master Directory, no action is taken. If such an Account is not found, your application should create a new one in the master Directory, and populate it with the information pulled from the Account in the Mirror Directory. The customData resource for that master Account should then be used to store a link to the Account in the Mirror Directory, for example:

.. only:: rest

  .. code-block:: json

    {
      "customData": {
        "accountLink": "https://api.stormpath.com/v1/accounts/3fLduLKlEx"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/customdata_accountlink.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/customdata_accountlink.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/customdata_accountlink.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/customdata_accountlink.js
      :language: javascript

.. only:: php

    .. literalinclude:: code/php/authentication/customdata_accountlink.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/customdata_accountlink.py
      :language: python

If the user then chooses at some point to, for example, "Sign in with Facebook", then a similar process will occur, but this time with a link created to the user Account in the Facebook Directory.

This mirror-master approach has two major benefits:

1. It allows for a user to have one unified identity in your Application, regardless of how many external identities they choose to log in with.
2. This identity can also be the central point that all authorization permissions (whether they be implicit or explicit) are then applied to.

.. _managing-login:

4.1.3. Manage Who Can Log Into Your Application
-----------------------------------------------

As is hopefully evident by now, controlling which Accounts can log in to your Application is largely a matter of manipulating the Application's Account Store Mappings.

.. only:: rest

  For more detailed information about this resource, please see the :ref:`ref-asm` section of the Reference chapter.

The reason why your user "Han Solo" was able to log in to your application is because the Application resource that represents your application and your "Captains" Directory are mapped to one another by an **Account Store Mapping**.

.. only:: rest

  You can find this mapping by sending a ``GET`` to your Application's ``/accountStoreMappings`` endpoint, which would yield the following response:

  .. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: application/json;charset=UTF-8

    {
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdleXaMPLE/accountStoreMappings",
      "offset":0,
      "limit":25,
      "size":1,
      "items":[
        {
          "href":"https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp",
          "listIndex":1,
          "isDefaultAccountStore":true,
          "isDefaultGroupStore":true,
          "application":{
            "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdleXaMPLE"
          },
          "accountStore":{
            "href":"https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
          }
        }
      ]
    }

  .. note::

    Any new Accounts and Groups added to this Application via it's `/accounts` and `/groups` endpoints will be added to this Directory by default, since ``isDefaultAccountStore`` and ``isDefaultGroupStore`` are both set to ``true``.

.. only:: csharp or vbnet

  You can find all the Account Store Mappings for an Application by using the ``GetAccountStoreMappings()`` collection:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/get_asm_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/get_asm_req.vb
        :language: vbnet

.. only:: java

  You can find this mapping by... (java.todo)

  .. literalinclude:: code/java/authentication/get_asm_req.java
      :language: java

.. only:: nodejs

  You can find this mapping by... (node.todo)

  .. literalinclude:: code/nodejs/authentication/get_asm_req.js
      :language: javascript

.. only:: php

  You can find all the Account Store Mappings by using the ``getAccountStoreMappings()`` method or the ``accountStoreMappings`` property on the Application resource.

  .. literalinclude:: code/php/authentication/get_asm_req.php
    :language: php

  .. note::

    This will return an Account Store Mapping list which you can iterate over to get each Account Store object.

    .. code-block:: php

      $accountStores = [];

      foreach($accountStoreMappings as $accountStoreMapping) {
        $accountStores[] = $accountStoreMapping->accountStore;
      }

.. only:: python

  You can find this mapping by... (python.todo)

  .. literalinclude:: code/python/authentication/get_asm_req.py
      :language: python


.. only:: java

  This will return the Account Store Mapping:

  .. literalinclude:: code/java/authentication/get_asm_resp.java
      :language: java

.. only:: nodejs

  This will return the Account Store Mapping:

  .. literalinclude:: code/nodejs/authentication/get_asm_resp.js
      :language: javascript

.. only:: php

  This will return the Account Store Mapping:

  .. literalinclude:: code/php/authentication/get_asm_resp.php
    :language: php

.. only:: python

  This will return the Account Store Mapping:

  .. literalinclude:: code/python/authentication/get_asm_resp.py
      :language: python

.. _create-asm:

Mapping a new Account Store
^^^^^^^^^^^^^^^^^^^^^^^^^^^

We would now like to map a new Account Store that will have the following characteristics:

#. It will have the highest login priority. This means that it will be consulted first during :ref:`the login process <how-login-works>`, before any other Account Stores.
#. It will be the default Account Store for any new Accounts.
#. It will be the default Group Store for any new Groups.

.. only:: rest

  To accomplish this, you will send a ``POST``:

  .. code-block:: http

    POST v1/accountStoreMappings HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "listIndex": 0,
      "isDefaultAccountStore": true,
      "isDefaultGroupStore": true,
      "application": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdleXaMPLE"
      },
      "accountStore": {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE"
      }
    }

  You are mapping the Application (id: ``1gk4Dxzi6o4PbdleXaMPLE``) to a new Directory (id: ``2SKhstu8PlaekcaEXampLE``). Additionally, you are setting

  #. the login priority to the highest priority, by sending a ``listIndex`` of ``0``.
  #. ``isDefaultAccountStore`` to ``true`` and
  #. ``isDefaultGroupStore`` to ``true`` as well.

  So by sending a ``POST`` with these contents, you are able to create a new Account Store Mapping that supersedes the old one.

.. only:: csharp or vbnet

  We can accomplish this by creating a new ``IApplicationAccountStoreMapping`` instance, and then adding to the Application with ``CreateAccountStoreMappingAsync()``:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_asm.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_asm.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_asm.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_asm.js
      :language: javascript

.. only:: php

    .. literalinclude:: code/php/authentication/create_asm.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_asm.py
      :language: python

If you go back to the example from the :ref:`Account Management chapter<account-mgmt>`, you can see the accountStoreMapping between the Directory and the Application. This now means that the Captain's Account in the Directory will now be able to log in to the Application.

.. figure:: images/auth_n/authn_asm_erd.png
  :align: center
  :alt: <ERD with accountStoreMapping>

Updating an Existing Account Store
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Updating an existing Account Store simply involves sending a request with the attributes that you would like to update.

**Changing Login Priority**

For example, if you want to update an existing Account Store to now have highest login priority, send this request that sets the Mapping's list index value as ``0``:

.. only:: rest

  .. code-block:: http

    POST /v1/accountStoreMappings/1NUhrCPT0q66bjyexample HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

    {
      "listIndex": 0
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/change_login_priority.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/change_login_priority.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/change_login_priority.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/change_login_priority.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/change_login_priority.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/change_login_priority.py
      :language: python

The accountStoreMapping resource will be updated and all of the other Account Stores will have their ``listIndex`` incremented up by 1.

**Changing the Default Account or Group Store**

Setting an Account Store Mapping as the default Account or Group store would automatically supersede any other Account Store Mapping. Any other mapping that had previously been the default would have the "true" flag switched to "false".

.. only:: rest

  .. code-block:: http

    POST /v1/accountStoreMappings/1NUhrCPT0q66bjyexample HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

    {
        "isDefaultAccountStore": "true",
        "isDefaultGroupStore": "true"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/change_default_stores.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/change_default_stores.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/change_default_stores.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/change_default_stores.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/change_default_stores.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/change_default_stores.py
      :language: python

.. note::

  Setting an Account Store Mapping's Default Group/Account Store flag to ``false`` will **not** automatically set another Default Group/Account Store flag ``true``. You are responsible for setting this yourself if you would like your Application to create new Accounts/Groups.

.. _token-authn:

4.2. How Token-Based Authentication Works
=========================================

.. contents::
  :local:
  :depth: 2

In this section, you will discuss how to use Stormpath to generate and manage OAuth 2.0 Access Token.

4.2.1. Introduction to Token-Based Authentication
-------------------------------------------------

Since HTTP is considered a stateless protocol, if your application authenticates a user for one HTTP request, a problem arises when the next request is sent and your application doesn't know who the user is. This is why many applications today pass some information to tie the request to a user. Traditionally, this requires **Server-based authentication**, where state is stored on the server and only a session identifier is stored on the client.

**Token-based authentication** is a alternate, stateless strategy. With token-based authentication, you secure an application based on a security token that is generated for the user on authentication and then stored on the client-side. Token-based Authentication is all about removing the need to store information on the server while giving extra security to keep the token secure on the client. This helps you as a developer build stateless and scalable applications.

Stormpath's approach to token-based authentication has two elements: JSON Web Tokens (JWTs) for authentication, and OAuth 2.0 for authorization.

Why OAuth 2.0?
^^^^^^^^^^^^^^

OAuth 2.0 is an authorization framework and provides a protocol to interact with a service that can delegate authentication or provide authorization. Its primary advantage as a standard is its wide adoption rate across many mobile and web applications today. If you have ever logged-in to a website using Facebook or Google, you have used one of OAuth 2.0's many authorization flows. You can read more about the different OAuth 2.0 authorization flows or grant types in depth on `Stormpath’s blog <https://stormpath.com/blog/what-the-heck-is-oauth/>`_.

Even though OAuth 2.0 has many authorization modes or "grant types", Stormpath currently supports three of them:

- **Password Grant Type**: Provides the ability to get an Access Token based on a login and password.

- **Refresh Grant Type**: Provides the ability to generate another Access Token based on a special Refresh Token.

- **Client Credentials Grant Type**: Provides the ability to exchange an API Key for the Access Token. This is supported through the API Key Management feature.

To understand how to use Token-based Authentication, you need to talk about the different types of tokens that are available.

What Tokens Are Available for Token-Based Authentication?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Token Based Authentication, there are a two different types of tokens that need to be managed. These are:

- Access Token
- Refresh Token

The **Access Token** is what grants access to a protected resource. The Access Token that Stormpath generates for Accounts on authentication is a **JSON Web Token**, or JWT. The JWT has security built-in to make sure that the Access Token is not tampered with on the client, and is only valid for a specified duration.

The **Refresh Token** is a special token that is used to generate additional Access Tokens. This allows you to have an short-lived Access Token without having to collect credentials every single time you need a new Access Token.

When using OAuth 2.0, the Access Token and Refresh Token are returned in the same response during the token exchange, this is called an **Access Token Response**.

.. _token-authn-config:

4.2.2. Using Stormpath for Token-Based Authentication
-----------------------------------------------------

Stormpath can be used to generate, manage, check, and revoke both Access and Refresh Tokens. Before diving in, let's talk about configuration.

Configuring Token-Based Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath is configurable so you can set the time to live (TTL) for both the Access and Refresh tokens. This is important for many applications because it gives the ability to define how the tokens expire. For example, you could decide that your application requires a user to log in daily, but the access should only live for 10 minutes. Or, you could decide that for your application, users should be able to stay logged-in for two months and the access token expires in an hour.

Each Application resource in Stormpath has an associated :ref:`OAuth Policy resource <ref-oauth-policy>` where the TTLs for a particular Application's tokens are stored:

.. only:: rest

  .. code-block:: json

    {
        "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdleXaMPLE",
        "accessTokenTtl": "PT1H",
        "refreshTokenTtl": "P60D",
        "comment":" // This JSON has been truncated for readability"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/oauth_policy.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/oauth_policy.vb
        :language: vbnet

  The ``AccessTokenTimeToLive`` and ``RefreshTokenTimeToLive`` properties represent the time to live (TTL) values as ``TimeSpan`` objects.

.. only:: java

  .. literalinclude:: code/java/authentication/oauth_policy.java
      :language: java

  The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/oauth_policy.js
      :language: javascript

  The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

.. only:: php

  .. literalinclude:: code/php/authentication/oauth_policy.php
    :language: php

  This will return:

  .. literalinclude:: code/php/authentication/oauth_policy_res.php

.. only:: python

  .. literalinclude:: code/python/authentication/oauth_policy.py
      :language: python

  The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

.. only:: rest or php

   The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_. By **default**, the TTL for the Access Token is 1 hour and the Refresh Token's is 60 days. The maximum value for both is 10 years and 1 day (``P10Y``), while the minimum value is 1 second (``PT1S``).

If you wanted to change the TTL for the Access Token to 30 minutes and the Refresh Token to 7 days, you could send the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/oAuthPolicies/1gk4Dxzi6o4PbdleXaMPLE HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "accessTokenTtl": "PT30M",
      "refreshTokenTtl": "P7D"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/update_oauth_ttl_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/update_oauth_ttl_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/update_oauth_ttl_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/update_oauth_ttl_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/update_oauth_ttl_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/update_oauth_ttl_req.py
      :language: python

.. only:: rest

  And you would get the following response:

  .. code-block:: HTTP

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdleXaMPLE
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdleXaMPLE",
      "accessTokenTtl": "PT30M",
      "refreshTokenTtl": "P7D",
      "comment":" // This JSON has been truncated for readability"
    }

.. only:: java

  And you would get the following response:

  .. literalinclude:: code/java/authentication/update_oauth_ttl_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/update_oauth_ttl_resp.js
      :language: javascript

.. only:: php

  And you would get the following response:

  .. literalinclude:: code/php/authentication/update_oauth_ttl_resp.php
    :language: php

.. only:: python

  And you would get the following response:

  .. literalinclude:: code/python/authentication/update_oauth_ttl_resp.py
      :language: python

.. only:: rest

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. only:: (csharp or vbnet)

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of ``TimeSpan.Zero``.

.. only:: java

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. only:: nodejs

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. only:: php

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. only:: python

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. _generate-oauth-token:

Generating an OAuth 2.0 Access Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath can generate Access Tokens using the above-mentioned OAuth 2.0 **Password Grant** flow.

.. only:: rest

  Stormpath exposes an endpoint for each Application resource to support the OAuth 2.0 protocol::

      https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token

  This endpoint is used to generate an OAuth token for any valid Account associated with the specified Application. It uses the same validation as the ``/loginAttempt`` endpoint, as described in :ref:`how-login-works`.

Your application will act as a proxy to the Stormpath API. For example:

- The user inputs their credentials into a form and submits them.
- Your application in turn takes the credentials and formulates the OAuth 2.0 Access Token request to Stormpath.
- When Stormpath returns with the Access Token Response, you can then return the Access Token and/or the Refresh Token to the client.

So you would send the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$YOUR_APPLICATION_ID/oauth/token HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/x-www-form-urlencoded

    grant_type=password&username=tom%40stormpath.com&password=Secret1

  .. note::

    Just like with logging-in a user, it is possible to generate a token against a particular Application's Account Store resource. To do so, specify the Account Store's ``href`` as a parameter in the body::

        grant_type=password&username=tom@stormpath.com&password=Secret1&accountStore=https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp

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

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/generate_oauth_token_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/generate_oauth_token_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/generate_oauth_token_req.py
      :language: python

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
        - The refresh token that can be used to get refreshed Access Tokens.

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
        - The refresh token that can be used to get refreshed Access Tokens.

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
      :language: java

  .. todo::
    Describe the result.

.. only:: nodejs

  Which would result in this response:

  .. literalinclude:: code/nodejs/authentication/generate_oauth_token_resp.js
      :language: javascript

  .. todo::
    Describe the result.

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
        - The Refresh Token as an object.

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

  Which would result in this response:

  .. literalinclude:: code/python/authentication/generate_oauth_token_resp.py
      :language: python

  .. todo::
    Describe the result.

Validating an Access Token
^^^^^^^^^^^^^^^^^^^^^^^^^^

Once an Access Token has been generated, you have taken care of the Authentication part of your workflow. Now, the OAuth token can be used to authorize individual requests that the user makes. To do this, the client will need to pass it to your application.

For example, if you have a route ``https://yourapplication.com/secure-resource``, the client would request authorization to access the resource by passing the access token as follows:

.. code-block:: http

    GET /secure-resource HTTP/1.1
    Host: https://yourapplication.com
    Authorization: Bearer eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhJMGpCWERybW12UHFBRmYyWHNWIiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTIwNTk2LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.xlCXL7UUVnMoBKj0p0bXM_cnraWo5Io-TvUt2WBOl3k

Once your application receives the request, the first thing to do is to validate the token, either using Stormpath, or using local application-side logic. The benefit of using Stormpath to validate the token through the REST API (or an SDK that is using the REST API) is that Stormpath can validate the token against the state of your Application and Account resources. To illustrate the difference:

.. list-table::
    :widths: 60 15 15
    :header-rows: 1

    * - Validation Criteria
      - Locally
      - Stormpath

    * - Token hasn't been tampered with
      - Yes
      - Yes

    * - Token hasn't expired
      - Yes
      - Yes

    * - Token hasn't been revoked
      - No
      - Yes

    * - Account hasn't been disabled or deleted
      - No
      - Yes

    * - Issuer is Stormpath
      - Yes
      - Yes

    * - Issuing Application is still enabled, and hasn't been deleted
      - No
      - Yes

    * - Account is still in an Account Store for the issuing Application
      - No
      - Yes

It is up to you to determine which kind of validation is important for your application. If you need to validate the state of the Account and/or Application resources, or if you need to use token revocation, then using Stormpath to validate the token is the obvious choice. If you only require that the token has not expired and has not been tampered with, you can validate the token locally and minimize the network requests to Stormpath.

.. _about-token-validation:

Using Stormpath to Validate Tokens
""""""""""""""""""""""""""""""""""
To see how to validate tokens with Stormpath, let's go back to the example where a user has already generated an access token.

To recap, you have done the following:

.. only:: rest

  1. Sent a POST to ``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token`` with a body that included information about the OAuth Grant Type you wanted, as well as your user's username and password.
  2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

  The user now attempts to access a secured resource by passing the ``access_token`` JWT value from the Access Token Response in the ``Authorization`` header:

  .. code-block:: http

    GET /secure-resource HTTP/1.1
    Host: https://yourapplication.com
    Authorization: Bearer eyJraWQiOiIyWkZNVjRXV[...]

  The ``Authorization`` header contains the Access Token. To validate this Token with Stormpath, you can issue an HTTP GET to your Stormpath Application’s ``/authTokens/`` endpoint with the JWT token:

  .. code-block:: none

      https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/authTokens/eyJraWQiOiIyWkZNVjRXV[...]

  If the access token can be validated, Stormpath will return a 302 to the Access Token resource:

  .. code-block:: http

    HTTP/1.1 302 Location Found
    Location: https://api.stormpath.com/v1/accessTokens/6zVrviSEIf26ggXdJG097f

.. only:: csharp or vbnet

  1. Created and sent an OAuth request to Stormpath (see :ref:`generate-oauth-token`).
  2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in string (JWT) format.

  The user now attempts to access a secured resource and provides their Access Token (as in the example of passing a Bearer header to a protected web controller). To validate the Access Token, create and send a validation request to Stormpath:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/validate_oauth_token_sp_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/validate_oauth_token_sp_req.vb
      :language: vbnet

  If the Access Token can be validated, Stormpath will return the token to you as an ``IAccessToken``. If the Access Token is invalid or expired, a ``ResourceException`` will be thrown.

.. only:: java

  1. (java.todo)
  2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

  The user now attempts to access a secured resource by...?

  .. literalinclude:: code/java/authentication/validate_oauth_token_sp_req.java
    :language: java

  If the access token can be validated, Stormpath will return...?

  .. literalinclude:: code/java/authentication/validate_oauth_token_sp_resp.java
    :language: java

.. only:: nodejs

  1. (node.todo)
  2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

  The user now attempts to access a secured resource by...?

  .. literalinclude:: code/nodejs/authentication/validate_oauth_token_sp_req.js
    :language: javascript

  If the access token can be validated, Stormpath will return...?

  .. literalinclude:: code/nodejs/authentication/validate_oauth_token_sp_resp.js
    :language: javascript

.. only:: php

  1. Created a ``PasswordGrantRequest`` object with the user's email/username and password.
  2. Created a new ``PasswordGrantAuthenticator`` object and passed it the application object.
  3. Made an authenticate attempt with the ``PasswordGrantAuthenticator`` passing the ``PasswordGrantRequest`` object
  4. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

  The user now attempts to access a secured resource:

  .. literalinclude:: code/php/authentication/validate_oauth_token_sp_req.php
    :language: php

  If the Access Token can be validated, Stormpath will return this:

  .. literalinclude:: code/php/authentication/validate_oauth_token_sp_resp.php
    :language: php

.. only:: python

  1. (python.todo)
  2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

  The user now attempts to access a secured resource by...?

  .. literalinclude:: code/python/authentication/validate_oauth_token_sp_req.py
    :language: python

  If the access token can be validated, Stormpath will return...?

  .. literalinclude:: code/python/authentication/validate_oauth_token_sp_resp.py
    :language: python

With the confirmation that the token is valid, you can now allow the user to access the secured resource that they requested.

Validating the Token Locally
""""""""""""""""""""""""""""

Local validation would also begin at the point of the request to a secure resource:

.. code-block:: http

  GET /secure-resource HTTP/1.1
  Host: https://yourapplication.com
  Authorization: Bearer eyJraWQiOiIyWkZNVjRXV[...]

The token specified in the Authorization header has been digitally signed with the Stormpath API Key Secret that was used to generate the token.

.. only:: rest

  This means that you can use a JWT library for your specific language to validate the token locally if necessary. For more information, please see one of your `Integration Guides <https://docs.stormpath.com/home/>`_.

.. only:: csharp or vbnet

  Validating the token locally is simply a matter of using the ``WithLocalValidation`` flag when creating the request:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/validate_oauth_token_local.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/validate_oauth_token_local.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/validate_oauth_token_local.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/validate_oauth_token_local.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/validate_oauth_token_local.php
      :language: php

  If the token can be validated locally, it will return an expanded ``JWT``:

  .. literalinclude:: code/php/authentication/validate_oauth_token_local_res.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/validate_oauth_token_local.py
      :language: python

Refreshing Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

In the event that the Access Token expires, the user can generate a new one using the Refresh Token without re-entering their credentials.

.. only:: rest

  To use this Refresh Token, you make an HTTP POST to your Applications ``/oauth/token`` endpoint with it and you will get a new token back.

  .. code-block:: http

    POST /v1/applications/$YOUR_APPLICATION_ID/oauth/token HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/x-www-form-urlencoded

    grant_type=refresh_token&refresh_token=eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2IiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxNzIzNTk2fQ.xUjcxTZhWx74aa6adnUXjuvUgqjC8TvvrB7cBEmNF_g

.. only:: csharp or vbnet

  Simply create and send a Refresh Grant request to Stormpath containing the Refresh Token:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/refresh_access_token_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/refresh_access_token_req.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/refresh_access_token_req.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/refresh_access_token_req.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/refresh_access_token_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/refresh_access_token_req.py
    :language: python

.. only:: rest

  This would be the response:

  .. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: application/x-www-form-urlencoded

    {
      "access_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2TnJXSXM1aWttSVBWSkNuMnA0bnJyIiwiaWF0IjoxNDQxMTMzNjQ1LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTM1NDQ1LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.SbSmuPz0-v4J2BO9-lpyz_2_T62mSB1ql_0IMrftpgg",
      "refresh_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2IiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxNzIzNTk2fQ.xUjcxTZhWx74aa6adnUXjuvUgqjC8TvvrB7cBEmNF_g",
      "token_type": "Bearer",
      "expires_in": 1800,
      "stormpath_access_token_href": "https://api.stormpath.com/v1/accessTokens/6NrWIs5ikmIPVJCn2p4nrr"
    }

.. only:: csharp or vbnet

  The response type is ``IOauthGrantAuthenticationResult``, the same type as the initial grant response. The ``AccessTokenString`` property contains the new Access Token in string (JWT) form.

.. only:: java

  This would be the response:

  .. literalinclude:: code/java/authentication/refresh_access_token_resp.java
    :language: java

.. only:: nodejs

  This would be the response:

  .. literalinclude:: code/nodejs/authentication/refresh_access_token_resp.js
    :language: javascript

.. only:: php

  This would be the response:

  .. literalinclude:: code/php/authentication/refresh_access_token_resp.php
    :language: php

.. only:: python

  This would be the response:

  .. literalinclude:: code/python/authentication/refresh_access_token_resp.py
    :language: python

Note that this response contains the same Refresh Token as was in the request. This is because when Stormpath generates a new Access Token for a Refresh Token it does not generate a new Refresh token, nor does it modify its expiration time. This means that once the Refresh Token expires, the user must authenticate again to get a new Access and Refresh Tokens.

Revoking Access and Refresh Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are cases where you might want to revoke the Access and Refresh Tokens that you have generated for a user. For example:

- The user has explicitly logged out, and your application needs to revoke their access, requiring re-authentication.
- The application, device, and/or client has been compromised and you need to revoke tokens for an Account.

.. only:: rest

  To revoke the tokens, all you have to do is delete the Account's ``/accessTokens/:accessTokenId`` resource.

  First, you retrieve an Account's Access and Refresh tokens. To do this, make an HTTP GET call for the Account information, then you will find the tokens inside the ``/accessTokens`` and ``/refreshTokens`` collections:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
      "username": "jlpicard",
      "comment":" // This JSON has been truncated for readability",
      "accessTokens": {
        "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/accessTokens"
      },
      "refreshTokens": {
        "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexample/refreshTokens"
      }
    }

  If you then perform a GET on the ``accessTokens`` link, you will get back the individual tokens:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexample/accessTokens",
      "offset": 0,
      "limit": 25,
      "size": 1,
      "items": [
        {
          "href": "https://api.stormpath.com/v1/accessTokens/6NrWIs5ikmIPVJCexample",
          "comment":" // This JSON has been truncated for readability"
        }
      ]
    }

  .. note::

    You can query the Access Tokens that an Account has for a specific Application by specifying the Application's href as a URL parameter:

    .. code-block:: bash

      curl --request GET \
      --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexample//accessTokens?application.href=https://api.stormpath.com/v1/applications/1p4R1r9UBMQz0e5EXAMPLE"

.. only:: (csharp or vbnet)

  First, you have to get a reference to the Access or Refresh token you'd like to delete. You can do this by retrieving all the tokens for the Account in question and examining the returned items for the token you need to revoke:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/get_access_tokens.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/get_access_tokens.vb
      :language: vbnet

  .. note::

    You can restrict your search to only the Access or Refresh tokens related to a specific Application by specifying the Application's href:

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/get_access_tokens_for_app.cs
        :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/get_access_tokens_for_app.vb
        :language: vbnet

.. only:: rest

  To revoke the token, send the following request:

  .. code-block:: http

    DELETE /v1/accessTokens/6NrWIs5ikmIPVJCexample HTTP/1.1
    Host: api.stormpath.com

  You will get back a ``204 No Content`` response back from Stormpath when the call succeeds.

.. only:: csharp or vbnet

  After you retrieve the tokens, it's just a matter of telling Stormpath to delete them:

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/delete_user_access_tokens_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/delete_user_access_tokens_req.vb
      :language: vbnet

.. only:: java

  To revoke the token, send the following request:

  .. literalinclude:: code/java/authentication/delete_user_access_tokens_req.java
    :language: java

  You will get back a ... (java.todo)

  .. literalinclude:: code/java/authentication/delete_user_access_tokens_resp.java
    :language: java

.. only:: nodejs

  To revoke the token, send the following request:

  .. literalinclude:: code/nodejs/authentication/delete_user_access_tokens_req.js
    :language: javascript

  You will get back a ... (node.todo)

  .. literalinclude:: code/nodejs/authentication/delete_user_access_tokens_resp.js
    :language: javascript

.. only:: php

  To revoke the token, send the following request:

  .. literalinclude:: code/php/authentication/delete_user_access_tokens_req.php
    :language: php

  If successful, ``null`` will be returned

.. only:: python

  To revoke the token, send the following request:

  .. literalinclude:: code/python/authentication/delete_user_access_tokens_req.py
    :language: python

  You will get back a ... (python.todo)

  .. literalinclude:: code/python/authentication/delete_user_access_tokens_resp.py
    :language: python

.. _social-authn:

4.3. How Social Authentication Works
====================================

.. contents::
  :local:
  :depth: 1

Social authentication essentially means using the "Log in with x" button in your application, where "x" is a Social Login Provider of some kind. The Social Login Providers currently supported by Stormpath are:

- :ref:`Google <authn-google>`
- :ref:`Facebook <authn-facebook>`
- :ref:`Github <authn-github>`
- :ref:`LinkedIn <authn-linkedin>`

*The Social Login Process*

In general, the social login process works as follows:

1. The user who wishes to authenticate will click a "Log in with x" link.

2. The user will be asked by the Provider to accept the permissions required by your app.

3. The Provider will return the user to your application with an Access Token or Authorization Code.

4. Stormpath will take this token/code and use it to query the provider for:

   - an email address
   - a first name
   - a last name.

.. note::

    If Stormpath is unable to retrieve the user's first and last name, it will populate those attributes with a default value: ``NOT_PROVIDED``.

5. Stormpath will search for a Directory that matches the provider of the token/code. If one is not found, an error will be returned.

6. Once the Directory is located, Stormpath will look for an Account in your application's Directories that matches this information.

.. only:: rest

     a. If a matching Account is found, Stormpath will return the existing Account's ``href``.

     b. If a matching Account is not found, Stormpath will create one and return the new Account's ``href``.

  7. At this point, a language/framework-specific integration would use this ``href`` to create a Session for the user.

.. only:: csharp or vbnet

     a. If a matching Account is found, Stormpath will return the existing Account.

     b. If a matching Account is not found, Stormpath will create one and return it.

  7. The Account can now be used like any other Account in Stormpath.

.. only:: java

    a. If a matching Account is found, (java.todo)

    b. If a matching Account is not found, (todo)

 7. At this point, (todo)

.. only:: nodejs

    a. If a matching Account is found, (node.todo)

    b. If a matching Account is not found, (todo)

 7. At this point, (todo)

.. only:: php

    a. If a matching Account is found, Stormpath will return the existing Account's ``href``.

    b. If a matching Account is not found, Stormpath will create one and return the new Account's ``href``.


.. only:: python

    a. If a matching Account is found, (python.todo)

    b. If a matching Account is not found, (todo)

 7. At this point, (todo)

As a developer, integrating Social Login into your application with Stormpath only requires three steps:

1. Create a Social Directory for your Provider.

2. Map the Directory as an Account Store to an Application resource. When an Account Store (in this case a Directory) is mapped to an Application, the Accounts in the AccountStore are considered the Application’s users and they can log in to it.

3. Include the provider-specific logic that will access the social account (e.g. embed the appropriate link in your site that will send an authentication request to the social provider)

.. _authn-google:

4.3.1. Google
--------------

Before you integrate Google Login with Stormpath, you must complete the following steps:

- Create an application in the `Google Developer Console <https://console.developers.google.com/start>`_

- Enable Google Login for your Google application

- Retrieve the OAuth Credentials (Client ID and Secret) for your Google application

- Add your application's redirect URL, which is the URL the user will be returned to after successful authentication.

.. note::

    Be sure to only enter the Redirect URL you are currently using. So, if you are running your app in development mode, set it to your local URL, and if you're running your app in production mode, set it to your production URL.

For more information, please see the `Google OAuth 2.0 documentation <https://developers.google.com/identity/protocols/OAuth2>`_.

Step 1: Create a Social Directory for Google
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating this Directory for Google requires that you provide information from Google as a Provider resource. This can be accomplished by creating a new Directory:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "name" : "my-google-directory",
        "description" : "A Google directory",
        "provider": {
            "providerId": "google",
            "clientId":"YOUR_GOOGLE_CLIENT_ID",
            "clientSecret":"YOUR_GOOGLE_CLIENT_SECRET",
            "redirectUri":"YOUR_GOOGLE_REDIRECT_URI"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_directory_google.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_directory_google.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_google.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_google.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_directory_google.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_google.py
    :language: python

.. note::

    If you are using `Google+ Sign-In for server-side apps <https://developers.google.com/identity/sign-in/web/server-side-flow>`_, Google recommends that you leave the "Authorized Redirect URI" field blank in the Google Developer Console. In Stormpath, when creating the Google Directory, you must set the redirect URI to ``postmessage``.

Step 2: Map the Google Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an Account Store Mapping between your new Google Directory and your Stormpath Application can be done as described in :ref:`create-asm`.

Step 3: Access an Account with Google Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To access or create an Account in your new Google Directory, you must gather a Google **Authorization Code** on behalf of the user. This requires leveraging `Google’s OAuth 2.0 protocol <https://developers.google.com/identity/protocols/OAuth2>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to Google. Once the user has authenticated, Google will redirect the response to your application, including the **Authorization Code** or **Access Token**. This is documented in detail here: `Using OAuth 2.0 for Web Server Applications <https://developers.google.com/identity/protocols/OAuth2WebServer>`_.

.. note::

    It is required that your Google application requests the ``email`` scope from Google. If the authorization code or access token does not grant ``email`` scope, you will not be able to get an Account. For more information about scopes please see `Google's OAuth Login Scopes documentation <https://developers.google.com/+/web/api/rest/oauth#login-scopes>`_.

Once the Authorization Code is gathered, you send this request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/YOUR_APP_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

If you have already exchanged an Authorization Code for an Access Token, this can be passed to Stormpath in a similar fashion:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/YOUR_APP_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

Either way, Stormpath will use the code or access token provided to retrieve information about your Google Account, then return a Stormpath Account.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  (java.todo)

.. only:: nodejs

  (node.todo)

.. only:: php

  In order to know if the account was created or if it already existed in the Stormpath’s Facebook Directory you can use the ``isNewAccount();`` method on the result object. It will return ``true`` if it is a newly created account; false otherwise.

.. only:: python

  (python.todo)

.. _authn-facebook:

4.3.2. Facebook
---------------

Before you integrate Facebook Login with Stormpath, you must complete the following steps:

- Create an application on the `Facebook Developer Site <https://developers.facebook.com/>`_

- Retrieve your OAuth credentials (App ID and App Secret)

- Add your application's private and public root URLs

For more information, please see the `Facebook documentation <https://developers.facebook.com/docs/apps/register>`_.

Step 1: Create a Social Directory for Facebook
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating this Directory requires that you provide information from Facebook as a Provider resource. This can be accomplished by creating a new Directory:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "name" : "my-facebook-directory",
        "description" : "A Facebook directory",
        "provider": {
          "providerId": "facebook",
          "clientId":"YOUR_FACEBOOK_APP_ID",
          "clientSecret":"YOUR_FACEBOOK_APP_SECRET"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_directory_fb.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_directory_fb.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_fb.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_fb.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_directory_fb.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_fb.py
    :language: python

Step 2: Map the Facebook Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an Account Store Mapping between your new Facebook Directory and your Stormpath Application can be done as described in :ref:`create-asm`.

Step 3: Access an Account with Facebook Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To access or create an Account in your new Facebook Directory, you need to gather a **User Access Token** from Facebook before submitting it to Stormpath. This is possible either by using a `Facebook SDK Library <https://developers.facebook.com/docs/facebook-login/access-tokens/#usertokens>`_, or `Facebook’s Graph Explorer <https://developers.facebook.com/tools/explorer/>`_ for testing.

.. note::

    It is required that your Facebook application requests the ``email`` scope from Facebook. If the access token does not grant ``email`` scope, you will not be able to get an Account with an access token. For more information about scopes please see `Permissions with Facebook Login <https://developers.facebook.com/docs/facebook-login/permissions/>`_.

Once the User Access Token is gathered, you send this request:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

Stormpath will use the Access Token provided to retrieve information about your Facebook Account, then return a Stormpath Account.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  (java.todo)

.. only:: nodejs

  (node.todo)

.. only:: php

  In order to know if the account was created or if it already existed in the Stormpath’s Facebook Directory you can use the ``isNewAccount();`` method on the result object. It will return ``true`` if it is a newly created account; false otherwise.

.. only:: python

  (python.todo)

.. _authn-github:

4.3.3. Github
-------------

Before you integrate GitHub Login with Stormpath, you must complete the following steps:

- Create an application in the `GitHub Developer Site <https://developer.github.com/>`_

- Retrieve OAuth Credentials (Client ID and Secret) for your GitHub application

- Add your application's redirect URL, which is the URL the user will be returned to after successful authentication.

For more information, please see the `GitHub documentation on registering your app <https://developer.github.com/guides/basics-of-authentication/#registering-your-app>`_.

Step 1: Create a Social Directory for GitHub
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating this Directory requires that you provide information from GitHub as a Provider resource. This can be accomplished by creating a new Directory:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "name" : "my-github-directory",
        "description" : "A GitHub directory",
        "provider": {
          "providerId": "github",
          "clientId":"YOUR_GITHUB_CLIENT_ID",
          "clientSecret":"YOUR_GITHUB_CLIENT_SECRET"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_directory_github.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_directory_github.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_github.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_github.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_directory_github.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_github.py
    :language: python

Step 2: Map the GitHub Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an Account Store Mapping between your new GitHub Directory and your Stormpath Application can be done as described in :ref:`create-asm`.

Step 3: Access an Account with GitHub Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To access or create an Account in your new Github Directory, you must gather a Github **Authorization Code** on behalf of the user. This requires leveraging `Github's OAuth 2.0 protocol <https://developer.github.com/v3/oauth>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to Github. Once the user has authenticated, Github will redirect the response to your application, including the **Authorization Code**. This is documented in detail `here <https://developer.github.com/v3/oauth/#web-application-flow>`_.

.. note::

    It is required that your GitHub application requests the ``user:email`` scope from GitHub. If the access token does not grant ``user:email`` scope, you will not be able to get an Account with an access token. For more information about this see `Github's documentation on OAuth scopes <https://developer.github.com/v3/oauth/#scopes>`_.

Once the Authorization Code is gathered, you need to use the `Github Access Token Endpoint <https://developer.github.com/v3/oauth/#2-github-redirects-back-to-your-site>`_ to exchange this code for an access token.  Then you can send this information to Stormpath:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

Stormpath will use the Access Token provided to retrieve information about your GitHub Account, then return a Stormpath Account.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

 (java.todo)

.. only:: nodejs

 (node.todo)

.. only:: php

  In order to know if the account was created or if it already existed in the Stormpath’s Facebook Directory you can use the isNewAccount(); method on the result object. It will return true if it is a newly created account; false otherwise.

.. only:: python

 (python.todo)

.. _authn-linkedin:

4.3.4 LinkedIn
--------------

Before you integrate LinkedIn Login with Stormpath, you must complete the following steps:

- Create an application in the `LinkedIn Developer Site <https://www.linkedin.com/secure/developer?newapp=>`_

- Add your application's redirect URLs, which are the URL the user will be returned to after successful authentication.

- Retrieve OAuth Credentials (Client ID and Secret) for your LinkedIn application

For more information, please see `LinkedIn's OAuth documentation <https://developer.linkedin.com/docs/oauth2>`_.

Step 1: Create a Social Directory for LinkedIn
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating this Directory requires that you provide information from LinkedIn as a Provider resource. This can be accomplished by creating a new Directory:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "name" : "my-linkedin-directory",
        "description" : "A LinkedIn Directory",
        "provider": {
          "providerId": "linkedin",
          "clientId":"YOUR_LINKEDIN_APP_ID",
          "clientSecret":"YOUR_LINKEDIN_APP_SECRET"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/create_directory_linkedin.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/create_directory_linkedin.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_linkedin.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_linkedin.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_directory_linkedin.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_linkedin.py
    :language: python

Step 2: Map the LinkedIn Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an Account Store Mapping between your new LinkedIn Directory and your Stormpath Application can be done as described in :ref:`create-asm`.

Step 3: Access an Account with LinkedIn Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To access or create an Account in your new LinkedIn Directory, you must gather a LinkedIn **Authorization Code** on behalf of the user. This requires leveraging `LinkedIn's OAuth 2.0 protocol <https://developer.linkedin.com/docs/oauth2>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to LinkedIn. Once the user has authenticated, LinkedIn will redirect the response to your application, along with an Authorization Code. This is documented in detail in LinkedIn's `Authenticating with OAuth 2.0 page <https://developer.linkedin.com/docs/oauth2#hero-par_longformtext_3_longform-text-content-par_resourceparagraph_3>`_. Note that it is also possible for you to use the Authorization Code to retrieve an Access Token yourself.

.. note::

    It is required that your LinkedIn application requests the ``r_basicprofile`` and ``r_emailaddress`` scopes (or "fields") from LinkedIn. If the Authorization Code does not grant these scopes, you will not be able to get an Account. For more information about LinkedIn scopes, see `LinkedIn's "Profile Fields" documentation <https://developer.linkedin.com/docs/fields>`_.

Once the Authorization Code is gathered, you can send it to Stormpath:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

If you have already exchanged the code for an Access Token, you can send that instead:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/accounts HTTP/1.1
    Host: api.stormpath.com
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

Stormpath will use the ``code`` or ``accessToken`` provided to retrieve information about your LinkedIn Account, then return a Stormpath Account.

.. only:: rest

  The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200).

.. only:: csharp or vbnet

  The ``IProviderAccountResult`` response includes an ``IsNewAccount`` property which indicates whether the Account already existed in your Stormpath Directory or not. You can retrieve the Account details through the ``Account`` property.

.. only:: java

  (java.todo)

.. only:: nodejs

  (node.todo)

.. only:: php

  In order to know if the account was created or if it already existed in the Stormpath’s Facebook Directory you can use the isNewAccount(); method on the result object. It will return true if it is a newly created account; false otherwise.

.. only:: python

.. _ldap-dir-authn:

4.4. Authenticating Against an LDAP Directory
=============================================

.. contents::
  :local:
  :depth: 2

This section assumes that you are already familiar both with :ref:`how-login-works` and the concept of Stormpath :ref:`LDAP Directories <about-ldap-dir>`.

Mirror Directories and LDAP
---------------------------

To recap: With LDAP integration, Stormpath is simply mirroring the canonical LDAP user directory. If this fulfills your requirements, then the story ends here. However, if you need to support other kinds of login (and therefore other kinds of Directories) it is recommended that you maintain a "master" Directory alongside your Mirror Directory. For more about this, see :ref:`mirror-login` above.

The step-by-step process for setting-up LDAP login is as follows:

.. _authn-ldap-dir-creation:

Step 1: Create an LDAP Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: csharp or vbnet

  .. warning::

    The ability to create an LDAP directory is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see below for the REST API instructions.

    For updates, you can follow `ticket #167 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/167>`_ on Github.

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_ldap.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_ldap.js
    :language: javascript

.. only:: php

  .. warning::

    This feature is not yet available in the PHP SDK. Please use the Stormpath Admin Console, or see below for the REST API instructions.

    For updates, you can follow `ticket #148 <https://github.com/stormpath/stormpath-sdk-php/issues/148>`_ on Github.

    .. todo::

      Add SAML directory creation .NET example

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_ldap.py
    :language: python

.. only:: rest or vbnet or csharp or php

  HTTP POST a new Directory resource to the ``/directories`` endpoint. This Directory will contain a :ref:`ref-provider` resource with ``providerId`` set to ``ldap`` or ``ad``. This Provider resource will in turn contain an :ref:`ref-ldap-agent` object, which in turn also contains a few nested configuration resources.

  .. note::

    All of these must be passed at the same time:

    .. code-block:: none

      directory
        └──provider
            └──agent
                └──config
                    ├──accountConfig
                    └──groupConfig

  The full Directory object, with all of the required resources, will look like this:

  .. code-block:: http

      POST /v1/directories HTTP/1.1
      Host: api.stormpath.com
      Content-Type: application/json;charset=UTF-8

      {
        "name":"My LDAP Directory",
        "description":"An LDAP Directory created with the Stormpath API",
        "provider":{
          "providerId":"ldap",
          "agent":{
            "config":{
              "directoryHost":"ldap.local",
              "directoryPort":"636",
              "sslRequired":true,
              "agentUserDn":"tom@stormpath.com",
              "agentUserDnPassword":"StormpathRulez",
              "baseDn":"dc=example,dc=com",
              "pollInterval":60,
              "accountConfig":{
                "dnSuffix":"ou=employees",
                "objectClass":"person",
                "objectFilter":"(cn=finance)",
                "emailRdn":"email",
                "givenNameRdn":"givenName",
                "middleNameRdn":"middleName",
                "surnameRdn":"sn",
                "usernameRdn":"uid",
                "passwordRdn":"userPassword"
              },
              "groupConfig":{
                "dnSuffix":"ou=groups",
                "objectClass":"groupOfUniqueNames",
                "objectFilter":"(ou=*-group)",
                "nameRdn":"cn",
                "descriptionRdn":"description",
                "membersRdn":"uniqueMember"
              }
            }
          }
        }
      }

  For more information about all of these values, please see the Reference chapter's `Directory <https://docs.stormpath.com/rest/product-guide/latest/reference.html#directory>`__ section.


Step 2: Install your LDAP Agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the Directory, Provider and Agent are created, installing your Agent is done in three steps.

**1. Download**

Download your Agent by following the Download link on the Agent page in the Admin Console.

**2. Configure**

*a.* Make sure Java 1.8 is installed

*b.* Unzip to a location in your file system, for example ``C:\stormpath\agent`` in Windows or ``/opt/stormpath/agent`` in Unix.

In the same location, open the file ``dapper.properties`` from the config folder and replace this line::

  agent.id = PutAgentSpecificIdHere

With this line::

  agent.id  = 72MlbWz6C4dLo1oBhgjjTt

Follow the instructions in the ``dapper.properties`` file to reference your account's API authentication.

**3. Start**

In Windows:

(Go to your agent directory, for example ``C:\stormpath\agent``)

.. code-block:: none

  C:\stormpath\agent>cd bin
  C:\stormpath\agent\bin>startup.bat

In Unix:

(Go to your agent directory, for example ``/opt/stormpath/agent``)

.. code-block:: bash

  $ cd bin
  $ startup.sh

The Agent will start synchronizing immediately, pushing the configured data to Stormpath. You will see the synchronized user Accounts and Groups appear in the Stormpath Directory, and the Accounts will be able to log in to any Stormpath-enabled application that you assign. When the Agent detects local changes, additions or deletions to the mirrored Accounts or Groups, it will automatically propagate those changes to Stormpath.

Step 3: Map the LDAP Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Creating an Account Store Mapping between your new LDAP Directory and your Stormpath Application can be done as described in :ref:`create-asm`.

The log-in process will now proceed as it would for :ref:`any other kind of Directory <how-login-works>`.

.. note::

  In the case of Active Directory, the login process does not proceed as normal, and instead involves something called "delegated authentication". The user accounts pulled-in from an Active Directory do not include the passwords. Consequently, the LDAP Agent does double duty in the case of Active Directory: it synchronizes accounts, and it also handles authentication attempts and relays back the outcome to Stormpath.

.. _saml-authn:

4.5. Authenticating Against a SAML Directory
============================================

.. contents::
  :local:
  :depth: 1

SAML is an XML-based standard for exchanging authentication and authorization data between security domains. Stormpath enables you to allow customers to log-in by authenticating with an external SAML Identity Provider. Stormpath supports both the Service Provider initiated flow and the Identity Provider initiated flow.

If you'd like a high-level description of Stormpath's SAML support, see :ref:`Stormpath as a Service Provider <saml-overview>`.

If you want a step-by-step guide to configuring Stormpath to work with Identity Providers like Salesforce, OneLogin and Okta, as well as with your ADFS deployment, see :ref:`Configuring SAML <saml-configuration>`.

If you'd like to know about how to configure SAML using just the REST API, please see :ref:`Configuring SAML via REST <saml-configuration-rest>`.

If you'd like to understand the steps involved in a SAML login, see the :ref:`SAML Login Flow section <saml-flow>`.

.. _saml-overview:

4.5.1. Stormpath as a Service Provider
--------------------------------------

As mentioned above, Stormpath supports both Service Provider (SP) initiated and Identity Provider (IdP) initiated SAML authentication.  In SAML terminology, the user is the **User Agent**, your application (along with Stormpath) is the **Service Provider**, and the third-party SAML authentication site is the **Identity Provider** or **IdP**.

Identity Provider Initiated SAML Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

With IdP-initiated SAML Authentication, the user authenticates first with the Identity Provider, and then logs into your Stormpath-enabled application from a screen inside the IdP's site.

The IdP initiated process looks like this:

#. User Agent authenticates with the IdP
#. User Agent requests login to Your Application
#. IdP redirects the user to Your Application along with SAML assertions
#. Service Provider receives SAML assertions and either creates or retrieves Account information

Service Provider Initiated SAML Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this scenario, a user requests a protected resource (e.g. your application). Your application, with the help of Stormpath, then confirms the user's identity in order to determine whether they are able to access the resource.

The broad strokes of the process are as follows:

#. User Agent requests access from Service Provider
#. Service Provider responds with redirect to Identity Provider
#. Identity Provider authenticates the user
#. Identity provider redirects user back to Service Provider along with SAML assertions.
#. Service Provider receives SAML assertions and either creates or retrieves Account information

In both cases, just like with Mirror and Social Directories, the user information that is returned from the IdP is used by Stormpath to either identify an existing Account resource, or create a new one. In the case of new Account creation, Stormpath will map the information in the response onto its own resources. In the following section you will walk you through the process of configuring your SAML Directory, as well as giving you an overview of how the SAML Authentication process works.

For a more detailed step-by-step account of SAML login, see :ref:`below <saml-flow>`.

.. _saml-configuration:

4.5.2. Configuring SAML
-----------------------

.. todo::

  Update with IdP-initiated flow information once available.

This section will show you how to set-up Stormpath to allow your users to log in with a SAML-enabled Identity Provider (IdP). It assumes that you have two things:

- A Stormpath account with at least an Advanced plan

- A developer Account with one of the following Identity Providers who support SAML:

    - :ref:`Salesforce <salesforce>`
    - :ref:`OneLogin <onelogin>`
    - :ref:`Okta <okta>`
    - :ref:`Ping Identity <ping>`

We also provide authentication against an Active Directory via :ref:`ADFS SAML <adfs>`.

.. note::

  These are not the only SAML-enabled Identity Providers that Stormpath can integrate with, but they are the ones that have been tested and verified as working.

  Currently these instructions only cover SP-initiated SAML and not the IdP-initiated flow configuration.

.. todo::

  **Conventions:**

  - Clickable navigation items are in **bold**

  - Page elements (things to look for on a page) will be in "quotes". So the name of the value on the IdP's settings page, as well as the name of what that value is in the Stormpath API (e.g. "SP-Initiated Redirect Endpoint" and "SSO Login URL").

.. _salesforce:

Salesforce
^^^^^^^^^^

.. contents::
    :local:
    :depth: 1

Step 1: Set-up Salesforce
"""""""""""""""""""""""""

.. note::

    Before you start, make sure that you have set-up a Salesforce subdomain for your organization. You can do this under **Administer** > **Domain Management** > **My Domain**.

1.1. Set-up Salesforce
++++++++++++++++++++++++++++++++++

#. Under **Administer**, click on **Security Controls** > **Identity Provider**

#. Click on **Enable Identity Provider**.

#. You should now be on the "Identity Provider Setup" page, with a single security certificate in the drop down menu. Click on **Save**.

#. You will now be back on the "Identity Provider" page. Click **Download Certificate**, which will download a .crt file with a name starting with ``SelfSignedCert``.

#. Open this file in your text editor of choice. The contents will be an x509 certificate starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert".

#. Also click on **Download Metadata**, which will download an XML file which you will use in step 2.

1.2. Set-up Single Sign On
++++++++++++++++++++++++++

#. From **Administer**, click on **Security Controls** then **Single Sign-On Settings**.

#. Click **Edit**, and on the next page check "SAML Enabled" and then click **Save**.

#. Under "SAML Single Sign-On Settings" click on **New from Metadata File**.

#. Select the metadata XML file that you downloaded in step 1.1 above, then click **Create**.

1.3. Create a Connected App
+++++++++++++++++++++++++++

Every Salesforce app will need its own Stormpath Directory. The users for that Salesforce app will only be able to log in if that application's information is properly entered into a corresponding Stormpath Directory.

.. note::

  If you already have a Salesforce application with SAML enabled, you can skip to Step 4 here.

#. In the navigation pane on the left, under **Build**, find the **Create** section, then click on **Apps**.

#. From the "Apps" page, find the "Connected Apps" section and click the **New** button.

#. Enter in your information.

#. Click on **Enable SAML**

#. For the "Entity ID" field enter in ``changeme`` as a temporary value

#. For the "ACS URL" you will also enter in a temporary value: ``http://example.com``

#. For "Name ID Format" select the "emailAddress" format. Unlike the other two, this value is not temporary.

#. Click **Save**.

1.4. Get your SSO URLs
++++++++++++++++++++++

You will now be on your Connected App's page.

#. Click **Manage**

#. Under "SAML Login Information", copy the "SP-Initiated Redirect Endpoint". It will be a URL ending in ``idp/endpoint/HttpRedirect``. This value will be used for both your "SSO Login URL" and "SSO Logout URL" when you are setting up your Stormpath SAML Directory.

Step 2: Create Your SAML Directory in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""

You will now create your SAML Directory in Stormpath, using the values you gathered in the previous step. Then you will use information from this newly-created Directory to configure Stormpath as a Service Provider in Salesforce in the next step.

2.1. Create Your SAML Directory
+++++++++++++++++++++++++++++++

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab.

#. Click on **Create Directory**.

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status to "Enabled".

#. For both the "SAML SSO Login Url" and "SAML SSO Logout Url" fields, you will enter in the URL gathered in step 1.4 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate you downloaded in step 1.1.

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page.

2.2. Gather Your SAML Directory Information
+++++++++++++++++++++++++++++++++++++++++++

Find and click on your new SAML Directory.

On this page, you will need the follow information:

- The Directory's "HREF" found at the very top.

- The "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section:

We will now input these values into the Identity Provider.

Step 3: Configure Your Service Provider in Salesforce
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Back on your Connected App's page (found under **Administer** > **Connected Apps**), click **Edit**.

You will now enter in your Directory information:

#. For the "Entity ID", you will need to enter in the Directory "HREF" for your SAML Directory.

#. The "ACS URL" is the "Assertion Consumer Service URL" from the previous step.

#. Click **Save**

#. Under the "Profiles" section, you will need to click on **Manage Profiles** and select profiles appropriate to the users that will be logging in to your app. For more information about profiles, see the `Salesforce documentation <https://help.salesforce.com/apex/HTViewHelpDoc?id=admin_userprofiles.htm&language=en>`__.

Step 4: Configure Your Application in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Stormpath Application, and mapping your SAML Directory to your Application.

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab.

#. Select the Application that will be using the SAML Directory.

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane.

#. Once you are on your Application's Account Stores page, click **Add Account Store**. This will bring up the "Map Account Store" dialog.

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

You have now completed the initial steps of setting-up log in via Salesforce.

Step 5: Configure Your Attribute Mappings
"""""""""""""""""""""""""""""""""""""""""

When a new Account logs in via SAML, Salesforce sends along a number of SAML attributes. These attributes are mapped to Stormpath `Account attributes <https://docs.stormpath.com/rest/product-guide/latest/reference.html#account>`__ (such as ``givenName`` or ``email``) and these values are either stored, if the Account is new, or updated, if the Account exists but the values are different. In this step you will configure how these Salesforce SAML Attributes are mapped to Stormpath attributes.

4.1. Find the Existing SAML Attributes
++++++++++++++++++++++++++++++++++++++

If you have already successfully set-up SAML and authenticated a user with your app, you will be able to retrieve the SAML Attributes that Salesforce sends by retrieving the new user Account that was created inside Stormpath.

Specifically, you want that Account's Provider Data:

.. only:: csharp or vbnet

  .. warning::

    The ability to inspect SAML Provider Data is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or read the REST documentation below.
    For updates, you can follow `ticket #171 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/171>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/saml_salesforce_account_providerdata.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/saml_salesforce_account_providerdata.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/saml_salesforce_account_providerdata.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/saml_salesforce_account_providerdata.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/saml_salesforce_account_providerdata.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/saml_salesforce_account_providerdata.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/accounts/xbKQemsqSForceXAMPLE/providerData",
      "createdAt":"2016-01-20T17:56:25.532Z",
      "modifiedAt":"2016-01-20T17:57:22.530Z",
      "email":"saml+testuser@email.com",
      "is_portal_user":"false",
      "providerId":"saml",
      "userId":"00536000000G4ft",
      "username":"saml+testuser@email.com"
    }

  Everything here other than ``href``, ``createdAt`` and ``modifiedAt`` are Attributes passed by Salesforce.

Now the ``email`` Attribute has already been passed as part of the Account creation, but you can also map the other SAML Attributes to Stormpath Account attributes as well.

4.2. (Optional) Add Any Additional Attributes You Want
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If there are other attributes that you would like Salesforce to pass, you can configure this. From your Salesforce settings page:

#. Under **Administer**, click on **Connected Apps**.
#. Select the App you would like to configure.
#. On the App's page, find the "Custom Attributes" section and click on **New**
#. You will now be on the "Create Custom Attribute" page
#. Here you will specify a custom "Attribute key" and then select which Salesforce user information you want it to represent.

For example:

* You could make the "Attribute key": ``firstname``
* Then click on **Insert Field**
* From here you would select **$User >** and **First Name** then click **Insert**
* Click **Save**

You will now be returned to your App's main page, and you will see the attribute you just added in the "Custom Attributes" section. You can add as many attributes as you wish.

4.3. Specify Your Mapping
+++++++++++++++++++++++++

#. Go to your `Stormpath Admin Console <https://api.stormpath.com/>`__
#. Click on the **Directories** tab
#. Select your Salesforce SAML Directory
#. Under the "SAML Attribute Statement Mapping Rules" section you will see three fields: "Name", "Name Format", and "Stormpath Attributes"
#. Here you will enter the Salesforce attribute name under "Name"
#. (Optional) Under "Name Format" you can enter ``urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified``
#. Finally, enter the Account attribute(s) that you would like this Salesforce attribute to map to

For example, using the custom attribute from Step 4.2 above:

* For the "Name" enter ``firstname``
* For "Stormpath Attributes" enter ``givenName``

If a user now logs in, Stormpath will take the ``firstname`` SAML attribute and map it to the ``givenName`` field on the Stormpath Account resource.

.. _onelogin:

OneLogin
^^^^^^^^

.. contents::
    :local:
    :depth: 1

Step 1: Set-up OneLogin
"""""""""""""""""""""""

Every OneLogin application will need its own Stormpath Directory. The users for that OneLogin application will only be able to log in if that application's information is properly entered into a corresponding Stormpath Directory.

.. note::

  If you already have a OneLogin application of this type (``SAML Test Connector (IdP w/ attr w/ sign response)``), you can skip this step.

#. Complete the OneLogin set-up, including adding your subdomain, users, etc.

#. On the "Find Applications" page, search for "SAML"

#. Select **SAML Test Connector (IdP w/ attr w/ sign response)**

#. Give your app a name and click **Save**

Step 2: Gather Your OneLogin Information
"""""""""""""""""""""""""""""""""""""""""""""""""

You will now need to gather the following pieces of information from your OneLogin application:

- X.509 Signing Certificate
- SSO Login URL
- SSO Logout URL
- Request Signature Algorithm

To start, click on **SSO** in your App's navigation pane.

2.1 IdP Signing Certificate
+++++++++++++++++++++++++++

#. Under "X.509 Certificate", click on **View Details**. This will take you to the certificate details page.

#. Copy the contents of the "X.509 Certificate" text box, starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert".

2.2. The SSO Login / Logout URLs
++++++++++++++++++++++++++++++++

Return to the **App** > **SSO** section. On this page there are two different URLS:

#. Copy the "SAML 2.0 Endpoint (HTTP)", which is the "SSO Login URL" that Stormpath needs, and
#. Copy the "SLO Endpoint (HTTP)", which is the "SSO Logout URL".

Step 3: Create Your SAML Directory in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""

We will now create your SAML Directory in Stormpath, using the values you gathered in the previous step. Then you will use information from this newly-created Directory to configure Stormpath as a Service Provider in OneLogin in the next step.

3.1. Create Your SAML Directory
+++++++++++++++++++++++++++++++

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab.

#. Click on **Create Directory**.

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status.

#. For "SAML SSO Login Url" paste in the "SAML 2.0 Endpoint (HTTP)" from the OneLogin site.

#. For "SAML SSO Logout Url" fields, paste in the "SLO Endpoint (HTTP)" from step 1.2 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate in step 1.1.

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page.

3.2. Gather Your SAML Directory Information
+++++++++++++++++++++++++++++++++++++++++++

#. Find and click on your new SAML Directory.

#. Copy the "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section

.. note::

    You should leave this page open, since you'll be back here in Step 4.

We will now input this value into the Identity Provider.

Step 4: Configure Your Service Provider in OneLogin
""""""""""""""""""""""""""""""""""""""""""""""""""""

#. Back in your OneLogin App's settings page (found under **Apps** > **Company Apps**), click **Configuration** in the App's navigation pane.

#. Copy your Directory's "Assertion Consumer Service URL" into both the "ACS (Consumer) URL Validator" and "ACS (Consumer) URL" fields.

#. Now click on **Parameters** in the App navigation pane. On this page, you need to ensure that your "Email (SAML NameID)" field has the value "Email", which it should by default.

Step 5: Configure Your Application in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Application, and mapping your SAML Directory to your Application.

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab.

#. Select the Application that will be using the SAML Directory.

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane.

#. Once you are on your Application's Account Stores page, click "Add Account Store". This will bring up the "Map Account Store" dialog.

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

You have now completed the initial steps of setting-up log in via OneLogin.

Step 6: Configure Your Attribute Mappings
"""""""""""""""""""""""""""""""""""""""""

When a new Account logs in via SAML, OneLogin sends along a number of SAML attributes. These attributes are mapped to Stormpath `Account attributes <https://docs.stormpath.com/rest/product-guide/latest/reference.html#account>`__ (such as ``givenName`` or ``email``) and these values are either stored, if the Account is new, or updated, if the Account exists but the values are different. In this step you will configure how these OneLogin SAML Attributes are mapped to Stormpath attributes.

6.1. Find the Existing SAML Attributes
++++++++++++++++++++++++++++++++++++++

If you have already successfully set-up SAML and authenticated a user with your app, you will be able to retrieve the SAML Attributes that OneLogin sends by retrieving the new user Account that was created inside Stormpath.

Specifically, you want that Account's ``providerData`` resource:

.. only:: csharp or vbnet

  .. warning::

    The ability to inspect SAML Provider Data is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or read the REST documentation below..
    For updates, you can follow `ticket #171 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/171>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/saml_onelogin_account_providerdata.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/saml_onelogin_account_providerdata.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/saml_onelogin_account_providerdata.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/saml_onelogin_account_providerdata.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/saml_onelogin_account_providerdata.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/saml_onelogin_account_providerdata.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/accounts/2i6RxkcOneLogineXaMPle/providerData",
      "createdAt":"2016-01-21T18:11:09.838Z",
      "modifiedAt":"2016-01-21T18:13:39.102Z",
      "PersonImmutableID":"samltestuser",
      "User.FirstName":"John",
      "User.LastName":"Samlton",
      "User.email":"saml+testuser@example.com",
      "providerId":"saml"
    }

  Everything here other than ``href``, ``createdAt`` and ``modifiedAt`` are Attributes passed by OneLogin.

Now the ``email`` Attribute has already been passed as part of the Account creation, but you can also map the other attributes to Stormpath Account attributes as well.

6.2. (Optional) Add Any Additional Attributes You Want
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If there are other attributes that you would like OneLogin to pass, you can configure this. From your OneLogin settings page:

#. Click on **Apps** > **Company Apps**
#. Select the App that you want to configure
#. From the App's page, click on **Parameters**
#. If you want to add any additional parameters, click on **Add parameter**
#. In the "New Field" dialog box, give the attribute whatever name you wish, and select **Include in SAML assertion**
#. Back on the "Parameters" page, click on your new Attribute. This will bring up the "Edit Field" dialog
#. Select the "Value" that you would like this Attribute to represent. This is the piece of user information OneLogin stores that you would like to be transferred to Stormpath in your Attribute.
#. Click **Save**

For example:

* For "Field name" enter ``companyName`` and check "Include in SAML assertion"
* For the "Value" you would choose "Company"

You will now be returned to your App's main page, and you will see the attribute you just added in the "Custom Attributes" section. You can add as many attributes as you wish.

6.3. Specify Your Mapping
+++++++++++++++++++++++++

#. Go to your `Stormpath Admin Console <https://api.stormpath.com/>`__
#. Click on the **Directories** tab
#. Select your OneLogin SAML Directory
#. Under the "SAML Attribute Statement Mapping Rules" section you will see three fields: "Name", "Name Format", and "Stormpath Attributes"
#. Here you will enter the OneLogin attribute name under "Name"
#. (Optional) Under "Name Format" you can enter ``urn:oasis:names:tc:SAML:2.0:attrname-format:basic``
#. Finally, enter the Account attribute(s) that you would like this OneLogin attribute to map to

For example, you could enter:

* For the "Name" enter ``User.FirstName``
* For "Stormpath Attributes" enter ``givenName``

If a user now logs in, Stormpath will take the ``User.FirstName`` attribute and map it to the ``givenName`` field on the Account resource.

.. _okta:

Okta
^^^^

.. contents::
    :local:
    :depth: 1

Step 1: Set-up Okta
"""""""""""""""""""

Every Okta application will need its own Stormpath Directory. The users for that Okta application will only be able to log in if that application's information is properly entered into a corresponding Stormpath Directory.

.. note::

  If you already have an Okta application, you can skip to Step 5.

#. Log in to your Okta Administrator Account. From the landing page click on **Admin** to go to your Admin Dashboard.

#. From here, click on **Add Applications** in the shortcuts on the right.

#. Click on **Create New App**, which will bring up a "Create a New Application Integration" dialog.

#. Select "SAML 2.0" and click **Create**.

#. Enter in the information on the "General Settings" page and then click **Next**.

#. For now we will enter dummy data here, and then return later to input the actual values. For both the "Single sign on URL" and "Audience URI", enter in the dummy value ``http://example.com/``

#. For the "Name ID format" select "EmailAddress".

#. Click **Next** at the bottom of the page.

#. On the "Feedback" page, select **I'm an Okta customer adding an internal app** and **This is an internal app that you have created**, then select **Finish**.

You will now arrive at your App's Admin page.

#. Click on **View Setup Instructions**

Step 2: Gather Information From Okta
""""""""""""""""""""""""""""""""""""""""""""""""""""""

You will now need to gather the required information from Okta:

#. Copy the "Identity Provider Single Sign-On URL". This will be the value for both the "SSO Login URL" and "SSO Logout URL" in your Stormpath configuration.

#. Copy the contents of the "X.509 Certificate" text box, starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert".

#. By default, Okta uses the SHA-256 signature algorithm for all self-signed certificates. Click on the **General** tab in the App navigation pane, and look under "SAML Settings" to confirm that the Signature Algorithm is "RSA_SHA256".

.. note::

  It is recommended that you stay on this page, as you will be returning here in Step 3 to add more configuration details.

Step 3: Create Your SAML Directory in Stormpath
""""""""""""""""""""""""""""""""""""""""""""""""""""

We will now create your SAML Directory in Stormpath, using the values you gathered in the previous step. Then you will use information from this newly-created Directory to configure Stormpath as a Service Provider in the IdP in the next step.

3.1. Create Your SAML Directory
+++++++++++++++++++++++++++++++

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab.

#. Click on **Create Directory**.

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status.

#. For both "SAML SSO Login Url" and "SAML SSO Logout URL" paste in the "Identity Provider Single Sign-On URL" from above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate in Step 2.

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page.

3.2. Gather Your SAML Directory Information
+++++++++++++++++++++++++++++++++++++++++++

#. Find and click on your new SAML Directory.

In the "SAML Identity Provider Configuration" section:

#. Copy the "Entity ID" URN.

#. Copy the "Assertion Consumer Service URL".

We will now input these values into the Identity Provider.

Step 4: Configure Your Service Provider in Okta
"""""""""""""""""""""""""""""""""""""""""""""""""""

#. Back in your App's "General" tab, find the "SAML Settings" section and click **Edit**.

#. From the "General Settings" page click **Next**.

#. You will now be on the "Configure SAML" page. Copy your Directory's "Assertion Consumer Service URL" into the "Single sign on URL" field, replacing the dummy value.

#. Copy the "Entity ID" URN into the "Audience URI (SP Entity ID)", also replacing the dummy value.

Step 5: Configure Your Application in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Application, and mapping your SAML Directory to your Application.

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab.

#. Select the Application that will be using the SAML Directory.

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane.

#. Once you are on your Application's Account Stores page, click "Add Account Store". This will bring up the "Map Account Store" dialog.

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

You have now completed the initial steps of setting-up login via Okta.

.. _okta-attribute-mapping:

Step 6: Configure Your Attribute Mappings
"""""""""""""""""""""""""""""""""""""""""

When a new Account logs in via SAML, Okta sends along a number of SAML attributes. These attributes are mapped to Stormpath `Account attributes <https://docs.stormpath.com/rest/product-guide/latest/reference.html#account>`__ (such as ``givenName`` or ``email``) and these values are either stored, if the Account is new, or updated, if the Account exists but the values are different. In this step you will configure how these IdP SAML Attributes are mapped to Stormpath attributes.

6.1. Find the Existing SAML Attributes
++++++++++++++++++++++++++++++++++++++

If you have already successfully set-up SAML and authenticated a user with your app, you will be able to retrieve the SAML Attributes that Okta sends by retrieving the new user Account that was created inside Stormpath.

Specifically, you want that Account's ``providerData`` resource:

.. only:: csharp or vbnet

  .. warning::

    The ability to inspect SAML Provider Data is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or read the REST documentation below.
    For updates, you can follow `ticket #171 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/171>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/saml_okta_account_providerdata.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/saml_okta_account_providerdata.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/saml_okta_account_providerdata.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/saml_okta_account_providerdata.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/saml_okta_account_providerdata.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/saml_okta_account_providerdata.py
    :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/accounts/6Y2ViNhE5GOktaExample/providerData",
      "createdAt":"2016-03-09T18:16:16.116Z",
      "modifiedAt":"2016-03-25T14:49:30.098Z",
      "providerId":"saml"
    }

As you can see there are no default attributes passed by Okta, but you can map any attributes you like to the Stormpath Account attributes as well.

6.2. (Optional) Add Any Additional Attributes You Want
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If there are attributes that you would like Okta to pass, you can configure this. From your Okta Admin settings page:

#. Click on the **Applications** tab in the top navigation pane
#. Select your Application
#. In the "SAML Settings" section, click on **Edit**
#. You will arrive on "General Settings", click **Next**
#. On the "Configure SAML" page, you will see a section called "Attribute Statements". Here you can specify whatever additional attributes that you would like to be sent.

For example:

* For "Name" enter ``firstName``
* (Optional) For "Name format" you can select "Basic"
* For the "Value" you would choose "user:firstName"
* Click "Next" and on the next page "Finish"

You will now be returned to your App's "Sign on" page. If you click on the "General" tab, you will see the attribute you just added in the "Attribute Statements" section. You can add as many attributes as you wish.

6.3. Specify Your Mapping
+++++++++++++++++++++++++

#. Go to your `Stormpath Admin Console <https://api.stormpath.com/>`__
#. Click on the **Directories** tab
#. Select your Okta SAML Directory
#. Under the "SAML Attribute Statement Mapping Rules" section you will see three fields: "Name", "Name Format", and "Stormpath Attributes"
#. Here you will enter the Okta attribute name under "Name"
#. (Optional) Under "Name Format" you can enter ``Basic``.
#. Finally, enter the Account attribute(s) that you would like this Okta attribute to map to.

For example, you could enter:

* For the "Name" enter ``firstName``
* For "Stormpath Attributes" enter ``givenName``

If a user now logs in, Stormpath will take the ``firstName`` attribute and map it to the ``givenName`` field on the Account resource.

.. note::

  If you do choose to enter in an "Attribute Name Format" in Stormpath, it must match the SAML "NameFormat" passed by Okta. To ensure that you are entering the right one you can click on **Preview the SAML Assertion** on the "Configure SAML" page in your Okta application.

6.2. (Optional) Add Any Additional Attributes You Want
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If there are attributes that you would like Okta to pass to Stormpath, you can configure this. From your Okta Admin settings page:

#. Click on the **Applications** tab in the top navigation pane
#. Select your Application
#. In the "SAML Settings" section, click on **Edit**
#. You will arrive on "General Settings", click **Next**
#. On the "Configure SAML" page, you will see a section called "Attribute Statements". Here you can specify whatever additional attributes you would like to be passed.

For example:

* For "Name" enter ``firstName``
* For the "Value" you would choose "user.firstName"
* Scroll down to the bottom and click **Next**
* On the next page click **Finish**

You will now be take to your App's "Sign On" tab, but if you return to the "General" tab you can scroll down and see the attribute you just added in the "SAML Settings" section, under "Attribute Statements". You can add as many attributes as you wish.

6.3. Specify Your Mapping
+++++++++++++++++++++++++

#. Go to your `Stormpath Admin Console <https://api.stormpath.com/>`__
#. Click on the **Directories** tab
#. Select your Okta SAML Directory
#. Under the "SAML Attribute Statement Mapping Rules" section you will see three fields: "Name", "Name Format", and "Stormpath Attributes"
#. Here you will enter the Okta attribute name under "Name"
#. Finally, enter the Account attribute(s) that you would like this Okta attribute to map to
#. Click **Save**

For example, you could enter:

* For the "Name" enter ``firstName``
* For "Stormpath Attributes" enter ``givenName``

If a user now logs in, Stormpath will take the ``firstName`` attribute and map it to the ``givenName`` field on the Account resource.

.. _ping:

Ping
^^^^^^^^^^

.. contents::
    :local:
    :depth: 1

Step 1: Set-up Ping
"""""""""""""""""""""""""

#. Log in to your PingOne account: https://admin.pingone.com/web-portal/login
#. Click on the **Applications** tab on the top navigate pane.
#. Click on **Add Application** > **New SAML Application**
#. Fill in the information, the click on **Continue to Next Step**

Step 2: Gather Your Ping Information
""""""""""""""""""""""""""""""""""""""""""""""""""

You will now need to gather the following pieces of information:

- X.509 Signing Certificate
- SSO Login URL
- SSO Logout URL

Click on **Download** beside SAML Metadata, this will download ``saml2-metadata-idp.xml``, which you need to open in a text editor of your choice. We will now retrieve the above information from this XML file.

2.1 IdP Signing Certificate
+++++++++++++++++++++++++++

#. Inside the ``<ds:X509Certificate>`` assertion you will find the text of the x509 certificate. Unfortunately it is not in the PEM encoded format that Stormpath requires.
#. Copy and paste the content of this certificate into a new text file, ensuring that all of the text is fully left-justified.
#. Add a newline at the top of the certificate and add this: ``-----BEGIN CERTIFICATE-----``
#. Next add this to the bottom of the certificate: ``-----END CERTIFICATE-----``

What you should now have is something that looks like this:

.. code-block:: none

  -----BEGIN CERTIFICATE-----
  MIIDaDCCAlCgAwIBAgIGAVQ0xF8mMA0GCSqGSIb3DQEBCwUAMHUxCzAJBgNVBAYTAlVTMQswCQYD
  {More certificate content here}
  8bMh4fe2s1wR6pDkVjgEwu0DW2zBcXSg9KuT3lcWEUIq3Bct7Cdng12C0zXbgnQJAFtzHYbXAwkG
  sh3WzqLNeYeoU5sGPWhlvNR7n2R1
  -----END CERTIFICATE-----


2.2. The SSO Login / Logout URLs
+++++++++++++++++++++++++++++++++

#. For the "SSO Login URL", find the ``SingleSignOnService Location`` assertion, which should look something like this: ``https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid={hash}``
#. For the "SSO Logout URL", find the ``SingleLogoutService Location`` assertion, which should be exactly this: ``https://sso.connect.pingidentity.com/sso/SLO.saml2``


Step 3: Create Your SAML Directory in Stormpath
""""""""""""""""""""""""""""""""""""""""""""""""""

You will now create your SAML Directory in Stormpath, using the values you gathered in the previous step. Then you will use information from this newly-created Directory to configure Stormpath as a Service Provider in the IdP in the next step.

2.1. Create Your SAML Directory
++++++++++++++++++++++++++++++++++

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab.

#. Click on **Create Directory**.

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status to "Enabled".

#. For both the "SAML SSO Login Url" and "SAML SSO Logout Url" fields, you will enter in the URL gathered in step 2.2 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate you created in step 2.1.

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page.

2.2. Gather Your SAML Directory Information
+++++++++++++++++++++++++++++++++++++++++++++

Find and click on your new SAML Directory.

From this page, you will need the follow information:

- The Directory's "HREF" found at the very top.

- The "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section

We will now input these values into the Identity Provider.

Step 3: Configure Your Service Provider in Ping
"""""""""""""""""""""""""""""""""""""""""""""""""""

Back on your Ping Application's page (where we previously downloaded the SAML Metadata), you will now enter in your Directory information:

#. The "Assertion Consumer Service (ACS)" is the Stormpath "Assertion Consumer Service URL" from the previous step.

#. The "Entity ID" is the Directory "HREF" for your Stormpth SAML Directory.

#. Click **Continue to Next Step**, then click **Save & Publish**

Step 4: Configure Your Application in Stormpath
""""""""""""""""""""""""""""""""""""""""""""""""""

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Application, and mapping your SAML Directory to your Application.

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab.

#. Select the Application that will be using the SAML Directory.

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the left-side navigation pane.

#. Once you are on your Application's Account Stores page, click **Add Account Store**. This will bring up the "Map Account Store" dialog.

#. Ensure that you are in the "Directories" tab and select your Ping Identity Directory from the list.

#. Click **Create Mappings**.

You have now completed the initial steps of configuring login via SAML for Ping Identity.

Step 5: Configure Your Attribute Mappings
"""""""""""""""""""""""""""""""""""""""""

When a new Account logs in via SAML, Ping sends along a number of SAML attributes. These attributes are mapped to Stormpath `Account attributes <https://docs.stormpath.com/rest/product-guide/latest/reference.html#account>`__ (such as ``givenName`` or ``email``) and these values are either stored, if the Account is new, or updated, if the Account exists but the values are different. In this step we will configure how these Ping SAML Attributes are mapped to Stormpath attributes.

4.1. Find the Existing SAML Attributes
+++++++++++++++++++++++++++++++++++++++++++++

If you have already successfully set-up SAML and authenticated a user with your app, you will be able to retrieve the SAML Attributes that Ping sends by retrieving the new user Account that was created inside Stormpath.

Specifically, you want that Account's ``providerData`` resource:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accounts/4QwSP7tumdJJoCzPHiZ1Oq/providerData",
    "createdAt": "2016-04-22T19:01:07.281Z",
    "modifiedAt": "2016-04-22T19:01:07.291Z",
    "PingOne.AuthenticatingAuthority": "https://pingone.com/idp/cd-1935055751.stormpath",
    "PingOne.idpid": "4ad1f356-08f2-440d-955a-60873af45948",
    "providerId": "saml"
  }

Everything here other than ``href``, ``createdAt`` and ``modifiedAt`` are Attributes passed by Ping.

If you want, you can map other SAML Attributes to Stormpath Account attributes.

4.2. (Optional) Add Any Additional Attributes You Want
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If there are other attributes that you would like Ping to pass, you can configure this.

#. Make sure you are on the Ping Identity Admin Settings page, in the "My Applications" section: https://admin.pingone.com/web-portal/cas/connections
#. Find your application, and click the ▶ to the right of the "Remove" button. This will expand your Application details.
#. Click the **Edit** button.
#. On the "Application Details" page click **Continue to Next Step**
#. Click **Continue to Next Step** on the "Application Configuration" page as well.
#. Now you will arrive at "SSO Attribute Mapping".
#. Click **Add new attribute**
#. You can type whatever string you'd like under "Application Attribute". For example, "firstName".
#. Under "Identity Bridge Attribute or Literal Value" you can click on the textbox to see a list of available values. For this example, you'd select **First Name**.
#. Finally click on **Save & Publish** and, on the next page, **Finish**.

4.3. Specify Your Mapping
+++++++++++++++++++++++++

#. Go to your `Stormpath Admin Console <https://api.stormpath.com/>`__
#. Click on the **Directories** tab
#. Select your Ping SAML Directory
#. Under the "SAML Attribute Statement Mapping Rules" section you will see three fields: "Name", "Name Format", and "Stormpath Attributes"
#. Here you will enter the Ping attribute name under "Name"
#. Finally, enter the Account attribute(s) that you would like this Ping attribute to map to

For example, you could enter, using the custom attribute from Step 4.2 above:

* For the "Name" enter ``firstname``
* For "Stormpath Attributes" enter ``givenName``

If a user now logs in, Stormpath will take the ``firstname`` attribute and map it to the ``givenName`` field on the Account resource.

.. _adfs:

Active Directory Federation Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath's allows you to link your Active Directory to Stormpath via SAML and Active Directory Federation Services (ADFS). In order to link the two, you must configure your ADFS server with information about your Stormpath Directory, and vice versa. This will then allow users to log in to your application by authenticating with the ADFS server, and have their Active Directory user information mirrored into Stormpath.

These instructions assume that you have an instance of Windows Server 2012 R2 running ADFS 3.0, fully configured and with existing users.

Step 1: Download Your Signing Certificate
""""""""""""""""""""""""""""""""""""""""""""""

#. Go to Windows Server's Administrative Tools, and then to "AD FS Management".

#. Expand **Services**, then click on **Certificates** > **Token-Signing Certificate** > **View Certificate**.

#. Click **Details** and then **Copy to File** > **Next** > Select **Base-64 encoded X.509 (.CER)** and save the file somewhere.

#. Open this file in your text editor of choice. The contents will be an x509 certificate starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your “SAML X.509 Signing Cert”.

Step 2: Create your ADFS Directory in Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""""

First we must create a Directory in Stormpath that will mirror our ADFS users.

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab.

#. Click on **Create Directory**.

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status.

#. For "SAML SSO Login Url" enter in: ``https://{HOST}:{PORT}/adfs/ls/idpinitiatedsignon.aspx``.

#. For "SAML SSO Logout Url" enter in: ``https://{HOST}:{PORT}/adfs/ls/idpinitiatedsignout.aspx``

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the signing certificate you downloaded in Step 1.

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page.

#. Find and click on your Directory to enter its information page.

#. On this page, in the "SAML Configuration" section, click on the **Identity Provider** tab. We will be returning here in the next step.

Step 3: Configure Your Relying Party Trust in ADFS
""""""""""""""""""""""""""""""""""""""""""""""""""

Now we will enter the information from the Stormpath Directory that we just created into ADFS.

3.1. Add a Relying Party Trust
++++++++++++++++++++++++++++++++

#. Back in Windows' Administrative Tools, click on **AD FS Management**.

#. **Expand** "Trust Relationships", then click on **Relying Party Trusts** and in the right-hand navigation panel click on **Add Relying Part Trust...**. This will open the "Add Relying Party Trust Wizard".

#. Click **Start** and make sure that "Import data about the relying party published online" is selected.

#. Back in the Stormpath Admin Console, in your Directory's "Identity Provider" information, you will see a "Service Provider Metadata Link". Copy this URL into the AD FS Management "Federation metadata address" text box and click **Next**. Keep your Admin Console tab open, we will be returning to it later.

#. Enter in whatever "Display name" that you wish, as well as any description.

#. Make sure "I do not want to configure multi-factor authentication settings..." is selected and click **Next**.

#. Keep "Permit All" selected and click **Next**.

#. Review the settings if so desired and click **Next**.

#. Keep the "Open the Edit Claim Rules..." option selected and click "Close".

3.2. Add a Claim Rule
++++++++++++++++++++++++++++++++

#. In the "Edit Claim Rules" window, click **Add Rule** again.

#. Select "Transform an Incoming Claim" as your Rule Template. Then fill out the following information:

- Put "Add UPN as Name ID" into the "Claim rule name:" text box.
- For "Incoming claim type" select "UPN".
- For "Outgoing claim type" select "Name ID".
- For "Outgoing name ID format" select "Email".
- Keep "Pass through all claim values" selected.
- Click **Finish**.
- Back in the "Edit Claim Rules" window, click **OK**.

3.4. Finish Configuring the Relying Third Party
+++++++++++++++++++++++++++++++++++++++++++++++

#. In the main AD FS window, with "api.stormpath.com" selected under "Relying Party Trusts", click **Properties** on the right-hand side. This will open a "Properties" window and the "Monitoring" tab.

#. In the "Monitoring" tab, uncheck "Automatically update relying party" and click **Apply**.

#. Switch to the "Identifiers" tab, and copy your Stormpath Directory's HREF into the "Relying party identifier" text box, then click **Add**. Next click **OK**.

#. Finally, go to Windows and open a Powershell window. In Powershell, enter the following command: "Set-AdfsRelyingPartyTrust -TargetName api.stormpath.com -SigningCertificateRevocationCheck None".

Step 4: Configure Your Application in Stormpath
""""""""""""""""""""""""""""""""""""""""""""""""

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab.

#. Select the Application that will be using the ADFS Directory.

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane.

#. Once you are on your Application's Account Stores page, click "Add Account Store". This will bring up the "Map Account Store" dialog.

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

Step 5: Configure Your Attribute Mappings (Optional)
""""""""""""""""""""""""""""""""""""""""""""""""""""

By default, the only user information that is passed by ADFS is the User Principal Name (UPN). Stormpath will use this to populate the user Account's ``username`` and ``email`` attributes. Other attributes, like ``surname`` will appear as ``NOT_PROVIDED``. If you would like other Active Directory attributes to be passed to Stormpath and mapped to Account attributes, you can configure this now.

5.1. Add the Claim Rule
++++++++++++++++++++++++++++

#. Go to Administrative Tools and "AD FS Management", and on the left-hand side expand **Trust Relationships**. Select the "Relying Party Trust" for Stormpath, and then in the right-hand panel click on "Edit Claim Rules...".

#. In the "Edit Claim Rules" window, click on **Add Rule**.

#. For the "Claim rule template" make sure that "Send LDAP Attributes as Claims" is selected and click **Next**.

#. Enter a "Claim Rule Name" and for Attribute Store select "Active Directory".

#. Then specify whatever mapping you might want. Make sure that the "LDAP Attribute" matches whatever is in your Active Directory. From Stormpath's perspective the "Outgoing Claim Type" can have any value, since you will be specifying how this Outgoing Claim should be interpreted by Stormpath. For example, you could specify that the LDAP Attribute "Given-Name" maps to an Outgoing Claim Type "firstName".

5.2. Create the Attribute Mapping
+++++++++++++++++++++++++++++++++

#. Back in the Stormpath Admin Console, on your ADFS Directory page, find the "SAML Configuration" section, and go to the "Attribute Mappings" tab.

#. Here you can specify which of the ADFS Claims you would like to map to which Stormpath Account attribute. For example, if you mapped the LDAP Attribute "Given-Name" to the ADFS Claim "firstName", then you would put the "Attribute Name" as "firstName" and the "Stormpath Field Name" as "surname".

.. _saml-configuration-rest:

4.5.3. Configuring SAML via REST
--------------------------------

Here you will explain to you the steps that are required to configure Stormpath as a SAML Service Provider using only the REST API.

It is recommend that you configure SAML using the Stormpath Admin console, as explained in the above :ref:`IdP-specific configuration instructions <saml-configuration>`. However, understanding the REST underpinnings of those instructions will allow you to automate some or all of the configuration process, if that is something that your application requires.

Also, currently the IdP-initiated flow can only be configured via REST, and not yet via the Stormpath Admin Console.

SAML configuration data is stored in the Directory's :ref:`Provider resource <ref-provider>` as well as in the :ref:`ref-application`. Both of these resources must also be linked with an :ref:`ref-asm`.

.. note::

  The steps here are nearly identical regardless of whether you are configuring Service Provider initiated or IdP initiated authentication. The only difference is in :ref:`Step 5a <saml-restconfig-5a>`.

Step 1: Gather IDP Data
^^^^^^^^^^^^^^^^^^^^^^^

You will need the following information from your IdP:

- **SSO Login URL** - The URL at the IdP to which SAML authentication requests should be sent. This is often called an "SSO URL", "Login URL" or "Sign-in URL".
- **SSO Logout URL** - The URL at the IdP to which SAML logout requests should be sent. This is often called a "Logout URL", "Global Logout URL" or "Single Logout URL".
- **Signing Cert** - The IdP will digitally sign auth assertions and Stormpath will need to validate the signature.  This will usually be in .pem or .crt format, but Stormpath requires the text value.
- **Signing Algorithm** - You will need the name of the signing algorithm that your IdP uses. It will be either "RSA-SHA256" or "RSA-SHA1".

Step 2: Configure Your SAML Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Input the data you gathered in Step 1 above into your Directory's Provider resource, and then pass that along as part of the Directory creation request:

.. only:: csharp or vbnet

  .. warning::

    The ability to create SAML Directories is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST documentation below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/create_directory_saml.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/create_directory_saml.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_directory_saml.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_directory_saml.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_directory_saml.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_directory_saml.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "name" : "My SAML Directory",
      "description" : "A Directory used for SAML Authorization",
      "provider": {
        "providerId":"saml",
        "ssoLoginUrl":"https://yourIdp.com/saml2/sso/login",
        "ssoLogoutUrl":"https://yourIdp.com/saml2/sso/logout",
        "encodedX509SigningCert":"-----BEGIN CERTIFICATE-----\n...Certificate goes here...\n-----END CERTIFICATE-----",
        "requestSignatureAlgorithm":"RSA-SHA256"
      }
    }

.. note::

  Notice that new lines in the certificate are separated with a ``\n`` character.

.. _configure-sp-in-idp:

Step 3: Retrieve Your Service Provider Metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Next you will have to configure your Stormpath-powered application as a Service Provider in your Identity Provider. This means that you will need to retrieve the correct metadata from Stormpath.

In order to retrieve the required values, start by sending this request:

.. only:: csharp or vbnet

  .. warning::

    The ability to retrieve SAML Provider metadata is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/get_directory_provider_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/get_directory_provider_req.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/get_directory_provider_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/get_directory_provider_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/get_directory_provider_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/get_directory_provider_req.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: http

    GET /v1/directories/$DIRECTORY_ID/provider HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/xml

  This will return the Provider:

  .. code-block:: json
    :emphasize-lines: 13,14

    {
      "href":"https://api.stormpath.com/v1/directories/1joyMCilyf1xSravQxaHxy/provider",
      "createdAt":"2015-12-21T20:27:16.190Z",
      "modifiedAt":"2015-12-21T20:27:16.190Z",
      "providerId":"saml",
      "ssoLoginUrl":"https://stormpathsaml-dev-ed.my.salesforce.com/idp/endpoint/HttpRedirect",
      "ssoLogoutUrl":"https://stormpathsaml-dev-ed.my.salesforce.com/idp/endpoint/HttpRedirect",
      "encodedX509SigningCert":"-----BEGIN CERTIFICATE-----\nexample\n-----END CERTIFICATE-----",
      "requestSignatureAlgorithm":"RSA-SHA256",
      "attributeStatementMappingRules":{
        "href":"https://api.stormpath.com/v1/attributeStatementMappingRules/1jq5X3PhdEZJ5EL5MORdTG"
      },
      "serviceProviderMetadata":{
        "href":"https://api.stormpath.com/v1/samlServiceProviderMetadatas/1l4aLK8aJPNtwslBgXBjGE"
      }
    }

.. only:: java

  This will return the Provider:

  .. literalinclude:: code/java/authentication/get_directory_provider_resp.java
      :language: java

.. only:: nodejs

  This will return the Provider:

  .. literalinclude:: code/nodejs/authentication/get_directory_provider_resp.js
      :language: javascript

.. only:: php

  This will return the Provider:

  .. literalinclude:: code/php/authentication/get_directory_provider_resp.php
    :language: php

Now you will need to retrieve your Directory Provider's Service Provider Metadata:

.. only:: csharp or vbnet

  .. warning::

    The ability to retrieve SAML Provider metadata is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/get_serviceprovider_metadata_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/get_serviceprovider_metadata_req.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/get_serviceprovider_metadata_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/get_serviceprovider_metadata_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/get_serviceprovider_metadata_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/get_serviceprovider_metadata_req.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: http

    GET /v1/samlServiceProviderMetadatas/$METADATA_ID HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/xml

  .. note::

    This will return XML by default, but you can also specify ``application/json`` if you'd like to receive JSON instead.

**Example XML**

.. code-block:: xml

  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="urn:stormpath:directory:5rHYCSu9IjzKz5pkyId5eR:provider:sp">
      <md:SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
          <md:KeyDescriptor use="signing">
              <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                  <ds:X509Data>
                      <ds:X509Certificate>MIIC2DCCAcCgAwIBAgIRAMExAMPLE</ds:X509Certificate>
                  </ds:X509Data>
              </ds:KeyInfo>
          </md:KeyDescriptor>
          <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
          <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="http://api.stormpath.com/v1/directories/5rHYCSu9IjzKz5pEXample/saml/sso/post" index="0"/>
      </md:SPSSODescriptor>
  </md:EntityDescriptor>

.. only:: rest

  **Example JSON**

  .. code-block:: json

    {
      "href":"http://api.stormpath.com/v1/samlServiceProviderMetadatas/173pHdbJ96DpPeuExaMPLE",
      "createdAt":"2015-12-09T19:22:10.033Z",
      "modifiedAt":"2015-12-09T19:22:10.033Z",
      "entityId":"urn:stormpath:directory:15iM83Y77qIIviKlTzGqjX:provider:sp",
      "assertionConsumerServicePostEndpoint":{
        "href":"http://api.stormpath.com/v1/directories/5rHYCSu9IjzKz5pEXample/saml/sso/post"
      },
      "x509SigningCert":{
        "href":"http://api.stormpath.com/v1/x509certificates/1712LVrz0fNSMk2y20EzfL"
      }
    }

.. only:: php

  .. literalinclude:: code/php/authentication/get_serviceprovider_metadata_res.php
      :language: php

From this metadata, you will need two values:

- **Assertion Consumer Service URL**: This is the location the IdP will send its response to.
- **X509 Signing Certificate**: The certificate that is used to sign the requests sent to the IdP. If you retrieve XML, the certificate will be embedded. If you retrieve JSON, you'll have to follow a further ``/x509certificates`` link to retrieve it.

You will also need two other values, which will always be the same:

- **SAML Request Binding:** Set to ``HTTP-Redirect``.
- **SAML Response Binding:** Set to ``HTTP-Post``.

Step 4: Configure Your Service Provider in Your Identity Provider
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Log-in to your Identity Provider (Salesforce, OneLogin, etc) and enter the information you retrieved in the previous step into the relevant application configuration fields. The specific steps to follow here will depend entirely on what Identity Provider you use, and for more information you should consult your Identity Provider's SAML documentation.

Step 5: Configure Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Your Stormpath Application Resource has two parts that are relevant to SAML:

1. An ``authorizedCallbackUri`` Array that defines the authorized URIs that the IdP can return your user to. These should be URIs that you host yourself.

You should create any URIs here that you would like included as authorized callback URIs.

.. only:: csharp or vbnet

  .. warning::

    The ability to update the authorized callbackURIs is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

    For updates, you can follow `ticket #172 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/172>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/create_callback_uris.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/create_callback_uris.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_callback_uris.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_callback_uris.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_callback_uris.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_callback_uris.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "authorizedCallbackUris": [
        "https://myapplication.com/whatever/callback",
        "https://myapplication.com/whatever/callback2"
      ]
    }

2. There is also an embedded ``samlPolicy`` object that contains information about the SAML flow configuration and endpoints:

.. only:: rest

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/samlServiceProviders/61fOguTd49bCKEJbuLnFHO",
      "createdAt":"2016-01-18T21:02:24.501Z",
      "modifiedAt":"2016-01-18T21:02:24.501Z",
      "ssoInitiationEndpoint":{
        "href":"https://api.stormpath.com/v1/applications/61eykaiWwglwT5mngYyExu/saml/sso/idpRedirect"
      },
      "defaultRelayStates":{
        "href":"https://api.stormpath.com/v1/samlServiceProviders/61fOguTd49bCKEJbuLnFHO/defaultRelayStates"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authentication/saml_policy_example.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authentication/saml_policy_example.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/saml_policy_example.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/saml_policy_example.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/saml_policy_example.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/saml_policy_example.py
      :language: python

.. _saml-restconfig-5a:

Step 5a: Generate defaultRelayState (IdP-initiated Authentication Only)
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

To configure your IdP for IdP-initiated authentication, you will need to get a ``defaultRelayState`` JWT:

.. only:: php

  .. warning::

    This feature is not yet available in the PHP SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

    For updates, you can follow `ticket #149 <https://github.com/stormpath/stormpath-sdk-php/issues/149>`_ on Github.

    .. todo::

      Add Default Relay State PHP example

.. only:: csharp or vbnet

  .. warning::

    The ability to get the default relay state is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/get_default_relay_state_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/get_default_relay_state_req.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/get_default_relay_state_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/get_default_relay_state_req.js
      :language: javascript

.. only:: python

  .. literalinclude:: code/python/authentication/get_default_relay_state_req.py
      :language: python

.. only:: rest or csharp or vbnet or php

  .. code-block:: http

    POST /v1/samlServiceProviders/6voAya1BvrNeFOAeXamPle/defaultRelayStates HTTP/1.1
    Host: api.stormpath.com

  This request will return a response containing a JWT like this:

  .. code-block:: json

    {
      "defaultRelayState": "eyJ0aWQiOiIxZ0JUbmNXc3AyT2JRR2dEbjlSOTFSIiwiYWxnIjoiSFMyNTYifQ.eyJzcFVpZCI6IjZ2b0F5YTFCdnJOZUZPQW9neGJ4T2UiLCJqdGkiOiIxdjdjT1l1SE1kQzA0Z2Vucm1wU2lZIn0.WvfWRxTfjRoPxA803HyOR380u2dWpdtQiO0I2kislFY"
    }

.. only:: java

  This request will return a response containing a JWT like this:

  .. literalinclude:: code/java/authentication/get_default_relay_state_resp.java
      :language: java

.. only:: nodejs

  This request will return a response containing a JWT like this:

  .. literalinclude:: code/nodejs/authentication/get_default_relay_state_resp.js
      :language: javascript

This JWT will then need to be entered into your IdP's configuration in order for IdP-initiated authentication to function properly.

This ``defaultRelayStates/`` endpoint also accepts a few optional properties. These properties can be encoded in the defaultRelayState JWT that is stored on your IdP by passing them in the body of your POST:

- **callbackUri**: Specifies the callBackUri to direct users to. Useful if there are multiple callbackUris specified in your Application.
- **organization**: Allows you to specify an Organization to check users for.
- **state**: Any state that your application would like to receive. Note that the application developer will need to interpret this state.

A request including these optional properties looks like this:

.. only:: csharp or vbnet

  .. warning::

    The ability to get the default relay state is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/get_default_relay_state_with_extras.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/get_default_relay_state_with_extras.vb
          :language: vbnet

.. only:: php

  .. warning::

    The ability to get the default relay state is not yet available in the PHP SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

    For updates, you can follow `ticket #154 <https://github.com/stormpath/stormpath-sdk-php/issues/154>`_ on Github.

  .. todo::

    .. only:: php

      .. literalinclude:: code/php/authentication/get_default_relay_state_with_extras.php
        :language: php


.. only:: rest or csharp or vbnet or php

  .. code-block:: http

    POST /v1/samlServiceProviders/6voAya1BvrNeFOAeXamPle/defaultRelayStates HTTP/1.1
    Host: api.stormpath.com

    {
        "callbackUri": "https://org1.myapp.com",
        "organization": {
            "nameKey": "org1",
        }
        "state": "IAmAState"
    }

.. only:: java

  .. literalinclude:: code/java/authentication/get_default_relay_state_with_extras.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/get_default_relay_state_with_extras.js
      :language: javascript

.. only:: python

  .. literalinclude:: code/python/authentication/get_default_relay_state_with_extras.py
      :language: python

Step 6: Add the SAML Directory as an Account Store
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now the last thing you have to do is map the new Directory to your Application with an Account Store Mapping as described in :ref:`create-asm`.

.. _saml-mapping:

Step 7: Configure SAML Attribute Mapping (Optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Identity Provider's SAML response contains assertions about the user's identity, which Stormpath can use to create and populate a new Account resource.

.. code-block:: xml

  <saml:AttributeStatement>
    <saml:Attribute Name="uid" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
      <saml:AttributeValue xsi:type="xs:string">test</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="mail" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
      <saml:AttributeValue xsi:type="xs:string">jane@example.com</saml:AttributeValue>
    </saml:Attribute>
      <saml:Attribute Name="location" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
      <saml:AttributeValue xsi:type="xs:string">Tampa, FL</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>

The Attribute Assertions (``<saml:AttributeStatement>``) are brought into Stormpath and become Account and customData attributes.

SAML Attribute mapping is defined in an **attributeStatementMappingRules** object found inside the Directory's Provider object, or directly: ``/v1/attributeStatementMappingRules/$RULES_ID``.

Mapping Rules
"""""""""""""

The rules have three different components:

- **name**: The SAML Attribute name
- **nameFormat**: The name format for this SAML Attribute, expressed as a Uniform Resource Name (URN).
- **accountAttributes**: This is an array of Stormpath Account or customData (``customData.$KEY_NAME``) attributes that will map to this SAML Attribute.

**Example Rule**

.. only:: csharp or vbnet

  .. warning::

    The ability to modify attribute mappings is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/example_saml_rule.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/example_saml_rule.vb
          :language: vbnet

    .. todo:

      The rule expressed here is as follows:

      (dotnet.todo)

.. only:: java

  .. literalinclude:: code/java/authentication/example_saml_rule.java
      :language: java

  .. todo:

    The rule expressed here is as follows:

    (java.todo)

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/example_saml_rule.js
      :language: javascript

  .. todo:

    The rule expressed here is as follows:

    (node.todo)

.. only:: php

  .. warning::

    The ability to modify attribute mappings is not yet available in the PHP SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

.. only:: python

  .. literalinclude:: code/python/authentication/example_saml_rule.py
      :language: python

  .. todo:

    The rule expressed here is as follows:

    (python.todo)

.. only:: rest or csharp or vbnet or php

  .. code-block:: json

    {
      "name": "uid",
      "nameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
      "accountAttributes":[
        "username"
      ]
    }

  The rule expressed here is as follows:

  - A SAML Assertion with the name ``uid`` AND
  - the name format ``urn:oasis:names:tc:SAML:2.0:attrname-format:basic``
  - maps to the Account Attribute ``username``.

  .. note::

    It is possible to specify only a ``name`` or ``nameFormat`` in your rule, instead of both.

In order to create the mapping rules, you send the following request:

.. only:: csharp or vbnet

  .. warning::

    The ability to modify attribute mapping is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

    For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

  .. todo::

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/create_mapping_rule.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/create_mapping_rule.vb
          :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authentication/create_mapping_rule.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/create_mapping_rule.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_mapping_rule.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_mapping_rule.py
      :language: python

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/attributeStatementMappingRules/$MAPPING_RULES_ID", HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "items":[
        {
          "name":"uid",
          "accountAttributes":[
            "username"
          ]
        },
        {
          "name":"mail",
          "accountAttributes":[
            "email"
          ]
        },
        {
          "name":"location",
          "accountAttributes":[
            "customData.location"
          ]
        }
      ]
    }

Now that we've configured everything, you can take a look at what the actual SAML authentication flow looks like.

.. _saml-flow:

4.5.4. The Stormpath SAML Flow
------------------------------

.. todo::

  This is probably most irrelevant to the SDKs.

The two SAML authentication flows that Stormpath supports differ primarily in their starting points, and so :ref:`the Service Provider (SP) initiated flow <saml-sp-init-flow>` is really just the Identity Provider (IdP) initiated flow with a different starting point.

.. _saml-idp-init-flow:

The Identity Provider Initiated Flow
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the Identity Provider Initiated flow, the user starts at the Identity Provider (IdP). After logging-in to the IdP, the user selects the Stormpath-enabled web application from within the IdP's site, and is redirected to the application in an authenticated state.

.. figure:: images/auth_n/SamlFlow_IdpInit.png
    :align: center
    :scale: 100%
    :alt: IdP Initiated SAML Flow

    *The IdP Initiated SAML Flow*

.. todo::

  skinparam monochrome true

  participant "Stormpath" as storm
  participant "Your Application" as sp
  participant "User Agent" as ua
  participant "Identity Provider" as idp

  ua->idp: Request SSO Service
  ua<-->idp: Authenticate the user
  ua->idp: Request to Login with Your Application
  idp->ua: Respond with <b>302 Redirect</b>
  ua->storm: Request Assertion Consumer Service
  storm->ua: <b>302 Redirect</b> to callbackUri with Assertion JWT
  ua->sp: Request target resource + JWT
  sp->ua: Respond with requested resource

Step 1: Identity Provider Login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First the user will have to authenticate with the Identity Provider. They will then be provided with a list of configured applications that they are able to log in to. If they choose to log in to your Stormpath-enabled application, this will result in the IdP redirecting them to Stormpath.

Step 2: Redirect to Assertion Consumer Service URL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The user is redirected to the Assertion Consumer Service URL (``/saml/sso/post``) that is found in the Service Provider Metadata. At this point, an Account will either be retrieved (if it already exists) or created (if it doesn't exist already).

.. note::

  Account matching is done on the basis of the returned email address.

Step 3: Stormpath Response with JWT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The user will now be redirected by Stormpath back to your Application along with a JSON Web Token.

.. code-block:: http

  HTTP/1.1 302 Redirect
  Location: https://myapplication.com/whatever/callback?jwtResponse=$RESPONSE_JWT

.. _saml-response-jwt:

SAML Account Assertion JWT
""""""""""""""""""""""""""

This JWT again contains both Headers and a Body with Claims.

**Header**

.. list-table::
  :widths: 15 10 60
  :header-rows: 1

  * - Claim Name
    - Required?
    - Valid Value(s)

  * - ``typ``
    - Yes
    - The type of token, which will be ``JWT``

  * - ``alg``
    - Yes
    - The algorithm that was used to sign this key. The only possible value is ``HS256``.

  * - ``stt``
    - Yes
    - The Stormpath Token Type. In this case it will always be ``assertion``.

  * - ``kid``
    - Yes
    - The ID of the Stormpath API Key that signed this JWT.

**Body**

.. list-table::
  :widths: 15 60
  :header-rows: 1

  * - Claim Name
    - Description

  * - ``iss``
    - The issuer of this token, which will contain your Application ``href``.

  * - ``sub``
    - The subject of the JWT. This will be an ``href`` for the Stormpath Account that signed up or logged into the SAML IdP. This ``href`` can be queried by using the REST API to get more information about the Account.

  * - ``aud``
    - The audience of the JWT. This will match your API Key ID from Stormpath.

  * - ``exp``
    - The expiration time for the JWT in Unix time.

  * - ``iat``
    - The time at which the JWT was created, in Unix time.

  * - ``jti``
    - A one-time-use-token for the JWT. If you require additional security around the validation of the token, you can store the ``jti`` in your application to validate that a particular JWT has only been used once.

  * - ``state``
    - The state of your application, if you have chosen to have this passed back.

  * - ``status``
    - For a SAML IdP the only possible ``status`` is ``AUTHENTICATED``.

  * - ``irt``
    - The UUID of the SAML Assertion response. This could be cached as a nonce in order to prevent replay attacks.

  * - ``isNewSub``
    - Indicates whether this is a new Account in Stormpath.

At this point your user is authenticated and able to use your app.

.. _saml-sp-init-flow:

The Service Provider Initiated Flow
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the Service Provider Initiated flow, the user starts at a login page (either ID Site or one inside a Stormpath-powered application), then is redirected to the Identity Provider. After authenticating with the Identity Provider, the user is returned to the application in an authenticate state.

.. figure:: images/auth_n/SamlFlow_SpInit.png
    :align: center
    :scale: 100%
    :alt: Service Provider Initiated SAML Flow

    *The Service Provider Initiated SAML Flow*

.. todo::

  skinparam monochrome true

  participant "Stormpath" as storm
  participant "Your Application" as sp
  participant "User Agent" as ua
  participant "Identity Provider" as idp

  sp<-ua: Request to Login with SAML Provider
  sp->sp: Generate Authentication JWT for Stormpath
  sp->ua: Redirect (with JWT) to Stormpath
  ua->storm: GET to /saml/sso/idpRedirect
  storm->storm: Look-up IdP Login URL
  storm->ua: Respond with <b>302 Redirect to IdP</b>
  ua->idp: Request SSO Service
  ua<-->idp: Authenticate the user
  idp->ua: Respond with <b>302 Redirect</b>
  ua->storm: Request Assertion Consumer Service
  storm->ua: <b>302 Redirect</b> to callbackUri with Assertion JWT
  ua->sp: Request target resource + JWT
  sp->ua: Respond with requested resource


Step 1: Generate a JWT
^^^^^^^^^^^^^^^^^^^^^^

The user agent will request to login with SAML. You will need to generate a JWT using an approved JWT library.

Below are language specific JWT libraries that Stormpath has sanity tested with ID Site.

- .NET JWT - https://github.com/jwt-dotnet/jwt
- Ruby JWT - https://github.com/jwt/ruby-jwt
- Go JWT - https://github.com/dgrijalva/jwt-go
- PHP JWT - https://github.com/firebase/php-jwt
- Python JWT - https://github.com/jpadilla/pyjwt
- Java JWT - https://github.com/jwtk/jjwt
- Node JWT - https://github.com/jwtk/njwt

SAML Authentication JWT
"""""""""""""""""""""""

.. note::

  This key must be signed with your API Key Secret.

The token itself will contain two parts, a Header and a Body that itself contains claims.

**Header**

.. list-table::
  :widths: 15 10 60
  :header-rows: 1

  * - Header Name
    - Required?
    - Valid Value(s)

  * - ``kid``
    - Yes
    - Your Stormpath API Key ID.

  * - ``alg``
    - Yes
    - The algorithm that was used to sign this key. The only valid value is ``HS256``.

**Body**

The `claims <https://tools.ietf.org/html/rfc7519#section-4.1>`_ for the JWT body are as follows:

.. list-table::
  :widths: 15 10 60
  :header-rows: 1

  * - Claim Name
    - Required?
    - Valid Value(s)

  * - ``iat``
    - Yes
    - The "Issued At Time", which is the time the token was issued, expressed in Unix time.

  * - ``iss``
    - Yes
    - The issuer of the token. This is your Application ``href``.

  * - ``cb_uri``
    - No
    - The callback URI to use once the user takes an action on the ID Site or Identity provider. This must match a Authorized Callback URI on Application resource, otherwise the flow will default to the first Callback URI that does not contain a wildcard.

  * - ``jti``
    - Yes
    - A universally unique identifier for the token. This can be generated using a GUID or UUID function of your choice.

  * - ``state``
    - No
    - The state of the application that you need to pass through ID Site or the IdP back to your application through the callback. It is up to the developer to serialize/deserialize this value

  * - ``ash``
    - No
    - Specifies a link to an Account Store to attempt to authenticate against.

  * - ``onk``
    - No
    - The string representing the ``nameKey`` for an Organization that is an Account Store for your application. This is used for multitenant applications that use SAML.

Step 2: Initiate the flow
^^^^^^^^^^^^^^^^^^^^^^^^^

Once the JWT is generated by your server, you initiate the SAML flow by sending a GET to the value found in the ``ssoInitiationEndpoint``, which is ``/v1/applications/$APPLICATION_ID/saml/sso/idpRedirect`` along with the JWT you just generated:

.. code-block:: http

  GET /v1/applications/$APPLICATION_ID/saml/sso/idpRedirect?accessToken=$GENERATED_JWT HTTP/1.1
  Host: api.stormpath.com
  Content-Type: application/json;charset=UTF-8

Step 3: Redirection
^^^^^^^^^^^^^^^^^^^

This GET will result in a redirection to the IdP Login URL that you specified during configuration:

.. code-block:: http

  HTTP/1.1 302 Redirect
  Location: https://idp.whatever.com/saml2/sso/login?SAMLRequest=fZFfa8IwFMXfBb9DyXvaJtZ1BqsURRC2Mabbw95ivc5Am3TJrXPffmmLY3%2F...

Step 4: Identity Provider Login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At this point the IdP will render their login page, and the user will authenticate.

Step 5: Redirect to Assertion Consumer Service URL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After authentication the user is redirected back to the Assertion Consumer Service URL that is found in the Service Provider Metadata. At this point, an Account will either be retrieved (if it already exists) or created (if it doesn't exist already).

.. note::

  Account matching is done on the basis of the returned email address.

Step 6: Stormpath Response with JWT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The user will now be redirected by Stormpath back to your Application along with a JSON Web Token.

.. code-block:: http

  HTTP/1.1 302 Redirect
  Location: https://myapplication.com/whatever/callback?jwtResponse=$RESPONSE_JWT

For more information about what is contained in this token, please see :ref:`above <saml-response-jwt>`.

At this point your user is authenticated and able to use your app.

.. only:: not rest

  4.6. How API Key Authentication Works in Stormpath
  =====================================================

  In this section, we discuss how to set up Stormpath to manage and authenticate API Keys and Tokens for developers that are using your API services. Stormpath provides not only the user management piece around API Keys, but also allows you to associate permissions and custom data with the Accounts for advanced use-cases.

  Stormpath offers a complete solution that securely and easily helps you manage developer accounts, create and manage API Keys, and generate OAuth 2.0 bearer tokens to support Access Token authentication.

  4.6.1. How to use API Key and Secret Authentication
  -----------------------------------------------------------------

  First, you will need an Account for a developer. For information about how to create an Account, see :ref:`the Account Management chapter <add-new-account>`.

  Create an API Key for an Account
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  Once you have an Account, creating an API Key is a simple call:

  .. only:: csharp or vbnet

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/create_apikey_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/create_apikey_req.vb
          :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/authentication/create_apikey_req.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/authentication/create_apikey_req.js
        :language: javascript

  .. only:: php

    .. literalinclude:: code/php/authentication/create_apikey_req.php
      :language: php

  .. only:: python

    .. literalinclude:: code/python/authentication/create_apikey_req.py
        :language: python

  .. only:: csharp or vbnet

    The returned ``IApiKey`` object contains properties for the ID and secret, as well as the status of the API Key pair.

  .. only:: java

    You will then get back the newly-created API Key:

    .. literalinclude:: code/java/authentication/create_apikey_resp.java
        :language: java

  .. only:: nodejs

    You will then get back the newly-created API Key:

    .. literalinclude:: code/nodejs/authentication/create_apikey_resp.js
        :language: javascript

  .. only:: php

    You will then get back the newly-created API Key:

    .. literalinclude:: code/php/authentication/create_apikey_resp.php
      :language: php

  .. only:: python

    You will then get back the newly-created API Key:

    .. literalinclude:: code/python/authentication/create_apikey_resp.py
        :language: python

  Managing API Keys
  ^^^^^^^^^^^^^^^^^

  In some cases, you may need to delete or disable an API Key. This is important for management of API Keys. For example, a developer may delete an API Key because it has been compromised, or the administrator may disable all API Keys for a developer that is past due on payments for the service. API Keys can be retrieved from either the Application or Account. Once a key is retrieved, it can be deleted or disabled.

  **Delete an API Key**

  .. only:: csharp or vbnet

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/delete_apikey.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/delete_apikey.vb
          :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/authentication/delete_apikey.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/authentication/delete_apikey.js
        :language: javascript

  .. only:: php

    .. literalinclude:: code/php/authentication/delete_apikey.php
      :language: php

  .. only:: python

    .. literalinclude:: code/python/authentication/delete_apikey.py
        :language: python

  **Disable an API Key**

  .. only:: csharp or vbnet

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/disable_apikey.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/disable_apikey.vb
          :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/authentication/disable_apikey.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/authentication/disable_apikey.js
        :language: javascript

  .. only:: php

    .. literalinclude:: code/php/authentication/disable_apikey.php
      :language: php

  .. only:: python

    .. literalinclude:: code/python/authentication/disable_apikey.py
        :language: python

  .. _api-basic-auth:

  4.6.2. How to authenticate using HTTP Basic
  -----------------------------------------------------------------

  Now that your developer has an API Key, there are two methods that they can use to authenticate their API calls: HTTP Basic and HTTP Bearer. In this section we'll cover Basic Authentication, then we'll discuss :ref:`how to exchange an API Key for an OAuth token <api-key-for-token>`, and finally how to authenticate an API call with that token using :ref:`HTTP Bearer Authentication <api-bearer-auth>`.

  The simplest way to authenticate a call is to Base64 encode the API Key and Secret and then pass this encoded string in the authorization header:

  .. code-block:: http

    GET /v1/groups/1ORBsz2iCNpV8yJKqFWhDc/accountMemberships HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpGTVY0V1ZWQ1ZHMzVYQVRJSTlUOTZKNzpYRVBKb2xobk1ZRUR3MmJTQ2ZSbkQrbnlxSyt...

  .. warning::

    Basic Authentication does not encrypt or hash the credentials in any way. By itself, it is not secure and Stormpath strongly recommends that when a developer calls your API, it is transmitted over HTTPS to provide adequate security.

  Upon receiving this request, the Stormpath SDK will authenticate the request as follows:

  .. only:: csharp or vbnet

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/authenticate_basic_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/authenticate_basic_req.vb
          :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/authentication/authenticate_basic_req.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/authentication/authenticate_basic_req.js
        :language: javascript

  .. only:: php

    .. literalinclude:: code/php/authentication/authenticate_basic_req.php
      :language: php

  .. only:: python

    .. literalinclude:: code/python/authentication/authenticate_basic_req.py
        :language: python

  The returned Authentication Result will provide properties and methods for retrieving the authenticated Account and ApiKey for a successful authentication request. Your application will use this information to provide context associated with who is calling your API. This becomes important when your API has generic endpoints that return different information based on the caller.

  The SDK provides a caching layer to ensure fast response times in your API by reducing network traffic to the Stormpath service. The caching layer will cache the API Key securely with the Secret encrypted. Stormpath will use the cached entry for API Key and Secret authentication when possible.

  .. _api-key-for-token:

  4.6.3. How to exchange an API Key for an Access Token
  -----------------------------------------------------------------

  Instead of passing base64 encoded API keys over the wire, you can exchange an API Key Id and Secret for an Access Token, and use the Access Token as a Bearer Token to authentication for a protected API or resource. Exchanging an API Key for a token is essentially a two step process:

  1. The client authenticates with Stormpath and requests an access token from the token endpoint
  2. Stormpath authenticates the client and issues an access token

  For more details, see earlier in this chapter: :ref:`generate-oauth-token`.

  .. _api-bearer-auth:

  4.6.4. How to authenticate using HTTP Bearer Access Tokens
  -----------------------------------------------------------------

  After you return an OAuth Access Token to a developer using your API service, they can start using the OAuth Access Token to validate authentication to your service.

  Stormpath requires that the developer send the Access Token in the Authorization header of the request.

  Again, the Stormtrooper Equipment API example. We will require that a developer exchange their API Key and Secret for an Access Token and then pass the Access Token in future requests to gain access to your API.

  The developer request would look something like this:

  .. code-block:: http

    GET /v1/groups/1ORBsz2iCNpV8yJKqFWhDc/accountMemberships HTTP/1.1
    Host: api.stormpath.com
    Authorization: Bearer 7FRhtCNRapj9zs.YI8MqPiS8hzx3wJH4.qT29JUOpU...

  The Stormpath SDK would then authenticate the request as follows:

  .. only:: csharp or vbnet

    .. warning::

      This feature is not yet available in the .NET SDK. For updates, you can follow `ticket #173 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/173>`_ on Github.

    .. todo::

      .. only:: csharp

        .. literalinclude:: code/csharp/authentication/authenticate_bearer_req.cs
            :language: csharp

      .. only:: vbnet

        .. literalinclude:: code/vbnet/authentication/authenticate_bearer_req.vb
            :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/authentication/authenticate_bearer_req.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/authentication/authenticate_bearer_req.js
        :language: javascript

  .. only:: php

    .. literalinclude:: code/php/authentication/authenticate_bearer_req.php
      :language: php

  .. only:: python

    .. literalinclude:: code/python/authentication/authenticate_bearer_req.py
        :language: python

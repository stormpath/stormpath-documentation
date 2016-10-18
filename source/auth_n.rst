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
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "type": "basic",
      "value": "Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ==",
      "accountStore": {
         "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE"
       }
    }

  You are using the Base64 encoded ``value`` from above, and (optionally) specifying that the Account can be found in the "Captains" Directory from :ref:`earlier <about-cloud-dir>`.

  .. note::

    It is also possible to specify a Group or Organization's ``href`` or an Organization's ``nameKey`` instead of an Directory's. Passing a ``nameKey`` would look like this:

    .. code-block:: http

      POST /v1/applications/1gk4Dxzi6o4PbdleXaMPLE/loginAttempts HTTP/1.1
      Host: api.stormpath.com
      Authorization: Basic MlpG...
      Content-Type: application/json

      {
        "type": "basic",
        "value": "YWxhbkBzbWl0aGVlZS5jb206UGFzcexample",
        "accountStore": {
          "nameKey":"anOrgNameKey"
        }
      }

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

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``authenticateAccount`` method on the ``Application`` object.

  .. literalinclude:: code/java/authentication/login_attempt_req.java
      :language: java

  .. note::

    Instead of just receiving an authentication result, it is possible to receive the full Account object. To do so, use the ``withResponseOptions`` method on the ``UsernamePasswordRequestBuilder``

    .. literalinclude:: code/java/authentication/login_attempt_req_expand_account.java
      :language: java

  If authentication succeeded, you would receive back an ``AuthenticationResult`` object

  .. note::

    It's also possible to specify an Account Store to authenticate against, instead of relying on the default login flow (see below). To do this, use the ``inAccountStore(AccountStore accountStore)`` method on the ``UsernamePasswordRequestBuilder`` syntax shown above.

.. only:: nodejs

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``application.authenticateAccount(authRequest, callback)`` method as shown below:

  .. literalinclude:: code/nodejs/authentication/login_attempt_req.js
      :language: javascript

  This works as expected because the "Captains" directory is mapped to the application.
  If there are multiple directories or organizations mapped to the application, they
  will be searched in order (more on that :ref:`below <how-login-works>`).  You
  can skip the searching and target a specific account store by ``href``:

  .. literalinclude:: code/nodejs/authentication/login_attempt_ash.js
      :language: javascript

  Or by the ``nameKey`` of an Organization:

  .. literalinclude:: code/nodejs/authentication/login_attempt_onk.js
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

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``authenticate_account`` method:

  .. literalinclude:: code/python/authentication/login_attempt_req.py
    :language: python

  .. todo::

    .. note::

      Instead of just receiving an authentication result, it is possible to receive the full Account object. To do this,

      .. literalinclude:: code/python/authentication/login_attempt_req_expand_account.py
        :language: python

  If authentication succeeded, you will get back a non-empty result, and can
  access the resulting ``account`` property:

  .. literalinclude:: code/python/authentication/login_attempt_resp.py
    :language: python

.. only:: ruby

  So, if you had a user Account "Han Solo" in the "Captains" Directory, and you wanted to log him in, you would use the ``authenticate_account`` method:

  .. literalinclude:: code/ruby/authentication/login_attempt_req.rb
    :language: ruby

  If authentication succeeded, you will get back a ``Stormpath::Authentication::AuthenticationResult`` which contains the ``account`` object:

  .. literalinclude:: code/ruby/authentication/login_attempt_resp.rb
    :language: ruby

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

  You can find all the Account Store Mappings for an Application by using the ``getAccountStoreMappings()`` method:

  .. literalinclude:: code/java/authentication/get_asm_req.java
      :language: java

.. only:: nodejs

  You can find all the Account Store Mappings for an Application by using the ``getAccountStoreMappings()`` method
  of an Application instance:

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

  You can find this mapping by iterating through the ``account_store_mappings``
  collection:

  .. literalinclude:: code/python/authentication/get_asm_req.py
    :language: python

.. only:: ruby

  You can find this mapping by iterating through the ``account_store_mappings`` collection:

  .. literalinclude:: code/ruby/authentication/get_asm_req.rb
    :language: ruby

.. only:: nodejs

  This will print the list of Account Store Mappings in your console:

  .. literalinclude:: code/nodejs/authentication/get_asm_resp.js
      :language: javascript

.. only:: php

  This will return the Account Store Mapping:

  .. literalinclude:: code/php/authentication/get_asm_resp.php
    :language: php

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_asm.rb
    :language: ruby

If you go back to the example from the :ref:`Account Management chapter<account-mgmt>`, you can see the Account Store Mapping between the Directory and the Application. This now means that the Captain's Account in the Directory will now be able to log in to the Application.

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/change_login_priority.rb
    :language: ruby

The accountStoreMapping resource will be updated and all of the other Account Stores will have their ``listIndex`` incremented up by 1.

**Changing the Default Account or Group Store**

Setting an Account Store Mapping as the default Account or Group store would automatically supersede any other Account Store Mapping. Any other mapping that had previously been the default would have the "true" flag switched to "false".

.. only:: rest

  .. code-block:: http

    POST /v1/accountStoreMappings/1NUhrCPT0q66bjyexample HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  You can use the ``setDefaultAccountStore()`` method of an Application instance to take an existing Account Store instance, and set the flag on it:

  .. literalinclude:: code/nodejs/authentication/change_default_stores.js
      :language: javascript

  If you know the ``href`` of the account store, but don't already have an instance
  of it, you can also pass an object literal with the ``href`` value:

  .. literalinclude:: code/nodejs/authentication/change_default_stores_literal.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/change_default_stores.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/change_default_stores.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/change_default_stores.rb
    :language: ruby

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

**Token-based authentication** is an alternate, stateless strategy. With token-based authentication, you secure an application based on a security token that is generated for the user on authentication and then stored on the client-side. Token-based Authentication is all about removing the need to store information on the server while giving extra security to keep the token secure on the client. This helps you as a developer build stateless and scalable applications.

Stormpath's approach to token-based authentication has two elements: JSON Web Tokens (JWTs) for authentication, and OAuth 2.0 for authorization.

Why OAuth 2.0?
^^^^^^^^^^^^^^

OAuth 2.0 is an authorization framework and provides a protocol to interact with a service that can delegate authentication or provide authorization. Its primary advantage as a standard is its wide adoption rate across many mobile and web applications today. If you have ever logged-in to a website using Facebook or Google, you have used one of OAuth 2.0's many authorization flows. You can read more about the different OAuth 2.0 authorization flows or grant types in depth on `Stormpath’s blog <https://stormpath.com/blog/what-the-heck-is-oauth/>`_.

Even though OAuth 2.0 has many authorization modes or "grant types", Stormpath currently supports the following:

- **Password Grant Type:** Provides the ability to get an Access Token based on a login and password.
- **Client Credentials Grant Type**: Provides the ability to exchange an API Key for an Access Token.
- **Social Grant Type:** Allows you to exchange a user's social Access Token or Authorization Code
- **Refresh Grant Type:** Provides the ability to generate another Access Token based on a special Refresh Token.
- **Stormpath Factor Challenge Grant Type:** Provides the ability to generate an Access Token with a Multi-Factor Authentication challenge code

To understand how to use Token-based Authentication, you need to talk about the different types of tokens that are available. To see how to generate an OAuth token, see :ref:`below <generate-oauth-token>`.

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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/oauth_policy.rb
    :language: ruby

  The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

.. only:: rest or php

   The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_. By **default**, the TTL for the Access Token is 1 hour and the Refresh Token's is 60 days. The maximum value for both is 10 years and 1 day (``P10Y``), while the minimum value is 1 second (``PT1S``).

If you wanted to change the TTL for the Access Token to 30 minutes and the Refresh Token to 7 days, you could send the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/oAuthPolicies/1gk4Dxzi6o4PbdleXaMPLE HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/update_oauth_ttl_req.rb
    :language: ruby

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

.. only:: php

  And you would get the following response:

  .. literalinclude:: code/php/authentication/update_oauth_ttl_resp.php
    :language: php

.. only:: rest or java or nodejs or php or python

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of 0 (e.g. ``PT0M``).

.. only:: (csharp or vbnet)

  .. note::

    Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a duration value of ``TimeSpan.Zero``.

.. _generate-oauth-token:

Generating an OAuth 2.0 Access Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath can generate a brand new Access Token using the above-mentioned OAuth 2.0 grant types. This means that you can generate a new Access Token with:

- **Client Credentials Grant Type:** a client's credentials (e.g. Client ID and Secret)
- **Social Grant Type:** a user's social login Access Token or Authorization Code
- **Password Grant Type:** a user's credentials (e.g. username and password)
- **Stormpath Factor Challenge Type:** a Stormpath Challenge ``href`` and ``code``
- **Refresh Grant Type:** For information about using the an OAuth Refresh token :ref:`see below <refresh-oauth-token>`

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
- And either the Authorization **Code** or
- The **Access Token** for that Social Provider

All together, this would look like this:

``grant_type=stormpath_social&providerId=facebook&accessToken=EAA68kW...``

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

.. only:: python

  .. warning::

    This feature is not yet available in the Python SDK. For updates, you can follow `ticket #279 <https://github.com/stormpath/stormpath-sdk-python/issues/279>`_ on Github.

  .. todo::

    (python.todo)

.. only:: not python

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

    1. Created and sent an OAuth request to Stormpath (see :ref:`generate-oauth-token`).
    2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

    The user now attempts to access a secured resource and provides their Access Token (as in the example of passing a Bearer header to a protected web controller). To validate the Access Token, create and send a validation request to Stormpath:

    .. literalinclude:: code/java/authentication/validate_oauth_token_sp_req.java
      :language: java

    .. note::

      ``JWTException`` is part of the `JJWT <https://github.com/jwtk/jjwt>`_ library. If you don't want to include that as a dependency in your code, you can simply catch ``Exception`` rather than ``JWTException``.

    If the access token can be validated, Stormpath will return a ``OAuthBearerRequestAuthenticationResult`` object:

    .. literalinclude:: code/java/authentication/validate_oauth_token_sp_resp.java
      :language: java

  .. only:: nodejs

    1. Created and sent an OAuth request to Stormpath (see :ref:`generate-oauth-token`).
    2. Received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

    The user now attempts to access a secured resource:
    We need to create a new authenticator, but this time it will be a JWT authenticator that can authenticate tokens that have already been generated. This authenticator
    is also bound to an application (the same one that you used to generate the token), and is created like this:

    .. literalinclude:: code/nodejs/authentication/create_jwt_authenticator.js
      :language: javascript

    Now we can pass access tokens to this authenticator.  If they are valid we can use the authentication result to fetch the Account that has authenticated with the token:

    .. literalinclude:: code/nodejs/authentication/validate_oauth_token_sp_req.js
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

  .. only:: ruby

    1. Created a ``Stormpath::Oauth::PasswordGrantRequest`` request object with the user's email/username and password.
    2. Made an authenticate attempt with the ``authenticate_oauth`` method from the ``application`` object and sent the request as a method parameter.
    3. Received back an ``Stormpath::Oauth::AccessTokenAuthenticationResult`` object which contained - among other things - an **Access Token** in JWT format.

    The user now attempts to access a secured resource:

    .. literalinclude:: code/ruby/authentication/validate_oauth_token_sp_req.rb
      :language: ruby

    If the Access Token can be validated, Stormpath will return a ``Stormpath::Oauth::VerifyToken`` object that contains this:

    .. literalinclude:: code/ruby/authentication/validate_oauth_token_sp_resp.rb
      :language: ruby

  .. only:: python

    (python.todo)

  With the confirmation that the token is valid, you can now allow the user to access the secured resource that they requested.

Validating the Token Locally
""""""""""""""""""""""""""""

.. only:: python

  .. warning::

    This feature is not yet available in the Python SDK. For updates, you can follow `ticket #280 <https://github.com/stormpath/stormpath-sdk-python/issues/280>`_ on Github.

.. only:: not python

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

    Validating the token locally is simply a matter of using the ``withLocalValidation()`` method when creating the authenticator:

    .. literalinclude:: code/java/authentication/validate_oauth_token_local.java
        :language: java

  .. only:: nodejs

    To use local validation, enable local validation when creating a JWT authenticator:

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

  .. only:: ruby

    .. literalinclude:: code/ruby/authentication/validate_oauth_token_local.rb
      :language: ruby

    .. warning::

      This feature is not yet available in the Ruby SDK. For updates, you can follow `ticket #165 <https://github.com/stormpath/stormpath-sdk-ruby/issues/165>`_ on Github.

    .. todo::

      This

.. _refresh-oauth-token:

Refreshing Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

In the event that the Access Token expires, the user can generate a new one using the Refresh Token without re-entering their credentials.

.. only:: rest

  To use this Refresh Token, you make an HTTP POST to your Applications ``/oauth/token`` endpoint with it and you will get a new token back.

  .. code-block:: http

    POST /v1/applications/$YOUR_APPLICATION_ID/oauth/token HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  Again, we will create an authenticator. This time we will create a refresh token authenticator:

  .. literalinclude:: code/nodejs/authentication/create_refresh_token_authenticator.js
    :language: javascript

  And we will use the authenticator to get a new access token, by passing the refresh token to it:

  .. literalinclude:: code/nodejs/authentication/refresh_access_token_req.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/refresh_access_token_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/refresh_access_token_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/refresh_access_token_req.rb
    :language: ruby

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

  The new access token will be printed in the terminal:

  .. literalinclude:: code/nodejs/authentication/refresh_access_token_resp.js
    :language: javascript

.. only:: php

  This would be the response:

  .. literalinclude:: code/php/authentication/refresh_access_token_resp.php
    :language: php

Note that this response contains the same Refresh Token as was in the request. This is because when Stormpath generates a new Access Token for a Refresh Token it does not generate a new Refresh token, nor does it modify its expiration time. This means that once the Refresh Token expires, the user must authenticate again to get a new Access and Refresh Tokens.

Revoking Access and Refresh Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: python

  .. warning::

    This feature is not yet available in the Python SDK. For updates, you can follow `ticket #281 <https://github.com/stormpath/stormpath-sdk-python/issues/281>`_ on Github.

  .. todo::

    (python.todo)

.. only:: not python

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
      Authorization: Basic MlpG...

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

  .. only:: nodejs

    To revoke a token you need to delete it from the REST API, which means you need to obtain the ``href`` of the token.

    Access and Refresh Tokens are like all other resources
    in the Stormpath REST API, and they have an ``href`` value.  The format of the ``href`` will be one of:

    .. code-block:: javascript

      'https://api.stormpath.com/v1/accessTokens/:jti'
      'https://api.stormpath.com/v1/refreshTokens/:jti'

    Where the ``jti`` is in the claims body of the token (you must unpack the JWT to look inside the claims body).  If you already know the ``href`` of the token resource, you can quickly fetch it and then delete it:

    .. literalinclude:: code/nodejs/authentication/delete-access-token.js
      :language: javascript

    The same can be done for refresh tokens, using ``client.getRefreshToken()`` instead.

    If you want to delete all the access tokens for an Account, you would iterate over all the Account's access tokens and delete each one:

    .. literalinclude:: code/nodejs/authentication/delete_user_access_tokens_req.js
      :language: javascript

    If you have the actual token, as a JWT string, you can determine the ``href`` by unpacking the token, and building the ``href`` from the ``jti`` claim that is in the token:

    .. literalinclude:: code/nodejs/authentication/get-token-jti.js
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

  .. only:: ruby

    Revoking a token is as easy as ABC. You just need to obtain it and delete it. If a user has more access tokens and you need to examine them before revoking, you can iterate through the collection and then delete:

    .. literalinclude:: code/ruby/authentication/delete_user_access_tokens_req.rb
      :language: ruby

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

Social Directories are a kind of mirrored Directory, in that they are used to mirror user information found in an external database. This means that entities like Groups can only exist in a your Stormpath Social Directory if they are mirrored in from the external Social provider. For more information, please see the :ref:`Account Management chapter <about-mirror-dir>`.

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

     a. If a matching Account is found, Stormpath will return the existing Account.

     b. If a matching Account is not found, Stormpath will create one and return it.

 7. At this point, the Account can now be used like any other Account in Stormpath.

.. only:: nodejs

    a. If a matching Account is found, Stormpath will return the existing Account.

    b. If a matching Account is not found, Stormpath will create one and return it.

  7. The Account can now be used like any other Account in Stormpath.

.. only:: php

    a. If a matching Account is found, Stormpath will return the existing Account's ``href``.

    b. If a matching Account is not found, Stormpath will create one and return the new Account's ``href``.


.. only:: python

    a. If a matching Account is found, Stormpath will return the existing Account.

    b. If a matching Account is not found, Stormpath will create one and return the new Account.

 7. At this point, the Account can be used like any other Stormpath Account.

.. only:: ruby

    a. If a matching Account is found, Stormpath will return the existing Account.

    b. If a matching Account is not found, Stormpath will create one and return the new Account.

  7. At this point, the Account can be used like any other Stormpath Account.

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_directory_google.rb
    :language: ruby

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_directory_fb.rb
    :language: ruby

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

Stormpath will use the Access Token provided to retrieve information about your Facebook Account, then return a Stormpath Account. If you would like to get back an OAuth token instead, please see the :ref:`Generating an OAuth 2.0 Access Token above <generate-oauth-token>`.

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_directory_github.rb
    :language: ruby

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
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_directory_linkedin.rb
    :language: ruby

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

.. _ldap-dir-authn:

4.4. Authenticating Against an LDAP Directory
=============================================

.. contents::
  :local:
  :depth: 2

This section assumes that you are already familiar both with :ref:`how-login-works` and the concept of Stormpath :ref:`LDAP Directories <about-ldap-dir>`. The instructions in this section apply to all LDAP user directories, including Active Directory, with two exceptions:

- If you are using an LDAP user directory in conjunction with **Active Directory Federation Services**, you will want to read the :ref:`adfs` section below.

- If you are using Azure Active Directory, then you will want to read the :ref:`azure` section.

The LDAP Authentication Flow
----------------------------

There are two different authentication flows for LDAP directories: one for Active Directory, and another for all other directories that use the LDAP protocol.

**LDAP**

.. figure:: images/auth_n/ldap_vanilla_seq.png
  :align: center
  :scale: 100%
  :alt: Non-AD LDAP Auth Sequence

**Active Directory Authentication**

.. figure:: images/auth_n/ldap_ad_seq.png
  :align: center
  :scale: 100%
  :alt: AD LDAP Auth Sequence

Mirror Directories and LDAP
---------------------------

To recap: With LDAP integration, Stormpath is simply mirroring the canonical LDAP user directory. If this fulfills your requirements, then the story ends here. However, if you need to support other kinds of login (and therefore other kinds of Directories) it is recommended that you maintain a "master" Directory alongside your Mirror Directory. For more about this, see :ref:`account-linking`.

Setting Up Login With LDAP
--------------------------

The step-by-step process for setting-up LDAP login is as follows:

.. _authn-ldap-dir-creation:

Step 1: Create an LDAP Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: csharp or vbnet

  .. warning::

    The ability to create an LDAP directory is not yet available in the .NET SDK. Please use the Stormpath Admin Console, or see below for the REST API instructions.

    For updates, you can follow `ticket #167 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/167>`_ on Github.

.. only:: java

.. warning::

  The ability to create an LDAP directory is not yet available in the Java SDK. Please use the Stormpath Admin Console, or see below for the REST API instructions.

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

.. only:: ruby

  .. warning::

    This feature is not yet available in the Ruby SDK. For updates, you can follow `ticket #161 <https://github.com/stormpath/stormpath-sdk-ruby/issues/161>`_ on Github.
    In the meantime, please use the Stormpath Admin Console. Please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

  .. todo::

    Add LDAP directory creation Ruby example

  .. literalinclude:: code/ruby/authentication/create_directory_ldap.rb
    :language: ruby

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
      Authorization: Basic MlpG...
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

.. note::

  The LDAP Agent can be installed anywhere, as long as the location allows it access to your LDAP server.

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

  In the case of Active Directory, the login process does not proceed as normal, and instead involves something called "delegated authentication". The user accounts pulled-in from an Active Directory do not include the passwords. Consequently, the LDAP Agent does double duty in the case of Active Directory: it synchronizes accounts, and also handles authentication attempts and relays the outcome back to Stormpath.

.. _saml-authn:

4.5. Authenticating Against a SAML Directory
============================================

.. contents::
  :local:
  :depth: 1

SAML is an XML-based standard for exchanging authentication and authorization data between security domains. Stormpath enables you to allow customers to log-in by authenticating with an external SAML Identity Provider. Stormpath supports both the Service Provider initiated flow and the Identity Provider initiated flow.

SAML Directories are a kind of mirrored Directory, in that they are used to mirror user information found in an external database. This means that entities like Groups can only exist in a your Stormpath SAML Directory if they are mirrored in from the external SAML IdP. For more information, please see the :ref:`Account Management chapter <about-mirror-dir>`.

If you'd like a high-level description of Stormpath's SAML support, see :ref:`Stormpath as a Service Provider <saml-overview>`.

If you want a step-by-step guide to configuring Stormpath to work with Identity Providers like Salesforce, OneLogin and Okta, as well as with your ADFS or Azure AD deployment, see the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html>`__.

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

In both cases, just like with Mirror and Directories, the user information that is returned from the IdP is used by Stormpath to either identify an existing Account resource, or create a new one. In the case of new Account creation, Stormpath will map the information in the response onto its own resources. In the following section you will walk you through the process of configuring your SAML Directory, as well as giving you an overview of how the SAML Authentication process works.

For a more detailed step-by-step account of SAML login, see :ref:`below <saml-flow>`.

.. _saml-configuration:

4.5.2. Configuring SAML
-----------------------

SAML configuration instructions can be found in the `SAML Appendix <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html>`__ of the Stormpath Admin Console Guide.

.. _salesforce:

Salesforce
^^^^^^^^^^

Instructions for configuring Salesforce SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#salesforce>`__.

.. _onelogin:

OneLogin
^^^^^^^^

Instructions for configuring OneLogin SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#onelogin>`__.

.. _okta:

Okta
^^^^

Instructions for configuring Okta SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#okta>`__.

.. _ping:

Ping
^^^^^^^^^^

Instructions for configuring Ping SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#ping>`__.

.. _adfs:

Active Directory Federation Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Instructions for configuring ADFS SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#active-directory-federation-services>`__.

.. _azure:

Azure Active Directory
^^^^^^^^^^^^^^^^^^^^^^^

Instructions for configuring ADFS SAML can be found in the `Stormpath Admin Console Guide <https://docs.stormpath.com/console/product-guide/latest/appendix-saml.html#azure-active-directory>`__.

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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_directory_saml.rb
    :language: ruby

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/get_directory_provider_req.rb
      :language: ruby

.. only:: rest or csharp or vbnet

  .. code-block:: http

    GET /v1/directories/$DIRECTORY_ID/provider HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

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

  This will return an implementation of the ``SamlProvider`` interface:

  .. literalinclude:: code/java/authentication/get_directory_provider_resp.java
      :language: java

.. only:: nodejs

  This will print the provider metadata in your terminal:

  .. literalinclude:: code/nodejs/authentication/get_directory_provider_resp.js
      :language: javascript

.. only:: php

  This will return the Provider:

  .. literalinclude:: code/php/authentication/get_directory_provider_resp.php
    :language: php

.. only:: not nodejs

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

.. only:: php

  .. literalinclude:: code/php/authentication/get_serviceprovider_metadata_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/get_serviceprovider_metadata_req.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/get_serviceprovider_metadata_req.rb
      :language: ruby

.. only:: rest or csharp or vbnet

  .. code-block:: http

    GET /v1/samlServiceProviderMetadatas/$METADATA_ID HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/xml

  .. note::

    This will return XML by default, but you can also specify ``application/json`` if you'd like to receive JSON instead.

.. only:: rest

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

.. only:: java

  This will return an implementation of the ``SamlServiceProviderMetadata`` interface:

  .. literalinclude:: code/java/authentication/get_serviceprovider_metadata_res.java
      :language: java

.. only:: php

  .. literalinclude:: code/php/authentication/get_serviceprovider_metadata_res.php
      :language: php

From this metadata, you will need two values:

- **Assertion Consumer Service Endpoint**: This is the location the IdP will send its response to.
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

You should create any URIs here that you would like included as authorized callback URIs, to a maximum of 4000 characters in total length.

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

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_callback_uris.rb
      :language: ruby

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  This will print the SAML policy resource in your terminal:

  .. literalinclude:: code/nodejs/authentication/saml_policy_example_res.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/saml_policy_example.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/saml_policy_example.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/saml_policy_example.rb
      :language: ruby

.. _saml-restconfig-5a:

Step 5a: Generate defaultRelayState (IdP-initiated Authentication Only)
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
.. only:: not nodejs

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

  .. warning::

    The ability to get the default relay state is not yet available in the Java SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

  .. todo::

    .. literalinclude:: code/java/authentication/get_default_relay_state_req.java
        :language: java

.. only:: nodejs

  To configure your IdP for IdP-initiated authentication, you will need to get a ``defaultRelayState`` from
  our REST API.  This is done by making a POST request against the ``serviceProvider`` resource, as found in
  the application's ``samlPolicy``.  We can make the request like this:

  .. literalinclude:: code/nodejs/authentication/get_default_relay_state_req.js
      :language: javascript

.. only:: python

  .. literalinclude:: code/python/authentication/get_default_relay_state_req.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/get_default_relay_state_req.rb
      :language: ruby


.. only:: rest or csharp or vbnet or php or java

  .. code-block:: http

    POST /v1/samlServiceProviders/6voAya1BvrNeFOAeXamPle/defaultRelayStates HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...

  This request will return a response containing a JWT like this:

  .. code-block:: json

    {
      "defaultRelayState": "eyJ0aWQiOiIxZ0JUbmNXc3AyT2JRR2dEbjlSOTFSIiwiYWxnIjoiSFMyNTYifQ.eyJzcFVpZCI6IjZ2b0F5YTFCdnJOZUZPQW9neGJ4T2UiLCJqdGkiOiIxdjdjT1l1SE1kQzA0Z2Vucm1wU2lZIn0.WvfWRxTfjRoPxA803HyOR380u2dWpdtQiO0I2kislFY"
    }

.. todo::

  .. only:: java

    This request will return a response containing a JWT like this:

    .. literalinclude:: code/java/authentication/get_default_relay_state_resp.java
        :language: java

.. only:: nodejs

  This will print the new `defaultRelayState` value in your terminal:

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

.. only:: java

  .. warning::

    The ability to get the default relay state is not yet available in the Java SDK. Please use the Stormpath Admin Console, or use the the REST API instructions below.

  .. todo::

    .. literalinclude:: code/java/authentication/get_default_relay_state_with_extras.java
        :language: java

.. only:: rest or csharp or vbnet or php or java

  .. code-block:: http

    POST /v1/samlServiceProviders/6voAya1BvrNeFOAeXamPle/defaultRelayStates HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...

    {
        "callbackUri": "https://org1.myapp.com",
        "organization": {
            "nameKey": "org1",
        }
        "state": "IAmAState"
    }

.. only:: nodejs

  .. literalinclude:: code/nodejs/authentication/get_default_relay_state_with_extras.js
      :language: javascript

.. only:: python

  .. literalinclude:: code/python/authentication/get_default_relay_state_with_extras.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/get_default_relay_state_with_extras.rb
      :language: ruby

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

  Attribute mapping rules are simple objects, that can be defined like this:

  .. literalinclude:: code/nodejs/authentication/example_saml_rule.js
      :language: javascript

.. only:: php

  .. warning::

    The ability to modify attribute mappings is not yet available in the PHP SDK. Please use the Stormpath Admin Console, or see the REST API instructions below.

.. only:: python

  .. literalinclude:: code/python/authentication/example_saml_rule.py
      :language: python

  .. todo:

    The rule expressed here is as follows:

    (python.todo)

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/example_saml_rule.rb
    :language: ruby

.. only:: rest or csharp or vbnet or php or ruby

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

.. only:: not nodejs

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

  To add this mapping rule to the Directory, first fetch the ``provider`` while expanding ``attributeStatementMappingRules``, then push the new rule onto this collection, and save the provider:

  .. literalinclude:: code/nodejs/authentication/create_mapping_rule.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authentication/create_mapping_rule.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authentication/create_mapping_rule.py
      :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authentication/create_mapping_rule.rb
      :language: ruby

.. only:: rest or csharp or vbnet

  .. code-block:: http

    POST /v1/attributeStatementMappingRules/$MAPPING_RULES_ID", HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. _mfa:

4.6. Using Multi-Factor Authentication
============================================

.. only:: not rest

 .. warning::

    This feature is not yet available in the |language| SDK. In the meantime you can find the REST documentation below.

At a minimum, an Account in Stormpath requires at least one authentication factor, which is the password. However, if you would like to include additional security then Stormpath supports the creation of additional authentication factors on an Account. Currently, the additional factors are:

- SMS message to a phone
- Google Authenticator

The multi-factor authentication process works as follows with text messages:

#. An additional **Factor** of type ``SMS`` is added to an Account.
#. A **Challenge** is created which includes a message.
#. The message is sent to the phone number found in the Factor with a one-time numerical **code**.
#. If that **code** is then passed back to the appropriate Challenge within a sufficient time window, you will get back either a ``SUCCESS`` or ``FAILED`` response.

With Google Authenticator, the flow is only slightly different:

#. An additional **Factor** of type ``google-authenticator`` is added to an Account.
#. The new **Factor** has a **secret** and a Base64-encoded **QR code**, both of which can be used to add it to the Google Authenticator app.
#. At any time, you can send the **code** from the Authenticator app to Stormpath's ``/challenges`` endpoint, at which point you will get back either a ``SUCCESS`` or ``FAILED`` response.

.. note::

  Multi-Factor Authentication is only available with paid Stormpath plans. For more information please see `Stormpath's Pricing Page <https://stormpath.com/pricing>`__.

.. _mfa-adding-factor:

4.6.1. Enrolling an Additional Factor
-------------------------------------

Enrolling an additional authentication factor always happens separate from Account creation, so the process is the same regardless of whether you are creating a factor for an existing Account or one that was just created. For this example, we will create a new Account in Stormpath, then add an additional Factor resource to it.

First, you create the Account:

.. only:: rest

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4PbdleXaMPLE/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json
    Cache-Control: no-cache

    {
        "givenName": "Joe",
        "surname": "Factorman",
        "username": "factorman",
        "email": "joe.factorman@stormpath.com",
        "password":"Changeme1"
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_create_account.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_create_account.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_create_account.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_create_account.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_create_account.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_create_account.py
        :language: python

.. only:: ruby

  .. todo::

    Ruby SDK MFA

    .. literalinclude:: code/ruby/authentication/mfa_create_account.rb
      :language: ruby

.. _mfa-adding-factor-sms:

Adding an SMS Factor
^^^^^^^^^^^^^^^^^^^^

To add an additional SMS Factor to this Account, you send a POST to that Account's ``/factors`` endpoint:

.. only:: rest

  .. code-block:: http

    POST /v1/accounts/5IvkjoqcYNe3TYMExample/factors HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "type":"SMS",
      "phone": {
        "number": "2675555555"
      }
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_add_sms_factor_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_add_sms_factor_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_add_sms_factor_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_add_sms_factor_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_add_sms_factor_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_add_sms_factor_req.py
        :language: python

.. only:: ruby

  .. todo::

    Ruby SDK MFA

    .. literalinclude:: code/ruby/authentication/mfa_add_sms_factor_req.rb
      :language: ruby

You will then get back the response:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/factors/29b9PiAaWqr9Hanexample",
      "type": "SMS",
      "createdAt": "2016-09-22T21:34:00.881Z",
      "modifiedAt": "2016-09-22T21:34:00.881Z",
      "status": "ENABLED",
      "verificationStatus": "UNVERIFIED",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMExample"
      },
      "challenges": {
          "href": "https://api.stormpath.com/v1/factors/29b9PiAaWqr9Hanexample/challenges"
      },
      "phone": {
          "href": "https://api.stormpath.com/v1/phones/29b9PeqVcGYAelhExample"
      },
      "mostRecentChallenge": null
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_add_sms_factor_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_add_sms_factor_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_add_sms_factor_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_add_sms_factor_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_add_sms_factor_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_add_sms_factor_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_add_sms_factor_resp.rb
      :language: ruby

For now the ``verificationStatus`` is ``UNVERIFIED`` and the link to the ``mostRecentChallenge`` is ``null``. If you were to send a challenge this Factor, the ``mostRecentChallenge`` link would be populated. If that challenge was successful, the ``verificationStatus`` would change to ``VERIFIED``.

For more information about the Factor resource, see :ref:`the Reference chapter <ref-factor>`.

.. _mfa-adding-factor-google:

Adding a Google Authenticator Factor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To add an additional Google Authenticator Factor to this Account, you must send the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/accounts/5IvkjoqcYNe3TYMYExample/factors HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json
    Authorization: Basic MlpG...

    {
      "type":"google-authenticator",
      "accountName": "jakub@stormpath.com"
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_add_ga_factor_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_add_ga_factor_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_add_ga_factor_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_add_ga_factor_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_add_ga_factor_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_add_ga_factor_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_add_ga_factor_req.rb
      :language: ruby

You will then get back the response:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/factors/46EZpOuefEEooFlexample",
      "type": "google-authenticator",
      "createdAt": "2016-09-22T21:42:57.636Z",
      "modifiedAt": "2016-09-22T21:42:57.636Z",
      "status": "ENABLED",
      "accountName": "jakub@stormpath.com",
      "issuer": null,
      "secret": "OP7JZ[...]LAV",
      "keyUri": "otpauth://totp/jakub%40stormpath.com?secret=OP7JZ[...]LAV",
      "base64QRImage": "iVBOR[...]SuQmCC",
      "verificationStatus": "UNVERIFIED",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYExample"
      },
      "mostRecentChallenge": null,
      "challenges": {
          "href": "https://api.stormpath.com/v1/factors/46EZpOuefEEooFlexample/challenges"
      }
    }

  For more information about the Factor resource, see :ref:`the Reference chapter <ref-factor>`.

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_add_ga_factor_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_add_ga_factor_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_add_ga_factor_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_add_ga_factor_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_add_ga_factor_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_add_ga_factor_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_add_ga_factor_resp.rb
      :language: ruby

The user now needs to get this information into their Google Authenticator (or `similar <https://www.authy.com/tutorials/how-use-authy-google-authenticator/>`__) application. The easiest way to do that is to use their app to scan a QR code. Stormpath makes this easy by giving you the QR Code in the ``base64QRImage`` field of the Google Authenticator Factor.

You can now take this string and turn it into a QR Code image:

- You could use the use a QR Code Library, such as `QRCode.js <https://davidshimjs.github.io/qrcodejs/>`__
- Or you could generate the image yourself, using an ``<img>`` tag or CSS. For examples of both, see `here <https://css-tricks.com/examples/DataURIs/>`__.

.. todo::

  Not sure if this applies for the SDKs?

Once the image is generated, the user will scan it into their Authenticator app. If you ask them for a code, they will go into the app and find the code for your application. For information about what happens with this code, see :ref:`below <mfa-challenge-after-google>`.

.. _mfa-challenge:

4.6.2. Challenging a Factor
---------------------------

At this point in the example you have a brand new Account with two additional Factors.

.. only:: rest

  If you were to send a GET to the Account's ``/factors`` endpoint, you will see them:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYiX98vc/factors",
      "offset": 0,
      "limit": 25,
      "size": 2,
      "items": [
        {
          "href": "https://api.stormpath.com/v1/factors/29b9PiAaWqr9Hanexample",
          "type": "SMS",
          "createdAt": "2016-09-22T21:34:00.881Z",
          "modifiedAt": "2016-09-22T21:34:00.881Z",
          "status": "ENABLED",
          "verificationStatus": "UNVERIFIED",
          "account": {
              "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMExample"
          },
          "challenges": {
              "href": "https://api.stormpath.com/v1/factors/29b9PiAaWqr9Hanexample/challenges"
          },
          "phone": {
              "href": "https://api.stormpath.com/v1/phones/29b9PeqVcGYAelhExample"
          },
          "mostRecentChallenge": null
        },
        {
          "href": "https://api.stormpath.com/v1/factors/46EZpOuefEEooFlexample",
          "type": "google-authenticator",
          "createdAt": "2016-09-22T21:42:57.636Z",
          "modifiedAt": "2016-09-22T21:42:57.636Z",
          "status": "ENABLED",
          "accountName": "jakub@stormpath.com",
          "issuer": null,
          "secret": "OP7JZ[...]LAV",
          "keyUri": "otpauth://totp/jakub%40stormpath.com?secret=OP7JZ[...]LAV",
          "base64QRImage": "iVBOR[...]SuQmCC",
          "verificationStatus": "UNVERIFIED",
          "account": {
              "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYExample"
          },
          "mostRecentChallenge": null,
          "challenges": {
              "href": "https://api.stormpath.com/v1/factors/46EZpOuefEEooFlexample/challenges"
          }
        }
      ]
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_get_account_factors1_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_get_account_factors1_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_get_account_factors1_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_get_account_factors1_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_get_account_factors1_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_get_account_factors1_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_get_account_factors1_resp.rb
      :language: ruby

You will now challenge each of these factors.

.. _mfa-challenge-after:

Challenging After Factor Creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This example covers challenging Factors that have already been created. To see an example of how to challenge a Factor at the same time as you are creating it, please see :ref:`below <mfa-challenge-after>`.

.. _mfa-challenge-after-sms:

Challenging an SMS Factor
"""""""""""""""""""""""""

To challenge an SMS Factor, you send a request like this, with or without specifying a message.

.. only:: rest

  .. code-block:: http

    POST /v1/factors/3WPF5Djir0Wg5FtPoJCPbo/challenges HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json
    Cache-Control: no-cache

    {
      "message":"For the sake of example, your code is ${code}."
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_sms_factor_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_sms_factor_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_sms_factor_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_sms_factor_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_sms_factor_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_sms_factor_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_sms_factor_req.rb
      :language: ruby


If you do not specify a message, then Stormpath will just send the default message: ``"Your verification code is ${code}"``.

In response to this request you would get back a Challenge:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/challenges/70xfDsguePApNdnExample",
      "createdAt": "2016-09-22T22:35:44.799Z",
      "modifiedAt": "2016-09-22T22:35:44.800Z",
      "status": "CREATED",
      "message": "For the sake of example, your code is ${code}.",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMExample"
      },
      "factor": {
          "href": "https://api.stormpath.com/v1/factors/3WPF5Djir0Wg5FtPoJCPbo"
      }
    }

  For more information about this Challenge resource, see :ref:`the Reference chapter <ref-challenge>`.

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_sms_factor_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_sms_factor_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_sms_factor_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_sms_factor_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_sms_factor_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_sms_factor_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_sms_factor_resp.rb
      :language: ruby

The resulting SMS would look like this:

.. figure:: /images/auth_n/challenge_message.png
    :align: center
    :scale: 50%
    :alt: SMS Challenge Message

This code will remain valid for 300 seconds (5 minutes).

Next, you must collect this code from the user.

.. note::

  The code has to be sent to the correct Challenge ``href``. If your application is stateless, you could include the Challenge ``href`` in a hidden field on your form. If your application has a session, then you will want to attach the Challenge ``href`` to that session.

Once you have the code, you send it to the same Challenge you created above:

.. only:: rest

  .. code-block:: http

    POST /v1/challenges/70xfDsguePApNdnExample HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "code":"633559"
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_sms_code.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_sms_code.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_sms_code.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_sms_code.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_sms_code.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_sms_code.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_sms_code.rb
      :language: ruby

And then you would get back the response:

.. only:: rest

  .. code-block:: json

    {
      "createdAt": "2016-09-22T22:35:44.799Z",
      "modifiedAt": "2016-09-22T22:39:06.822Z",
      "href": "https://api.stormpath.com/v1/challenges/70xfDsguePApNdnExample",
      "message": "For the sake of example, your code is ${code}.",
      "factor": {
          "href": "https://api.stormpath.com/v1/factors/3WPF5Djir0Wg5FtPoJCPbo"
      },
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYiX98vc"
      },
      "status": "SUCCESS"
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_sms_code_success.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_sms_code_success.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_sms_code_success.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_sms_code_success.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_sms_code_success.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_sms_code_success.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_sms_code_success.rb
      :language: ruby

If you had sent the wrong code, the ``status`` would instead be ``FAILED``.

.. only:: rest

  For a full list of Challenge statuses, please see :ref:`the Reference chapter <challenge-status-values>`.

.. only:: not rest

  For a full list of Challenge statuses, please see :ref:`the Reference chapter of the REST API Guide <challenge-status-values>`.

.. note::

  You could also pass the Challenge ``href`` and the ``code`` to Stormpath and get back an OAuth 2.0 Access Token. For more information about this see :ref:`generate-oauth-token`.

.. _mfa-challenge-after-google:

Challenging a Google Authenticator Factor
"""""""""""""""""""""""""""""""""""""""""

When you created the Google Authenticator Factor, you also generated a QR Code image for your user to scan into their app. Challenging this factor now only requires you to prompt to enter in the code from their Authenticator app.

Unlike the SMS challenge process, the Google Authenticator challenge process does not require you to create a Challenge resource. Instead, the Challenge is created and verified in one step. For more information about the Challenge resource, see :ref:`the Reference chapter <ref-challenge>`.

Once you have collected the code from the user, send the code generated by your Google Authenticator app:

.. only:: rest

  .. code-block:: http

    POST /v1/factors/4KOeu7ypRQI8Bpk2org7tk/challenges HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "code":"786393"
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_ga_factor_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_ga_factor_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_ga_factor_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_ga_factor_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_ga_factor_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_ga_factor_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_ga_factor_req.rb
      :language: ruby

If the code is correct, Stormpath will now simultaneously create the Challenge resource and set its status to ``SUCCESS``, then return it back to you:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/challenges/EGDIpcgffklwo6HywNzTw",
      "createdAt": "2016-09-22T22:50:59.241Z",
      "modifiedAt": "2016-09-22T22:50:59.241Z",
      "status": "SUCCESS",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYExample"
      },
      "factor": {
          "href": "https://api.stormpath.com/v1/factors/4KOeu7ypRQI8Bpk2org7tk"
      }
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_challenge_ga_factor_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_challenge_ga_factor_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_challenge_ga_factor_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_challenge_ga_factor_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_challenge_ga_factor_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_challenge_ga_factor_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_challenge_ga_factor_resp.rb
      :language: ruby

.. _mfa-challenge-during:

Challenging During Factor Creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

  For this example, we will use an SMS challenge. Challenging a Google Authenticator Factor during creation is not feasible because the user has to add the factor to their application before they can get a code.

.. only:: rest

  To send a challenge at the same time as you create the phone Factor, you need to POST to the Account's ``/factors`` endpoint with the additional ``?challenge=true`` parameter included. Then you must also add the ``challenge`` into the body of the JSON.

  .. code-block:: http

    POST /v1/accounts/5IvkjoqcYNe3TYMExample/factors?challenge=true HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "type":"sms",
      "phone": {
        "number": "2675555555"
      },
      "challenge": {
        "message": "Welcome to the Example! Your authorization code is ${code}"
      }
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_create_and_challenge_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_create_and_challenge_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_create_and_challenge_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_create_and_challenge_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_create_and_challenge_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_create_and_challenge_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_create_and_challenge_req.rb
      :language: ruby

You are telling Stormpath to send an SMS to the phone number ``267-555-5555`` along with the message ``"Welcome to the Example! Your authorization code is ${code}"``. The placeholder ``${code}`` will be replaced with a one-time password generated using the HOTP algorithm.

.. note::

  If you wanted Stormpath to send the default message, then you could just not include the ``challenge`` object or its ``message`` at all.

Challenging a Factor After Login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The first step will be getting the user authenticated.

.. only:: rest

  In the case of REST, this means a ``POST`` to your Application resource's ``/loginAttempts`` endpoint. In this case it will be very helpful to also include ``expand=account``.

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4PbdleXaMPLE/loginAttempts?expand=account HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...

    {
      "type": "basic",
      "value": "amFrdWIrbWZhdGVzdExamplebXBhdGguY29tOkNoYW5nZW1lMQ=="
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_auth_account_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_auth_account_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_auth_account_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_auth_account_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_auth_account_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_auth_account_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_auth_account_req.rb
      :language: ruby

If authentication is successful, you will get back the Account:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMExample",
      "username": "factorman",
      "email": "jakub+factorman@stormpath.com",
      "givenName": "Joe",
      "middleName": null,
      "surname": "Factorman",
      "fullName": "Joe Factorman",
      "status": "ENABLED",
      "...": "...",
      "factors": {
          "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMExample/factors"
      }
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_auth_account_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_auth_account_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_auth_account_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_auth_account_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_auth_account_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_auth_account_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_auth_account_resp.rb
      :language: ruby

Next, you will need to retrieve the Account's ``factors`` collection:

.. only:: rest

  .. code-block:: http

    GET /v1/accounts/5IvkjoqcYNe3TYMExample/factors HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_get_account_factors2_req.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_get_account_factors2_req.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_get_account_factors2_req.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_get_account_factors2_req.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_get_account_factors2_req.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_get_account_factors2_req.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_get_account_factors2_req.rb
      :language: ruby

Which will return:

.. only:: rest

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYiX98vc/factors",
      "offset": 0,
      "limit": 25,
      "size": 1,
      "items": [
        {
          "href": "https://api.stormpath.com/v1/factors/3WPF5Djir0Wg5FtPoJCPbo",
          "type": "SMS",
          "createdAt": "2016-09-22T22:11:03.768Z",
          "modifiedAt": "2016-09-22T22:42:39.822Z",
          "status": "ENABLED",
          "verificationStatus": "VERIFIED",
          "account": {
              "href": "https://api.stormpath.com/v1/accounts/5IvkjoqcYNe3TYMYiX98vc"
          },
          "challenges": {
              "href": "https://api.stormpath.com/v1/factors/3WPF5Djir0Wg5FtPoJCPbo/challenges"
          },
          "phone": {
              "href": "https://api.stormpath.com/v1/phones/3WManCalQOcizNsHjeeiHk"
          },
          "mostRecentChallenge": {
              "href": "https://api.stormpath.com/v1/challenges/6kgEJR5Cr3pNh131i7b6wm"
          }
        }
      ]
    }

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

    .. only:: csharp

      .. literalinclude:: code/csharp/authentication/mfa_get_account_factors2_resp.cs
          :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/authentication/mfa_get_account_factors2_resp.vb
          :language: vbnet

.. only:: java

  .. todo::

    (java.todo)

    .. literalinclude:: code/java/authentication/mfa_get_account_factors2_resp.java
        :language: java

.. only:: nodejs

  .. todo::

    (node.todo)

    .. literalinclude:: code/nodejs/authentication/mfa_get_account_factors2_resp.js
        :language: javascript

.. only:: php

  .. todo::

    (php.todo)

    .. literalinclude:: code/php/authentication/mfa_get_account_factors2_resp.php
      :language: php

.. only:: python

  .. todo::

    (python.todo)

    .. literalinclude:: code/python/authentication/mfa_get_account_factors2_resp.py
        :language: python

.. only:: ruby

  .. todo::

    (ruby.todo)

    .. literalinclude:: code/ruby/authentication/mfa_get_account_factors2_resp.rb
      :language: ruby

.. only:: rest

  You would then send a POST to the ``challenges`` collection which would generate a new Challenge and send an SMS message to the number specified in the Factor's Phone resource.

.. only:: csharp or vbnet

  .. todo::

    (dotnet.todo)

.. only:: java

  .. todo::

    (java.todo)

.. only:: nodejs

  .. todo::

    (node.todo)

.. only:: php

  .. todo::

    (php.todo)

.. only:: python

  .. todo::

    (python.todo)

.. only:: ruby

  .. todo::

    (ruby.todo)

.. only:: not rest

  4.7. How API Key Authentication Works in Stormpath
  =====================================================

  In this section, we discuss how to set up Stormpath to manage and authenticate API Keys and Tokens for developers that are using your API services. Stormpath provides not only the user management piece around API Keys, but also allows you to associate permissions and custom data with the Accounts for advanced use-cases.

  Stormpath offers a complete solution that securely and easily helps you manage developer accounts, create and manage API Keys, and generate OAuth 2.0 bearer tokens to support Access Token authentication.

  4.7.1. How to use API Key and Secret Authentication
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

  .. only:: ruby

    .. literalinclude:: code/ruby/authentication/create_apikey_req.rb
      :language: ruby

  .. only:: csharp or vbnet

    The returned ``IApiKey`` object contains properties for the ID and secret, as well as the status of the API Key pair.

  .. only:: java

    The returned ``ApiKey`` object contains properties for the ID and secret, as well as the status of the API Key pair.

  .. only:: nodejs

    You will then get back the newly-created API Key:

    .. literalinclude:: code/nodejs/authentication/create_apikey_resp.js
        :language: javascript

  .. only:: php

    You will then get back the newly-created API Key:

    .. literalinclude:: code/php/authentication/create_apikey_resp.php
      :language: php

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

  .. only:: ruby

    .. literalinclude:: code/ruby/authentication/delete_apikey.rb
      :language: ruby

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

  .. only:: ruby

    .. literalinclude:: code/ruby/authentication/disable_apikey.rb
      :language: ruby

  .. _api-basic-auth:

  4.7.2. How to Authenticate Using HTTP Basic
  -----------------------------------------------------------------

  Now that your developer has an API Key, there are two methods that they can use to authenticate their API calls: HTTP Basic and HTTP Bearer. In this section we'll cover Basic Authentication, then we'll discuss :ref:`how to exchange an API Key for an OAuth token <api-key-for-token>`, and finally how to authenticate an API call with that token using :ref:`HTTP Bearer Authentication <api-bearer-auth>`.

  The simplest way to authenticate a call is to Base64 encode the API Key and Secret and then pass this encoded string in the authorization header:

  .. code-block:: http

    GET /v1/groups/1ORBsz2iCNpV8yJKqFWhDc/accountMemberships HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...

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

  .. only:: ruby

    .. warning::

      This feature is not yet available in the Ruby SDK. For updates, you can follow `ticket #166 <https://github.com/stormpath/stormpath-sdk-ruby/issues/166>`_ on Github.

    .. literalinclude:: code/ruby/authentication/authenticate_basic_req.rb
      :language: ruby

  The returned Authentication Result will provide properties and methods for retrieving the authenticated Account and ApiKey for a successful authentication request. Your application will use this information to provide context associated with who is calling your API. This becomes important when your API has generic endpoints that return different information based on the caller.

  The SDK provides a caching layer to ensure fast response times in your API by reducing network traffic to the Stormpath service. The caching layer will cache the API Key securely with the Secret encrypted. Stormpath will use the cached entry for API Key and Secret authentication when possible.

  .. _api-key-for-token:

  4.7.3. How to Exchange an API Key for an Access Token
  -----------------------------------------------------------------

  Instead of passing base64 encoded API keys over the wire, you can exchange an API Key Id and Secret for an Access Token, and use the Access Token as a Bearer Token to authentication for a protected API or resource. Exchanging an API Key for a token is essentially a two step process:

  1. The client authenticates with Stormpath and requests an access token from the token endpoint
  2. Stormpath authenticates the client and issues an access token

  For more details, see earlier in this chapter: :ref:`generate-oauth-token`.

  .. _api-bearer-auth:

  4.7.4. How to Authenticate Using HTTP Bearer Access Tokens
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

  .. only:: ruby

    .. warning::

      This feature is not yet available in the Ruby SDK. For updates, you can follow `ticket #166 <https://github.com/stormpath/stormpath-sdk-ruby/issues/166>`_ on Github.

    .. literalinclude:: code/ruby/authentication/authenticate_bearer_req.rb
      :language: ruby

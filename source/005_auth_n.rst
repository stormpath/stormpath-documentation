*****************************************
5. Authenticating Accounts with Stormpath
*****************************************

a. How Password Authentication works in Stormpath
=================================================

Authenticating An Account
-------------------------

After an Account has been created, you can authenticate it given an input of a ``username`` or ``email`` and a ``password`` from the end-user. When authentication occurs, you are authenticating a user within a specific Application against the Application’s Directories and Groups (more on these [below]). That being said, the Application resource is the starting point for authentication attempts.

Once you have the Application resource you may attempt authentication by sending a POST request to the Application’s ``/loginAttempts`` endpoint and providing a base64 encoded ``username``/``email`` and ``password`` pair that is separated with a colon (for example ``testuser``:``testpassword``). Stormpath requires that the ``username``/``email`` and ``password`` are base64 encoded so these values are not passed as clear text.

**loginAttempts Properties**

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Property
	  - Type
	  - Valid Value(s)
	  - Description
	    
	* - ``type``
	  - String (Enum)
	  - N/A
	  - The type of the login attempt. The only currently supported type is ``basic``. Additional types will likely be supported in the future.

	* - ``value``
	  - String (Base64)
	  - N/A
	  - The Base64 encoded username:plaintextPassword pair.
	    
	* - ``accountStore``
	  - Link
	  - N/A
	  - An optional link to the Application’s Account Store (Directory or Group) that you are certain contains the account attempting to login. Specifying this attribute can speed up logins if you know exactly which of the Application’s assigned Account Stores contains the Account. Stormpath will not have to iterate over the assigned Account Stores to find the Account to authenticate it. This can speed up logins significantly if you have many Account Stores (> 15) assigned to the Application.
	 
So, if we had a user Account "Han Solo" in the "Captains" Directory, and we wanted to log him in, we would first need to take the combination of his ``username`` and ``password`` ("first2shoot:Change+me1") and then Base64 encode them: ``Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ==``.

We would issue the following POST to our Application with ID ``1gk4Dxzi6o4PbdlBVa6tfR``:

``https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/loginAttempts``

With the following body, using the Base64 encoded ``value`` from above::

	{
	    "type": "basic",
	    "value": "Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ=="
	}

Which would return the ``href`` for the "Han Solo" Account::

	{
	  "account": {
	    "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid"
	  }
	}

Now the reason why this succeeds is because there is an existing **Account Store Mapping** between the "Han Solo" Account's "Captains" Directory and our Application. This mapping is what grants this Account the authorization to log in to the Application. 

Account Store Mappings 
----------------------
Both **Directory** and **Group** resources are what are called **Account Stores**, named so because they contain or "store" Accounts. In Stormpath, you control who may log in to an Application by associating (or 'mapping') one or more Account Stores to an Application. All of the user Accounts across all of an Application's assigned Account Stores form the Application's effective "user base": those Accounts that may log in to the Application. If no Account Stores are assigned to an Application, no Accounts will be able to log in to it.

You control which Account Stores are assigned (mapped) to an Application, and the order in which they are consulted during a login attempt, by manipulating an Application's AccountStoreMapping resources. 

An individual Account Store resource may be accessed via its Resource URI:

**accountStoreMapping URI**

``/v1/accountStoreMappings/:accountStoreMappingId``

**accountStoreMapping Attributes**

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Attribute
	  - Type
	  - Valid Value(s)
	  - Description
	 
	* - ``href``
	  - String
	  - N/A
	  - The resource's fully qualified location URI.
	    
	* - listIndex
	  - Integer
	  - 0 <= N < list size
	  - The order (priority) in which the associated Account Store will be consulted by the Application during an authentication attempt. This is a zero-based index; an Account Store with a ``listIndex`` of ``0`` will be consulted first (has the highest priority), followed by the Account Store at ``listIndex`` ``1`` (next highest priority), and so on. Setting a negative value will default the value to 0, placing it first in the list. A ``listIndex`` of larger than the current list size will place the mapping at the end of the list and then default the value to ``(list size - 1)``.
	    
	* - isDefaultAccountStore
	  - String (boolean)
	  - ``true``, ``false``
	  - A ``true`` value indicates that new Accounts created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they will not.
	    
	* - isDefaultGroupStore
	  - String (boolean)
	  - ``true``, ``false``
	  - A ``true`` value indicates that new Groups created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they won't. **This may only be set to true if the Account Store is a Directory. Stormpath does not currently support Groups storing other Groups**.
	
	* - application
	  - Link
	  - N/A
	  - A link to the mapping’s Application. **Required.**

	* - accountStore
	  - Link 
	  - N/A
	  - A link to the mapping's Account Store (either a Group or Directory) containing Accounts that may login to the application. **Required.** 

.. todo::

	The following don't actually appear...
	  
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	    
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.

How Login Attempts Work 
^^^^^^^^^^^^^^^^^^^^^^^

When the "Han Solo" Account tried to log in to the Application, the user submitted a request to the Application’s ``/loginAttempts`` endpoint. Stormpath then consults the Application’s assigned Account Stores (Directories and Groups) in the order that they are assigned to the Application. When a matching Account is discovered in a mapped Account Store, it is used to verify the authentication attempt and all subsequent Account Stores are ignored. In other words, Accounts are matched for Application login based on a "first match wins" policy.

Let’s look at an example to illustrate this behavior. Assume that two Account Stores, a ‘Customers’ Directory and an "Employees" Directory, have been assigned (mapped) to a "Foo" application. "Customers" was assigned first, and "Employees" was assigned next, and this will dictate the order in which they are checked. 

The following flow chart shows what happens when an account attempts to login to the Foo application:

.. figure:: images/auth_n/LoginAttemptFlow.png
	:align: center
	:scale: 100%
	:alt: Login Attempt Flow 

	*The Login Attempt Flow* 

As you can see, Stormpath tries to find the Account in the "Customers" Directory first because it has a higher priority than the "Employees" directory. If not found, the "Employees" Directory is tried next as it has a lower priority.

You can assign multiple Account Stores to an Application, but only one is required to enable login for an Application. Assigning multiple Account Stores to an Application, as well as configuring their priority, allows you precise control over the Account populations that may log in to your various Applications.

b. How to Retrieve Additional Account Data On Authentication 
============================================================

Instead of just receiving an Account's ``href`` after successful authentication, it is possible to receive the full Account resource in the JSON response body. To do this, simply add the **expand=account** parameter to the end of your authentication query:

	``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/loginAttempts?expand=account``

If we had done this with our "Han Solo" Account from above, our JSON response would have looked like this::

	{
	  "account": {
	    "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid",
	    "username": "first2shoot",
	    "email": "han@newrepublic.gov",
	    "givenName": "Han",
	    "middleName": null,
	    "surname": "Solo",
	    "fullName": "Han Solo",
	    "status": "ENABLED",
	    "createdAt": "2015-08-28T16:07:38.347Z",
	    "modifiedAt": "2015-08-28T16:07:38.347Z",
	    "emailVerificationToken": null,
	    
	    [...]

	    "accessTokens": {
	      "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid/accessTokens"
	    },
	    "refreshTokens": {
	      "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid/refreshTokens"
	    }
	  }
	}

At the end of this JSON we see two interesting links that we can now cover: access and refresh tokens. 

c. How Token-Based Authentication Works
=======================================

In this guide, we will discuss how to use Stormpath to use Stormpath to generate and manage OAuth 2.0 Access Token.

Introduction to Token-Based Authentication
------------------------------------------

Since HTTP is considered a stateless protocol, if your application authenticates a user for one HTTP request, a problem arises when the next request is sent and your application doesn't know who the user is. This is why many applications today pass some information to tie the request to a user. Traditionally, this required **Server-based authentication**, where state is stored on the server and only a session identifier is stored on the client.

**Token-based authentication** is a alternate, stateless strategy. With token-based authentication, you secure an application based on a security token that is generated for the user on authentication and then stored on the client-side. Token-based Authentication is all about removing the need to store information on the server while giving extra security to keep the token secure on the client. This help you as a developer build stateless and scalable applications.

Stormpath's approach to token-based authentication has two elements: JSON Web Tokens (JWTs) for authentication, and OAuth 2.0 for authorization. 

Why OAuth 2.0?
^^^^^^^^^^^^^^

OAuth 2.0 is an authorization framework and provides a protocol to how to interact with a service that can delegate authentication or provide authorization. Its primary advantage as a standard is its wide adoption rate across many mobile and web applications today. If you have ever logged-in to a website using Facebook or Google, you have used one of OAuth 2.0 many authorization flows. You can read more about the different OAuth 2.0 authorization flows or grant types in depth on `Stormpath’s blog <https://stormpath.com/blog/what-the-heck-is-oauth/>`_.

Even though OAuth 2.0 has many authorization modes or "grant types", Stormpath currently supports three of them:

**Password Grant Type**: Provides the ability to get an Access Token based on a login and password.
**Refresh Grant Type**: Provides the ability to generate another Access Token based on a special Refresh Token.
**Client Credentials Grant Type**: Provides the ability to exchange an API Key for the Access Token. This is supported through the API Key Management feature.

To understand how to use Token-based Authentication, we need to talk about the different types of tokens that are available.

What Tokens are available for Token-Based Authentication?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Token Based Authentication, there are a two different types of tokens that need to be managed. These are:

- Access Token
- Refresh Token

The **Access Token** is what grants access to a protected resource. The Access Token that Stormpath generates for Accounts on authentication is a **JSON Web Token**, or JWT. The JWT has security built-in to make sure that the Access Token is not tampered with on the client, and is only valid for a specified duration. 

The **Refresh Token** is a special token that is used to generate additional Access Tokens. This allows you to have an short-lived Access Token without having to collect credentials every single time you need a new Access Token.

When using OAuth 2.0, the Access Token and Refresh Token are returned in the same response during the token exchange, this is called an **Access Token Response**.

How To Use Stormpath for Token-Based Authentication
---------------------------------------------------

Stormpath can be used to generate, manage, check, and revoke both Access and Refresh Tokens. Before diving in, let's talk about configuration.

Configuring Token-Based Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath is configurable so you can set the time to live (TTL) for both the Access and Refresh tokens. This is important for many applications because it gives the ability to define how the tokens expire. For example, you could decide that your application requires a user to log in daily, but the access should only live for 10 minutes. Or, you could decide that for your application, users should be able to stay logged-in for two months and the access token expires in an hour.

Each Application resource in Stormpath has an ``oAuthPolicy`` link where the TTLs for a particular Application's tokens are stored inside properties called ``accessTokenTtl`` and ``refreshTokenTtl``::

	{
	    "href": "https://api.stormpath.com/v1/oAuthPolicies/5r0klomitodnOCuvESIP5z",
	    "tokenEndpoint": { 
	            "href": "https://api.stormpath.com/v1/applications/5r0klomitodnOCuvESIP5z/oauth/token"
	    },
	    "accessTokenTtl": "PT1H",
	    "refreshTokenTtl": "P60D"
	}

The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_. By **default**, the TTL ``duration`` for the Access Token is 1 hour and the Refresh Token's is 60 days, while the **maximum** ``duration`` is 180 days.

If we wanted to change the TTL for the Access Token to 30 minutes and the Refresh Token to 7 days, we could simply make a POST request to the ``/oAuthPolicies/:applicationId`` endpoint with the following payload::

	{
        "accessTokenTtl": "PT30M",
        "refreshTokenTtl": "P7D"
    }

And we would get the following response::

	{
	    "href": "https://api.stormpath.com/v1/applications/5r0klomitodnOCuvESIP5z/oAuthPolicy",
	    "tokenEndpoint": { 
	            "href": "https://api.stormpath.com/v1/applications/5r0klomitodnOCuvESIP5z/oauth/token"
	    },
	    "accessTokenTtl": "PT30M",
	    "refreshTokenTtl": "P7D"
	}

.. todo::

	update with real responses

.. note::

	Refresh tokens are optional, if you would like to disable the refresh token from being generated, set a ``duration`` value of 0 (e.g. PT0M).

Generating An OAuth 2.0 Access Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Validating Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

Refreshing Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

Revoking Access and Refresh Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


d. How Social Authentication Works
==================================

i. Google
---------

Lorem ipsum.

ii. Facebook
------------

Lorem ipsum.

iii. Github
-----------

Lorem ipsum.

iv. LinkedIn
------------

Lorem ipsum.

e. How API Authentication Works
===============================

Lorem ipsum.

i. How to Use API Keys and Secret Authentication
------------------------------------------------

Lorem ipsum.

ii. How to Authenticate Using HTTP Basic
----------------------------------------

Lorem ipsum.

iii. How to Authenticate Using Bearer Tokens
--------------------------------------------

Lorem ipsum.

iv. How to use Tokens With API Authentication
---------------------------------------------

Lorem ipsum.
*****************************************
5. Authenticating Accounts with Stormpath
*****************************************




a. How Password Authentication Works in Stormpath
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
	  - Number
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
	  
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	    
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.

A GET to ``https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp`` would return the following::

	{
	  "href": "https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp",
	  "listIndex": 1,
	  "isDefaultAccountStore": true,
	  "isDefaultGroupStore": true,
	  "application": {
	    "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR"
	  },
	  "accountStore": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
	  }
	}

To create a new Mapping, simply send an HTTP POST to ``/v1/accountStoreMappings`` with the Application and Account Store (i.e. Group/Directory) information::

	curl -X POST -u $API_KEY_ID:$API_KEY_SECRET \
     -H "Content-Type: application/json;charset=UTF-8" \
     -d '{
           "application": {
             "href": "YOUR_APPLICATION_HREF"
           },
           "accountStore": {
             "href": "YOUR_DIRECTORY_HREF"
           }
         }' \
     'https://api.stormpath.com/v1/accountStoreMappings'

How Login Attempts Work 
^^^^^^^^^^^^^^^^^^^^^^^

When the "Han Solo" Account tried to log in to the Application, the user submitted a request to the Application’s ``/loginAttempts`` endpoint. Stormpath then consults the Application’s assigned Account Stores (Directories and Groups) in the order that they are assigned to the Application. When a matching Account is discovered in a mapped Account Store, it is used to verify the authentication attempt and all subsequent Account Stores are ignored. In other words, Accounts are matched for Application login based on a "first match wins" policy.

Let's look at an example to illustrate this behavior. Assume that two Account Stores, a "Customers" Directory and an "Employees" Directory, have been assigned (mapped) to a "Foo" application. "Customers" was assigned first, and "Employees" was assigned next, and this will dictate the order in which they are checked. 

The following flow chart shows what happens when an account attempts to login to the Foo application:

.. figure:: images/auth_n/LoginAttemptFlow.png
	:align: center
	:scale: 100%
	:alt: Login Attempt Flow 

	*The Login Attempt Flow* 

As you can see, Stormpath tries to find the Account in the "Customers" Directory first because it has a higher priority than the "Employees" directory. If not found, the "Employees" Directory is tried next as it has a lower priority.

You can assign multiple Account Stores to an Application, but only one is required to enable login for an Application. Assigning multiple Account Stores to an Application, as well as configuring their priority, allows you precise control over the Account populations that may log in to your various Applications.

How to Retrieve Additional Account Data on Authentication 
------------------------------------------------------------

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

At the end of this JSON we see two interesting links that we can now cover: Access and Refresh tokens. 

b. How Token-Based Authentication Works
=======================================

In this section, we will discuss how to use Stormpath to use Stormpath to generate and manage OAuth 2.0 Access Token.

Introduction to Token-Based Authentication
------------------------------------------

Since HTTP is considered a stateless protocol, if your application authenticates a user for one HTTP request, a problem arises when the next request is sent and your application doesn't know who the user is. This is why many applications today pass some information to tie the request to a user. Traditionally, this required **Server-based authentication**, where state is stored on the server and only a session identifier is stored on the client.

**Token-based authentication** is a alternate, stateless strategy. With token-based authentication, you secure an application based on a security token that is generated for the user on authentication and then stored on the client-side. Token-based Authentication is all about removing the need to store information on the server while giving extra security to keep the token secure on the client. This help you as a developer build stateless and scalable applications.

Stormpath's approach to token-based authentication has two elements: JSON Web Tokens (JWTs) for authentication, and OAuth 2.0 for authorization. 

Why OAuth 2.0?
^^^^^^^^^^^^^^

OAuth 2.0 is an authorization framework and provides a protocol to interact with a service that can delegate authentication or provide authorization. Its primary advantage as a standard is its wide adoption rate across many mobile and web applications today. If you have ever logged-in to a website using Facebook or Google, you have used one of OAuth 2.0's many authorization flows. You can read more about the different OAuth 2.0 authorization flows or grant types in depth on `Stormpath’s blog <https://stormpath.com/blog/what-the-heck-is-oauth/>`_.

Even though OAuth 2.0 has many authorization modes or "grant types", Stormpath currently supports three of them:

**Password Grant Type**: Provides the ability to get an Access Token based on a login and password.
**Refresh Grant Type**: Provides the ability to generate another Access Token based on a special Refresh Token.
**Client Credentials Grant Type**: Provides the ability to exchange an API Key for the Access Token. This is supported through the API Key Management feature.

To understand how to use Token-based Authentication, we need to talk about the different types of tokens that are available.

What Tokens Are Available for Token-Based Authentication?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Token Based Authentication, there are a two different types of tokens that need to be managed. These are:

- Access Token
- Refresh Token

The **Access Token** is what grants access to a protected resource. The Access Token that Stormpath generates for Accounts on authentication is a **JSON Web Token**, or JWT. The JWT has security built-in to make sure that the Access Token is not tampered with on the client, and is only valid for a specified duration. 

The **Refresh Token** is a special token that is used to generate additional Access Tokens. This allows you to have an short-lived Access Token without having to collect credentials every single time you need a new Access Token.

When using OAuth 2.0, the Access Token and Refresh Token are returned in the same response during the token exchange, this is called an **Access Token Response**.

How to Use Stormpath for Token-Based Authentication
---------------------------------------------------

Stormpath can be used to generate, manage, check, and revoke both Access and Refresh Tokens. Before diving in, let's talk about configuration.

Configuring Token-Based Authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath is configurable so you can set the time to live (TTL) for both the Access and Refresh tokens. This is important for many applications because it gives the ability to define how the tokens expire. For example, you could decide that your application requires a user to log in daily, but the access should only live for 10 minutes. Or, you could decide that for your application, users should be able to stay logged-in for two months and the access token expires in an hour.

Each Application resource in Stormpath has an ``oAuthPolicy/:applicationId`` link where the TTLs for a particular Application's tokens are stored inside properties called ``accessTokenTtl`` and ``refreshTokenTtl``::

	{
	  "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdlBVa6tfR",
	  "accessTokenTtl": "PT1H",
	  "refreshTokenTtl": "P60D",
	  "createdAt": "2015-08-18T20:46:36.063Z",
	  "modifiedAt": "2015-08-18T20:46:36.063Z",
	  "tokenEndpoint": {
	    "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/oauth/token"
	  },
	  "application": {
	    "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR"
	  },
	  "tenant": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
	  }
	}

The values for both properties are stored as `ISO 8601 Durations <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_. By **default**, the TTL ``duration`` for the Access Token is 1 hour and the Refresh Token's is 60 days, while the **maximum** ``duration`` is 180 days.

If we wanted to change the TTL for the Access Token to 30 minutes and the Refresh Token to 7 days, we could simply make a POST request to the ``/oAuthPolicies/:applicationId`` endpoint with the following payload::

	{
        "accessTokenTtl": "PT30M",
        "refreshTokenTtl": "P7D"
    }

And we would get the following response::

	{
	  "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdlBVa6tfR",
	  "accessTokenTtl": "PT30M",
	  "refreshTokenTtl": "P7D",
	  [...]
	}

.. note::

	Refresh Tokens are optional. If you would like to disable the Refresh Token from being generated, set a ``duration`` value of 0 (e.g. PT0M).

Generating an OAuth 2.0 Access Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath can generate Access Tokens using the above-mentioned OAuth 2.0 **Password Grant** flow. Stormpath exposes an endpoint for each Application resource to support the OAuth 2.0 protocol::

	https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token

This endpoint is used to generate an OAuth token for any valid Account associated with the specified Application. It uses the same validation as the ``/loginAttempt`` endpoint, as described above in `How Login Attempts Work`_.

Your application will act as a proxy to the Stormpath API. For example:

- The user inputs their credentials (e.g. ``username`` and ``password``) into a form and submits them.
- Your application in turn takes the credentials and formulates the OAuth 2.0 Access Token request to Stormpath.
- When Stormpath returns with the Access Token Response, you can then return the Access Token and/or the Refresh Token to the client.

So you would send a POST to the following URL::

	https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token

With the following header, in lieu of the usual ``Content-Type: application/json;charset=UTF-8``::

	Content-Type: application/x-www-form-urlencoded

And the following body::

	grant_type=password&username=tom@stormpath.com&password=Secret1

This would result in this response::

	{
	  "access_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhJMGpCWERybW12UHFBRmYyWHNWIiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTIwNTk2LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.xlCXL7UUVnMoBKj0p0bXM_cnraWo5Io-TvUt2WBOl3k",
	  "refresh_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2IiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxNzIzNTk2fQ.xUjcxTZhWx74aa6adnUXjuvUgqjC8TvvrB7cBEmNF_g",
	  "token_type": "Bearer",
	  "expires_in": 1800,
	  "stormpath_access_token_href": "https://api.stormpath.com/v1/accessTokens/1vHI0jBXDrmmvPqAFf2XsV"
	}

This is an **OAuth 2.0 Access Token Response** and includes the following:

.. list-table:: 
	:widths: 15 10 60
	:header-rows: 1

	* - Property
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

.. note::

	Just like with logging-in a user, it is possible to generate a token against a particular Application's Account Store resource. To do so, specify the Account Store's ``href`` as a parameter in the body::

		grant_type=password&username=tom@stormpath.com&password=Secret1&accountStore=https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp

Validating Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

Once an ``access_token`` has been generated, we have taken care of the Authentication part of our workflow. Now, the OAuth token can be used to authorize individual requests that the user makes. To do this, the client will need to pass it to your application.

For example, if you have a route ``https://yourapplication.com/secure-resource``, the client would request authorization to access the resource by passing the access token::

	HTTP/1.1
	GET /secure-resource
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

Using Stormpath to Validate Tokens
""""""""""""""""""""""""""""""""""
To see how to validate tokens with the Stormpath REST API, let's go back to the example where a user has already generated an access token. 

To recap, we have done the following: 

1. We have sent a POST to ``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token`` with a body that included information about the OAuth Grant Type we wanted, as well as our user's username and password.
2. We received back an **Access Token Response**, which contained - among other things - an **Access Token** in JWT format.

The user now attempts to access a secured resource by passing the ``access_token`` JWT value from the Access Token Response in the ``Authorization`` header::

	HTTP/1.1
	GET /secure-resource
	Host: https://yourapplication.com
	Authorization: Bearer eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhJMGpCWERybW12UHFBRmYyWHNWIiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTIwNTk2LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.xlCXL7UUVnMoBKj0p0bXM_cnraWo5Io-TvUt2WBOl3k

The ``Authorization`` header contains the Access Token. To validate this Token with Stormpath, you can issue an HTTP GET to your Stormpath Application’s ``/authTokens/`` endpoint with the JWT token::

	https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/authTokens/eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhJMGpCWERybW12UHFBRmYyWHNWIiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTIwNTk2LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.xlCXL7UUVnMoBKj0p0bXM_cnraWo5Io-TvUt2WBOl3k

If the access token can be validated, Stormpath will return a 302 to the Access Token resource::

	HTTP/1.1 302 Location Found
	Location: https://api.stormpath.com/v1/accessTokens/6zVrviSEIf26ggXdJG097f

With the confirmation that token is valid, you can now allow the user access to the secured resource that they requested.

Validating the Token Locally
""""""""""""""""""""""""""""

Local validation would also begin at the point of the request to a secure resource:: 

	HTTP/1.1
	GET /secure-resource
	Host: https://yourapplication.com
	Authorization: Bearer eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhJMGpCWERybW12UHFBRmYyWHNWIiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTIwNTk2LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.xlCXL7UUVnMoBKj0p0bXM_cnraWo5Io-TvUt2WBOl3k

The token specified in the Authorization header has been digitally signed with the Stormpath API Key Secret that was used to generate the token. This means that you can use a JWT library for your specific language to validate the token locally if necessary. For more information, please ...

.. todo::

	So for the REST Guide, you would direct them to a specific integration. For any of the integrations that will use this structure, you would put your own, relevant steps here. 

Refreshing Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^

In the event that the Access Token expires, the user can generate a new one using the Refresh Token without re-inputting their credentials. To use this Refresh Token, simply make an HTTP POST to your Applications ``/oauth/token`` endpoint with it and you will get a new token back.

So a POST to ``https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/oauth/token`` along with this header::

	Content-Type: application/x-www-form-urlencoded

And this in the body::

	grant_type=refresh_token&refresh_token=eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2IiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxNzIzNTk2fQ.xUjcxTZhWx74aa6adnUXjuvUgqjC8TvvrB7cBEmNF_g

Will receive this response::

	{
	  "access_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2TnJXSXM1aWttSVBWSkNuMnA0bnJyIiwiaWF0IjoxNDQxMTMzNjQ1LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxMTM1NDQ1LCJydGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2In0.SbSmuPz0-v4J2BO9-lpyz_2_T62mSB1ql_0IMrftpgg",
	  "refresh_token": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIxdkhEZ2Z0THJ4Slp3dFExc2hFaTl2IiwiaWF0IjoxNDQxMTE4Nzk2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQxNzIzNTk2fQ.xUjcxTZhWx74aa6adnUXjuvUgqjC8TvvrB7cBEmNF_g",
	  "token_type": "Bearer",
	  "expires_in": 1800,
	  "stormpath_access_token_href": "https://api.stormpath.com/v1/accessTokens/6NrWIs5ikmIPVJCn2p4nrr"
	}

Note that this response contains the same Refresh Token as was in the request. This is because when Stormpath generates a new Access Token for a Refresh Token it does not generate a new Refresh token, nor does it modify its expiration time. This means that once the Refresh Token expires, the user must authenticate again to get a new Access and Refresh Tokens.


Revoking Access and Refresh Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are cases where you might want to revoke the Access and Refresh Tokens that you have generated for a user. For example:

- The user has explicitly logged out, and your application needs to revoke their access, requiring re-authentication.
- The application, device, and/or client has been compromised and you need to revoke tokens for an Account.

To revoke the tokens, simply delete the Account's ``/accessTokens/:accessTokenId`` resource. 

To retrieve an Account's Access and Refresh tokens, make an HTTP GET calls for the Account information, then you will find the tokens inside the ``/accessTokens`` and ``/refreshTokens`` collections::

	{
	  "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
	  "username": "jlpicard",
	  
	  [...]
	  
	  "accessTokens": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/accessTokens"
	  },
	  "refreshTokens": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/refreshTokens"
	  }
	}

If you then perform a GET on the ``accessTokens`` link, you will get back the individual tokens::

	{
	  "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/accessTokens",
	  "offset": 0,
	  "limit": 25,
	  "size": 1,
	  "items": [
	    {
	      "href": "https://api.stormpath.com/v1/accessTokens/6NrWIs5ikmIPVJCn2p4nrr",
	      [...]
	    }
	  ]
	}

To revoke the token, simply issue an HTTP Delete::

	DELETE https://api.stormpath.com/v1/accessTokens/6NrWIs5ikmIPVJCn2p4nrr

You will get back a ``204 No Content`` response back from Stormpath when the call succeeds. 

.. _social-authn:

c. How Social Authentication Works
==================================

i. Google
---------

Integrating Stormpath with Google requires the following steps:

- Create a Social Directory for Google
- Map the Directory as an Account Store to an Application
- Access an Account with Google Tokens

Step 1: Create a Social Directory for Google
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
A Directory is a top-level storage container of Accounts in Stormpath. A Directory also manages security policies (like password strength) for the Accounts it contains. Google Directories are a special type of Directory that holds Accounts for Google.

.. note::

	Before you can create a Directory for Google, it is important that you gather information regarding your application from Google. This information includes Client ID, Client Secret, and the Redirect URL, and can be acquired from the `Google Developer Console <https://console.developers.google.com/>`_.

Creating this Directory for Google requires that you provide information from Google as a Provider resource. This can be accomplished by sending an HTTP POST to the ``/directories`` endpoint with the following payload::

	{
        "name" : "my-google-directory",
        "description" : "A Google directory",
        "provider": {
          "providerId": "google",
          "clientId":"YOUR_GOOGLE_CLIENT_ID",
          "clientSecret":"YOUR_GOOGLE_CLIENT_SECRET",
          "redirectUri":"YOUR_GOOGLE_REDIRECT_URI"
    } 

.. note::

	If you are using `Google+ Sign-In for server-side apps <https://developers.google.com/+/web/signin/server-side-flow>`_, Google recommends that you leave the " Authorized redirect URI" field blank in the Google Developer Console. In Stormpath, when creating the Google Directory, you must set the redirect URI to ``postmessage``.

Step 2: Map the Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Once a Google Directory has been created, it must be mapped to an Application as an Account Store. When an Account Store (in this case a Directory) is mapped to an Application, the Accounts in the AccountStore are considered the Application’s users and they can log in to it.

Creating an Account Store Mapping can be done through the REST API, as described in the `Account Store Mappings`_ section above.

Step 3: Access an Account with Google Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**GOOGLE NOW RECOMMENDS THAT YOU DON'T USE REDIRECT, BUT INSTEAD USE JS POP-UPS** 

To access or create an Account in your new Google Directory, you must gather a Google Authorization Code or Access Token on behalf of the user. This requires leveraging `Google’s OAuth 2.0 protocol <https://developers.google.com/identity/protocols/OpenIDConnect>`_ and the user’s consent for your application’s permissions.

Generally, this will include embedding a link in your site that will send an authentication request to Google. Once the user has authenticated, Google will redirect the response to your application, including the **Authorization Code**. This is documented in detail `here <https://developers.google.com/identity/protocols/OpenIDConnect#authenticatingtheuser>`_.

Once the Authorization Code is gathered, you can ask the Application to get or create the Account by passing Provider Data. The ``providerData`` object specifies the type of provider and the authorization code::

	"providerId": "google",
	"code": "%ACCESS_CODE_FROM_GOOGLE%"

.. note::

	It is required that your Google application requests the ``email`` scope from Google. If the authorization code or access token does not grant ``email`` scope, you will not be able to get an Account with an access token.

So upon sending an HTTP POST to ``https://api.stormpath.com/v1/applications/YOUR_APP_ID/accounts`` with the following payload::

	{
        "providerData": {
          "providerId": "google",
          "code": "YOUR_GOOGLE_AUTH_CODE"
        }
    }

Stormpath will use the ``code`` provided to retrieve information about your Google Account, then return a Stormpath Account. The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200). 

ii. Facebook
------------

The instructions for integrating Stormpath with Facebook are for the most part the same as integrating with Google:

- Create a Social Directory for Facebook
- Map the Directory as an Account Store to an Application
- Access an Account with Facebook Tokens

The primary differences here are:

- Facebook uses a "User Access Token" instead of Google's Access Code.
- How you retrieve this token from Facebook

Step 1: Create a Social Directory for Facebook
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
Facebook Directories are a special type of Directory that holds Accounts for Facebook.

.. note::

	Before you can create a Directory for Facebook, it is important that you gather information regarding your application from Facebook. This information includes Client ID / Client Secret and can be acquired from `The Facebook Developer Console <https://developers.facebook.com/>`_.

Creating this Directory requires that you provide information from Facebook as a Provider resource. This can be accomplished by sending an HTTP POST to the ``/directories`` endpoint with the following payload::

	{
        "name" : "my-facebook-directory",
        "description" : "A Facebook directory",
        "provider": {
          "providerId": "facebook",
          "clientId":"YOUR_FACEBOOK_CLIENT_ID",
          "clientSecret":"YOUR_FACEBOOK_CLIENT_SECRET"
        }
    }

Step 2: Map the Directory as an Account Store for Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Once a Facebook Directory has been created, it must be mapped to an Application as an Account Store. When an Account Store (in this case a Directory) is mapped to an Application, the Accounts in the AccountStore are considered the Application’s users and they can log in to it.

Creating an Account Store Mapping can be done through the REST API, as described in the `Account Store Mappings`_ section above.

Step 3: Access an Account with Facebook Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To access or create an Account in your new Facebook Directory, you need to gather a User Access Token from Facebook before submitting it to Stormpath. This is possible either by using a `Facebook SDK Library <https://developers.facebook.com/docs/facebook-login/access-tokens/#usertokens>`_, or `Facebook’s Graph Explorer <https://developers.facebook.com/tools/explorer>`_ for testing.

Once the User Access Token is gathered, you can ask the Application to get or create the Account by passing Provider Data. The ``providerData`` object specifies the type of provider and the Access Token::

	"providerId": "facebook",
	"accessToken": "USER_ACCESS_TOKEN_FROM_FACEBOOK"

.. note::

	It is required that your Facebook application requests the ``email`` scope from Facebook. If the access token does not grant ``email`` scope, you will not be able to get an Account with an access token.

So upon sending an HTTP POST to ``https://api.stormpath.com/v1/applications/YOUR_APP_ID/accounts`` with the following payload::

	{
	    "providerData": {
	      "providerId": "facebook",
	      "accessToken": "USER_ACCESS_TOKEN_FROM_FACEBOOK"
	    }
	  }

Stormpath will use the ``accessToken`` provided to retrieve information about your Facebook Account, then return a Stormpath Account. The HTTP Status code will tell you if the Account was created (HTTP 201) or if it already existed in Stormpath (HTTP 200). 


iii. Github
-----------

Lorem ipsum.

iv. LinkedIn
------------

Lorem ipsum.

d. How API Key Authentication Works
===================================

In this section, we will explain how to set up and use Stormpath for Developer API Key Management and Authentication.

We will use the following words with very specific meanings. They will be capitalized to indicate that they have a specific meaning in the Stormpath context.

**Admin** or **Administrator** – Someone on your team who has access to the Stormpath API and/or Administration Console. In turn, they will typically have the ability to create and manage user Accounts, Applications, API keys, etc.

**Developer** – A consumer of your API. They are the people that will be using the API keys that you are generating and distributing.

**OAuth 2.0 Access Token** – An Access Token is a string representation of authorization issued to a client. This access token is issued by an authority and grants access to a protected or gated resource. These tokens are opaque to the client.

**Bearer Token** – A Bearer token is a specific type of OAuth 2.0 Access Token. A Bearer token is used with the Bearer Authorization Scheme in HTTP. A client wanting to access a protected service is required to locate a trusted entity to generate a Bearer Token. In this document, a Bearer Token represents an Access Token.

**API Keys** – Represents an API Key Id and Secret pair which is generated for a developer integrating with your API.

i. How to Use API Keys and Secret Authentication
------------------------------------------------

In order to implement API Authentication with Stormpath you'll need to do the following:

- Create a User Account for each of your Developers
- Create / Manage API Keys for the Developers' Accounts
- Use the Stormpath SDK to Authenticate and Generate Tokens for your API
  
Create an Account in Stormpath for Your Developers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First, you will need Accounts in Stormpath to represent your Developers. Accounts can not only represent Developers, but also can be used to represent services, daemons, processes, or any "entity" that needs to log in to a Stormpath-secured API.

By assigning API keys directly to a user Account, as opposed to a general organization-wide set of keys, you get full traceability and accountability back to a specific individual in the event of an accident or breach on their end.

Stormpath Accounts can be used to keep a variety of Developer information including name, email address, password, and any other custom data you would like to store.

You will mostly likely create a Stormpath Account when a Developer signs up for access to your API. For more information on creating Accounts please see :ref:`account-creation`.


Create and Manage API Keys for your Developers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you create an Account for a Developer, you will need to generate one-or-more API Keys to be used when accessing your API. Each Account will have an ``apiKeys`` property that contains a collection of API Keys. There will also be a list of API keys on a Account’s profile in the `Stormpath Admin Console <http://docs.stormpath.com/console/product-guide/#edit-an-account>`_. Key creation and management can be done either via the REST API or through the Admin Console.

Creating API Keys For An Account
""""""""""""""""""""""""""""""""

Authenticate and Generate Tokens for your API Keys
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Lorem ipsum

ii. How to Authenticate Using HTTP Basic
----------------------------------------

Lorem ipsum.

iii. How to Authenticate Using Bearer Tokens
--------------------------------------------

Lorem ipsum.

iv. How to use Tokens With API Authentication
---------------------------------------------

Lorem ipsum.
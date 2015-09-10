*************
3. Quickstart
*************

This quickstart will get you up and running with Stormpath in about 7
minutes and give you a good initial feel for the Stormpath REST API.

This quickstart assumes that you have already completed the steps in the :doc:`First Time Set-Up </002_setup>` chapter, and now have:

- `cURL <http://curl.haxx.se/download.html>`_ installed on your system
  
- A Stormpath Account
  
- A Stormpath API Key generated and downloaded onto your system
  
- A Stormpath Tenant resource. The following associated resources were also automatically created:

  - An Application resource called "My Application"
   
  - Two Directory resources: "My Application Directory" and "Stormpath Administrators"
  
    - "My Application Directory" is set as the default Directory for any new Accounts.

During this quickstart, you will do the following:

-  Retrieve your Application.
-  Create a User Account.
-  Authenticate a User Account.

Stormpath also can do a lot more (like Groups, Multitenancy, Social Integration, and Security workflows) which you can learn more about later in this guide.

Let's get started!

--------------

Retrieve your Application
=========================

Before you can create user Accounts you'll need to retrieve your Stormpath Application. An Application in Stormpath represents the project that you are working on. So if you're building a web app named "Lightsabers Galore", you'd want to name your Stormpath Application "Lightsabers Galore" as well. By default, your Stormpath account will have an Application already created for you to use. We will use this Application, named "My Application", for the quickstart.

We will also use the mock API Key from the :doc:`First Time Set-Up </002_setup>` chapter throughout this Quickstart::

  apiKey.id = 144JVZINOF5EBNCMG9EXAMPLE
  apiKey.secret = lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE

Before you can get your Application, you must get the location of your Tenant from Stormpath, like so::

  curl -i --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
    'https://api.stormpath.com/v1/tenants/current'

-  ``$YOUR_API_KEY_ID`` is the ``apiKey.id`` value in
   ``apiKey.properties`` and
-  ``$YOUR_API_KEY_SECRET`` is the ``apiKey.secret`` value in
   ``apiKey.properties``

So this command::

    curl -i --user 144JVZINOF5EBNCMG9EXAMPLE:lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE \
      'https://api.stormpath.com/v1/tenants/current'

would return this header::

    HTTP/1.1 302 Found
    Location: https://api.stormpath.com/v1/tenants/7g91YMBXFbu0KAFK
    Content-Length: 0
    Connection: keep-alive

Make note of the ``Location`` header. This is the location of your Tenant in Stormpath, which you will need in the next step.

From here, using the location of the Tenant, you can get your Application by performing a search for the Application by name::

    curl -u $API_KEY_ID:$API_KEY_SECRET \
        -H "Accept: application/json" \
        $TENANT_HREF/applications?name=My%20Application'

-  $TENANT_HREF is the location of your Tenant from the previous
   cURL

So this command::

  curl -u 144JVZINOF5EBNCMG9EXAMPLE:lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE \
        -H "Accept: application/json" \
        'https://api.stormpath.com/v1/tenants/7g91YMBXFbu0KAFK/applications?name=My%20Application'

would return this example response::

    {
      "href":"https://api.stormpath.com/v1/tenants/7g91YMBXFbu0KAFK/applications",
      "offset":0,
      "limit":25,
      "size": 1
      "items":[
        {
          "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe",
          "name": "My Application",
          "description": null,
          "status": "ENABLED",
          "tenant": {
            "href": "https://api.stormpath.com/v1/tenants/sOmELoNgRaNDoMIdHeRe"
          },
          "accounts": {
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/accounts"
          },
          "groups": {
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/groups"
          },
          "loginAttempts": {
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/loginAttempts"
          },
          "passwordResetTokens": {
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/passwordResetTokens"
          }
        }
      ]
    }

Make note of the ``accounts``, ``loginAttempts``, and ``href`` URLs in the above response. We're now going to use these to create a new user Account and then authenticate it.

--------------

Create a User Account
=====================

Now that we've created an Application, let's create a user Account so someone can log in to (i.e. authenticate with) the Application. POST a new Account resource to the ``accounts`` ``href`` value returned in the JSON response that you received when you created your Application::

    curl -X POST --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{
            "givenName": "givenName",  
            "surname": "Surname",
            "username": "username",
            "email": "email@address.com",
            "password":"password",
            "customData": {
                "key": "value"
            }
        }' \
    "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/accounts"

Stormpath Accounts have several basic fields (``givenName``, ``surname``, ``email``, etc...), but also support storing schema-less JSON data through the ``customData`` field. ``customData`` allows you to store any user profile information (*up to 10MB per user!*).

.. note:: 

  The required fields are: ``givenName``, ``surname``, ``email``, and ``password``. 

So this command::

    curl -X POST --user 144JVZINOF5EBNCMG9EXAMPLE:lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{
            "givenName": "Joe",  
            "surname": "Stormtrooper",
            "username": "tk421",
            "email": "tk421@stormpath.com",
            "password":"Changeme1",
            "customData": {
                "favoriteColor": "white"
            }
        }' \
    "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/accounts"

would create the user Account and return this response::

    {
      "href": "https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId",
      "username": "tk421",
      "email": "tk421@stormpath.com",
      "fullName": "Joe Stormtrooper",
      "givenName": "Joe",
      "middleName": null,
      "surname": "Stormtrooper",
      "status": "ENABLED",
      "customData": {
        "href":"https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId/customData"
      },
      "groups": {
        "href":"https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId/groups"
      },
      "groupMemberships": {
        "href":"https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId/groupMemberships"
      },
      "directory": {
        "href":"https://api.stormpath.com/v1/directories/sOmERaNdOmDiReCtORyId"
      },
      "tenant": {
        "href":"https://api.stormpath.com/v1/tenants/sOmERaNdOmTeNaNtId"
      },
      "emailVerificationToken": null
    }

You'll notice here that this user Account has a ``directory`` ``href`` returned as well, even though you haven't created one. This is because when you created an Application, Stormpath automatically created a new Directory as well. 

Authenticate a User Account
===========================

Now we have a user Account that can use your Application. But how do you authenticate an Account logging in to the Application? You POST a "Login Attempt" to your Application's ``/loginAttempts`` endpoint.

The cURL command would have the following structure::

    curl -X POST --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{
            "type": "basic",
            "value": "userPassBase64Value"
        }' \
    "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/loginAttempts"

A **Login Attempt** resource has two attributes: ``type`` and ``value``.

The ``type`` attribute must equal ``basic``. The ``value`` attribute must equal the result of the following (pseudo code) logic::

    String concatenated = username + ':' + plain_text_password;
    byte[] bytes = concatenated.to_byte_array();
    String value = base64_encode( bytes );

For example, if you used the ``tk421`` username and ``Changeme1``password above when creating your first account, you might compute the ``value`` using `OpenSSL <http://www.openssl.org/>`__ this way::

    echo -n "tk421:Changeme1" | openssl base64

This would produce the following Base64 result::

    dGs0MjE6Q2hhbmdlbWUx

Use the Base64 result to POST a **Login Attempt** to your application's ``/loginAttempts`` (the JSON ``value`` attribute is the Base64 result)::

    curl -X POST --user 144JVZINOF5EBNCMG9EXAMPLE:$lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{
            "type": "basic",
            "value": "dGs0MjE6Q2hhbmdlbWUx"
        }' \
    "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/loginAttempts"

If the authentication attempt is successful (the username and password match and were Base64-encoded correctly), a link to the successfully authenticated Account will be returned::

    {
      "account": {
        "href": "https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId"
      }
    }

You can use the returned ``href`` to GET the Account's details (first name, last name, email, etc).

If the authentication attempt fails, you will see an `error response </rest/product-guide#errors>`_ instead::

    {
      "status": 400,
      "code": 400,
      "message": "Invalid username or password.",
      "developerMessage": "Invalid username or password.",
      "moreInfo": "mailto:support@stormpath.com"
    }

--------------

Next Steps
==========

We hope you found this Quickstart helpful!

You've just scratched the surface of what you can do with Stormpath.
Want to learn more? Here are a few other helpful resources you can jump
into.

.. todo:

  Update links once the documentation is complete.

- Try out Stormpath in your favorite programming language with our `7-Minute Tutorial <https://stormpath.com/tutorial>`_.
- Learn to easily partition user data with our `Guide to Building Multitenant SaaS Applications <http://docs.stormpath.com/guides/multi-tenant/>`_.
- Easily support Google and Facebook Login with our new :ref:`Social Login & Integration Guide <social-authn>`.
- Or simply jump into the next section and learn about :doc:`Account Management </004_accnt_mgmt>`.

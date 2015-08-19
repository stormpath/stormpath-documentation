*************
3. Quickstart
*************

This quickstart will get you up and running with Stormpath in about 7
minutes and give you a good initial feel for the Stormpath REST API.
During this quickstart, you will do the following:

-  Create an API Key that allows you to make REST API calls with Stormpath.
-  Register an Application.
-  Create a User Account.
-  Authenticate a User Account.

Stormpath also can do a lot more (like Groups, Multitenancy, Social
Integration, and Security workflows) which you can learn more about at
the end of this quickstart.

Let's get started!

.. note::

  This quickstart uses cURL. cURL is pre-installed on many
  Linux and Mac systems. Windows users can download a version at
  curl.haxx.se/. When using HTTPS on Windows, ensure that your system
  meets the cURL requirements for SSL. {% enddocs %}

--------------

Get an API Key
==============

All requests to Stormpath must be authenticated with an API Key.

1. If you haven't already, `Sign up for Stormpath
   here <https://api.stormpath.com/register>`__. You'll be sent a
   verification email.

2. Click the link in the verification email.

3. Log in to the `Stormpath Admin Console <https://api.stormpath.com>`__
   using the email address and password you used to register with
   Stormpath.

4. Click the **Create API Key** or **Manage Existing Keys** button in
   the middle of the page.

5. Under **Security Credentials**, click **Create API Key**.

This will generate your API Key and download it to your computer as an
``apiKey.properties`` file. If you open the file in a text editor, you
will see something similar to the following:

::

        apiKey.id = 144JVZINOF5EBNCMG9EXAMPLE
        apiKey.secret = lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE

6. Save this file in a secure location, such as your home directory, in
   a hidden ``.stormpath`` directory. For example:

   ::

       $ mkdir ~/.stormpath
       $ mv ~/Downloads/apiKey.properties ~/.stormpath/

7. Change the file permissions to ensure only you can read this file.
   For example:

   ::

       $ chmod go-rwx ~/.stormpath/apiKey.properties

The ``apiKey.properties`` file holds your API key information, and can
be used to easily authenticate with the Stormpath library.

--------------

Retrieve your Application
=========================

Before you can create user Accounts you'll need to retrieve your
Stormpath Application. An Application in Stormpath is the same thing as
a project. If you're building a web app named "Lightsabers Galore",
you'd want to name your Stormpath Application "Lightsabers Galore" as
well. By default, your Stormpath account will have an application
already created for you to use. We will use this application for the
quickstart.

Before you can get your Application, you must get the location of your
tenant from Stormpath, like so:

::

    curl -i --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
      'https://api.stormpath.com/v1/tenants/current'

where:

-  ``$YOUR_API_KEY_ID`` is the ``apiKey.id`` value in
   ``apiKey.properties`` and
-  ``$YOUR_API_KEY_SECRET`` is the ``apiKey.secret`` value in
   ``apiKey.properties``

This will return the header for the call:

::

    HTTP/1.1 302 Found
    Location: https://api.stormpath.com/v1/tenants/7g91YMBXFbu0KAFK
    Content-Length: 0
    Connection: keep-alive

Make note of the ``Location`` header. This is the location of your
tenant in Stormpath.

From here, using the location of the tenant, you can get your
Application by performing a search for the application by name:

::

    curl -u $API_KEY_ID:$API_KEY_SECRET \
        -H "Accept: application/json" \
        '$TENANT_HREF/applications?name=My%20Application'

where:

-  $TENANT\_HREF is the location of your found tenant from the previous
   cURL

Here's an example response to the above REST request:

::

    {
      "href":"https://api.stormpath.com/v1/tenants/7g91YMBXFbu0KAFK/applications",
      "offset":0,
      "limit":25,
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
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeR/loginAttempts"
          },
          "passwordResetTokens": {
            "href": "https://api.stormpath.com/v1/applications/aLoNGrAnDoMAppIdHeRe/passwordResetTokens"
          }
        }
      ]
    }

Make note of the ``accounts`` and ``loginAttempts`` ``href`` URLs in the
above response. We're going to use those URLs next to create a new
account and then authenticate it.

--------------

Create a User Account
=====================

Now that we've created an ``Application``, let's create an ``Account``
so someone can log in to (i.e. authenticate with) the Application.
``POST`` a new ``Account`` resource to the ``accounts`` ``href`` value
returned in the JSON response that you received when you created your
``Application``:

::

    curl -X POST --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
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
    "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/accounts"

{% docs note %} Don't forget to change ``$YOUR_APPLICATION_ID`` in the
URL above to match your application's ``accounts`` ``href`` URL! {%
enddocs %}

Stormpath Accounts have several basic fields (``givenName``,
``surname``, ``email``, etc...), but also support storing schema-less
JSON data through the ``customData`` field. ``customData`` allows you to
store any user profile information (*up to 10MB per user!*).

{% docs note %} The required fields are: ``givenName``, ``surname``,
``email``, and ``password``. {% enddocs %}

This will create the account. Example response:

::

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
        "href":"https://api.stormpath.com/v1/accounts/78zeDydHRroJkiAD9XRQ9j/customData"
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

--------------

Authenticate a User Account
===========================

Now we have an account that can use your application. But how do you
authenticate an account logging in to the application? You ``POST`` a
``Login Attempt`` to your application's ``loginAttempts`` ``href``.

A ``Login Attempt`` resource has two attributes: ``type`` and ``value``.

The ``type`` attribute must equal ``basic``. The ``value`` attribute
must equal the result of the following (pseudo code) logic:

::

    String concatenated = username + ':' + plain_text_password;
    byte[] bytes = concatenated.to_byte_array();
    String value = base64_encode( bytes );

For example, if you used the the ``tk421`` username and ``Changeme1``
password above when creating your first account, you might compute the
``value`` using `OpenSSL <http://www.openssl.org/>`__ this way:

::

    echo -n "tk421:Changeme1" | openssl base64

This would produce the following Base64 result:

::

    dGs0MjE6Q2hhbmdlbWUx

Use the Base64 result to ``POST`` a ``Login Attempt`` to your
application's ``loginAttempts`` ``href`` (the JSON ``value`` attribute
is the Base64 result):

::

    curl -X POST --user $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
        -H "Accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{
            "type": "basic",
            "value": "dGs0MjE6Q2hhbmdlbWUx"
        }' \
    "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID/loginAttempts"

{% docs note %} Don't forget to change ``$YOUR_APPLICATION_ID`` in the
URL above to match your application's ``accounts`` ``href`` URL! {%
enddocs %}

If the authentication attempt is successful (the username and password
match and were Base64-encoded correctly), a link to the successfully
authenticated account will be returned:

::

    {
      "account": {
        "href": "https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId"
      }
    }

You can use the returned ``href`` to ``GET`` the account's details
(first name, last name, email, etc).

If the authentication attempt fails, you will see an `error
response </rest/product-guide#errors>`__ instead:

::

    {
      "status": 400,
      "code": 400,
      "message": "Invalid username or password.",
      "developerMessage": "Invalid username or password.",
      "moreInfo": "mailto:support@stormpath.com"
    }

--------------

Other Things You Can Do with Stormpath
======================================

In addition to user registration and login, Stormpath can do a lot more!

-  Create and manage user groups.
-  Partition multi-tenant SaaS account data.
-  Simplify social login with providers like Google and Facebook.
-  Manage developer API keys and access tokens.
-  Verify new users via email.
-  Automatically provide secure password reset functionality.
-  Centralize your user store across multiple applications.
-  Plug into your favorite language or web framework.

--------------

Next Steps
==========

We hope you found this Quickstart helpful!

You've just scratched the surface of what you can do with Stormpath.
Want to learn more? Here are a few other helpful resources you can jump
into.

-  Dig in deeper with the `Official REST API Product
   Guide </rest/product-guide>`__.
-  Try out Stormpath in your favorite programming language with our
   `7-Minute Tutorial <https://stormpath.com/tutorial>`__.
-  Learn to easily partition user data with our `Guide to Building
   Multitenant SaaS Applications </guides/multi-tenant/>`__.
-  Easily support Google and Facebook Login with our new `Social Login &
   Integration Guide </guides/social-integrations/>`__.

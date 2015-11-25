.. _quickstart:

*************
3. Quickstart
*************

This quickstart will get you up and running with Stormpath in about 7 minutes and give you a good initial feel for the Stormpath REST API.

This quickstart assumes that you have `cURL <http://curl.haxx.se/download.html>`_ installed on your system and that you have already completed the steps in the :ref:`Set-up chapter<set-up>`, and now have:

- A Stormpath account

- A Stormpath API Key generated and downloaded onto your system

- A Stormpath Tenant resource. The following associated resources were also automatically created:

  - Two Application resources: One called "My Application", and the other called "Stormpath"

  - Two Directory resources: "My Application Directory" and "Stormpath Administrators"

    - "My Application Directory" is set as the default Directory for any new Accounts added to "My Application".

During this quickstart, you will do the following:

-  Retrieve your Application.
-  Create a User Account.
-  Authenticate a User Account.

Stormpath also can do a lot more (like :ref:`Groups <group-mgmt>`, :ref:`Multitenancy <multitenancy>`, and :ref:`Social Integration <social-authn>`) which you can learn more about later in this guide.

Let's get started!

Retrieve your Application
=========================

Before you can create user Accounts you'll need to retrieve your Stormpath Application. An Application in Stormpath represents the project that you are working on. This means that, if you're building a web app named "Lightsabers Galore", you'd want to name your Stormpath Application "Lightsabers Galore" as well. By default, your Stormpath Tenant will have an Application already created for you to use. We will use this Application, named "My Application", for the quickstart.

In our examples below we will use the mock API Key from the :ref:`First Time Set-Up <set-up>` chapter. You should replace this mock Key with your own, valid key::

  apiKey.id = 144JVZINOF5EBNCMG9EXAMPLE
  apiKey.secret = lWxOiKqKPNwJmSldbiSkEbkNjgh2uRSNAb+AEXAMPLE

Before you can get your Application, you must get the location of your Tenant from Stormpath, like so:

.. code-block:: bash

  curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/current"

-  ``$API_KEY_ID`` is the ``apiKey.id`` value in
   ``apiKey.properties`` and
-  ``$API_KEY_SECRET`` is the ``apiKey.secret`` value in
   ``apiKey.properties``

The above cURL command returns an empty body along with a header:

.. code-block:: http 
  :emphasize-lines: 2
    
    HTTP/1.1 302 Found 
    Location: https://api.stormpath.com/v1/tenants/yOuRTeNANtid
    Content-Length: 0

Make note of the ``Location`` header. This is the location of your Tenant in Stormpath, which you will need in the next step.

From here, using the location of the Tenant, you can get your Application by performing a search for the Application by name, with $TENANT_HREF replaced with the ``href`` of your Tenant from the previous cURL:

.. code-block:: bash

  curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/yOuRTeNANtid/applications?name=My%20Application"

.. note::

  If you leave off the ``?name=My%20Application'`` query at the end of the request, it will instead retrieve a list of all Applications for this Tenant.

The above cURL would return this example response:

.. code-block:: json
  :emphasize-lines: 2,12,13,21,22

  {
    "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE",
    "name":"My Application",
    "description":"This application was automatically created for you in Stormpath for use with our Quickstart guides(https://docs.stormpath.com). It does apply to your subscription's number of reserved applications and can be renamed or reused for your own purposes.",
    "status":"ENABLED",
    "createdAt":"2015-08-18T20:46:36.061Z",
    "modifiedAt":"2015-11-09T21:09:34.334Z",
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
    },
    "thisResult": {"hasBeenTruncated"},
    "accounts":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/accounts"
    },
    "groups":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/groups"
    },
    "accountStoreMappings":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/accountStoreMappings"
    },
    "loginAttempts":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/loginAttempts"
    },
    "thisResult": {"hasBeenTruncated"},
  }

Make note of the ``accounts``, ``loginAttempts``, and ``href`` URLs in the above response. We're now going to use these to create a new user Account and then authenticate it.

Create a User Account
=====================

Now that we've created an Application, let's create a user Account so someone can log in to (i.e. authenticate with) the Application. POST a new Account resource to the Application's ``/accounts`` endpoint, which you saw in the JSON response above:

.. code-block:: bash

  curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/accounts"
    --data '{
    "givenName": "Joe",
    "surname": "Stormtrooper",
    "username": "tk421",
    "email": "tk421@stormpath.com",
    "password":"Changeme1",
    }'

This would return this response:

.. code-block:: json  

  {
    "href": "https://api.stormpath.com/v1/accounts/2wufAnDszC3PRi9exAMple",
    "username": "tk421",
    "email": "tk421@stormpath.com",
    "fullName": "Joe Stormtrooper",
    "givenName": "Joe",
    "middleName": null,
    "surname": "Stormtrooper",
    "status": "ENABLED",
    "customData": {
      "href":"https://api.stormpath.com/v1/accounts/2wufAnDszC3PRi9exAMple/customData"
    },
    "groups": {
      "href":"https://api.stormpath.com/v1/accounts/2wufAnDszC3PRi9exAMple/groups"
    },
    "groupMemberships": {
      "href":"https://api.stormpath.com/v1/accounts/2wufAnDszC3PRi9exAMple/groupMemberships"
    },
    "directory": {
      "href":"https://api.stormpath.com/v1/directories/1gkPqEScsMQSUFreXAMPLE"
    },
    "tenant": {
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExAMPLE"
    },
    "emailVerificationToken": null
  }

You'll notice here that this user Account has a Directory ``href`` returned as well, even though you haven't created one. This is because when you created an Application, Stormpath automatically created a new Directory as well.

Authenticate a User Account
===========================

Now we have a user Account that can use your Application. But how do you authenticate an Account logging in to the Application? You POST a "Login Attempt" to your Application's ``/loginAttempts`` endpoint.

The login cURL command would look as follows:

.. code-block:: bash

  curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlEXampLE/loginAttempts"
    --data '{
    "type": "basic",
    "value": "dGs0MjE6Q2hhbmdlbWUx"
    }'

We are sending a :ref:`Login Attempt resource <ref-loginattempts>`, which has two attributes: ``type`` and ``value``.

The ``type`` attribute must equal ``basic``. The ``value`` attribute must equal the result of the following (pseudo code) logic::

    String concatenated = username + ':' + plain_text_password;
    byte[] bytes = concatenated.to_byte_array();
    String value = base64_encode( bytes );

For example, if you used the ``tk421`` username and ``Changeme1`` password from above when creating your first account, you might compute the ``value`` using `OpenSSL <http://www.openssl.org/>`__ this way:

.. code-block:: bash

    echo -n "tk421:Changeme1" | openssl base64

This would produce the following Base64 result::

    dGs0MjE6Q2hhbmdlbWUx

This is what we passed as the ``value`` attribute.

If the authentication attempt is successful (the username and password match and were Base64-encoded correctly), a link to the successfully authenticated Account will be returned:

.. code-block:: json

  {
    "account": {
      "href": "https://api.stormpath.com/v1/accounts/aRaNdOmAcCoUnTId"
    }
  }

You can use the returned ``href`` to GET the Account's details (first name, last name, email, etc).

If the authentication attempt fails, you will see an `error response <http://docs.stormpath.com/errors/>`_ instead:

.. code-block:: json 

  {
    "status": 400,
    "code": 400,
    "message": "Invalid username or password.",
    "developerMessage": "Invalid username or password.",
    "moreInfo": "mailto:support@stormpath.com"
  }

Next Steps
==========

We hope you found this Quickstart helpful!

You've just scratched the surface of what you can do with Stormpath.

Want to learn more? Here are a few other helpful resources you can jump into.

- Try out Stormpath in your favorite programming language with one of our language-specific `quickstarts <https://docs.stormpath.com/home/>`_. Simply choose the integration of your choice, and then click on Quickstart.
- Learn to easily partition user data in the :ref:`Multi-Tenancy Chapter <multitenancy>`.
- Easily support Google and Facebook Login by learning how :ref:`Social Authentication Works <social-authn>`.
- Or simply jump into the next section and learn about :ref:`Account Management <account-mgmt>`.

.. _account-mgmt:

**********************
4. Account Management
**********************

This chapter provides the information necessary for you to understand the resources and processes involved in Account Management in Stormpath. In addition to information about the different types of resources, it also contains examples of the steps required in setting up a basic user Account with membership in a Group. If you'd like to skip to those steps they are:

1. :ref:`Creating a Directory <make-cloud-dir>`
2. :ref:`Creating a Group <make-group>`
3. :ref:`Adding an Account to a Directory <add-new-account>`
4. :ref:`Adding our Account to a Group <add-account-to-group>`

The final step that would allow this Account to actually log in to the application is covered in :ref:`the Authentication chapter <create-asm>`.

4.1. Modeling Your User Base
============================

The first topic that you need to address is how you are user modeling works inside Stormpath.

User Accounts in Stormpath aren't directly associated with Applications, but only indirectly via **Directories**, **Organizations**, and also possibly **Groups**.

All of your Accounts will have to be associated with at least one Directory resource, so you can start there.

.. _directory-mgmt:

4.1.1. Directories
-------------------

The **Directory** resource is a top-level container for Account and Group resources. A Directory also manages security policies (like password strength) for the Accounts it contains. Directories can be used to cleanly manage segmented user Account populations. For example, you might use one Directory for company employees and another Directory for customers, each with its own security policies.

.. only:: rest

For more detailed information about the Directory resource, please see the :ref:`ref-directory` section in the Reference chapter.

.. only:: csharp or vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

Types of Directories
^^^^^^^^^^^^^^^^^^^^
Stormpath supports two types of Directories:

1. Natively-hosted **Cloud Directories** that originate in Stormpath
2. **Mirror Directories** that act as secure replicas of existing user directories outside of Stormpath, for example those on LDAP Directory servers, on Facebook and other youbsites, as youll as in Identity Providers that support SAML.

You can add as many Directories of each type as you require.

.. note::

  Multiple Directories are a more advanced feature of Stormpath. If you have one or more applications that all access the same Accounts, you usually only need a single Directory, and you do not need to be concerned with creating or managing multiple Directories.

  If hoyouver, your application needs to support login for :ref:`multiple external third-party accounts <supporting-multiple-dirs>`, or you have more complex account segmentation needs, Directories will be a poyourful tool to manage your application's user base.

.. _about-cloud-dir:

Cloud Directories
^^^^^^^^^^^^^^^^^
These are the standard, default Directory resource.

.. _make-cloud-dir:

How to Make a Cloud Directory
"""""""""""""""""""""""""""""

The following request:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "name" : "Captains",
      "description" : "Captains from a variety of stories"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_cloud_dir_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_cloud_dir_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_cloud_dir_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_cloud_dir_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_cloud_dir_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_cloud_dir_req.py
      :language: python

Would yield the following response:

.. only:: rest

  .. code-block:: HTTP

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE",
      "name": "Captains",
      "description": "Captains from a variety of stories",
      "status": "ENABLED",
      "createdAt": "2015-08-24T15:32:23.079Z",
      "modifiedAt": "2015-08-24T15:32:23.079Z",
      "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGeXampLE"
      },
      "provider": {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE/provider"
      },
      "comment":" // This JSON has been truncated for readability",
      "groups": {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE/groups"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_cloud_dir_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_cloud_dir_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_cloud_dir_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_cloud_dir_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_cloud_dir_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_cloud_dir_resp.py
      :language: python

Our current resources (**not including the default ones** created in the :ref:`Quickstart<quickstart>`) can be visualized like this:

.. figure:: images/accnt_mgmt/am_erd_01.png
  :align: center
  :scale: 100%
  :alt: <ERD with Directory>

  *Our Stormpath Tenant, with an Application resource and our newly created "Captains" Directory*

Any new Groups or Accounts that you create will have to be created inside a Directory. Before you move on to that though, it's helpful to know a little about the other kinds of Directories available to you in Stormpath.

.. _about-mirror-dir:

Mirror Directories
^^^^^^^^^^^^^^^^^^

**Mirror Directories** are all Directories that pull-in data from external user databases. Currently this encompasses:

- LDAP Directories, including Active Directory
- Social Directories, such as Facebook and GitHub
- SAML-enabled Identity Provider Directories, such as Salesforce and OneLogin

For all Mirror Directories, since the relationship with the outside directory is read-only, the remote directory is still the "system of record".

.. _supporting-multiple-dirs:

**Supporting Multiple Mirror Directories**

It is possible to use different kinds of Directories simultaneously, to allow users to log-in with multiple external systems at the same time. For example, if you wanted to enable logging-in with Facebook, LinkedIn, and Salesforce, this would require a separate Mirror Directory for each one.

If multiple Directories are desired, you recommend that you create a separate "master" Directory that allows for a unified user identity. This master Directory would link all the Accounts in Mirror Directories with a master Account in a master Directory. This offers a few benefits:

1. You can maintain one Directory that has all your user Accounts, retaining globally unique canonical identities across your application

2. You are able to leverage your own Groups in the master Directory. Remember, most data in a Mirror Directory is read-only, meaning you cannot create your own Groups in it, only read the Groups (if any) synchronized from the external directory.

3. Keep a user’s identity alive even after they've left your customer's organization and been deprovisioned in the external user directory. This is valuable in a SaaS model where the user is loosely coupled to an organization. Contractors and temporary workers are good examples.

For information about how login works with master Directories, please see :ref:`How Login Works with Master Directories <mirror-login>`.

.. _about-ldap-dir:

LDAP Directories
""""""""""""""""

LDAP Directories are a big benefit to Stormpath customers who need LDAP directory accounts to be able to securely log in to public web applications without breaking corporate firewall policies. Here is how they work:

- After creating an LDAP Directory in Stormpath, you download a Stormpath Agent. This is a simple standalone software application that you install behind the corporate firewall so it can communicate directly with the LDAP server.
- You configure the agent via LDAP filters to view only the accounts that you want to expose to your Stormpath-enabled applications.
- The Agent will start synchronizing immediately, pushing this select data outbound to Stormpath over a TLS (HTTPS) connection.
- The synchronized user Accounts and Groups appear in the Stormpath Directory. The Accounts will be able to log in to any Stormpath-enabled application that you assign.
- When the Agent detects local LDAP changes, additions or deletions to these specific Accounts or Groups, it will automatically propagate those changes to Stormpath to be reflected by your Stormpath-enabled applications.

User Accounts and Groups in LDAP directories are automatically deleted when any of the following things happen:

- The original object is deleted from the LDAP directory service.
- The original LDAP object information no longer matches the account filter criteria configured for the agent.
- The LDAP directory is deleted.

The big benefit is that your Stormpath-enabled applications still use the same convenient REST API – they do not need to know anything about things like LDAP or legacy connection protocols.

.. _modeling-ldap-dirs:

Modeling LDAP Directories
+++++++++++++++++++++++++++

As Mirror Directories, LDAP Directories must have the same structure as the external LDAP directories that they are synchronizing with.

The Stormpath Agent (see :ref:`ref-ldap-agent`) is regularly updating its LDAP Directory and sometimes adding new user Accounts and/or Groups. Because this data can be quite fluid, you recommend initiating all provisioning, linking, and synchronization on a successful login attempt of the Account in the LDAP Directory. This means that the master Directory would start off empty, and would then gradually become populated every time a user logged in.

For more information on how to this works, please see :ref:`ldap-dir-authn`.

.. _make-ldap-dir:

How to Make an LDAP Directory
+++++++++++++++++++++++++++++

.. only:: rest

  Presently, LDAP Directories can be made via the Stormpath Admin Console, or using the REST API. If you'd like to do it with the Admin Console, please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/#create-a-directory>`_. For more information about creating them using REST API, please see :ref:`ldap-dir-authn`.

.. only:: csharp or vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

.. _about-social-dir:

Social Directories
""""""""""""""""""

Stormpath works with user Accounts pulled from social login providers (currently Google, Facebook, Github, and LinkedIn) in a way very similar to the way it works with user Accounts from LDAP servers. These external social login providers are modeled as Stormpath Directories, much like LDAP Directories. The difference is that, while LDAP Directories always come with an Agent that takes care of synchronization, Social Directories have an associated **Provider** resource. This resource contains the information required by the social login site to work with their site (e.g. the App ID for your Google application).

Stormpath also simplifies the authorization process by doing things like automating Google's access token exchange flow. All you do is POST the authorization code from the end-user and Stormpath returns a new or updated user Account, along with the Google access token which you can use for any further API calls.

Modeling Social Directories
++++++++++++++++++++++++++++

Modeling your users who authorize via Social Login is by necessity very simple, since social login providers do not include the concept of "groups" of users in the same way that LDAP directories do. The only thing that you really have to do as an app developer is create a Directory resource for each social provider that you want to support. As mentioned :ref:`above <supporting-multiple-dirs>`, if you want to support multiple Directories then you may also want to create a master Directory for your application. For more about how Social Directories are provisioned, please see :ref:`mirror-login`.

How to Make a Social Directory
++++++++++++++++++++++++++++++

.. only:: rest

  Presently, Social Directories can be made via the Stormpath Admin Console or using REST API. For more information about creating them with the Admin Console please see the `Directories section of the Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/#create-a-directory>`_. For more information about creating them using REST API, please see :ref:`social-authn`.

.. only:: csharp or vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

.. _about-saml-dir:

SAML Directories
""""""""""""""""

In addition to Social Login and LDAP, Stormpath also allows your users to log-in with SAML Identity Providers. Just like with Social Directories, SAML Directories are configured via an associated Provider resource that contains the configuration information for the Identity Provider.

Modeling SAML Directories
+++++++++++++++++++++++++

The only modeling considerations for SAML Directories are: you will need a Directory for each SAML IdP that you want to support, and you might need to consider having a :ref:`Master Directory <supporting-multiple-dirs>` to co-ordinate among your multiple directories.

How to Make a SAML Directory
++++++++++++++++++++++++++++

.. only:: rest

  SAML Directories can be made using the :ref:`Stormpath Admin Console <saml-configuration>` or using :ref:`REST API <saml-configuration-rest>`.

.. only:: csharp or vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

.. _group-mgmt:

4.1.2. Groups
--------------

The Group resource can either be imagined as a container for Accounts, or as a label applied to them. Groups can be used in a variety of ways, including organizing people by geographic location, or by their role within a company.

.. only:: rest

  For more detailed information about the Group resource, please see the :ref:`ref-group` section of the Reference chapter.

.. _hierarchy-groups:

Modeling User Hierarchies Using Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Groups, like labels, are inherently "flat". This means that they do not by default include any kind of hierarchy. If a hierarchical or nested structure is desired, it can be simulated in one of two ways: Either, using the Group resource's ``description`` field, or with the Group's associated customData resource.

A geographical region can, for example, be represented as ``"North America/US/US East"`` in the Group's ``description`` field, allowing for queries to be made using simple pattern-matching queries. So to find all Groups in the US, you'd make the following request:

.. only:: rest

  .. code-block:: http

    GET /v1/directories/$DIR_ID/groups?description=US* HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_directory_group_description1.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_directory_group_description1.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/search_directory_group_description1.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/search_directory_group_description1.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/search_directory_group_description1.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/search_directory_group_description1.py
      :language: python

Or, to find all Groups in the US East region only, you would send this request:

.. only:: rest

  .. code-block:: http

    GET /v1/directories/$DIR_ID/groups?description=US%20East* HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

  .. note::

    URL encoding will change a space into "%20".

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_directory_group_description2.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_directory_group_description2.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/search_directory_group_description2.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/search_directory_group_description2.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/search_directory_group_description2.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/search_directory_group_description2.py
      :language: python

It can also be included in the customData resource, as a series of key-value relations.

.. _make-group:

How to Create a Group
^^^^^^^^^^^^^^^^^^^^^

So let's say you want to add a new Group resource with the name "Starfleet Officers" to the "Captains" Directory.

The following request:

.. only:: rest

  .. code-block:: http

    POST /v1/directories/2SKhstu8PlaekcaEXampLE/groups HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "name" : "Starfleet Officers",
      "description" : "Commissioned officers in Starfleet",
      "status" : "enabled"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_group_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_group_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_group_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_group_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_group_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_group_req.py
      :language: python

Would yield this response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe
    Content-Type: application/json;charset=UTF-8

    {
      "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe",
      "name":"Starfleet Officers",
      "description":"Commissioned officers in Starfleet",
      "status":"ENABLED",
      "createdAt":"2015-08-25T20:09:23.698Z",
      "modifiedAt":"2015-08-25T20:09:23.698Z",
      "customData":{
        "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe/customData"
      },
      "directory":{
        "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE"
      },
      "tenant":{
        "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGeXampLE"
      },
      "accounts":{
        "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe/accounts"
      },
      "accountMemberships":{
        "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe/accountMemberships"
      },
      "applications":{
        "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe/applications"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_group_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_group_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_group_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_group_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_group_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_group_resp.py
      :language: python

You can now see how this Group would look in our Tenant:

.. figure:: images/accnt_mgmt/am_erd_02.png
  :align: center
  :scale: 100%
  :alt: <ERD with Directory and Group>

There is our Application, Directory, and our newly-created Group, and they are all found inside the Stormpath Tenant.

.. _account-creation:

4.2. How to Store Accounts in Stormpath
=======================================

The Account resource is a unique identity within your application. It is usually used to model an end-user, although it can also be used by a service, process, or any other entity that needs to log-in to Stormpath.

.. only:: rest

  For more detailed information about the Account resource, see the :ref:`ref-account` section of the Reference chapter.

.. only:: csharp or vbnet

  For more detailed information about the Account resource, see

.. only:: java

  For more detailed information about the Account resource, see

.. only:: nodejs

  For more detailed information about the Account resource, see

.. only:: php

  For more detailed information about the Account resource, see

.. only:: python

  For more detailed information about the Account resource, see

4.2.1. New Account Creation
---------------------------

The basic steps for creating a new Account are covered in the :ref:`Quickstart <quickstart>` chapter. In that example, you show how to add an Account to an Application. Below, you will also show how to add an Account to a specific Directory, or Group.

.. _add-new-account:

Add a New Account to a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because Accounts are "owned" by Directories, you create new Accounts by adding them to a Directory. You can add an Account to a Directory directly, or you can add it indirectly by registering an Account with an Application, like in the :ref:`Quickstart <quickstart>`, or an Organization, like in :ref:`the Multi-tenancy Chapter <add-accnt-to-org>`.

.. only:: rest

  .. note::

    This section will show examples using a Directory's ``/accounts`` href, but they will also function the same if you use an Application’s or Organization's ``/accounts`` href instead. Just make sure that you have Default Account Stores configured!

  Let's say you want to add a new account for user "Jean-Luc Picard" to the "Captains" Directory, which has the ``directoryId`` value ``2SKhstu8PlaekcaEXampLE``. The following API request:

  .. code-block:: http

    POST /v1/directories/2SKhstu8PlaekcaEXampLE/accounts HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "username" : "jlpicard",
      "email" : "capt@enterprise.com",
      "givenName" : "Jean-Luc",
      "surname" : "Picard",
      "password" : "uGhd%a8Kl!"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_account_in_dir_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_account_in_dir_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_account_in_dir_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_account_in_dir_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_account_in_dir_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_account_in_dir_req.py
      :language: python

.. note::

  The password in the request is being sent to Stormpath as plain text. This is one of the reasons why Stormpath only allows requests via HTTPS. Stormpath implements the latest password hashing and cryptographic best-practices that are automatically upgraded over time so the developer does not have to worry about this. Stormpath can only do this for the developer if you receive the password as plaintext, and only hash it using these techniques.

  Plaintext passwords also allow Stormpath to enforce password restrictions in a configurable manner.

  Most importantly, Stormpath never persists or relays plaintext passwords under any circumstances.

  On the client side, then, you do not need to worry about salting or storing passwords at any point; you need only pass them to Stormpath for hashing, salting, and persisting with the appropriate HTTPS API call.

Would yield this response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe",
      "username": "jlpicard",
      "email": "capt@enterprise.com",
      "givenName": "Jean-Luc",
      "middleName": null,
      "surname": "Picard",
      "fullName": "Jean-Luc Picard",
      "status": "ENABLED",
      "createdAt": "2015-08-25T19:57:05.976Z",
      "modifiedAt": "2015-08-25T19:57:05.976Z",
      "emailVerificationToken": null,
      "customData": {
        "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/customData"
      },
      "providerData": {
        "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/providerData"
      },
      "comment":" // This JSON has been truncated for readability"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_account_in_dir_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_account_in_dir_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/create_account_in_dir_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_account_in_dir_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/create_account_in_dir_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/create_account_in_dir_resp.py
      :language: python

Going back to our resource diagram:

.. figure:: images/accnt_mgmt/am_erd_03.png
  :align: center
  :scale: 100%
  :alt: ERD with groupMembership

The new Account is now in the "Captains" Directory.

.. _add-account-to-group:

Add an Existing Account to a Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

So let's say you want to add "Jean-Luc Picard" to the "Starfleet Officers" Group inside the "Captains" Directory.

You make the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/groupMemberships HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "account" : {
          "href" : "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe"
       },
       "group" : {
           "href" : "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe"
       }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_account_to_group_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_account_to_group_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/add_account_to_group_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/add_account_to_group_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/add_account_to_group_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/add_account_to_group_req.py
      :language: python

And get the following response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/groupMemberships/1ufdzvjTWThoqnHf0a9vQ0
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/groupMemberships/1ufdzvjTWThoqnHf0a9vQ0",
      "account": {
        "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe"
      },
      "group": {
        "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExAMpLe"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_account_to_group_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_account_to_group_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/add_account_to_group_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/add_account_to_group_resp.js
      :language: javascript

.. only:: python

  .. literalinclude:: code/python/account_management/add_account_to_group_resp.py
      :language: python

This would leave us with the following resources:

.. figure:: images/accnt_mgmt/am_erd_final.png
  :align: center
  :scale: 100%
  :alt: Final ERD

This our completed resource set, with an Account that is a member of a Group inside a Directory. That Directory, along with the Application, sit inside the Stormpath Tenant. Notice, however, that there is no association between the Application and the Directory. For more information about this, please see :ref:`the Authentication chapter <create-asm>`.

.. _importing-accounts:

4.2.2. Importing Accounts
-------------------------

Stormpath also makes it very easy to transfer your existing user directory into a Stormpath Directory using our API. Depending on how you store your passwords, you will use one of three approaches:

1. **Passwords in Plaintext:** If you stored passwords in plaintext, you can use the Stormpath API to import them directly. Stormpath will create the Accounts and secure their passwords automatically (within our system). Make sure that your Stormpath Directory is configured to *not* send Account Verification emails before beginning import.
2. **Passwords With MCF Hash:** If your password hashing algorithm follows a format Stormpath supports, you can use the API to import Accounts directly. Available formats and instructions are detailed :ref:`below <importing-mcf>`.
3. **Passwords With Non-MCF Hash:** If you hashed passwords in a format Stormpath does not support, you can still use the API to create the Accounts, but you will need to issue a password reset afterwards. Otherwise, your users won't be able to use their passwords to login.

.. note::

  To import user accounts from an LDAP or Social Directory, please see :ref:`mirror-login`.

Due to the sheer number of database types and the variation between individual data models, the actual importing of users is not something that Stormpath handles at this time. What you recommend is that you write a script that is able to iterate through your database and grab the necessary information. Then the script uses our APIs to re-create the user base in the Stormpath database.

Importing Accounts with Plaintext Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this case, it is recommended that you suppress Account Verification emails. This can be done by simply adding a ``registrationWorkfloyounabled=false`` query parameter to the end of your API like so::

  https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbeXaMPLE/accounts?registrationWorkfloyounabled=false

.. _importing-mcf:

Importing Accounts with MCF Hash Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you are moving from an existing user repository to Stormpath, you may have existing password hashes that you want to reuse in order to provide a seamless upgrade path for your end users. Stormpath does not allow for Account creation with *any* password hash, the password hash must follow modular crypt format (MCF), which is a ``$`` delimited string.
This works as follows:

1. Create the Account specifying the password hash instead of a plain text password. Stormpath will use the password hash to authenticate the Account’s login attempt.

2. If the login attempt is successful, Stormpath will recreate the password hash using a secure HMAC algorithm.

Supported Hashing Algorithms
""""""""""""""""""""""""""""

Stormpath only supports password hashes that use the following algorithms:

- **bcrypt**: These password hashes have the identifier ``$2a$``, ``$2b$``, ``$2x$``, ``$2a$``
- **stormpath2**: A Stormpath-specific password hash format that can be generated with common password hash information, such as algorithm, iterations, salt, and the derived cryptographic hash. For more information see :ref:`below <stormpath2-hash>`.

Once you have a bcrypt or stormpath2 MCF password hash, you can create the Account in Stormpath with the password hash by POSTing the Account information to the Directory or Application ``/accounts`` endpoint and specifying ``passwordFormat=mcf`` as a query parameter::

  https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbeXaMPLE/accounts?passwordFormat=mcf

.. _stormpath2-hash:

The stormpath2 Hashing Algorithm
++++++++++++++++++++++++++++++++

stormpath2 has a format which allows you to derive an MCF hash that Stormpath can read to understand how to recreate the password hash to use during a login attempt. stormpath2 hash format is formatted as::

  $stormpath2$ALGORITHM_NAME$ITERATION_COUNT$BASE64_SALT$BASE64_PASSWORD_HASH

.. list-table::
  :widths: 20 20 20
  :header-rows: 1

  * - Property
    - Description
    - Valid Values

  * - ``ALGORITHM_NAME``
    - The name of the hashing algorithm used to generate the ``BASE64_PASSWORD_HASH``.
    - ``MD5``, ``SHA-1``, ``SHA-256``, ``SHA-384``, ``SHA-512``

  * - ``ITERATION_COUNT``
    - The number of iterations executed when generating the ``BASE64_PASSWORD_HASH``
    - Number > 0

  * - ``BASE64_SALT``
    - The salt byte array used to salt the first hash iteration.
    - String (Base64). If your password hashes do you have salt, you can leave it out entirely.

  * - ``BASE64_PASSWORD_HASH``
    - The computed hash byte array.
    - String (Base64)


Importing Accounts with Non-MCF Hash Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this case you will be using the API in the same way as usual, except with the Password Reset Workflow enabled. That is, you should set the Account's password to a large randomly generated string, and then force the user through the password reset flow. For more information, please see the :ref:`Password Reset section below <password-reset-flow>`.

.. _add-user-customdata:

4.2.3. How to Store Additional User Information as Custom Data
--------------------------------------------------------------

While Stormpath’s default Account attributes are useful to many applications, you might want to add your own custom data to a Stormpath Account. If you want, you can store all of your custom account information in Stormpath so you don’t have to maintain another separate database to store your specific account data.

One example of this could be if you wanted to add information to our "Jean-Luc Picard" Account that didn't fit into any of the existing Account attributes.

For example, you could add information about this user's current location, like the ship this Captain is currently assigned to.

.. only:: rest

  To do this, you specify the ``accountId`` and the ``/customdata`` endpoint.

  .. code-block:: http

    POST /v1/accounts/3apenYvL0Z9v9spExAMpLe/customData HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "currentAssignment": "USS Enterprise (NCC-1701-E)"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_cd_to_account_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_cd_to_account_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/add_cd_to_account_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/add_cd_to_account_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/add_cd_to_account_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/add_cd_to_account_req.py
      :language: python

Which returns the following:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/customData
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/customData",
      "createdAt": "2015-08-25T19:57:05.976Z",
      "modifiedAt": "2015-08-26T19:25:27.936Z",
      "currentAssignment": "USS Enterprise (NCC-1701-E)"
    }

  This information can also be appended as part of the initial Account creation payload.

  For more information about the customData resource, please see the `customData section <http://docs.stormpath.com/rest/product-guide/#custom-data>`_ of the REST API Product Guide.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_cd_to_account_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_cd_to_account_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/add_cd_to_account_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/add_cd_to_account_resp.js
      :language: javascript

  For more information about Custom Data, please see the `Custom Data section <http://docs.stormpath.com/nodejs/api/customData>`_ of the Node.js SDK API Documentation.

.. only:: php

  .. literalinclude:: code/php/account_management/add_cd_to_account_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/add_cd_to_account_resp.py
      :language: python


4.3. How to Search Accounts
===========================

You can search Stormpath Accounts, just like all Resource collections, using Filter, Attribute, and Datetime search.

The Account resource's **searchable attributes** are:

  - ``givenName``
  - ``middleName``
  - ``surname``
  - ``username``
  - ``email``
  - ``status``

.. only:: rest

  Search can be performed against one of the collections of Accounts associated with other entities:

  ``/v1/applications/$APPLICATION_ID/accounts``

  ``/v1/directories/$DIRECTORY_ID/accounts``

  ``/v1/groups/$GROUP_ID/accounts``

  ``/v1/organizations/$ORGANIZATION_ID/accounts``

  For more information about how search works in Stormpath, please see the :ref:`Search section <about-search>` of the Reference chapter.

.. only:: csharp or vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

4.3.1. Example Account Searches
-------------------------------

Below are some examples of different kinds of searches that can be performed to find Accounts.

Search an Application's Accounts for a Particular Word
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: rest

  A simple :ref:`search-filter` using the ``?q=`` parameter to the Application's ``/accounts`` collection will find us any Account associated with this Application that has the filter query string as part of any of its searchable attributes.

  **Query**

  .. code-block:: http

    GET /v1/applications/1gk4Dxzi6o4Pbdlexample/accounts?q=luc HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

  .. note::

    Matching is case-insensitive. So ``?q=luc`` and ``?q=Luc`` will return the same results.

  **Response**

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/applications/1gk4Dxzi6o4Pbdlexample/accounts
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4Pbdlexample/accounts",
      "offset": 0,
      "limit": 25,
      "size": 1,
      "items": [
          {
              "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexAmple",
              "username": "jlpicard",
              "email": "capt@enterprise.com",
              "givenName": "Jean-Luc",
              "middleName": null,
              "surname": "Picard",
              "fullName": "Jean-Luc Picard",
              "status": "ENABLED",
              "...": "..."
          }
      ]
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_app_accounts_for_word_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_app_accounts_for_word_req.vb
        :language: vbnet

    .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_app_accounts_for_word_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_app_accounts_for_word_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/search_app_accounts_for_word_req.java
      :language: java

  .. literalinclude:: code/java/account_management/search_app_accounts_for_word_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/search_app_accounts_for_word_req.js
      :language: javascript

  .. note::

    Matching is case-insensitive. So ``{ q: 'luc' }`` and ``{ q: 'Luc' }`` will return the same results.

  .. literalinclude:: code/nodejs/account_management/search_app_accounts_for_word_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/search_app_accounts_for_word_req.php
      :language: php

  .. literalinclude:: code/php/account_management/search_app_accounts_for_word_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/search_app_accounts_for_word_req.py
      :language: python

  .. literalinclude:: code/python/account_management/search_app_accounts_for_word_resp.py
      :language: python

Find All the Disabled Accounts in a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An :ref:`search-attribute` can be used on a Directory's Accounts collection in order to find all of the Accounts that contain a certain value in the specified attribute. This could be used to find all the Accounts that are disabled (i.e. that have their ``status`` set to ``disabled``).

.. only:: rest

  **Query**

  .. code-block:: http

    GET /v1/directories/accounts?status=DISABLED HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

  **Response**

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/
    Content-Type: application/json;charset=UTF-8

    {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE/accounts",
        "offset": 0,
        "limit": 25,
        "size": 1,
        "items": [
            {
                "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHexAmple",
                "username": "first2shoot",
                "email": "han@newrepublic.gov",
                "givenName": "Han",
                "middleName": null,
                "surname": "Solo",
                "fullName": "Han Solo",
                "status": "DISABLED",
                "...": "..."
            }
        ]
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_dir_accounts_for_disabled_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_dir_accounts_for_disabled_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/search_dir_accounts_for_disabled_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/search_dir_accounts_for_disabled_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/search_dir_accounts_for_disabled_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/search_dir_accounts_for_disabled_req.py
      :language: python

Find All Accounts in a Directory That Were Created on a Particular Day
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`search-datetime` is used when you want to search for Accounts that have a certain point or period in time that interests you. So you could search for all of the Accounts in a Directory that were modified on Dec 1, 2015.

.. only:: rest

  **Query**

  .. code-block:: http

    GET /v1/directories/2SKhstu8PlaekcaEXampLE/accounts?modifiedAt=2015-12-01 HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

  .. note::

    The parameter can be written in many different ways. The following are all equivalent:

    - ?modifiedAt=2015-12-01
    - ?modifiedAt=[2015-12-01T00:00, 2015-12-02T00:00]
    - ?modifiedAt=[2015-12-01T00:00:00, 2015-12-02T00:00:00]

    For more information see :ref:`search-datetime`.

  **Response**

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/
    Content-Type: application/json;charset=UTF-8

    {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/accounts",
        "offset": 0,
        "limit": 25,
        "size": 1,
        "items": [
            {
                "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid",
                "username": "first2shoot",
                "email": "han@newrepublic.gov",
                "givenName": "Han",
                "middleName": null,
                "surname": "Solo",
                "fullName": "Han Solo",
                "status": "DISABLED",
                "createdAt": "2015-08-28T16:07:38.347Z",
                "modifiedAt": "2015-12-01T21:22:56.608Z",
                "...": "..."
            }
        ]
    }

.. only:: csharp or vbnet

  .. only:: csharp

    **Query**

      .. literalinclude:: code/csharp/account_management/search_dir_accounts_for_create_date_req.cs
          :language: csharp

    **Response**

      .. literalinclude:: code/csharp/account_management/search_dir_accounts_for_create_date_resp.cs
          :language: csharp

  .. only:: vbnet

    **Query**

      .. literalinclude:: code/vbnet/account_management/search_dir_accounts_for_create_date_req.vb
          :language: vbnet

    **Response**

      .. literalinclude:: code/vbnet/account_management/search_dir_accounts_for_create_date_resp.vb
          :language: vbnet

.. only:: java

  **Query**

  .. literalinclude:: code/java/account_management/search_dir_accounts_for_create_date_req.java
      :language: java

  **Response**

  .. literalinclude:: code/java/account_management/search_dir_accounts_for_create_date_resp.java
      :language: java

.. only:: nodejs

  **Query**

  .. literalinclude:: code/nodejs/account_management/search_dir_accounts_for_create_date_req.js
      :language: javascript

  **Response**

  .. literalinclude:: code/nodejs/account_management/search_dir_accounts_for_create_date_resp.js
      :language: javascript

.. only:: php

  **Query**

  .. literalinclude:: code/php/account_management/search_dir_accounts_for_create_date_req.php
      :language: php

  **Response**

  .. literalinclude:: code/php/account_management/search_dir_accounts_for_create_date_resp.php
      :language: php

.. only:: python

  **Query**

  .. literalinclude:: code/python/account_management/search_dir_accounts_for_create_date_req.py
      :language: python

  **Response**

  .. literalinclude:: code/python/account_management/search_dir_accounts_for_create_date_resp.py
      :language: python

.. _managing-account-pwd:

4.4. How to Manage an Account's Password
========================================

4.4.1. Manage Password Policies
--------------------------------

In Stormpath, password policies are defined on a Directory level. Specifically, they are controlled in a **Password Policy** resource associated with the Directory. Modifying this resource also modifies the behavior of all Accounts that are included in this Directory. For more information about this resource, see the :ref:`Password Policy section in the Reference chapter <ref-password-policy>`.

.. note::

  This section assumes a basic familiarity with Stormpath Workflows. For more information about Workflows, please see `the Directory Workflows section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/#directory-workflows>`_.

Changing the Password Strength resource for a Directory modifies the requirement for new Accounts and password changes on existing Accounts in that Directory. To update Password Strength, make this call:

.. only:: rest

  .. code-block:: http

    POST v1/passwordPolicies/$DIRECTORY_ID/strength HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "minLength": 1,
      "maxLength": 24,
      "minSymbol": 1
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/update_dir_pwd_strength_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/update_dir_pwd_strength_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/update_dir_pwd_strength_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/update_dir_pwd_strength_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/update_dir_pwd_strength_req.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/update_dir_pwd_strength_req.py
      :language: python

Which results in the following response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID/strength
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID/strength",
      "maxLength": 24,
      "minDiacritic": 0,
      "minLength": 1,
      "minLoyourCase": 1,
      "minNumeric": 1,
      "minSymbol": 1,
      "minUpperCase": 1
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/update_dir_pwd_strength_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/update_dir_pwd_strength_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/update_dir_pwd_strength_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/update_dir_pwd_strength_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/update_dir_pwd_strength_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/update_dir_pwd_strength_resp.py
      :language: python

.. _change-account-pwd:

4.4.2. Change an Account's Password
-----------------------------------

At no point is the user shown, or does Stormpath have access to, the original password once it has been hashed during account creation. The only ways to change an Account password once it has been created are:

1. To allow the user to update it (without seeing the original value) after being authenticated, or
2. To use the :ref:`password reset workflow <password-reset-flow>`.

To update the password, you send the updated password to the Account resource:

.. only:: rest

  .. code-block:: http

    POST /v1/accounts/3apenYvL0Z9v9spexAmple HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

    {
      "password":"some_New+Value1234"
    }

  If the call succeeds you will get back an ``HTTP 200 OK`` with the Account resource in the body.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/update_account_pwd.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/update_account_pwd.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/update_account_pwd.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/update_account_pwd.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/update_account_pwd.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/update_account_pwd.py
      :language: python

For more information about resetting the password, read on.

.. _password-reset-flow:

4.4.3. Password Reset
---------------------

Password Reset in Stormpath is a self-service flow, where the user is sent an email with a secure link. The user can then click that link and be shown a password reset form. The password reset workflow involves changes to an account at an application level, and as such, this workflow relies on the application resource as a starting point. While this workflow is disabled by default, you can enable it easily in the Stormpath Admin Console UI. Refer to the `Stormpath Admin Console product guide <http://docs.stormpath.com/console/product-guide/#password-reset>`__ for complete instructions.

How to Reset a Password
^^^^^^^^^^^^^^^^^^^^^^^

.. note::

  A password reset will only succeed if there is an Account Store mapped to your Application. For more information about this, please see :ref:`the Authentication chapter <create-asm>`.

There are three steps to the password reset flow:

1. Trigger the workflow
2. Verify the token
3. Update the password

**Trigger the workflow**

.. only:: rest

  To trigger the password reset workflow, you send an HTTP POST to the Application's ``/passwordResetTokens`` endpoint:

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json

    {
      "email":"phasma@empire.gov"
    }

  .. note::

    It is also possible to specify the Account Store in your Password Reset POST:

    .. code-block:: http

      POST /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens HTTP/1.1
      Host: api.stormpath.com
      Content-Type: application/json

      {
        "email":"phasma@empire.gov"
        "accountStore": {
          "href": "https://api.stormpath.com/v1/groups/2SKhstu8Plaekcai8lghrp"
        }
      }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset1_trigger_req.cs
        :language: csharp

    .. note::

      It is also possible to specify the Account Store in your Password Reset request:

      .. literalinclude:: code/csharp/account_management/reset1_trigger_req_accountstore.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset1_trigger_req.vb
        :language: vbnet

    .. note::

      It is also possible to specify the Account Store in your Password Reset request:

      .. literalinclude:: code/vbnet/account_management/reset1_trigger_req_accountstore.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/reset1_trigger_req.java
      :language: java

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. literalinclude:: code/java/account_management/reset1_trigger_req_accountstore.java
      :language: java

.. only:: nodejs

  To trigger the password reset workflow, you call the ``resetPassword(options, callback)`` method on your Application instance:

  .. literalinclude:: code/nodejs/account_management/reset1_trigger_req.js
      :language: javascript

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. literalinclude:: code/nodejs/account_management/reset1_trigger_req_accountstore.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/reset1_trigger_req.php
      :language: php

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. literalinclude:: code/php/account_management/reset1_trigger_req_accountstore.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/reset1_trigger_req.py
      :language: python

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. literalinclude:: code/python/account_management/reset1_trigger_req_accountstore.py
      :language: python

If this is a valid email in an Account associated with this Application, you will get a success response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc3AyT2JRR2dEbjlSOTFSIiwiYWxnIjoiSFExaMPLe.eyJleHAiOjE0NDgwNDg4NDcsImp0aSI6IjJwSW44eFBHeURMTVM5WFpqyouVExaMPLe.cn9VYU3OnyKXN0dA0qskMv4T4jhDgQaRdA-youxaMPLe",
      "email": "phasma@empire.gov",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/2FvPkChR78oFnyfexample"
      }
    }

  .. note::

    For a full description of this endpoint please see :ref:`ref-password-reset-token` in the Reference chapter.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset1_trigger_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset1_trigger_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/reset1_trigger_resp.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/reset1_trigger_resp.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/reset1_trigger_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/reset1_trigger_resp.py
      :language: python

At this point, an email will be built using the password reset base URL specified in the Stormpath Admin Console. Stormpath sends an email (that you :ref:`can customize <password-reset-email-templates>`) to the user with a link in the format that follows:

``http://yoursite.com/path/to/reset/page?sptoken=$TOKEN``

So the user would then receive something that looked like this::

  Forgot your password?

  You've received a request to reset the password for this email address.

  To reset your password please click on this link or cut and paste this
  URL into your browser (link expires in 24 hours):
  https://api.stormpath.com/passwordReset?sptoken=eyJraWQiOiIxZ0JUbmNXc[...]

  This link takes you to a secure page where you can change your password.

**Verify the token**

Once the user clicks this link, your controller should retrieve the token from the query string and check it against the Stormpath API.

.. only:: rest

  This can be accomplished by sending a GET to the Application's ``/passwordResetTokens/$TOKEN_VALUE`` endpoint:

  .. code-block:: http

    GET /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc[...] HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

  This would result in the exact same ``HTTP 200`` success response as when the token was first generated above.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset2_verify_token.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset2_verify_token.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/reset2_verify_token.java
      :language: java

.. only:: nodejs

  This can be accomplished by calling the ``verifyPasswordResetToken(token, callback)`` method on your Application instance:

  .. literalinclude:: code/nodejs/account_management/reset2_verify_token.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/reset2_verify_token.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/reset2_verify_token.py
      :language: python

**Update the password**

.. only:: rest

  After a successful GET with the query string token, you can direct the user to a page where they can update their password. Once you have the password, you can update the Account resource with POST to the  ``passwordResetTokens`` endpoint. This is the same endpoint that you used to validate the token above.

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc[...] HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "password": "updated+Password1234"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset3_update.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset3_update.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/reset3_update.java
      :language: java

.. only:: nodejs

  After a successful GET with the query string token, you can direct the user to a page where they can update their password. Once you have the password, you can call the ``verifyPasswordResetToken(token, callback)`` method on your Application instance. This is the same method call that you used to validate the token above.

  .. literalinclude:: code/nodejs/account_management/reset3_update.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/reset3_update.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/reset3_update.py
      :language: python

On success, the response will include a link to the Account that the password was reset for. It will also send the password change confirmation email that was configured in the Administrator Console to the email account associated with the Account.

Manage Password Reset Emails
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Password Reset Email is configurable for a Directory.

There is a set of properties on the :ref:`ref-password-policy` resource that define its behavior. These properties are:

- ``resetEmailStatus`` which enables or disables the reset email.
- ``resetEmailTemplates`` which defines the content of the password reset email that is sent to the Account’s email address with a link to reset the Account’s password.
- ``resetSuccessEmailStatus`` which enables or disables the reset success email, and
- ``resetSuccessEmailTemplates`` which defines the content of the reset success email.

To control whether any email is sent or not is simply a matter of setting the appropriate value to either ``ENABLED`` or ``DISABLED``. For example, if you would like a Password Reset email to be sent, send the following:

.. only:: rest

  .. code-block:: http

    POST /v1/passwordPolicies/$DIRECTORY_ID HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "resetEmailStatus": "ENABLED"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/enable_pwd_reset_email.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/enable_pwd_reset_email.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/enable_pwd_reset_email.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/enable_pwd_reset_email.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/enable_pwd_reset_email.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/enable_pwd_reset_email.py
      :language: python

.. _password-reset-email-templates:

Password Reset Email Templates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: rest

  The contents of the password reset and the password reset success emails are both defined in an :ref:`ref-emailtemplates` collection.

  To modify the emails that get sent during the password reset workflow, all you have to do is send an HTTP POST with the desired property in the payload body.

.. only:: csharp or vbnet

  .. only:: csharp

  .. only:: vbnet

.. only:: java

.. only:: nodejs

.. only:: php

.. only:: python

.. _verify-account-email:

4.5. How to Verify an Account's Email
=====================================

If you want to verify that an Account’s email address is valid and that the Account belongs to a real person, Stormpath can help automate this for you using `Workflows <http://docs.stormpath.com/console/product-guide/#directory-workflows>`_.

4.5.1. The Email Verification Workflow
--------------------------------------

This workflow involves 3 parties: your application's end-user, your application, and the Stormpath API server.

1. When the Account is created in a Directory that has “Verification” enabled, Stormpath will automatically send an email to the Account's email address.
2. The end-user opens their email and clicks the verification link. This link comes with a token.
3. With the token, your application calls back to the Stormpath API server to complete the process.

If you create a new Account in a Directory with both Account Registration and Verification enabled, Stormpath will automatically send a welcome email that contains a verification link to the Account’s email address on your behalf. If the person reading the email clicks the verification link in the email, the Account will then have an ``ENABLED`` status and be allowed to log in to applications.

.. note::

  Accounts created in a Directory that has the Verification workflow enabled will have an ``UNVERIFIED`` status by default. ``UNVERIFIED`` is the same as ``DISABLED``, but additionally indicates why the Account is disabled. When the email link is clicked, the Account's status will change ``ENABLED``.


The Account Verification Base URL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is also expected that the workflow’s **Account Verification Base URL** has been set to a URL that will be processed by your own application web server. This URL should be free of any query parameters, as the Stormpath back-end will append on to the URL a parameter used to verify the email. If this URL is not set, a default Stormpath-branded page will appear which allows the user to complete the workflow.

.. note::

  The Account Verification Base URL defaults to a Stormpath API Sever URL which, while it is functional, is a Stormpath API server web page. Because it will likely confuse your application end-users if they see a Stormpath web page, we strongly recommended that you specify a URL that points to your web application.

4.5.2. Configuring the Verification Workflow
---------------------------------------------

This workflow is disabled by default on Directories, but you can enable it, and set up the account verification base URL, easily in the Stormpath Admin Console UI. Refer to the `Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/#directory-workflows>`_ for complete instructions.

4.5.3. Triggering the Verification Email (Creating A Token)
-----------------------------------------------------------

In order to verify an Account’s email address, an ``emailVerificationToken`` must be created for that Account. To create this token, you simply create an Account in a Directory, either programmatically or via a public account creation form of your own design, that has the account registration and verification workflows enabled.

4.5.4. Verifying the Email Address (Consuming The Token)
--------------------------------------------------------

The email that is sent upon Account creation contains a link to the base URL that you've configured, along with the ``sptoken`` query string parameter::

  http://www.yourapplicationurl.com/path/to/validator/?sptoken=$VERIFICATION_TOKEN

.. only:: rest

  The token you capture from the query string is used to form the full ``href`` for a special email verification endpoint used to verify the Account::

    /v1/accounts/emailVerificationsToken/$VERIFICATION_TOKEN

  To verify the Account, you use the token from the query string to form the above URL and POST a body-less request against the fully-qualified end point:

  .. code-block:: http

    POST /v1/accounts/emailVerificationTokens/6YJv9XBH1dZGP5A8rq7Zyl HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/accounts/6XLbNaUsKm3E0kXMTTr10V
    Content-Type: application/json;charset=UTF-8;

    {
      "href": "https://api.stormpath.com/v1/accounts/6XLbNaUsKm3E0kXMTTr10V"
    }

  If the validation succeeds, you will receive back the ``href`` for the Account resource which has now been verified. An email confirming the verification will be automatically sent to the Account’s email address by Stormpath afterwards, and the Account will then be able to authenticate successfully.

  If the verification token is not found, a ``404 Not Found`` error is returned with a payload explaining why the attempt failed.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/verify_email_req.cs
        :language: csharp

    .. literalinclude:: code/csharp/account_management/verify_email_resp.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/verify_email_req.vb
        :language: vbnet

    .. literalinclude:: code/vbnet/account_management/verify_email_resp.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/verify_email_req.java
      :language: java

  .. literalinclude:: code/java/account_management/verify_email_resp.java
      :language: java

.. only:: nodejs

  To verify the Account, you use the token from the query string to form the above URL and POST a body-less request against the fully-qualified end point:

  .. literalinclude:: code/nodejs/account_management/verify_email_req.js
      :language: javascript

  Which will return a result that looks like this:

  .. literalinclude:: code/nodejs/account_management/verify_email_resp.js
      :language: javascript

  If the validation succeeds, you will receive an Account instance for the account that was verified. An email confirming the verification will be automatically sent to the Account’s email address by Stormpath afterwards, and the Account will then be able to authenticate successfully.

  If the verification token is not found, a error is returned with a message explaining why the attempt failed.

.. only:: php

  .. literalinclude:: code/php/account_management/verify_email_req.php
      :language: php

  .. literalinclude:: code/php/account_management/verify_email_resp.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/verify_email_req.py
      :language: python

  .. literalinclude:: code/python/account_management/verify_email_resp.py
      :language: python

.. note::

  For more about Account Authentication you can read :ref:`the next chapter <authn>`.

.. _resending-verification-email:

4.5.5. Resending the Verification Email
---------------------------------------

.. only:: rest

  If a user accidentally deletes their verification email, or it was undeliverable for some reason, it is possible to resend the email using the :ref:`Application resource's <ref-application>` ``/verificationEmails`` endpoint.

  .. code-block:: http

    POST /v1/applications/$APPLICATION_ID/verificationEmails HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "login": "email@address.com"
    }

  If this calls succeeds, an ``HTTP 202 ACCEPTED`` will return.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/resend_verification_email.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/resend_verification_email.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/resend_verification_email.java
      :language: java

.. only:: nodejs

  If a user accidentally deletes their verification email, or it was undeliverable for some reason, it is possible to resend the email using the ``resendVerificationEmail(options, callback)`` method of your Application instance.

  .. literalinclude:: code/nodejs/account_management/resend_verification_email.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/resend_verification_email.php
      :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/resend_verification_email.py
      :language: python

4.6. Customizing Stormpath Emails via REST
==========================================

4.6.1. What Emails Does Stormpath Send?
---------------------------------------

Stormpath can be configured to send emails to users as part of a Directory's Account Creation and Password Reset policies.

Account Creation
^^^^^^^^^^^^^^^^

Found in: :ref:`ref-accnt-creation-policy`

- *Verification Email*: The initial email that is sent out after Account creation that verifies the email address that was used for registration with a link containing the verification token.
- *Verification Success Email*: An email that is sent after a successful email verification.
- *Welcome Email*: An email welcoming the user to your application.

For more information about this, see :ref:`verify-account-email`.

Password Reset
^^^^^^^^^^^^^^

Found in: :ref:`ref-password-policy`

- *Reset Email*: The email that is sent out after a user asks to reset their password. It contains a URL with a password reset token.
- *Reset Success Email*:  An email that is sent after a successful password reset.

For more information about this, see :ref:`password-reset-flow`.

.. _customizing-email-templates:

4.6.2. Customizing Stormpath Email Templates
--------------------------------------------

.. only:: rest

  The emails that Stormpath sends to users be customized by modifying the :ref:`ref-emailtemplates` resource. This can be done either via the "Directory Workflows" section of the `Stormpath Admin Console <https://api.stormpath.com/login>`__, or via REST. To find out how to do it via REST, keep reading.

  First, let's look at the default template that comes with the Stormpath Administrator's Directory:

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/emailTemplates/2jwPxFsnjqxYrojvU1m2Nh",
      "name":"Default Verification Email Template",
      "description":"This is the verification email template that is associated with the directory.",
      "fromName":"Jakub Swiatczak",
      "fromEmailAddress":"change-me@stormpath.com",
      "subject":"Verify your account",
      "textBody":"Hi,\nYou have been registered for an application that uses Stormpath.\n\n${url}\n\nOnce you verify, you will be able to login.\n\n---------------------\nFor general inquiries or to request support with your account, please email change-me@stormpath.com",
      "htmlBody":"<p>Hi,</p>\n<p>You have been registered for an application that uses Stormpath.</p><a href=\"${url}\">Click here to verify your account</a><p>Once you verify, you will be able to login.</p><p>--------------------- <br />For general inquiries or to request support with your account, please email change-me@stormpath.com</p>",
      "mimeType":"text/plain",
      "defaultModel":{
        "linkBaseUrl":"https://api.stormpath.com/emailVerificationTokens"
      }
    }

  **Message Format**

  The ``mimeType`` designates whether the email is sent as plain text (``text/plain``), HTML (``text/html``), or both (``multipart/alternative``). This in turns tells Stormpath whether to use the ``textBody`` or ``htmlBody`` text in the email, or to let the email client decide.

  **textBody and htmlBody**

  These define the actual content of the email. The only difference is that ``htmlBody`` is allowed to contain HTML markup while ``textBody`` only accepts plaintext. Both are also able to use `Java Escape Sequences <http://web.cerritos.edu/jwilson/SitePages/java_language_resources/Java_Escape_Sequences.htm>`__. Both ``htmlBody`` and ``textBody`` can have customized output generated using template macros.

.. only:: csharp or vbnet

  .. only:: csharp

  .. only:: vbnet

.. only:: java

.. only:: nodejs

The Node.js SDK does not support customizing the email templates that Stormpath sends. So if you want to change these, then this should be done via the "Directory Workflows" section of the `Stormpath Admin Console <https://api.stormpath.com/login>`__.

.. only:: php

.. only:: python

.. _using-email-macros:

Using Email Macros
^^^^^^^^^^^^^^^^^^

You can use macros in your email templates. Macros are placeholder text that are converted into actual values at the time the email is generated. You could use a macro to insert your user's first name into the email, as youll as the name of your Application. This would look like this:

.. code-block:: java

  "Hi ${account.givenName}, welcome to $!{application.name}!"

The basic structure for a macro is ``${resource.attribute}``. There are three kinds of ``resource`` that you can work with:

- Account (``${account}``)
- an Account's Directory (``${account.directory}``), and
- an Application (``$!{application}``).

You can also include any ``attribute`` that isn't a link, as youll as customData.

For a full list of email macros, see the :ref:`ref-email-macros` section of the Reference chapter.

Macros and customData
"""""""""""""""""""""

The formatting for customData macros is as follows:

.. code-block:: java

  $!{resource.attribute.customData.key}

You may have noticed here and with the Application resource that there is an included ``!`` character, this is called a "quiet reference".

.. _quiet-macro-reference:

Quiet References
""""""""""""""""

Quiet references (``!``) tell Stormpath that, if it can't resolve the object, it should just show nothing. Normally, if a macro was  ``Is your favorite color ${account.customData.favoriteColor}?``, and Stormpath was able to find the value as ``blue``, it would output:

``Is your favorite color blue?``

However, if the value could not be found, it would output:

``Is your favorite color ${account.customData.favoriteColor}?``

To avoid this, you include the ``!`` which puts the macro into "quiet reference" mode. This means that if the value is not found, the output will be:

``Is your favorite color ?``

Since customData can contain any arbitrary key-value pairs, Stormpath recommends that any email macro references to customData keys use the ``!`` quiet reference. Applications should also use the quiet reference because there are possible cases where the templating engine might not have access to an Application resource.
.. _account-mgmt:

**********************
3. Account Management
**********************

This chapter provides the information necessary for you to understand the resources and processes involved in Account Management in Stormpath. In addition to information about the different types of resources, it also contains examples of the steps required in setting up a basic user Account with membership in a Group. If you'd like to skip to those steps they are:

1. :ref:`Creating a Directory <make-cloud-dir>`
2. :ref:`Creating a Group <make-group>`
3. :ref:`Adding an Account to a Directory <add-new-account>`
4. :ref:`Adding our Account to a Group <add-account-to-group>`

The final step that would allow this Account to actually log in to the application is covered in :ref:`the Authentication chapter <create-asm>`.

3.1. Modeling Your User Base
============================

The first topic that we need to address is how user modeling works inside Stormpath.

User Accounts in Stormpath aren't directly associated with Applications, but only indirectly via **Directories**, **Organizations**, and also possibly **Groups**.

All of your Accounts will have to be associated with at least one Directory resource, so you can start there.

.. _directory-mgmt:

3.1.1. Directories
-------------------

The **Directory** resource is a top-level container for Account and Group resources. Directories and Groups are both referred to as "Account Stores". A Directory also manages security policies (like password strength) for the Accounts it contains. Directories can be used to cleanly manage segmented user Account populations. For example, you might use one Directory for company employees and another Directory for customers, each with its own security policies.

.. only:: rest

  For more detailed information about the Directory resource, please see the :ref:`ref-directory` section in the Reference chapter.

.. only:: csharp or vbnet

  In the Stormpath .NET SDK, the Directory resource is represented by the ``IDirectory`` interface. For more information, see the `.NET API documentation <http://docs.stormpath.com/dotnet/api/html/T_Stormpath_SDK_Directory_IDirectory.htm>`__.

.. only:: java

  In the Stormpath Java SDK, the Directory resource is represented by the ``Directory`` interface. For more information, see the `Javadoc for Directory <https://docs.stormpath.com/java/apidocs/com/stormpath/sdk/directory/Directory.html>`__.

.. only:: php

  For more detailed information about the Directory object, please see the `PHP API Documentation <https://docs.stormpath.com/php/apidocs/Stormpath/Resource/Directory.html>`__.

.. only:: python

  .. todo::
    Add a link to the API docs.

.. only:: python

  .. todo::
    Add a link to the API docs.

Types of Directories
^^^^^^^^^^^^^^^^^^^^
Stormpath supports two types of Directories:

1. Natively-hosted **Cloud Directories** that originate in Stormpath
2. **Mirror Directories** that act as secure replicas of existing user directories outside of Stormpath, for example those on LDAP Directory servers, on Facebook and other websites, as well as in Identity Providers that support SAML.

You can add as many Directories of each type as you require.

.. note::

  Multiple Directories are a more advanced feature of Stormpath. If you have one or more applications that all access the same Accounts, you usually only need a single Directory, and you do not need to be concerned with creating or managing multiple Directories.

  If however, your application needs to support login for :ref:`multiple external third-party accounts <supporting-multiple-dirs>`, or you have more complex account segmentation needs, Directories will be a powerful tool to manage your application's user base.

.. _about-cloud-dir:

Cloud Directories
^^^^^^^^^^^^^^^^^
This is the standard, default Directory resource.

.. _make-cloud-dir:

How to Make a Cloud Directory
"""""""""""""""""""""""""""""

.. only:: not python

  The following request:

.. only:: rest

  .. code-block:: http

    POST /v1/directories HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

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

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/create_cloud_dir_req.rb
    :language: ruby

.. only:: rest

  Would yield the following response:

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

  Would create the "Captains" Directory in Stormpath and update the ``captainsDirectory`` variable. The properties and methods available on ``captainsDirectory`` represent the resource information and the actions that can be performed on the resource.

  .. note::

    See the `.NET API documentation <http://docs.stormpath.com/dotnet/api/html/T_Stormpath_SDK_Directory_IDirectory.htm>`__ for a full list of available properties and methods on the ``IDirectory`` type (or any other Stormpath SDK type).

.. only:: java

  Would create the "Captains" Directory in Stormpath and update the ``captainsDirectory`` variable. The properties and methods available on ``captainsDirectory`` represent the resource information and the actions that can be performed on the resource.

  .. note::

    See the `Javadocs <https://docs.stormpath.com/java/apidocs/com/stormpath/sdk/directory/Directory.html>`__ for a full list of available properties and methods on the ``Directory`` interface (or any other Stormpath SDK type).

.. only:: nodejs

  Would yield the following response:

  .. literalinclude:: code/nodejs/account_management/create_cloud_dir_resp.js
    :language: javascript

.. only:: php

  Would yield the following response:

  .. literalinclude:: code/php/account_management/create_cloud_dir_resp.php
    :language: php

At this point, our current resources (**not including the default ones** created in the :ref:`Quickstart<quickstart>`) can be visualized like this:

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

For all Mirror Directories, since the relationship with the outside directory is read-only, the remote directory is still the "system of record". This means that you cannot do things like create your own Groups, only read the Groups (if any) synchronized from the external directory.

.. _supporting-multiple-dirs:

**Supporting Multiple Mirror Directories**

It is possible to use different kinds of Directories simultaneously, to allow users to log-in with multiple external systems at the same time. For example, if you wanted to enable logging-in with Facebook, LinkedIn, and Salesforce, this would require a separate Mirror Directory for each one.

If multiple Directories are desired, we recommend that you create a separate "master" Directory that allows for a unified user identity. This master Directory would link all the Accounts in Mirror Directories with a master Account in a master Directory.

For information about how login works with master Directories, please see :ref:`account-linking`.

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

The Stormpath Agent is regularly updating its LDAP Directory and sometimes adding new user Accounts and/or Groups. Because this data can be quite fluid, we recommend initiating all provisioning, linking, and synchronization on a successful login attempt of the Account in the LDAP Directory. This means that the master Directory would start off empty, and would then gradually become populated every time a user logged in.

For more information on how to this works, please see :ref:`ldap-dir-authn`.

.. _make-ldap-dir:

How to Make an LDAP Directory
+++++++++++++++++++++++++++++

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. For updates, you can follow `ticket #167 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/167>`_ on Github.

    In the meantime, please use the Stormpath Admin Console, or consult the REST API documentation below.

    .. todo::

      Add LDAP directory creation .NET example

.. only:: java

  .. warning::

    This feature is not yet available in the Java SDK.

    In the meantime, please use the Stormpath Admin Console, or consult the REST API documentation.

    .. todo::

      Add LDAP directory creation Java example

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_ldap_dir_req.js
    :language: javascript

.. only:: php

   .. warning::

    This feature is not yet available in the PHP SDK. For updates, you can follow `ticket #148 <https://github.com/stormpath/stormpath-sdk-php/issues/148>`_ on Github.

    In the meantime, please use the Stormpath Admin Console, or consult the REST API documentation below.

    .. todo::

      Add LDAP directory creation PHP example

.. only:: python

  LDAP Directories can be made using the Stormpath Admin Console, or using the Python SDK. If you'd like to do it with the Admin Console, please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

  Here's how you can create an LDAP Directory:

  .. literalinclude:: code/python/account_management/create_ldap_dir_req.py
    :language: python

.. only:: ruby

  .. warning::

    This feature is not yet available in the Ruby SDK. For updates, you can follow `ticket #161 <https://github.com/stormpath/stormpath-sdk-ruby/issues/161>`_ on Github.
    In the meantime, please use the Stormpath Admin Console. Please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

  .. todo::

    Add LDAP directory creation Ruby example

.. only:: rest or csharp or vbnet or php

  LDAP Directories can be made using the Stormpath Admin Console, or using the REST API. If you'd like to do it with the Admin Console, please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

  For more information about creating them using REST API, please see :ref:`ldap-dir-authn`.

.. _about-social-dir:

Social Directories
""""""""""""""""""

Stormpath works with user Accounts pulled from social login providers (currently Google, Facebook, Github, and LinkedIn) in a way very similar to the way it works with user Accounts from LDAP servers. These external social login providers are modeled as Stormpath Directories, much like LDAP Directories. The difference is that, while LDAP Directories always come with an Agent that takes care of synchronization, Social Directories have an associated **Provider** resource. This resource contains the information required by the social login site to work with their site (e.g. the App ID for your Google application).

Stormpath also simplifies the authorization process by doing things like automating Google's access token exchange flow. All you do is POST the authorization code from the end-user and Stormpath returns a new or updated user Account, along with the Google access token which you can use for any further API calls.

Modeling Social Directories
++++++++++++++++++++++++++++

Modeling your users who authorize via Social Login is by necessity very simple, since social login providers do not include the concept of "groups" of users in the same way that LDAP directories do. The only thing that you really have to do as an app developer is create a Directory resource for each social provider that you want to support. As mentioned :ref:`above <supporting-multiple-dirs>`, if you want to support multiple Directories then you may also want to create a master Directory for your application. For more about how Social Directories are provisioned, please see :ref:`account-linking`.

How to Make a Social Directory
++++++++++++++++++++++++++++++

.. only:: rest

  Social Directories can be made using the Stormpath Admin Console, or using the REST API. For more information about creating them with the Admin Console please see the `Directories section of the Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

.. only:: not rest

  Social Directories can be made using the Stormpath Admin Console, or using the |language| SDK. For more information about creating them with the Admin Console please see the `Directories section of the Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#create-a-directory>`_.

.. only:: rest

  For more information about creating them using the REST API, please see :ref:`social-authn`.

.. only:: not rest

  For more information about creating them using the |language| SDK, please see :ref:`social-authn`.

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

  SAML Directories can be made using the :ref:`Stormpath Admin Console <saml-configuration>` or the REST API.

.. only:: not rest

  SAML Directories can be made using the :ref:`Stormpath Admin Console <saml-configuration>` or the |language| SDK.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. For updates, you can follow `ticket #111 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/111>`_ on Github.

    In the meantime, please use the Stormpath Admin Console, or consult the REST API documentation.

    .. todo::

      Add SAML directory creation .NET example

.. only:: java

  In order to create a SAML Directory using the Java SDK, you will need to gather some information from your SAML service provider:

  * X509 Certificate
  * SSO Login URL
  * SSO Logout URL

  With this information in hand, you make a ``CreateProviderRequest`` and pass that to a ``CreateDirectoryRequest``.

  .. literalinclude:: code/java/account_management/create_saml_dir_req.java
      :language: java

.. only:: (python or php or nodejs or ruby)

  For more information about creating them using the |language| SDK, see :ref:`saml-configuration-rest`.

.. only:: rest or csharp or vbnet

  For more information about creating them using the REST API, see :ref:`saml-configuration-rest`.

.. _group-mgmt:

3.1.2. Groups
--------------

The other type of Account Store is the Group resource, which can either be imagined as a container for Accounts, or as a label applied to them. Groups can be used in a variety of ways, including organizing people by geographic location, or by their role within a company.

.. only:: rest

  For more detailed information about the Group resource, please see the :ref:`ref-group` section of the Reference chapter.

.. only:: csharp or vbnet

  In the Stormpath .NET SDK, the Group resource is represented by the ``IGroup`` interface. For more information, see the `.NET API documentation <http://docs.stormpath.com/dotnet/api/html/T_Stormpath_SDK_Group_IGroup.htm>`__.

.. only:: java

  In the Stormpath Java SDK, the Group resource is represented by the ``Group`` interface. For more information, see the `Javadocs API documentation <https://docs.stormpath.com/java/apidocs/com/stormpath/sdk/group/Group.html>`__.

.. only:: php

  For more information about creating them using the |language| SDK, see :ref:`saml-configuration-rest`.

.. only:: python

  Here's how you can create a Group:

  .. literalinclude:: code/python/account_management/create_group_req.py
    :language: python

.. only:: ruby

  Here's how you can create a Group:

  .. literalinclude:: code/ruby/account_management/create_group_req.rb
    :language: ruby

.. todo::

  This will need links to the generated documentation for the SDKs.

.. _hierarchy-groups:

Modeling User Hierarchies Using Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Groups, like labels, are inherently "flat". This means that they do not by default include any kind of hierarchy. If a hierarchical or nested structure is desired, it can be simulated in one of two ways: Either, using the Group resource's ``description`` field, or with the Group's associated customData resource.

A geographical region can, for example, be represented as ``"North America/US/US East"`` in the Group's ``description`` field, allowing for queries to be made using simple pattern-matching queries. So to find all Groups in the US, you'd make the following request:

.. only:: rest

  .. code-block:: http

    GET /v1/directories/$DIRECTORY_ID/groups?description=*/US* HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. warning::

    This functionality is not yet available in the Ruby SDK. For updates, please follow `ticket #162 <https://github.com/stormpath/stormpath-sdk-ruby/issues/162>`_ on Github.

  .. todo::

    Add code for searching groups by description field

Or, to find all Groups in the US East region only, you would send this request:

.. only:: rest

  .. code-block:: http

    GET /v1/directories/$DIRECTORY_ID/groups?description=*/US%20East* HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. warning::

    This functionality is not yet available in the Ruby SDK. For updates, please follow `ticket #162 <https://github.com/stormpath/stormpath-sdk-ruby/issues/162>`_ on Github.

  .. todo::

    Add code for searching groups by description field


It can also be included in the customData resource, as a series of key-value relations.

.. _make-group:

How to Create a Group
^^^^^^^^^^^^^^^^^^^^^

So let's say you want to add a new Group resource with the name "Starfleet Officers" to the "Captains" Directory.

.. note::

  Although in this example we use the Directory's `/groups` endpoint, it is also possible to use an Application or Organization's `/groups` endpoint. For more information see :ref:`below <add-to-app-or-org>`.

.. only:: rest

  The following request:

  .. code-block:: http

    POST /v1/directories/2SKhstu8PlaekcaEXampLE/groups HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "name" : "Starfleet Officers",
      "description" : "Commissioned officers in Starfleet",
      "status" : "enabled"
    }

  .. note::

    Although in this example we use the Directory's `/groups` endpoint, it is also possible to use an Application or Organization's `/groups` endpoint. For more information see :ref:`below <add-to-app-or-org>`.

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

  You would do this by issuing the following request:

  .. literalinclude:: code/python/account_management/create_group_req.py
    :language: python

.. only:: ruby

  You would do this by issuing the following request:

  .. literalinclude:: code/ruby/account_management/create_group_req.rb
    :language: ruby

.. only:: rest

  Would yield this response:

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

  Would create the "Starfleet Officers" Group in the "Captains" Directory in Stormpath, and update the local ``officersGroup`` variable to reflect the API resource.

  .. note::

    By default, new Groups created will have a ``Status`` of ``enabled``. If you'd like to create an initially-disabled Group, use this more-expressive syntax:

    .. only:: csharp

      .. literalinclude:: code/csharp/account_management/create_disabled_group_req.cs
        :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/account_management/create_disabled_group_req.vb
        :language: vbnet

.. only:: java

  Would create the "Starfleet Officers" Group in the "Captains" Directory in Stormpath, and update the local ``officersGroup`` variable to reflect the API resource.

  .. note::

    By default, newly created Groups will have a ``Status`` of ``enabled``. If you'd like to create an initially-disabled Group, use this syntax:

    .. only:: java

      .. literalinclude:: code/java/account_management/create_disabled_group_req.java
        :language: java

.. only:: nodejs

  Would yield this response:

  .. literalinclude:: code/nodejs/account_management/create_group_resp.js
    :language: javascript

.. only:: php

  Would yield this response:

  .. literalinclude:: code/php/account_management/create_group_resp.php
    :language: php

You can now see how this Group would look in our Tenant:

.. figure:: images/accnt_mgmt/am_erd_02.png
  :align: center
  :scale: 100%
  :alt: <ERD with Directory and Group>

There is our Application, Directory, and our newly-created Group, and they are all found inside the Stormpath Tenant.

.. _account-creation:

3.2. How to Store Accounts in Stormpath
=======================================

The Account resource is a unique identity within your application. It is usually used to model an end-user, although it can also be used by a service, process, or any other entity that needs to log-in to Stormpath.

.. only:: rest

  For more detailed information about the Account resource, see the :ref:`ref-account` section of the Reference chapter.

.. only:: csharp or vbnet

  In the Stormpath .NET SDK, the Account resource is represented by the ``IAccount`` interface. For more information, see the `.NET API documentation <http://docs.stormpath.com/dotnet/api/html/T_Stormpath_SDK_Account_IAccount.htm>`__.

.. only:: java

  In the Stormpath Java SDK, the Account resource is represented by the ``Account`` interface. For more information, see the `Javadocs API documentation <https://docs.stormpath.com/java/apidocs/com/stormpath/sdk/account/Account.html>`__.

.. only:: php

  For more detailed information about the Account resource, see the `PHP API Documentation <https://docs.stormpath.com/php/apidocs/Stormpath/Resource/Account.html>`__.

3.2.1. New Account Creation
---------------------------

The basic steps for creating a new Account are covered in the :ref:`Quickstart <quickstart>` chapter. In that example, we show you how to add an Account to an Application. Below, we will also show you how to add an Account to a specific Directory, or Group.

.. _add-new-account:

Add a New Account to a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because Accounts are "owned" by Directories, you create new Accounts by adding them to a Directory. You can add an Account to a Directory directly, or you can add it indirectly by registering an Account with an Application, like in the :ref:`Quickstart <quickstart>`, or an Organization, like in :ref:`the Multi-tenancy Chapter <add-accnt-to-org>`. This is only the case for Cloud Directories. Accounts cannot be directly added to :ref:`Mirror <about-mirror-dir>` Directories since those pull all of their Account information from external sources like Facebook or Active Directory.

.. only:: rest

  .. note::

    This section will show examples using a Directory's ``/accounts`` href, but they will also function the same if you use an Application’s or Organization's ``/accounts`` href instead. For more information about, see :ref:`below <add-to-app-or-org>`.

  Let's say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory, which has the ``directoryId`` value ``2SKhstu8PlaekcaEXampLE``. The following API request:

  .. code-block:: http

    POST /v1/directories/2SKhstu8PlaekcaEXampLE/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "username" : "jlpicard",
      "email" : "capt@enterprise.com",
      "givenName" : "Jean-Luc",
      "surname" : "Picard",
      "password" : "uGhd%a8Kl!"
    }

.. only:: csharp or vbnet

  Let's say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory that you created earlier. You can use the Directory's ``CreateAccountAsync()`` method:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_account_in_dir_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_account_in_dir_req.vb
      :language: vbnet

.. only:: (java or nodejs)

  Let's say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory that you created earlier. You can use the Directory's ``createAccount()`` method:

.. only:: java

  .. literalinclude:: code/java/account_management/create_account_in_dir_req.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/create_account_in_dir_req.js
    :language: javascript

.. only:: php

  Let’s say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory that you created earlier. You can use the Directory's ``createAccount()`` method:

  .. literalinclude:: code/php/account_management/create_account_in_dir_req.php
    :language: php

.. only:: python

  Let's say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory that you created earlier. You can do this like so:

  .. literalinclude:: code/python/account_management/create_account_in_dir_req.py
    :language: python

.. only:: ruby

  Let's say you want to add a new Account for user "Jean-Luc Picard" to the "Captains" Directory that you created earlier. You can do this like so:

  .. literalinclude:: code/ruby/account_management/create_account_in_dir_req.rb
    :language: ruby

.. note::

  The password in the request is being sent to Stormpath as plain text. This is one of the reasons why Stormpath only allows requests via HTTPS. Stormpath implements the latest password hashing and cryptographic best-practices that are automatically upgraded over time so the developer does not have to worry about this. Stormpath can only do this for the developer if you receive the password as plaintext, and only hash it using these techniques.

  Plaintext passwords also allow Stormpath to enforce password restrictions in a configurable manner.

  Most importantly, Stormpath never persists or relays plaintext passwords under any circumstances.

  On the client side, then, you do not need to worry about salting or storing passwords at any point; you need only pass them to Stormpath for hashing, salting, and persisting with the appropriate HTTPS API call.

.. only:: rest

  Would yield this response:

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

.. only:: php

  Would yield this response:

  .. literalinclude:: code/php/account_management/create_account_in_dir_resp.php
    :language: php

Going back to our resource diagram:

.. figure:: images/accnt_mgmt/am_erd_03.png
  :align: center
  :scale: 100%
  :alt: ERD with groupMembership

The new Account is now in the "Captains" Directory.

.. _add-account-to-group:

Add an Existing Account to a Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

So let's say you want to add "Jean-Luc Picard" to the "Starfleet Officers" Group inside the "Captains" Directory. Once again, this is possible because we are working with a Cloud Directory. If we were working with a :ref:`Mirror Directory <about-mirror-dir>`, we would not be able to manually add Groups since that information is pulled from the external user directory.

.. only:: rest

  You make the following request:

  .. code-block:: http

    POST /v1/groupMemberships HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  This time, use the existing Account instance you created before, and the ``AddAccountAsync()`` method of the Group object:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_account_to_group_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_account_to_group_req.vb
      :language: vbnet

.. only:: java

  This time, use the existing Account instance you created before, and the ``addAccount()`` method of the Group object:

  .. literalinclude:: code/java/account_management/add_account_to_group_req.java
    :language: java

.. only:: nodejs

  Using the SDK, you will want to fetch the Group and the Account objects.  Then you can use the ``addAccount()`` method
  of the Group to create the membership:

  .. literalinclude:: code/nodejs/account_management/add_account_to_group_req.js
    :language: javascript

.. only:: php

  This time, use the existing Account instance you created before, and the ``addAccount()`` method of the Group object:

  .. literalinclude:: code/php/account_management/add_account_to_group_req.php
    :language: php

.. only:: python

  This time, use the existing Account instance you created before, like so:

  .. literalinclude:: code/python/account_management/add_account_to_group_req.py
    :language: python

.. only:: ruby

  This time, use the existing Account instance you created before, like so:

  .. literalinclude:: code/ruby/account_management/add_account_to_group_req.rb
    :language: ruby

.. only:: rest

  And get the following response:

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

.. only:: nodejs

  And get the following response:

  .. literalinclude:: code/nodejs/account_management/add_account_to_group_resp.js
    :language: javascript

This would leave us with the following resources:

.. figure:: images/accnt_mgmt/am_erd_final.png
  :align: center
  :scale: 100%
  :alt: Final ERD

This our completed resource set, with an Account that is a member of a Group inside a Directory. That Directory, along with the Application, sit inside the Stormpath Tenant. Notice, however, that there is no association between the Application and the Directory. For more information about this, please see :ref:`the Authentication chapter <create-asm>`.

.. _add-to-app-or-org:

Adding a new Account or Group to an Application or Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: rest or csharp or vbnet or php or python or ruby

  Instead of adding an Account via the Directory's ``/accounts`` endpoint, it is also possible to use an Application's ``/accounts`` endpoint::

    POST /v1/applications/1gk4Dxzi6o4Pbdlexample/accounts HTTP/1.1

  Or the same endpoint found on an Organization::

    POST /v1/organizations/2P4XOanz26AUomIexample/accounts HTTP/1.1

  This will then add the Account to the Directory that is set as that Application or Organization's **Default Account Store**. What this means is that Stormpath will go through the Application/Organization's list of Account Store Mappings (found in the ``/accountStoreMappings`` collection) and find the Account Store Mapping where ``isDefaultAccountStore`` is set to ``true``. The Account will then be added to that Account Store.

  All of this is also true for adding Groups, except in that case you would use the ``/groups`` endpoint and Stormpath would add the Group to the Account Store Mapping that had ``isDefaultGroupStore`` set to ``true``.

.. only:: java or nodejs

  Instead of adding an ``Account`` via the ``Directory``, it is also possible to use the ``Application``:

  .. only:: java

    .. literalinclude:: code/java/account_management/add_account_using_application.java
      :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/account_management/add_account_using_application.js
      :language: javascript

  Or you can do the same with an ``Organization``:

  .. only:: java

    .. literalinclude:: code/java/account_management/add_account_using_organization.java
        :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/account_management/add_account_using_organization.js
        :language: javascript

  This will then add the Account to the Directory that is set as that Application or Organization's **Default Account Store**. What this means is that Stormpath will go through the Application/Organization's list of Account Store Mappings (found in the ``AccountStoreMapping`` collection) and find the Account Store Mapping where ``isDefaultAccountStore`` is set to ``true``. The Account will then be added to that Account Store.

  All of this is also true for adding Groups, except in that case you would use a ``Group`` object and Stormpath would add the Group to the Account Store Mapping that had ``isDefaultGroupStore`` set to ``true``.

.. _importing-accounts:

3.2.2. Importing Accounts
-------------------------

Stormpath also makes it very easy to transfer your existing users into a Stormpath Directory using our API. Depending on how you store your passwords, you will use one of three approaches:

1. **Plaintext Passwords:** If your stored passwords in plaintext, you can use the Stormpath API to import them directly. Stormpath will create the Accounts and secure their passwords automatically (within our system). Make sure that your Stormpath Directory is configured to *not* send Account Verification emails before beginning import.
2. **Supported Password Hashes:** If your password hashing algorithm follows a format Stormpath supports, you can use the API to import Accounts directly using Modular Crypt Format (MCF). Supported formats and instructions are detailed :ref:`below <importing-mcf>`.
3. **Unsupported Password Hashes:** If your password hashes are in a format Stormpath does not support, you can still use the API to create the Accounts, but you will need to issue a password reset afterwards. Otherwise, your users won't be able to to log in.

.. note::

  To import user accounts from an LDAP or Social Directory, please see :ref:`account-linking`.

Due to the sheer number of database types and the variation between individual data models, the actual importing of users is not something that Stormpath handles at this time. What we recommend is that you write a script that is able to iterate through your database and grab the necessary information. Then the script can use our API to upload the users to Stormpath.

Importing Accounts with Plaintext Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this case, it is recommended that you suppress Account Verification emails.

.. only:: rest

  This can be done by adding a ``registrationWorkflowEnabled=false`` query parameter to the end of your API like so::

    https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbeXaMPLE/accounts?registrationWorkflowEnabled=false

.. only:: csharp or vbnet

  This can be done by setting the ``RegistrationWorkflowEnabled`` flag when creating the Account:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_account_disable_reg_workflow.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_account_disable_reg_workflow.vb
      :language: vbnet

.. only:: java or nodejs

  This can be done by setting the ``registrationWorkflowEnabled`` flag when creating the Account:

  .. only:: java

    .. literalinclude:: code/java/account_management/create_account_disable_reg_workflow.java
      :language: java

  .. only:: nodejs

    .. literalinclude:: code/nodejs/account_management/create_account_disable_reg_workflow.js
      :language: javascript

.. only:: php

  This can be done by setting the ``RegistrationWorkflowEnabled`` flag when creating the Account:

  .. literalinclude:: code/php/account_management/create_account_disable_reg_workflow.php
    :language: php

.. only:: python

  This can be done by setting the ``registration_workflow_enabled`` flag when creating the Account:

  .. literalinclude:: code/python/account_management/create_account_disable_reg_workflow.py
    :language: python

.. only:: ruby

  This can be done by setting the ``registration_workflow_enabled`` flag when creating the Account:

  .. literalinclude:: code/ruby/account_management/create_account_disable_reg_workflow.rb
    :language: ruby

  You can also ommit the ``registration_workflow_enabled`` parameter since it's `false` by default.

.. _importing-mcf:

Importing Accounts with Supported Password Hashes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can import existing hashed passwords *only if* the hashing format is one that Stormpath supports:

- **bcrypt**: Stormpath supports importing bcrypt hashes directly. These password hashes have the identifier prefix ``$2a$``, ``$2b$``, or ``$2x$``.
- **MD5 or SHA**: Stormpath supports hahes generated with MD5 and SHA. You must create an MCF string with the prefix ``$stormpath2$`` as detailed :ref:`below <stormpath2-hash>`.

In both cases, once you have an MCF-compatible string that represents the password hash, you can create an Account in Stormpath.

.. only:: rest

  This can be done by POSTing the Account information to the Directory or Application ``/accounts`` endpoint and specifying ``passwordFormat=mcf`` as a query parameter::

    https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbeXaMPLE/accounts?passwordFormat=mcf

.. only:: csharp or vbnet

  This can be done by setting the ``PasswordFormat`` option when creating the Account:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/create_account_mcf_hash.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/create_account_mcf_hash.vb
      :language: vbnet

.. only:: java

  This can be done by setting the ``PasswordFormat`` option when creating the Account:

  .. literalinclude:: code/java/account_management/create_account_mcf_hash.java
    :language: java

.. only:: nodejs

  This can be done by setting the ``passwordFormat`` option when creating the Account:

  .. literalinclude:: code/nodejs/account_management/create_account_mcf_hash.js
    :language: javascript

.. only:: php

  This can be done by setting the ``PasswordFormat`` option when creating the Account:

  .. literalinclude:: code/php/account_management/create_account_mcf_hash.php
    :language: php

.. only:: python

  This can be done by setting the ``password_format`` option when creating the Account:

  .. literalinclude:: code/python/account_management/create_account_mcf_hash.py
    :language: python

.. only:: ruby

  This can be done by setting the ``password_format`` option when creating the Account:

  .. literalinclude:: code/ruby/account_management/create_account_mcf_hash.rb
    :language: ruby

Once the Account is created, Stormpath will use the password hash to authenticate the Account’s **first** login attempt. If the first login attempt is successful, Stormpath will recreate the password hash using a secure HMAC algorithm.

.. _stormpath2-hash:

The stormpath2 Format
"""""""""""""""""""""

If your passwords are hashed with MD5 or SHA, you can import them by creating a ``$``-delimited MCF string that describes the hashing algorithm and parameters. The string should be prefixed with the token ``$stormpath2`` and must follow this format::

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
    - String (Base64). If your password hashes do not have salt, you can omit it entirely.

  * - ``BASE64_PASSWORD_HASH``
    - The computed hash byte array.
    - String (Base64)


Importing Accounts with Unsupported Password Hashes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If your passwords are hashed in a format that Stormpath does not support, you're not out of luck. You can still import your users into Stormpath, with an additional step:

1. Create the Account and set the password to a large randomly-generated string.
2. Prompt the user to complete the password reset workflow. For more information, please see the :ref:`Password Reset section below <password-reset-flow>`.


.. _add-user-customdata:

3.2.3. How to Store Additional User Information as Custom Data
--------------------------------------------------------------

While Stormpath’s default Account attributes are useful to many applications, you might want to add your own Custom Data to a Stormpath Account. If you want, you can store all of your custom account information in Stormpath so you don’t have to maintain another separate database to store your specific account data.

Custom Data can store:

- String values
- Boolean values
- Number values
- Arrays
- JSON Objects (with nesting)

One simple use case for Custom Data could be if you wanted to add information to our "Jean-Luc Picard" Account that didn't fit into any of the existing Account attributes.

For example, you could add information about this user's current location, like the ship this Captain is currently assigned to.

.. only:: rest

  To do this, you specify the ``accountId`` and the ``/customdata`` endpoint.

  .. code-block:: http

    POST /v1/accounts/3apenYvL0Z9v9spExAMpLe/customData HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "currentAssignment": "USS Enterprise (NCC-1701-E)"
    }

.. only:: csharp or vbnet

  The ``picard`` Account you created earlier has a ``CustomData`` property that allows you to write to the resource's Custom Data:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/add_cd_to_account_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/add_cd_to_account_req.vb
      :language: vbnet

  You can also use the ``Put()`` method to add items to Custom Data. The ``Remove()`` method will remove a single item (by key). ``Clear()`` will remove all items.

  .. warning::

    Any Custom Data changes you make are not preserved until you call ``SaveAsync()`` on the parent resource to send the updates to the Stormpath API.

  To retrieve the Account's Custom Data after it's been saved, use the ``GetCustomDataAsync()`` method. For more information about the ``ICustomData`` interface, see the `.NET API documentation <http://docs.stormpath.com/dotnet/api>`_.

.. only:: java

  The ``picard`` Account you created earlier has a ``CustomData`` property that allows you to write to the resource's Custom Data:

  .. literalinclude:: code/java/account_management/add_cd_to_account_req.java
    :language: java

  The ``remove()`` method will remove a single item (by key). ``clear()`` will remove all items.

  .. warning::

    Any Custom Data changes you make are not preserved until you call ``save()`` on the parent resource to send the updates to the Stormpath API.

  To retrieve the Account's Custom Data after it's been saved, use the ``getCustomData()`` method. For more information about the ``CustomData`` interface, see the `Javadocs API documentation <http://docs.stormpath.com/java/apidocs/com/stormpath/sdk/directory/CustomData.html>`_.

.. only:: nodejs

  The ``picard`` Account you created earlier has a ``CustomData`` property that allows you to write to the resource's Custom Data:

  .. literalinclude:: code/nodejs/account_management/add_cd_to_account_req.js
    :language: javascript

.. only:: php

  The Jean-Luc Picard Account you created earlier has a CustomData property that allows you to write to the resource’s Custom Data:

  .. literalinclude:: code/php/account_management/add_cd_to_account_req.php
    :language: php

  .. warning::

    Any Custom Data changes you make are not preserved until you call ``save()`` on the custom data resource to send the updates to the Stormpath API.

  To retrieve the Account's Custom Data after it's been saved, use the ``getCustomData()`` method which returns the following:

  .. literalinclude:: code/php/account_management/add_cd_to_account_resp.php
    :language: php

.. only:: python

  The ``jean_luc`` Account you created earlier has a ``custom_data`` property that allows you to write to the resource's Custom Data:

  .. literalinclude:: code/python/account_management/add_cd_to_account_req.py
    :language: python

  .. warning::

    Any Custom Data changes you make are not preserved until you call ``save()`` on the Account resource to send the updates to the Stormpath API.

.. only:: ruby

  The ``jean_luc`` Account you created earlier has a ``custom_data`` property that allows you to write to the resource's Custom Data:

  .. literalinclude:: code/ruby/account_management/add_cd_to_account_req.rb
    :language: ruby

  .. warning::

    Any Custom Data changes you make are not preserved until you call ``save`` on the Account resource to send the updates to the Stormpath API.

.. only:: rest

  Which returns the following:

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

  For more information about the customData resource, please see the :ref:`customData section <ref-customdata>` of the REST API Product Guide.

.. only:: nodejs

  For more information about Custom Data, please see the `Custom Data section <http://docs.stormpath.com/nodejs/jsdoc/CustomData.html>`_ of the Node.js SDK API Documentation.

.. _howto-search-accounts:

3.3. How to Search Accounts
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

  With the Stormpath .NET SDK, you can use LINQ-to-Stormpath to easily perform searches. Search expressions begin on resources that contain collections.

  Any resource type that exposes a ``GetAccounts()`` method (such as Applications, Directories, Groups, and Organizations) can be searched for Accounts.

  .. note::

    Make sure you import the namespace ``Stormpath.SDK`` in order to use LINQ-to-Stormpath.

.. only:: java

  With the Stormpath Java SDK, you can easily perform searches either using a fluent interface of search methods or by passing in a ``Map`` of query parameters.

  Search expressions begin on resources that contain collections.

  Any resource type that exposes a ``getAccounts()`` method (such as Applications, Directories, Groups, and Organizations) can be searched for Accounts.

.. only:: nodejs

  With the Stormpath Node SDK, you can perform searches on any object that provides a ``getAccounts()`` method (such as Applications, Directories, Groups, and Organizations).

.. only:: php

  Any resource type that exposes a ``getAccounts()`` method (such as Applications, Directories, Groups, and Organizations) can be searched for Accounts.

.. only:: python or ruby

  Any resource type that exposes an ``accounts`` collection (such as Applications, Directories, Groups, and Organizations) can be searched for Accounts.

3.3.1. Example Account Searches
-------------------------------

Below are some examples of different kinds of searches that can be performed to find Accounts.

Search an Application's Accounts for a Particular Word
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A Filter search will locate the specified string in any searchable attribute of any Account associated with this Application:

.. only:: rest

  **Query**

  .. code-block:: http

    GET /v1/applications/1gk4Dxzi6o4Pbdlexample/accounts?q=luc HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

    ``ToListAsync()`` will materialize the results as a ``List<IAccount>`` containing zero or more items.

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_app_accounts_for_word_req.vb
      :language: vbnet

    ``ToListAsync()`` will materialize the results as a ``List(Of IAccount)`` containing zero or more items.

  .. note::

    Matching is case-insensitive, so ``Filter("luc")`` and ``Filter("Luc")`` will return the same results.

.. only:: java

  .. literalinclude:: code/java/account_management/search_app_accounts_for_word_req.java
    :language: java

  .. note::

    Matching is case-insensitive, so ``queryParams.put("q", "Luc")`` and ``queryParams.put("givenName", "luc")`` will both return the same results.

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

  .. note::

    Matching is case-insensitive, so `['q'=>'luc']` and `['q'=>'Luc']` will return the same results.

  After getting the response, you can iterate over it with a ``foreach`` loop

    .. code-block:: php

      foreach($accounts as $account) {
        var_dump($account);  // object(Stormpath\Resource\Account)
      }

.. only:: python

  .. literalinclude:: code/python/account_management/search_app_accounts_for_word_req.py
    :language: python

  .. note::

    Matching is case-insensitive, so ``.search('luc')`` and ``.search('Luc')`` will return the same results.

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/search_app_accounts_for_word_req.rb
    :language: ruby

  You can also specify a column if you just want to limit searching the query in that attribute:

  .. literalinclude:: code/ruby/account_management/search_app_accounts_by_column.rb
    :language: ruby

  .. note::

    Matching is case-insensitive, so ``.search('luc')`` and ``.search('Luc')`` will return the same results.

Find All the Disabled Accounts in a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An :ref:`search-attribute` can be used on a Directory's Accounts collection in order to find all of the Accounts that contain a certain value in the specified attribute.

For example, this could be used to find all the Accounts that are disabled (i.e. that have their ``status`` set to ``disabled``).

.. only:: rest

  **Query**

  .. code-block:: http

    GET /v1/directories/accounts?status=DISABLED HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  Use the LINQ ``Where()`` keyword to perform Attribute searches:

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

  .. note::

    After getting the response, you can iterate over it with a ``foreach`` loop

    .. code-block:: php

      foreach($accounts as $account) {
        var_dump($account);  // object(Stormpath\Resource\Account)
      }

.. only:: python

  .. literalinclude:: code/python/account_management/search_dir_accounts_for_disabled_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/search_dir_accounts_for_disabled_req.rb
    :language: ruby

Find All Accounts in a Directory That Were Modified on a Particular Day
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Datetime Search is used when you want to search for Accounts that have a certain point or period in time that interests you. So you could search for all of the Accounts in a Directory that were modified on Dec 1, 2015.

.. only:: rest

  .. note::

    For more information about Datetime search, please see :ref:`the Reference chapter<search-datetime>`.

  **Query**

  .. code-block:: http

    GET /v1/directories/2SKhstu8PlaekcaEXampLE/accounts?modifiedAt=2015-12-01 HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE/accounts",
        "offset": 0,
        "limit": 25,
        "size": 1,
        "items": [
            {
              "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHexample",
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

  There are two ways to specify a Datetime search parameter in LINQ-to-Stormpath: by comparing to a ``DateTimeOffset`` instance, or by using the ``Within()`` method.

  Use ``Within()`` when you want to find everything within a logical period (like a day or year):

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_dir_accounts_for_create_date_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_dir_accounts_for_create_date_req.vb
      :language: vbnet

  Use a ``DateTimeOffset`` comparison when you want more granularity. You can specify an exact moment in time, and use either inclusive (greater/less than or equal to) or exclusive (greater/less than) matching:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/search_dir_accounts_for_create_after_date_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/search_dir_accounts_for_create_after_date_req.vb
      :language: vbnet

.. only:: java

  There are two ways to search date fields in the Java SDK: using methods and using a ``String`` format for matching.

  **Methods**

  All of the method-based calls for searching on dates take one or more Java ``Date`` object as parameters. All comparisons are based on UTC times.

  .. literalinclude:: code/java/account_management/search_dir_accounts_for_create_date_req.java
    :language: java

  Using the ``in`` method above, we are searching for all Accounts modified between midnight, December 1, 2015 and the following 24 hours.

  Other date searching methods include ``equals``, ``gt``, ``gte``, ``lt``, and ``lte``.

  **String Match**

  String match date searches use `Interval Notation <https://en.wikipedia.org/wiki/Interval_(mathematics)>`__ and `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`__ dates to specify a range of dates to search for.

  .. literalinclude:: code/java/account_management/search_dir_accounts_for_create_date_match_req.java
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

  .. note::

    After getting the response, you can iterate over it with a ``foreach`` loop

    .. code-block:: php

      foreach($accounts as $account) {
        var_dump($account);  // object(Stormpath\Resource\Account)
      }

.. only:: python

  .. literalinclude:: code/python/account_management/search_dir_accounts_for_create_date_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/search_dir_accounts_for_create_date_req.rb
    :language: ruby

.. _howto-search-account-customdata:

3.3.2. Searching for Accounts with Custom Data
-----------------------------------------------

It is also possible to retrieve a collection of Accounts by searching the data stored in their Custom Data.

.. only:: php

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

For example, if some or all of your Accounts in a particular Directory have a Custom Data key called ``startDate`` that contains the date that user started using your application, you could search for the Accounts that started within a particular date range:

.. only:: csharp or vbnet

  In a LINQ-to-Stormpath query, you can assert a Custom Data key and value using the ``CustomData`` property on the ``IAccount`` object.

  .. only:: csharp

    .. tip::

      Since the ``CustomData`` property represents values as ``object``, you'll need to cast to the proper type inside the LINQ expression. This cast isn't actually performed, but it tells .NET how to compile the LINQ expression.

    .. literalinclude:: code/csharp/account_management/cd_search.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/cd_search.vb
      :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/cd_search.java

.. only:: python

  .. literalinclude:: code/python/account_management/cd_search.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/cd_search.rb
    :language: ruby

  .. warning::

    This functionality is currently not working properly. For updates, please follow `ticket #163 <https://github.com/stormpath/stormpath-sdk-ruby/issues/163>`_ on Github.

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/cd_search.js
    :language: javascript

.. todo::

  .. only:: php

    .. literalinclude:: code/php/account_management/cd_search.php
      :language: php

.. only:: rest or php

  .. code-block:: http

    GET /v1/directories/2SKhstu8PlaekcaEXampLE/accounts?customData.startDate=[2012,2015]&limit=5&offset=0 HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

This query will match Accounts with a ``startDate`` value between ``2012-01-01`` and ``2015-12-31``. Additionally, only the top five Accounts will be returned from the result set, with an ``offset`` of ``0``.

.. only:: rest

  For a full description please see :ref:`the Reference chapter <search-customdata>`.

.. note::

  This feature is currently in beta. If you have any questions, comments, or suggestions, reach out to us at support@stormpath.com.

.. _managing-account-pwd:

3.4. How to Manage an Account's Password
========================================

One of the major categories of user management tasks that Stormpath handles and simplifies for you is managing user passwords. All of these different use cases are discussed in the section below.

3.4.1. Manage Password Policies
--------------------------------

In Stormpath, password policies are defined on a Directory level. Specifically, they are controlled in a **Password Policy** resource associated with the Directory. Modifying this resource also modifies the behavior of all Accounts that are included in this Directory. For more information about this resource, see the :ref:`Password Policy section in the Reference chapter <ref-password-policy>`.

.. note::

  This section assumes a basic familiarity with Stormpath Workflows. For more information about Workflows, please see `the Directory Workflows section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#set-up-workflows>`_.

Changing the Password Strength resource for a Directory modifies the requirement for new Accounts and password changes on existing Accounts in that Directory.

.. only:: rest

  To update Password Strength, make this call:

  .. code-block:: http

    POST v1/passwordPolicies/$DIRECTORY_ID/strength HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "minLength": 1,
      "maxLength": 24,
      "minSymbol": 1
    }

.. only:: csharp or vbnet

  To retrieve the password policy, use the ``GetPasswordPolicyAsync()`` and ``GetPasswordStrengthPolicyAsync()`` methods. The Password Strength Policy resource can be modified and saved back to the server to update the policy.

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/update_dir_pwd_strength_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/update_dir_pwd_strength_req.vb
      :language: vbnet

.. only:: java

  To  retrieve the password policy, use the ``getPasswordPolicy()`` and ``getStrength()`` methods. The Password Strength resource can be modified and saved back to the server to update the policy.

  .. literalinclude:: code/java/account_management/update_dir_pwd_strength_req.java
    :language: java

.. only:: nodejs

  To update Password Strength, make this call:

  .. literalinclude:: code/nodejs/account_management/update_dir_pwd_strength_req.js
    :language: javascript

.. only:: php

  To retrieve the password policy, use the ``getPasswordPolicy()`` and ``getStrength()`` methods. The Password Strength Policy resource can be modified and saved back to the server to update the policy.

  .. literalinclude:: code/php/account_management/update_dir_pwd_strength_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/update_dir_pwd_strength_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/update_dir_pwd_strength_req.rb
    :language: ruby

.. only:: rest

  Which results in the following response:

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID/strength
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID/strength",
      "maxLength": 24,
      "minDiacritic": 0,
      "minLength": 1,
      "minLowerCase": 1,
      "minNumeric": 1,
      "minSymbol": 1,
      "minUpperCase": 1
    }

.. todo::

  .. only:: php

    (php.todo)

    Which results in the following response:

    .. literalinclude:: code/php/account_management/update_dir_pwd_strength_resp.php
        :language: php

.. _change-account-pwd:

3.4.2. Change an Account's Password
-----------------------------------

At no point is the user shown, or does Stormpath have access to, the original password once it has been hashed during Account creation. The only ways to change an Account password once it has been created are:

1. To allow the user to update it (without seeing the original value) after being authenticated, or
2. To use the :ref:`password reset workflow <password-reset-flow>`.

.. only:: rest

  To update the password, you send the updated password to the Account resource:

  .. code-block:: http

    POST /v1/accounts/3apenYvL0Z9v9spexAmple HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "password":"some_New+Value1234"
    }

  If the call succeeds you will get back an ``HTTP 200 OK`` with the Account resource in the body.

.. only:: csharp or vbnet

  To update the password, set the new password locally, then save the resource:

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

  To update the password, you send the updated password to the Account resource:

  .. literalinclude:: code/nodejs/account_management/update_account_pwd.js
    :language: javascript

.. only:: php

  To update the password, you send the updated password to the Account resource:

  .. literalinclude:: code/php/account_management/update_account_pwd.php
    :language: php

.. only:: python

  To update the password, you send the updated password to the Account resource:

  .. literalinclude:: code/python/account_management/update_account_pwd.py
    :language: python

.. only:: ruby

  To update the password, you send the updated password to the Account resource:

  .. literalinclude:: code/ruby/account_management/update_account_pwd.rb
    :language: ruby

For more information about resetting the password, read on.

.. _password-reset-flow:

3.4.3. Password Reset
---------------------

Password Reset in Stormpath is a self-service flow, where the user is sent an email with a secure link. The user can then click that link and be shown a password reset form. The password reset workflow involves changes to an account at an application level, and as such, this workflow relies on the application resource as a starting point. While this workflow is disabled by default, you can enable it easily in the Stormpath Admin Console UI. Refer to the `Stormpath Admin Console product guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#password-reset>`__ for complete instructions.

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
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "email":"phasma@empire.gov"
    }

  .. note::

    It is also possible to specify the Organization, Directory, or Group in your Password Reset POST:

    .. code-block:: http

      POST /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens HTTP/1.1
      Host: api.stormpath.com
      Authorization: Basic MlpG...
      Content-Type: application/json

      {
        "email":"phasma@empire.gov"
        "accountStore": {
          "href": "https://api.stormpath.com/v1/groups/2SKhstu8PlaekcaEXampLE"
        }
      }

.. only:: csharp or vbnet

  To trigger the password reset workflow, use the ``SendPasswordResetEmailAsync()`` method from your Application:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset1_trigger_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset1_trigger_req.vb
      :language: vbnet

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. only:: csharp

      .. literalinclude:: code/csharp/account_management/reset1_trigger_req_accountstore.cs
        :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/account_management/reset1_trigger_req_accountstore.vb
        :language: vbnet

    The second parameter can be any object that implements ``IAccountStore`` (Directories, Groups, Organizations). Alternatively, you can directly pass the Stormpath ``href`` of an Account Store resource, or the ``nameKey`` of an Organization resource.

.. only:: java

  .. literalinclude:: code/java/account_management/reset1_trigger_req.java
    :language: java

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

    .. literalinclude:: code/java/account_management/reset1_trigger_req_accountstore.java
      :language: java

    The second parameter can be any object that implements ``AccountStore`` (Directories, Groups, Organizations).

.. only:: nodejs

  To trigger the password reset workflow, you call the ``sendPasswordResetEmail(passwordResetRequest, callback)`` method on your Application instance:

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


.. only:: ruby

  .. literalinclude:: code/ruby/account_management/reset1_trigger_req.rb
    :language: ruby

  .. note::

    It is also possible to specify the Account Store in your Password Reset request:

  .. literalinclude:: code/ruby/account_management/reset1_trigger_req_accountstore.rb
    :language: ruby

  .. note::

    Another possible way is to just create a password reset token without sending the email to the account:

  .. literalinclude:: code/ruby/account_management/reset_trigger_req_without_email.rb
    :language: ruby

If this is a valid email in an Account associated with this Application, the request will succeed.

.. only:: rest

  The success response will look like:

  .. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc3AyT2JRR2dEbjlSOTFSIiwiYWxnIjoiSFExaMPLe.eyJleHAiOjE0NDgwNDg4NDcsImp0aSI6IjJwSW44eFBHeURMTVM5WFpqweVExaMPLe.cn9VYU3OnyKXN0dA0qskMv4T4jhDgQaRdA-wExaMPLe",
      "email": "phasma@empire.gov",
      "account": {
          "href": "https://api.stormpath.com/v1/accounts/2FvPkChR78oFnyfexample"
      }
    }

  For a full description of this endpoint please see :ref:`ref-password-reset-token` in the Reference chapter.

.. only:: csharp or vbnet

  If the email is not valid, a ``ResourceException`` will be thrown. The returned value is an ``IPasswordResetToken`` instance that represents a copy of the token that can be used to reset the user's password.

.. only:: java

  If the email is not valid, a ``ResourceException`` will be thrown. The returned value is an ``PasswordResetToken`` instance that represents a copy of the token that can be used to reset the user's password.

.. only:: php

  The success response will look like this:

  .. literalinclude:: code/php/account_management/reset1_trigger_resp.php
    :language: php

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
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

  This would result in the exact same ``HTTP 200`` success response as when the token was first generated above.

.. only:: csharp or vbnet

  This can be accomplished by using the ``VerifyPasswordResetTokenAsync()`` method:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset2_verify_token.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset2_verify_token.vb
      :language: vbnet

  If the token is not valid, a ``ResourceException`` will be thrown.

.. only:: java

  This can be accomplished by using the ``verifyPasswordResetToken`` method:

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

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/reset2_verify_token.rb
    :language: ruby

**Update the password**

After verifying that the token from the query string is valid, you can direct the user to a page where they can update their password.

.. only:: rest

  Once you have the password, you can update the Account resource with a POST to the ``passwordResetTokens`` endpoint. This is the same endpoint that you used to validate the token above.

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4Pbdlexample/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc[...] HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "password": "updated+Password1234"
    }

.. only:: csharp or vbnet

  Once you have the password, you can update the Account resource with the ``ResetPasswordAsync()`` method:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/reset3_update.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/reset3_update.vb
      :language: vbnet

.. only:: java

  Once you have the password, you can update the Account resource with the ``resetPassword()`` method:

  .. literalinclude:: code/java/account_management/reset3_update.java
    :language: java

.. only:: nodejs

  Once you have the password, you can call the ``resetPassword(resetPasswordToken, newPassword, callback)`` method on your Application instance. This is the same method call that you used to validate the token above.

  .. literalinclude:: code/nodejs/account_management/reset3_update.js
    :language: javascript

.. only:: php

  .. literalinclude:: code/php/account_management/reset3_update.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/reset3_update.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/reset3_update.rb
    :language: ruby

On success, the response will include a link to the Account that the password was reset for. It will also send the password change confirmation email that was configured in the Administrator Console to the email account associated with the Account.

Manage Password Reset Emails
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Password Reset Email is configurable for a Directory.

There is a set of properties on the Password Policy resource that define its behavior. These properties are:

- ``resetEmailStatus`` which enables or disables the reset email.
- ``resetEmailTemplates`` which defines the content of the password reset email that is sent to the Account’s email address with a link to reset the Account’s password.
- ``resetSuccessEmailStatus`` which enables or disables the reset success email, and
- ``resetSuccessEmailTemplates`` which defines the content of the reset success email.

To control whether any email is sent or not is simply a matter of setting the appropriate value to either ``ENABLED`` or ``DISABLED``. For example, if you would like a Password Reset email to be sent, perform the following:

.. only:: rest

  .. code-block:: http

    POST /v1/passwordPolicies/$DIRECTORY_ID HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/enable_pwd_reset_email.rb
    :language: ruby

.. _password-reset-email-templates:

Password Reset Email Templates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The contents of the password reset and the password reset success emails are both defined in an Email Templates collection.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. For updates, you can follow `ticket #158 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/158>`_ on Github.

    In the meantime, please use the Stormpath Admin Console UI, or consult the REST API documentation below.

  .. todo::

    Add templates example

.. only:: java

  .. literalinclude:: code/java/account_management/pwd_reset_email_template.java

.. only:: nodejs

  Using the Stormpath Node SDK, you can fetch the Account Creation Policy of the Directory, and expand the Verification Email Templates Collectio at the same time.

  Once you have a reference to the template, you can update it, calling the ``save()`` method on the parent policy to persist the changes:

  .. literalinclude:: code/nodejs/account_management/pwd_reset_email_template.js

.. only:: php

  .. literalinclude:: code/php/account_management/pwd_reset_email_template.php
    :language: php

.. only:: rest or vbnet or csharp or php or python

  To modify the emails that get sent during the password reset workflow, all you have to do is send an HTTP POST with the desired property in the payload body. For more information about Email Templates, see the `Email Templates section <https://docs.stormpath.com/rest/product-guide/latest/reference.html#ref-emailtemplates>`__ of the Reference chapter.

.. _password-change-timestamp-search:

3.4.4. How to Find When An Account's Password Was Changed
----------------------------------------------------------

You may want to find out when an Account's password was last changed, or return a collection of Accounts that changed their passwords within a certain timespan. This information is contained in the searchable ``passwordModifiedAt`` attribute found in every Account resource.

If you wanted to find all Accounts that hadn't modified their password yet in 2016 you would use :ref:`Datetime search <search-datetime>`:

.. only:: rest

  .. code-block:: http

    GET /v1/directories/2SKhstu8PlaekcaEXampLE/accounts?passwordModifiedAt=[,2016) HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json.. only:: csharp

  .. literalinclude:: code/csharp/account_management/search_password_modified.cs
    :language: csharp

.. only:: vbnet

  .. literalinclude:: code/vbnet/account_management/search_password_modified.vb
    :language: vbnet

.. only:: java

  .. literalinclude:: code/java/account_management/search_password_modified.java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/search_password_modified.js

.. only:: php

  .. literalinclude:: code/php/account_management/search_password_modified.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/account_management/search_password_modified.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/search_password_modified.rb
    :language: ruby

This would then return all Accounts in the specified Directory that had their passwords modified at any time between the beginning of time and the end of 2015.

.. _password-reuse:

3.4.5. How to Restrict Password Reuse
-------------------------------------

Stormpath can store historical password information in order to allow for restrictions on password reuse. This is controlled on the Directory Password Policy's Strength object, which has an attribute called ``preventReuse``. By default this feature is disabled and set to ``0``. In order to enable this feature, you have to modify the Directory Password Policy's Strength resource, sending any value up to ``25``:

.. only:: csharp

  .. literalinclude:: code/csharp/account_management/update_prevent_reuse.cs
    :language: csharp

.. only:: vbnet

  .. literalinclude:: code/vbnet/account_management/update_prevent_reuse.vb
    :language: vbnet

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/update_prevent_reuse.js

.. only:: php

  .. literalinclude:: code/php/account_management/update_prevent_reuse.php
    :language: php

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. For updates, you can follow `ticket #278 <https://github.com/stormpath/stormpath-sdk-python/issues/278>`_ on Github.

    In the meantime, please use the Stormpath Admin Console UI, or consult the REST API documentation below.

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/update_prevent_reuse.rb
    :language: ruby

.. only:: java

  .. warning::

    This feature is not yet available in the Java SDK. For updates, you can follow `ticket #901 <https://github.com/stormpath/stormpath-sdk-java/issues/901>`_ on Github.

    In the meantime, please use the Stormpath Admin Console UI, or consult the REST API documentation below.

.. only:: rest or python or java

  .. code-block:: http

    POST /v1/passwordPolicies/2SKhstu8PlaekcaEXampLE/strength HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
        "preventReuse": "10"
    }

  .. note::

    For more information on Password Policy for password Strength see :ref:`here <ref-password-strength>`.

This would prevent a user from choosing a password that is the same as any of their previous 10 passwords.

.. _account-schema:

3.5. How to Manage an Account's Required Attributes
===================================================

Every Directory has its own Account Schema. This Schema allows you to control which Account attributes (referred to as ``fields`` within the Account Schema) must be passed as part of new Account creation.

.. only:: not (rest or java)

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

3.5.1. Retrieving your Directory's Account Schema
-------------------------------------------------

.. only:: not java

  You will find a link to the ``accountSchema`` resource in your Directory:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/directories/iusmp6mK91ZZ5example",
      "name": "Account Schema Test",
      "description": "A Directory to test Account Schema restrictions",
      "...": "...",
      "accountSchema": {
        "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnExample"
      }
    }

  You can send a ``GET`` to that URL, with an ``expand`` parameter for the ``fields`` collection:

  .. code-block:: http

    GET /v1/schemas/ivVhIkQVLGSLnExample?expand=fields HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

  And get back the Account Schema:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnLexample",
      "createdAt": "2016-08-19T19:42:41.961Z",
      "modifiedAt": "2016-08-19T19:42:41.961Z",
      "fields": {
        "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnLexample/fields",
        "offset": 0,
        "limit": 25,
        "size": 2,
        "items": [
          {
            "href": "https://api.stormpath.com/v1/fields/ivVhM4VPvZQycQexample",
            "createdAt": "2016-08-19T19:42:41.961Z",
            "modifiedAt": "2016-08-19T19:42:41.961Z",
            "name": "givenName",
            "required": false,
            "schema": {
              "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnLexample"
            }
          },
          {
            "href": "https://api.stormpath.com/v1/fields/ivVhPOaKVsPbRWrExample",
            "createdAt": "2016-08-19T19:42:41.961Z",
            "modifiedAt": "2016-08-19T20:03:25.497Z",
            "name": "surname",
            "required": false,
            "schema": {
              "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnLexample"
            }
          }
        ]
      },
      "directory": {
        "href": "https://api.stormpath.com/v1/directories/iusmp6mK91ZZ5example"
      }
    }

.. only:: java

  .. literalinclude:: code/java/account_management/get_account_schema.java
      :language: java

The two Account attributes (or ``fields``) that can be toggled here are ``givenName`` and ``surname``. By default both of these have ``required`` set to ``false`` for any Directories created after August 13, 2016.

This means that (providing your Directory was created after ``2016-08-13``) you can create a new Account by passing only two attributes, ``email`` and ``password``:

.. only:: not java

  .. code-block:: http

    POST /v1/directories/iusmp6mK91ZZ5example/accounts HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic Mlp...

    {
      "email":"test123@email.com",
      "password":"APassword1234"
    }

.. only:: java

   .. literalinclude:: code/java/account_management/create_account_two_attributes.java
     :language: java

3.5.2. Modifying your Directory's Account Schema
-------------------------------------------------

Any attributes that are in the ``fields`` collection can have ``required`` toggled to either ``true`` or ``false``.

If you wanted to set ``surname`` as required, you would send the following ``POST``:

.. only:: not java

  .. code-block:: http

    POST /v1/fields/ivVhPOaKVsPbRWrExample HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic Mlp...
    Content-Type: application/json
    Cache-Control: no-cache

    {
      "required":"true"
    }

  And get back the following ``200 OK``:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/fields/ivVhPOaKVsPbRWrExample",
      "createdAt": "2016-08-19T19:42:41.961Z",
      "modifiedAt": "2016-08-19T20:03:25.497Z",
      "name": "surname",
      "required": true,
      "schema": {
          "href": "https://api.stormpath.com/v1/schemas/ivVhIkQVLGSLnLexample"
      }
    }

  If you now tried to create another Account by passing only an ``email`` and ``password``, you would get back a ``400 Bad Request`` with `Error 2000 <https://docs.stormpath.com/rest/product-guide/latest/errors.html#error-2000>`__:

  .. code-block:: json

    {
      "status": 400,
      "code": 2000,
      "message": "Account surname is required; it cannot be null, empty, or blank.",
      "developerMessage": "Account surname is required; it cannot be null, empty, or blank.",
      "moreInfo": "https://docs.stormpath.com/rest/product-guide/latest/errors.html#error-2000",
      "requestId": "49bd7a31-6650-11e6-9e22-22000befd8bd"
    }

.. only:: java

  .. literalinclude:: code/java/account_management/modify_account_schema.java
      :language: java


  If you now tried to create another Account by passing only an ``email`` and ``password``, you would get back a ``ResourceException`` with `Error 2000 <https://docs.stormpath.com/rest/product-guide/latest/errors.html#error-2000>`__:

.. _verify-account-email:

3.6. How to Verify an Account's Email
=====================================

If you want to verify that an Account’s email address is valid and that the Account belongs to a real person, Stormpath can help automate this for you using `Workflows <http://docs.stormpath.com/console/product-guide/latest/directories.html#set-up-workflows>`_.

3.6.1. The Email Verification Workflow
--------------------------------------

This workflow involves 3 parties: your application's end-user, your application, and the Stormpath API server.

1. When the Account is created in a Directory that has “Verification” enabled, Stormpath will automatically send an email to the Account's email address.
2. The end-user opens their email and clicks the verification link. This link comes with a token.
3. With the token, your application calls back to the Stormpath API server to complete the process.

If you create a new Account in a Directory with both Account Registration and Verification enabled, Stormpath will automatically send a welcome email that contains a verification link to the Account’s email address on your behalf. If the person reading the email clicks the verification link in the email, the Account will then have an ``ENABLED`` status and be allowed to log in to applications. Additionally, the Account's ``emailVerificationStatus`` will change to ``VERIFIED``.

Accounts created in a Cloud Directory that has the Verification workflow enabled will have their ``status`` and ``emailVerificationStatus`` set to ``UNVERIFIED`` by default. When the email link is clicked, the Account's ``status`` will change to ``ENABLED`` and its ``emailVerificationStatus`` will change to ``VERIFIED``.

.. note::

  Accounts in Mirror Directories (SAML, Facebook, etc) have their ``emailVerificationStatus`` set to ``VERIFIED`` by default.

.. note::

  Accounts that have their ``status`` as ``ENABLED`` or ``DISABLED`` that were created before the ``emailVerificationStatus`` attribute was added to the Account resource will have their ``emailVerificationStatus`` set to ``UNKNOWN``. Accounts with a ``status`` of ``UNVERIFIED`` will also have an ``emailVerificationStatus`` of ``UNVERIFIED``.

  Accounts can also have their ``emailVerificationStatus`` manually set to ``VERIFIED`` or ``UNVERIFIED`` by updating the Account resource.

The Account Verification Base URL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is also expected that the workflow’s **Account Verification Base URL** has been set to a URL that will be processed by your own application web server. This URL should be free of any query parameters, as the Stormpath back-end will append on to the URL a parameter used to verify the email. If this URL is not set, a default Stormpath-branded page will appear which allows the user to complete the workflow.

.. note::

  The Account Verification Base URL defaults to a Stormpath API Sever URL which, while it is functional, is a Stormpath API server web page. Because it will likely confuse your application end-users if they see a Stormpath web page, we strongly recommended that you specify a URL that points to your web application.

3.6.2. Configuring the Verification Workflow
---------------------------------------------

This workflow is disabled by default on Directories, but you can enable it, and set up the account verification base URL, easily in the Stormpath Admin Console UI. Refer to the `Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/latest/directories.html#set-up-workflows>`_ for complete instructions.

3.6.3. Triggering the Verification Email (Creating A Token)
-----------------------------------------------------------

In order to verify an Account’s email address, an ``emailVerificationToken`` must be created for that Account. To create this token, you create an Account in a Directory, either programmatically or via a public account creation form of your own design, that has the account registration and verification workflows enabled.

3.6.4. Verifying the Email Address (Consuming The Token)
--------------------------------------------------------

The email that is sent upon Account creation contains a link to the base URL that you've configured, along with the ``sptoken`` query string parameter. By default, it looks like this::

  https://api.stormpath.com/emailVerificationTokens?sptoken=$VERIFICATION_TOKEN

If you were to click this URL now, it would simply open up a page telling us that the Account had been verified. However, we can use this URL in order to verify the Account and also retrieve the Account information.

.. only:: rest

  The token you capture from the query string is used to form the full ``href`` for a special email verification endpoint used to verify the Account::

    /v1/accounts/emailVerificationsToken/$VERIFICATION_TOKEN

  To verify the Account, you use the token from the query string to form the above URL and POST a body-less request against the fully-qualified end point:

  .. code-block:: http

    POST /v1/accounts/emailVerificationTokens/6YJv9XBH1dZGP5A8rq7Zyl HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
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

  You can use the ``VerifyAccountEmailAsync()`` method on the ``IClient`` type, plus the token you capture from the query string, to verify the Account:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/verify_email_req.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/verify_email_req.vb
      :language: vbnet

  If the token is valid, the Account details are returned. If the token is invalid, a ``ResourceException`` will be thrown.

.. only:: java

  You can use the ``verifyAccountEmail()`` method on the ``Client`` type, plus the token you capture from the query string, to verify the Account:

  .. literalinclude:: code/java/account_management/verify_email_req.java
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

  You can use the ``verifyEmailToken()`` method on the client's ``\Stormpath\Resource\Tenant`` object, plus the token you capture from the query string, to verify the Account:

  .. literalinclude:: code/php/account_management/verify_email_req.php
    :language: php

  Which will return a result that looks like this:

  .. literalinclude:: code/php/account_management/verify_email_resp.php
    :language: php

  If the validation succeeds, you will receive an Account instance for the account that was verified. An email confirming the verification will be automatically sent to the Account’s email address by Stormpath afterwards, and the Account will then be able to authenticate successfully.

  If the verification token is not found, a error is returned with a message explaining why the attempt failed.

.. only:: python

  You can use the ``verify_email_token()`` method on the Client's ``accounts`` collection, plus the token you capture from the query string, to verify the Account:

  .. literalinclude:: code/python/account_management/verify_email_req.py
    :language: python

.. only:: ruby

  You can use the ``verify_email_token`` method on the Client's ``accounts`` collection, plus the token you capture from the query string, to verify the Account:

  .. literalinclude:: code/ruby/account_management/verify_email_req.rb
    :language: ruby

.. note::

  For more about Account Authentication you can read :ref:`the next chapter <authn>`.

.. _resending-verification-email:

3.6.5. Resending the Verification Email
---------------------------------------

If a user accidentally deletes their verification email, or it was undeliverable for some reason, it is possible to resend the email.

.. only:: rest

  To resend the email, use the :ref:`Application resource's <ref-application>` ``/verificationEmails`` endpoint.

  .. code-block:: http

    POST /v1/applications/1gk4Dxzi6o4Pbdlexample/verificationEmails HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json;charset=UTF-8

    {
      "login": "email@address.com",
    }

  If this calls succeeds, an ``HTTP 202 ACCEPTED`` will return.

  .. note::

    It is also possible to specify the Organization, Directory, or Group in your Verification Email resend request:

    .. code-block:: http

      POST /v1/applications/1gk4Dxzi6o4Pbdlexample/verificationEmails HTTP/1.1
      Host: api.stormpath.com
      Content-Type: application/json;charset=UTF-8

      {
        "login":"email@address.com",
        "accountStore": {
          "href": "https://api.stormpath.com/v1/groups/2SKhstu8PlaekcaEXampLE"
        }
      }

.. only:: csharp or vbnet

  To resend the email, use the ``SendVerificationEmailAsync()`` method:

  .. only:: csharp

    .. literalinclude:: code/csharp/account_management/resend_verification_email.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/account_management/resend_verification_email.vb
      :language: vbnet

.. only:: java

  To resend the email, use the ``sendVerificationEmail()`` method:

  .. literalinclude:: code/java/account_management/resend_verification_email.java
    :language: java

.. only:: nodejs

  To resend the email, use the ``resendVerificationEmail(resendVerificationRequest, callback)`` method of your Application instance.

  .. literalinclude:: code/nodejs/account_management/resend_verification_email.js
    :language: javascript

.. only:: php

  To resend the email, use the ``sendVerificationEmail()`` method:

  .. literalinclude:: code/php/account_management/resend_verification_email.php
    :language: php

.. only:: python

  To resend the email, use the ``send_verification_email()`` method:

  .. literalinclude:: code/python/account_management/resend_verification_email.py
    :language: python

.. only:: ruby

  .. warning::

    This feature is currently not supported by the Ruby SDK. For updates, please follow `ticket #164 <https://github.com/stormpath/stormpath-sdk-ruby/issues/164>`_ on Github.

  .. todo::

    Add Ruby code once implemented

3.7. Customizing Stormpath Emails
==========================================

3.7.1. What Emails Does Stormpath Send?
---------------------------------------

Stormpath can be configured to send emails to users as part of a Directory's Account Creation and Password Reset policies.

Account Creation
^^^^^^^^^^^^^^^^

Found in: `Account Creation Policy <https://docs.stormpath.com/rest/product-guide/latest/reference.html#account-creation-policy>`__

- *Verification Email*: The initial email that is sent out after Account creation that verifies the email address that was used for registration with a link containing the verification token.
- *Verification Success Email*: An email that is sent after a successful email verification.
- *Welcome Email*: An email welcoming the user to your application.

For more information about this, see :ref:`verify-account-email`.

Password Reset
^^^^^^^^^^^^^^

Found in: `Password Policy <https://docs.stormpath.com/rest/product-guide/latest/reference.html#password-policy>`__

- *Reset Email*: The email that is sent out after a user asks to reset their password. It contains a URL with a password reset token.
- *Reset Success Email*:  An email that is sent after a successful password reset.

For more information about this, see :ref:`password-reset-flow`.

.. _customizing-email-templates:

3.7.2. Customizing Stormpath Email Templates
--------------------------------------------

The emails that Stormpath sends to users be customized by modifying the `Email Templates <https://docs.stormpath.com/rest/product-guide/latest/reference.html#email-templates>`__ resource. This can be done either via the "Directory Workflows" section of the `Stormpath Admin Console <https://api.stormpath.com/login>`__, or as explained below.

**Verification**, **Verification Success**, and **Welcome** Email Templates can all be found under the Directory’s **Account Creation Policies**:

.. only:: rest

  .. todo::

    (rest.todo)

.. only:: csharp or vbnet

  .. todo::

    (csharp.todo)
    (vbnet.todo)

.. only:: php

  .. todo::

    (php.todo)

.. only:: java

  .. literalinclude:: code/java/account_management/list_account_creation_templates.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/list_account_creation_templates.js

.. only:: python

  .. literalinclude:: code/python/account_management/list_account_creation_templates.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/list_account_creation_templates.rb
    :language: ruby

**Password Reset**, and **Reset Success** Email Templates can be found under the Directory’s **Password Policies**:

.. only:: rest

  .. todo::

    (rest.todo)

.. only:: csharp or vbnet

  .. todo::

    (csharp.todo)
    (vbnet.todo)

.. only:: php

  .. todo::

    (php.todo)

.. only:: java

  .. literalinclude:: code/java/account_management/list_password_policy_templates.java
    :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/list_password_policy_templates.js

.. only:: python

  .. literalinclude:: code/python/account_management/list_password_policy_templates.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/list_password_policy_templates.rb
    :language: ruby

.. only:: rest

  To modify any of these emails via REST, it is just a matter of updating the appropriate ``/emailTemplates/$TEMPLATE_ID`` resource with a POST.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. For updates, you can follow `ticket #158 <https://github.com/stormpath/stormpath-sdk-dotnet/issues/158>`_ on Github.

    In the meantime, please use the Stormpath Admin Console UI, or the REST API documentation below.

    .. todo::

      Add email templates .NET example

.. only:: php

  **Verification**, **Verification Success**, and **Welcome** Email Templates can all be found under the Directory's **Account Creation Policies**.

  **Password Reset**, and **Reset Success** Email Templates can be found under the Directory's **Password Policies**.

  As an example, let's look at a default Verification Email template that comes with the Stormpath Administrator Directory's Account Creation Policies:

  .. code-block:: php

    $verificationEmailTemplates = $directory->getAccountCreationPolicy()
                                        ->getVerificationEmailTemplates();

    foreach($verificaitonEmailTemplates as $template) {
        $template
            ->setName('Default Verification Email Template')
            ->setDescription('This is the verification email template that is associated with the directory.')
            ->setFromName('Jakub Swiatczak')
            ->setFromEmailAddress('change-me@stormpath.com')
            ->setSubject('Verify your account')
            ->setTextBody('Hi,\nYou have been registered for an application that uses Stormpath.\n\n$!{url}\n\nOnce you verify, you will be able to login.\n\n---------------------\nFor general inquiries or to request support with your account, please email change-me@stormpath.com')
            ->setHtmlBody('<p>Hi,</p>\n<p>You have been registered for an application that uses Stormpath.</p><a href=\"$!{url}\">Click here to verify your account</a><p>Once you verify, you will be able to login.</p><p>--------------------- <br />For general inquiries or to request support with your account, please email change-me@stormpath.com</p>')
            ->setMimeType(\Stormpath\Stormpath::MIME_PLAIN_TEXT)
            ->setDefaultModel(['linkBaseUrl'=>'https://api.stormpath.com/emailVerificationTokens'])
            ->save();
    }

  You would then receive a ``200 OK`` along with the updated template.

  For more information about Stormpath's email templates, keep reading!

  **Message Format**

  The ``mimeType`` designates whether the email is sent as plain text (``\Stormpath\Stormpath::MIME_PLAIN_TEXT``), HTML (``\Stormpath\Stormpath::MIME_HTML``). This in turns tells Stormpath whether to use the ``textBody`` or ``htmlBody`` text in the email, or to let the email client decide.

.. only:: java

  **Verification**, **Verification Success**, and **Welcome** Email Templates can all be found under the Directory's **Account Creation Policies**.

  **Password Reset**, and **Reset Success** Email Templates can be found under the Directory's **Password Policies**.

  As an example, let's look at a default Verification Email template that comes with the Stormpath Administrator Directory's Account Creation Policies:

  .. literalinclude:: code/java/account_management/update_password_policy_template.java
    :language: java

  You would then receive a ``200 OK`` along with the updated template.

  For more information about Stormpath's email templates, keep reading!

  **Message Format**

  The ``mimeType`` designates whether the email is sent as plain text (``MimeType.PLAIN_TEXT``), HTML (``MimeType.HTML``). This in turns tells Stormpath whether to use the ``textBody`` or ``htmlBody`` text in the email, or to let the email client decide.

.. only:: python or ruby

  To modify any of these emails via the |language| SDK, it is just a matter of updating the appropriate Template resource.

.. only:: rest or python or ruby

  As an example, let’s look at a default Verification Email template that comes with the Stormpath Administrator Directory’s Account Creation Policies:

  .. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/emailTemplates/2jwPxFsnjqxYrojexample",
      "name":"Default Verification Email Template",
      "description":"This is the verification email template that is associated with the directory.",
      "fromName":"Jakub Swiatczak",
      "fromEmailAddress":"change-me@stormpath.com",
      "subject":"Verify your account",
      "textBody":"Hi,\nYou have been registered for an application that uses Stormpath.\n\n$!{url}\n\nOnce you verify, you will be able to login.\n\n---------------------\nFor general inquiries or to request support with your account, please email change-me@stormpath.com",
      "htmlBody":"<p>Hi,</p>\n<p>You have been registered for an application that uses Stormpath.</p><a href=\"$!{url}\">Click here to verify your account</a><p>Once you verify, you will be able to login.</p><p>--------------------- <br />For general inquiries or to request support with your account, please email change-me@stormpath.com</p>",
      "mimeType":"text/plain",
      "defaultModel":{
        "linkBaseUrl":"https://api.stormpath.com/emailVerificationTokens"
      }
    }

  If you wanted to change the ``fromEmailAddress`` attribute, you would just update this attribute:

.. only:: rest

  .. code-block:: http

    POST /v1/emailTemplates/2jwPxFsnjqxYrojexample HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "fromEmailAddress": "jakub@stormpath.com"
    }

  You would then receive a ``200 OK`` along with the updated template.

.. only:: python

  .. literalinclude:: code/python/account_management/update_from_email_address_attr.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/update_from_email_address_attr.rb
    :language: ruby

.. only:: rest or python or nodejs or csharp or vbnet or ruby

  For more information about Stormpath's email templates, keep reading!

  **Message Format**

  The ``mimeType`` designates whether the email is sent as plain text (``text/plain``), HTML (``text/html``), or both (``multipart/alternative``). This in turns tells Stormpath whether to use the ``textBody`` or ``htmlBody`` text in the email, or to let the email client decide.

**textBody and htmlBody**

These define the actual content of the email. The only difference is that ``htmlBody`` is allowed to contain HTML markup while ``textBody`` only accepts plaintext. Both are also able to use `Java Escape Sequences <http://web.cerritos.edu/jwilson/SitePages/java_language_resources/Java_Escape_Sequences.htm>`__. Both ``htmlBody`` and ``textBody`` can have customized output generated using template macros. For more on those, see the very next section.

.. _using-email-macros:

Using Email Macros
^^^^^^^^^^^^^^^^^^

Macros are placeholder text that are converted into actual values at the time the email is generated. You could use a macro to insert your user's first name into the email, as well as the name of your Application. This would look like this:

.. code-block:: java

  "Hi $!{account.givenName}, welcome to $!{application.name}!"

The basic structure for a macro is ``$!{resource.attribute}``. There are three kinds of ``resource`` that you can work with:

- Account (``$!{account}``)
- an Account's Directory (``$!{account.directory}``), and
- an Application (``$!{application}``).

You can also include any ``attribute`` that isn't a link, as well as customData.

For a full list of email macros, see the `Email Macros <https://docs.stormpath.com/rest/product-guide/latest/reference.html#email-templates>`__ section of the Reference chapter.

Macros and customData
"""""""""""""""""""""

The formatting for customData macros is as follows:

.. code-block:: java

  $!{resource.attribute.customData.key}

You may have noticed here and with the Application resource that there is an included ``!`` character, this is called a "quiet reference".

.. _quiet-macro-reference:

Quiet References
""""""""""""""""

Quiet references (``!``) tell Stormpath that, if it can't resolve the object, it should just show nothing. Normally, if a macro was  ``Is your favorite color $!{account.customData.favoriteColor}?``, and Stormpath was able to find the value as ``blue``, it would output:

``Is your favorite color blue?``

However, if the value could not be found, it would output:

``Is your favorite color $!{account.customData.favoriteColor}?``

To avoid this, you include the ``!`` which puts the macro into "quiet reference" mode. This means that if the value is not found, the output will be:

``Is your favorite color ?``

Since customData can contain any arbitrary key-value pairs, Stormpath recommends that any email macro references to customData keys use the ``!`` quiet reference. Applications should also use the quiet reference because there are possible cases where the templating engine might not have access to an Application resource.

.. _add-custom-smtp:

3.7.3. Customizing Your SMTP Server
-----------------------------------

Normally, the emails that Stormpath sends as a part of processes like Account creation and password reset come from Stormpath's SMTP server. However, it is possible to configure Stormpath to send emails using an SMTP server of your choosing.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: php

  .. warning::

    This feature is not yet available in the PHP SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This

.. only:: rest or csharp or vbnet or php or python or java or ruby

  Your Tenant is allowed to specify one server, and that server's information is stored in an SMTP server resource accessible either directly:

  ``v1/smtpServers/$SMTP_SERVER_ID``

  Or off of your Tenant:

  ``v1/tenants/$TENANT_ID/smtpServers``

In the event that sending an email using the custom SMTP server fails repeatedly, Stormpath will fall back to its own server. In this situation, Stormpath will also send you an email alerting you to the error.

.. note::

  If Stormpath uses its own SMTP server to send email, this may cause a conflict with your `SPF records <http://www.openspf.org/Introduction>`__ which might result in those emails being marked as spam by email clients.

Adding a new Custom Server
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: rest

  Adding a custom SMTP server via the REST API is done in the same way as creating any other Stormpath resource.

In addition to the location and port of the server, you must also pass valid credentials. Before creating the resource, Stormpath will confirm that the information given is valid and that a connection can be established. If the ``host``, ``port``, ``username`` or ``password`` are incorrect, you will receive back :ref:`an error <errors-130xx>`. If a custom server already exists for your Stormpath Tenant, then you will also receive :ref:`an error <errors-130xx>`.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: nodejs

  .. warning::

    This feature does not yet have a proper interface in the Node SDK, but you can
    still create this resource by using the generic ``client.createResource()`` method:

  .. literalinclude:: code/nodejs/account_management/create_smtp_server.js
    :language: javascript

.. only:: php

  .. warning::

    This feature is not yet available in the PHP SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This

.. only:: rest or csharp or vbnet or php or python or java

  For the full description of what is inside an SMTP Server resource, please see `the Reference chapter <https://docs.stormpath.com/rest/product-guide/latest/reference.html#ref-custom-smtp>`__. A successful custom server POST would look like this:

  .. code-block:: http

    POST /v1/smtpServers HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "name":"My SMTP Server",
      "description":"My Awesome SMTP Server",
      "username":"ausername",
      "password":"Apassw0rd",
      "securityProtocol":"tls",
      "host":"email.host.com",
      "port":25
    }

  With the following response:

  .. code-block:: http

    HTTP/1.1 201 Created
    Content-Type: application/json;charset=UTF-8

    {
        "createdAt": "2016-06-23T22:04:47.163Z",
        "description": "My Awesome SMTP Server",
        "host": "email.host.com",
        "href": "https://api.stormpath.com/v1/smtpServers/3svYfnFPh3q2Hbfexample",
        "modifiedAt": "2016-06-23T22:04:47.163Z",
        "name": "My SMTP Server",
        "port": 25,
        "securityProtocol": "TLS",
        "status": "ENABLED",
        "tenant": {
            "href": "api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgexample"
        },
        "username": "ausername"
    }

Deleting a Custom Server
^^^^^^^^^^^^^^^^^^^^^^^^

If you would like to stop using the custom server, you can disable it by setting its ``status`` to ``DISABLED``. A more permanent solution is to delete the SMTP Server resource entirely. This is also required if you would like to use a different server, since your Tenant can only have one of these resources at any given time.

.. only:: rest

  To delete an SMTP Server, send the following:

.. only:: csharp or vbnet

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: nodejs

  .. warning::

    This feature does not yet have a proper interface in the Node SDK, but you can
    still delete the resource by using the generic ``client.deleteResource()`` method directly:

  .. literalinclude:: code/nodejs/account_management/delete_smtp_server.js
    :language: javascript

.. only:: php

  .. todo::

    This.

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This

.. only:: rest or csharp or vbnet or php or python or java or ruby

  .. code-block:: http

    DELETE /v1/smtpServers/3svYfnFPh3q2Hbfexample HTTP/1.1

  Upon successful deletion you will get back a ``204 No Content`` message.

.. _email-domain-restriction:

3.7.4 Restricting User Email Domains
-------------------------------------

As a developer, you are able to restrict which emails can be used by Accounts within a particular Directory. You control this by adding domains to either a Domain Whitelist or Blacklist, both of which are attached to your Directory's Account Creation Policies. This means that if an email is used as part of user registration, or a user later tries to update their Account with a new email, that email will be checked against that Whitelist and/or Blacklist.

If your Whitelist contains only ``stormpath.com`` then only email addresses from that domain will be allowed for your user Accounts. If a user tries to register a new Account without using a Stormpath address, then the Account creation will error. If they try to update their Account with a new address that isn't a Stormpath address, the update will also fail.

Domain Entries
^^^^^^^^^^^^^^

Examples of domain entries include:

- ``*site.com``
- ``*.site.com``
- ``site.*.com``
- ``site.*``
- ``*.com``

You can enter in a ``*`` wildcard at any point in the email domain, and this will either allow or disallow (depending on which list you add it to) all emails fitting that pattern.

For example, the entry ``*site.com`` would match::

  site.com
  zsite.com
  id.site.com

The slightly different entry ``*.site.com`` would match::

  id.site.com

But would not match::

  site.com
  zsite.com

Working with the Lists
^^^^^^^^^^^^^^^^^^^^^^^

Working with the Whitelist and Blacklist is done through the Account Creation Policy of a Directory.

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: php

  To replace the current list, pass an array to the method.

  .. code-block:: php

    $accountCreationPolicy->setEmailDomainWhitelist(['abc.com', 'xyz.com'])->save();

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/email_domain_restriction.rb
    :language: ruby

.. only:: rest or csharp or vbnet or python or java

  In both cases, you send an array in this format:

  .. code-block:: json

    [
      "*domain.com",
      "*.another.ca"
    ]

Keep in mind the following when you work with the Whitelist and Blacklist:

- If you would like to specify domains that are to be allowed, you add entries to the ``emailDomainWhitelist`` array.
- For domains that are to be disallowed, you add entries to the ``emailDomainBlacklist`` array.
- Both arrays are empty by default.
- An empty ``emailDomainWhitelist`` means that all email domains are allowed.
- An empty ``emailDomainBlacklist`` means that no email domains are disallowed.
- To add or remove entries, you must overwrite the entire list. See examples below.
- The Blacklist takes precedence over the Whitelist. That means that if ``site.com`` is found in both lists, the Blacklist will take priority, and users will not be able to use any emails from the ``site.com`` domain.

Adding a Domain
"""""""""""""""

If you wanted to allow only users using emails from ``site.com`` and ``stormpath.com`` to register for this Directory, you could add the following entries to the Whitelist:

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/add_email_domain_whitelist.js

.. only:: php

  .. code-block:: php

    $accountCreationPolicy->addEmailDomainWhitelist('stormpath.com')->save();

.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/email_domain_restriction2.rb
    :language: ruby

  .. note::

    Be careful when updating the whitelisted/blacklisted domains. The SDK currently doesn't support adding to the existing array, just overwriting it.

.. only:: rest or csharp or vbnet or python or java

  .. code-block:: http

    POST /v1/accountCreationPolicies/2SKhstu8PlaekcaEXampLE HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "emailDomainWhitelist": [
        "*stormpath.com",
        "*site.com"
      ]
    }

.. only:: not (php or python or nodejs)

  And you would get back the Account Creation Policies resource:

.. only:: csharp or vbnet

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: rest or csharp or vbnet or java

  .. code-block:: json

    {
      "href": "https://staging-api-b.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaEXampLE",
      "verificationEmailStatus": "DISABLED",
      "verificationSuccessEmailStatus": "DISABLED",
      "welcomeEmailStatus": "DISABLED",
      "emailDomainWhitelist": [
        "*stormpath.com",
        "*site.com"
      ],
      "emailDomainBlacklist": [],
      "...":"..."
    }

Now, if an Account is passed to Stormpath with an email domain that does not match the entries on this Whitelist, you will get back `an error <https://docs.stormpath.com/rest/product-guide/latest/errors.html#error-7206>`__.

If you were instead working with a Blacklist, and you had added ``*stormpath.com`` and ``*site.com`` to there, then if an Account were passed to Stormpath that contained an email from either of those domains, you would also get back `an error <https://docs.stormpath.com/rest/product-guide/latest/errors.html#error-7205>`__.

Removing a Domain
"""""""""""""""""

If you changed our mind and wanted to only allow users to register with ``stormpath.com`` emails, then you would just update and overwrite the existing Whitelist:

.. only:: csharp or vbnet

  .. warning::

    This feature is not yet available in the .NET SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet

.. only:: java

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (java.todo)

.. only:: nodejs

  .. literalinclude:: code/nodejs/account_management/remove_email_domain_whitelist.js

.. only:: php

  .. code-block:: php

    $accountCreationPolicy->removeEmailDomainWhitelist('stormpath.com')->save();


.. only:: python

  .. warning::

    This feature is not yet available in the |language| SDK. In the meantime, please consult the REST API documentation below.

  .. todo::

    (python.todo)

.. only:: ruby

  .. literalinclude:: code/ruby/account_management/email_domain_restriction3.rb
    :language: ruby

.. only:: rest or csharp or vbnet or php or java

  .. code-block:: http

    POST /v1/accountCreationPolicies/2SKhstu8PlaekcaEXampLE HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

    {
      "emailDomainWhitelist": [
          "*stormpath.com"
          ]
    }

.. only:: not php or node

  And then you'd get back the Account Policies, with the updated Whitelist:

.. only:: csharp or vbnet

  .. todo::

    This.

  .. only:: csharp

  .. only:: vbnet


.. only:: rest or csharp or vbnet or python or java

  .. code-block:: json

    {
      "href": "https://staging-api-b.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaEXampLE",
      "verificationEmailStatus": "DISABLED",
      "verificationSuccessEmailStatus": "DISABLED",
      "welcomeEmailStatus": "DISABLED",
      "emailDomainWhitelist": [
        "*stormpath.com"
      ],
      "emailDomainBlacklist": [],
      "...":"..."
    }

Working with the Blacklist is exactly the same, except you add entries to the ``emailDomainBlacklist`` array instead.

.. _account-linking:

3.8. Account Linking
====================

.. only:: not rest

 .. warning::

    This feature is not yet available in the |language| SDK. In the meantime you can find the REST documentation below.

.. note::

  Before you read this section, we recommend that you familiarize yourself with:

  - :ref:`How Login Works <how-login-works>`
  - :ref:`How Social Authentication Works <social-authn>`

To quickly recap: Every source of user Accounts requires its own Directory in Stormpath. This means that users who directly register through your app will probably be stored inside a Cloud Directory, users who choose to login with Facebook will have to go into a Facebook Directory, and so on.

When a user chooses to log in with a non-Cloud Directory (e.g. Facebook, SAML, etc), Stormpath creates an Account resource to represent them in the appropriate Directory and then returns it upon successful login.

What happens if a user logs in directly with your application one day, then with Facebook the next day, and then with Google as well. The answer is that they will have 3 different Account resources, each one in a different Directory.

To unify these Accounts, Stormpath offers Account Linking. Account Linking allows you to ensure that the Account that is returned on authentication is always the same Account found in the :ref:`default Account Store <add-to-app-or-org>`.

So in the above example, the user could create three separate Accounts in three separate Directories, but if all of those Accounts were linked then each login attempt would always return the same Account resource, regardless of which login method they chose. Moreover, each Account would be associated with the Account in the default Directory via Account Links.

.. _account-linking-benefits:

**What if I only want to support Social/SAML/etc?**

Even if you wanted to only offer Social Login options, or only SAML-based login, we still recommend that you maintain a separate Cloud Directory. For example, if you wanted to only allow Login via Facebook, it still makes sense to have a Cloud Directory separate from your Facebook Directory.

- You can maintain one Directory that has all your user Accounts, retaining globally unique canonical identities across your application

- You are able to leverage your own Groups in the master Directory. Remember, most data in a Mirror Directory is read-only, meaning you cannot create your own Groups in it, only read the Groups (if any) synchronized from the external directory.

- Keep a user’s identity alive even after they’ve left your customer’s organization and been deprovisioned in the external user directory. This is valuable in a SaaS model where the user is loosely coupled to an organization. Contractors and temporary workers are good examples.

- If you wanted to offer new kinds of login in the future, it would be as simple as creating a new kind of Mirror Directory and then ensuring that the new Accounts in that Directory are linked to the one that already exists in the default Directory.

.. _account-linking-login:

How Login Works with Linked Accounts
------------------------------------

There are a number of different scenarios which can occur during login.

Application vs Organization Account Linking Policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First and foremost, both Applications and Organizations have Account Linking Policies. Stormpath will default to the Application's Policy if you do not specify an Organization during login.

.. code-block:: http

  POST /v1/applications/1gk4Dxzi6o4PbdleXaMPLE/loginAttempts HTTP/1.1
  Host: api.stormpath.com
  Authorization: Basic MlpG...
  Content-Type: application/json

  {
    "type": "basic",
    "value": "YWxhbkBzbWl0aGVlZS5jb206UGFzcexample",
    "accountStore": {
      "nameKey":"tenantOneTwoThree"
    }
  }

For an example of how this works, please see :ref:`below <account-linking-automatic-ex2>`.

Example Login Behaviors
^^^^^^^^^^^^^^^^^^^^^^^

For the sake of our examples below, we will assume that there are just two Accounts, one in a Cloud Directory, and one in a Facebook Directory. Further, the Cloud Directory is the default Account Store.

**With Account Linking Disabled**

If the Account Linking Policy is completely disabled then Stormpath ignores Account Links and does not perform any Account Linking behavior.

Example: A user logs in with Facebook, and Stormpath returns the Account in the Facebook Directory.

**With Account Linking Enabled, and Existing, Unlinked Accounts**

If the Account Linking Policy is at least enabled, then on login, Stormpath checks to see if the current Account used for login has any existing Account Links and follows those links. If no linked Accounts exist at all, Stormpath will return whatever Account was used to log in.

Example: A user logs in with Facebook, and Stormpath returns the Account in the Facebook Directory.

**With Existing, Linked Accounts**

On login, Stormpath checks to see if the current Account used for login has any existing Account Links and follows those links. If (1) the current Account is not in the default Account Store and (2) it finds a linked Account that is in the default Account Store, then Stormpath will return that linked Account.

Example: A user logs in with Facebook, and their existing Account in the Stormpath Facebook Directory is linked with an Account found in the Application's default Cloud Directory. Stormpath returns the Account from the Cloud Directory, instead of the Account from the Facebook Directory.

.. note::

  If the Accounts are already linked, then the status of Automatic Account Linking is irrelevant.

**With Automatic Account Linking**

Stormpath still checks the current Account's links to see what other Accounts are linked to it. With Automatic Account Linking, however, Stormpath can also:

- Automatically link any Accounts that it finds that are not linked but should be.
- Create a new Account in the default Account Store and link that Account to the one that was used to log in.

Example: The user logs in with Facebook for the first time and an Account is created in the Facebook Directory. The Application has an Account Link Policy that has automatic provisioning enabled based on the Account's email. Stormpath finds no Account in the default Cloud Directory with this email. An Account is created in the Cloud Directory and linked to the Account in the Facebook Directory. Stormpath returns the newly-created Account from the Cloud Directory, instead of the Account from the Facebook Directory.

The details of Automatic Account Linking are more fully explained :ref:`below <account-linking-automatic>`.

**Manual vs Automatic Account Linking**

All Account Links are separate resources that link together two Accounts found in separate Directories. The Account Linking process itself comes in two varieties: manual, and automatic.

Manual Account Linking involves you manually creating an Account Link resource, that links two Account resources. Automatic Account Linking creates these Account Links automatically based upon behavior configured inside an Account Link Policy resource. These Policy resources can be attached to either an Application or an Organization.

.. _account-linking-manual:

How to Link Accounts Manually
------------------------------------

.. note::

  If you are not interested in manual account linking, you can skip ahead and read about :ref:`account-linking-automatic`.

Let's say we have two Directories: a Cloud Directory, and a Facebook Directory. Both the The Cloud and Facebook Directories are mapped to the same Application, but the Cloud Directory is the default Account Store.

In each of those Directories, there is an Account. One in our Cloud Directory, for user Picard:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accounts/7hOYWCzhhKDFHFzExample",
    "username": "jlpicard",
    "email": "capt@enterprise.com",
    "givenName": "Jean-Luc",
    "middleName": null,
    "surname": "Picard",
    "fullName": "Jean-Luc Picard",
    "thisExample": "isTruncated",
    "...": "..."
  }

And one in the Facebook Directory for user Locutus:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accounts/raxBrEj2lkxJeQExample",
    "username": "locutus",
    "email": "locutus@b.org",
    "givenName": "Locutus",
    "middleName": "",
    "surname": "Ofborg",
    "fullName": "Locutus Ofborg",
    "thisExample": "isTruncated",
    "...": "..."
  }

You can link these two Accounts with a simple POST:

.. code-block:: http

  POST /v1/accountLinks HTTP/1.1
  Host: api.stormpath.com
  Authorization: Basic MlpG...
  Content-Type: application/json

  {
    "leftAccount":{
      "href":"https://api.stormpath.com/v1/accounts/7hOYWCzhhKDFHFzExample"
    },
    "rightAccount":{
      "href":"https://api.stormpath.com/v1/accounts/raxBrEj2lkxJeQExample"
    }
  }

Which on success will return an Account Link:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accountLinks/4BK2fG2nW4G0cb42cnj8HH",
    "createdAt": "2016-09-28T17:32:32.327Z",
    "modifiedAt": "2016-09-28T17:32:32.327Z",
    "leftAccount": {
        "href": "https://api.stormpath.com/v1/accounts/7hOYWCzhhKDFHFzExample"
    },
    "rightAccount": {
        "href": "https://api.stormpath.com/v1/accounts/raxBrEj2lkxJeQExample"
    }
  }

This means that:

- this Account Link will appear in both of these Accounts' ``accountLinks`` collections, and
- each Account will appear in the others ``linkedAccounts`` collection.

.. note::

  Account Links can be created and deleted, but they cannot be updated. For information about Account Links, please see the :ref:`Reference chapter <ref-accountlink>`

There is one more aspect to Account Linking, which regards login behavior (as already summarized :ref:`above <account-linking-login>`). The Application has an :ref:`Account Linking Policy <ref-account-linking-policy>`, which is enabled:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accountLinkingPolicies/3xX7u47eCrJTN7l6nLTMTa",
    "createdAt": "2016-07-21T01:03:49.813Z",
    "modifiedAt": "2016-09-28T18:19:09.572Z",
    "status": "ENABLED",
    "automaticProvisioning": "DISABLED",
    "matchingProperty": null,
    "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/Ftlhx6oq2PwScGW3RsXeF"
    }
  }

.. note::

  Account Linking Policies can be associated with either an Application or Organization. If you would like to use an Organization's Account Linking Policy then you must specify it in your login attempt.

Because the Account Linking Policy is enabled, and because the Cloud Directory is the default Account Store, if you send a Login Attempt with either of these Accounts, then the Account that you get back will the default Account Store's Picard Account. In other words: If you log in with the Picard Account credentials, Stormpath will return the Picard Account, and if you log in with the Locutus Account credentials, Stormpath will still return the Picard Account.

This is because Stormpath traverses the Account Links for the Account that is logging-in to see if a linked Account exists in the Application's default Account Store. Because Picard is in the default Account Store, Stormpath still just returns the Picard Account. However, the Locutus Account is not in the default Account Store, but is linked to the Picard Account which is in the default Account Store, so the Picard Account is returned.

This behavior exists only because the Account Linking Policy is set as ``enabled``. If it were ``disabled`` then Stormpath would not follow Account Links. This means that you would still be able to link the two Accounts, but upon login you would receive back whichever Account was used to log-in.

.. _account-linking-automatic:

How to Link Accounts Automatically
------------------------------------

So far we have covered how to link Accounts manually. However, it is also possible to link Accounts automatically at login time. This linking behavior is controlled by an Account Linking Policy.

.. _about-alp:

What's in the Account Linking Policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every Application and Organization has an Account Linking Policy resource. In both cases the path is the same:

``/v1/accountLinkingPolicies/$ACCOUNT_LINKING_POLICY_ID``

The Account Linking Policy has three attributes that control aspects of Account Linking behavior:

**Status:**

This attribute controls whether this Policy is in effect or not. If you would not like this policy to be in effect, set this to ``DISABLED``.

If Account Linking is enabled then Stormpath will check linked Accounts on login and behave as described in :ref:`account-linking-login`. If it is disabled, you are still able to link Accounts manually, but Stormpath takes no actions based upon these links.

**Automatic Provisioning:**

This attribute tells Stormpath whether you would like new Accounts to be automatically created in the default Account Store.

For example: if a user Account is created in a Social Directory (e.g. Google), and they do not already have an Account in the default Account Store, Automatic Provisioning would then create an Account with the same information inside the default Account Store. That Account would then be automatically linked to the Account in the Social Directory.

**Matching Property**

This defines what Account attribute should be used as a basis for automatically creating account links. The current possible values are:

- ``null``: which means that you would not like any matching to occur
- ``email``: which will match Accounts based on their ``email`` attribute.

.. note::

  The ``email`` matchingProperty will only match verified Accounts. For more on this, see :ref:`account-linking-verification`.

**Policy Values and Outcomes**

Because logging in via a Mirror Directory (Social, SAML, etc) will create an Account if it doesn't already exist, Automatic Provisioning and the Matching Property are intended for use with Mirror Directory login. So what happens if a user logs in via a Mirror Directory? First of all, if the external credentials are valid, Stormpath creates an Account for them in that Mirror Directory. What happens next depends on the configuration of your Account Linking Policy.

Default behavior, without Account Linking, is that the newly-created Account from the Mirror Directory will be returned.

This table shows the possible combinations of Account Linking Policy values. It also indicates whether a matching Account exists in the default Account Store (which must be a Cloud Account), and then the result to expect when logging in with a new Mirror Directory.

.. list-table::
  :widths: 10 10 15 30 35
  :header-rows: 1

  * - Automatic Provisioning
    - Matching Property
    - Matching Account Exists?
    - Result
    - Explanation

  * - Disabled
    - Null
    - No
    - Return Account that was logged in.
    - No action taken by Stormpath.

  * - Disabled
    - Null
    - Yes
    - Return Account that was logged in.
    - No action taken by Stormpath.

  * - Disabled
    - Email
    - No
    - Return Account that was logged in.
    - No action taken by Stormpath.

  * - Disabled
    - Email
    - Yes
    - Cloud Account is returned.
    - Stormpath links new Account to existing Account and returns existing Account.

  * - Enabled
    - Null
    - No
    - Cloud Account is returned.
    - Account created in Cloud Directory and both Accounts are linked.

  * - Enabled
    - Null
    - Yes
    - Return Account that was logged in.
    - Stormpath attempts to create Account in Cloud Directory but cannot because of email uniqueness constraint.

  * - Enabled
    - Email
    - No
    - Cloud Account is returned.
    - New Account created, then Cloud Account created, then both Accounts linked.

  * - Enabled
    - Email
    - Yes
    - Cloud Account is returned.
    - New Account created, then linked to existing Cloud Account.

.. note::

  The above table assumes that you are either sending a :ref:`Login Attempt <how-login-works>` or a Social Login POST to the :ref:`Application's Accounts endpoint <social-authn>`. In the case of the :ref:`OAuth flow <generate-oauth-token>`, instead of getting back an Account, you would receive back OAuth Tokens associated with that Account.

.. _account-linking-verification:

Account Matching and Account Verification
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath will only automatically link to and from Accounts that have had their email verified.

.. only:: rest

  This means that the Account resource must have its ``emailVerificationStatus`` set to ``VERIFIED``.

Accounts in Mirror Directories will have their email verification status verified on creation, as will any Accounts that are automatically provisioned from Accounts that are themselves verified.

.. _account-linking-automatic-ex1:

Example Scenario 1
^^^^^^^^^^^^^^^^^^

This is probably the most common scenario, where you want to allow your users Social Login, but also want to maintain a separate canonical user Directory. In this example you have:

- A Cloud Directory (the default Account Store)
- A Google Directory
- A Facebook Directory

Your Application's Account Linking Policy has:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accountLinkingPolicies/3xX7u47eCrJTN7l6nLTMTa",
    "createdAt": "2016-07-21T01:03:49.813Z",
    "modifiedAt": "2016-09-28T18:19:09.572Z",
    "status": "ENABLED",
    "automaticProvisioning": "ENABLED",
    "matchingProperty": "email",
    "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/Ftlhx6oq2PwScGW3RsXeF"
    }
  }

So when Janelle, a new user of your application, clicks on the "Login with Facebook" button on your login page, you have it send a login attempt:

.. code-block:: http

  POST /v1/applications/560ySU9jUOCFMXsIM1fcGC/accounts HTTP/1.1
  Host: api.stormpath.com
  Content-Type: application/json
  Authorization: Basic NjUxW...
  Cache-Control: no-cache

  {
    "providerData": {
      "providerId": "facebook",
      "accessToken": "EAAT68k[...]T8TAZDZD"
    }
  }

After the credentials are validated, Stormpath will do a few things:

1. Create an Account in the Facebook Directory.
2. Because the Matching Property is "email" Stormpath will next check if there are any Accounts to link this Account with. This user has never used your app before, so there are no other Accounts using this email.
3. Create an Account in the Cloud Directory with the same information as the one in the Facebook Directory.
4. Link the Accounts in the Facebook and Cloud Directories to each other.

Your user Janelle now has an Account in the Facebook Directory, an Account in the Cloud Directory, and both of these Accounts are linked via accountLink resources.

Stormpath will now return the Account from the Cloud Directory:

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accounts/4Ne98Nh3OscHLuBexample",
    "username": "jkallday@email.com",
    "email": "jkallday@email.com",
    "givenName": "Janelle",
    "...":"..."
  }

If at a later date she were to choose to login via Google, then (assuming her Facebook and Google use the same email) Stormpath would create an Account for her in the Google Directory, link it to the Cloud Directory Account, and then return that Cloud Account.

.. _account-linking-automatic-ex2:

Example Scenario 2
^^^^^^^^^^^^^^^^^^

In this example we will show a :ref:`multi-tenant application <multitenancy>` that wants to let each of its tenants decide on their own Account Linking behavior. In order to accomplish this, there a few things that need to happen:

- the Application's Account Linking Policy is irrelevant, since it will be skipped if we specify an Organization in the login attempt
- the Organization Account Linking Policies are used to control Account Linking behavior
- Every Organization has its own Cloud Directory that serves as its default Account Store. Mirror Directories can be shared between Organizations.
- The login page for this application must pass the user's Organization ``href`` or ``nameKey`` with every login attempt.

.. note::

  Whether the Application's Account Linking Policy

So a login attempt to a Facebook Directory would look like the one above, but with an Account Store specified as well, in this case an Organization ``nameKey``:

.. code-block:: none

  .. code-block:: http

  POST /v1/applications/1FxaAPbyW3JqNLbsPaH26R/accounts HTTP/1.1
  Host: api.stormpath.com
  Content-Type: application/json
  Authorization: Basic NjUxW...
  Cache-Control: no-cache

  {
    "providerData": {
      "providerId": "facebook",
      "accessToken": "EAAT68k[...]T8TAZDZD"
      "accountStore": {
        "nameKey": "OrganizationA"
      }
    }
  }

This targeted login attempt would tell Stormpath to go to that specific Organization's Directories to find the Account. From that point on, any Account creation and linking policies would be enacted based on the policies associated with that particular Organization's Directories.

.. note::

  The behavior described above would be the same if we made a POST to the ``/loginAttempts`` endpoint, or used the OAuth flow.

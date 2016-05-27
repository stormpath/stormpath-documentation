.. _multitenancy:

*******************************
6. Multi-Tenancy with Stormpath
*******************************

6.1. What Is a Multi-Tenant Application?
========================================

The best way to understand the concept of multi-tenancy is by thinking of a condo: lots of residents making use of a shared infrastructure while maintaining their own private and secure living areas. Similar to this, a **multi-tenant application** is a single application that services multiple tenants simultaneously. For privacy and security purposes, it's very important that the application maintain data segmentation between its multiple tenants. At Stormpath, this segmentation is baked-in to our data model.

6.2. Modeling Tenants in Stormpath
===================================

Multi-tenant applications come with special user management considerations:

- How will tenants be represented?
- How will user data in one tenant be kept secure and separate from other tenant partitions?

In our :ref:`Account Management <account-mgmt>` chapter we discussed two kinds of Account Stores: :ref:`Directories <directory-mgmt>`, and :ref:`Groups <group-mgmt>`. For multi-tenant applications there is an additional :ref:`Organization <ref-organization>` resource, which functions like a virtual Account Store that itself wraps both Directories and Groups.

.. note::

  A Directory or Group can be added to multiple Organizations.

As with all user base modeling, we'll begin with the basics: Directories and Groups. Then we will move on to an explanation of how the Organization resource is used when modeling multi-tenancy.

.. _multitenancy-strategies:

6.2.1. Account Store Strategies for Multi-Tenancy
-------------------------------------------------

Your primary consideration when modeling users in Stormpath always begins with the Directory that will contain the user Accounts. With multi-tenancy, the additional consideration is whether you will have each one of your application's tenants represented by a Directory or a Group.

Strategy 1: Tenants as Directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To understand the multi-tenancy considerations in modeling tenants as :ref:`Directories <ref-directory>`, there are three characteristics of Directories that are worth remembering:

- All Accounts within a Directory must have a unique ``email`` and ``username``
- All Groups within a Directory must have a unique ``name``
- User policies, such as the :ref:`Password Policy <ref-password-policy>` and the :ref:`Account Creation Policy <ref-accnt-creation-policy>` are set at the Directory level

From these points we can derive a few conditions where the tenants-as-Directories strategy is optimal. If your tenants satisfy one or more of these conditions:

- You do not require email uniqueness across tenants. If a user has signed up for an Account with one tenant, they are able to use that same email to create an email for another Account in another tenant.
- Each tenant has its own password strength policy.
- Each tenant has different emails that need to be sent (or not sent) as part of the user Account creation process.
- Each tenant requires different user Groups and/or :ref:`role Groups <role-groups>`. Application-wide Groups that span across tenants are not required.

Tenants as Directories Example
""""""""""""""""""""""""""""""

Here is an example implementation that uses Directories to model tenants. It is important to note that this is just an example. Stormpath has a very flexible data model with intentionally versatile resources. If you'd like to discuss your particular implementation needs please `get in touch <support@stormpath.com>`_!

.. figure:: images/multitenancy/ERD_TpD.png
    :align: center
    :scale: 100%
    :alt: Tenant per Directory

    *Tenants as Directories ERD.*

An example implementation of the Tenants-as-Directories strategy is shown in the diagram above. Please note that everything discussed occurs inside the private data space that we refer to as your Stormpath Tenant, which is represented by the Tenant resource but does not play any part in multi-tenancy. The scenario demonstrates a multi-tenant userbase with two tenants, each of who is represented by two resources: an Organization and a Directory. There are a few points to highlight in this diagram:

- The ability to log into the "Lighting Banking" application is controlled by the accountStoreMappings that exist between the Application resource and the Organization resources. To enable or disable a tenant (and its userbase) from logging-in, all you would have to do is enable or disable this Account Store Mapping.
- If Claire wanted to create another Account with Bank of B using the same email address, she would be allowed to, since email uniqueness is enforced only inside a Directory.
- Any role Groups must be created separately, on a per-Directory basis. If you decided to create a new role, a new Group resource representing that role would have to be added to each of your tenant Directories if you wanted the Accounts in that Directory to be able to be assigned that role.
- In order to allow Application Administrators to log in to the app, you'd have to create a new Directory just for them, which is separately mapped to the Application as an Account Store. Since this Directory does not represent a tenant, no Organization resource is created.

Strategy 2: Tenants as Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The other multi-tenancy option is to have a single Directory under which each of your application's tenants has their own Group. Choosing this strategy is likely right for you if:

- You want to guarantee ``email`` and ``username`` uniqueness across all tenants. This allows for a unified user identity, which allows for things like single-sign-on and account sharing between tenants on your application.
- All tenants share password and email policies.
- You want to ensure that tenant names are unique, since the Group ``name`` must be unique within a Directory.
- You want to have application-wide roles that span across tenants.

Tenants as Groups Example
"""""""""""""""""""""""""

Below we have an example of an implementation that uses Groups to model tenants. This shows just one possible scenario, and if you'd like to discuss your particular implementation needs please `get in touch <support@stormpath.com>`_!

.. figure:: images/multitenancy/ERD_TpG.png
    :align: center
    :scale: 100%
    :alt: Tenant per Group

    *Tenants as Groups ERD*

Once again, everything here is happening inside your private Stormpath Tenant. Just as with the Tenants-as-Directories strategy, every Tenant is modeled by its own dedicated Organization, but in this case there is also one Group resource per Tenant. All of the Accounts and Groups are contained within a single Directory resource. This all means that:

- You can still control access to the Application by enabling or disabling the accountStoreMappings between the Organizations and the Application resource.
- If Claire tried to create another Account with Bank of B using the same email address she'd used with Bank of A, she would be unable to, since emails must be unique within a Directory.
- If there were a role Group that you wanted to be shared among the tenants, it is as simple as creating one instance of it and then associating Accounts with it.
- Application Administrators just need their own Role Group, which is then mapped as an Account Store with the Application.
- Claire and Esther do not have access to your application's Admin Console, because that is only allowed for members of the "App Admins" role Group. If, however, Claire were hired as an Application Administrator, then she could be easily added to the "App Admins" Group and inherit all of its permissions.

Naming Your Tenant Groups
"""""""""""""""""""""""""

As this is the most common strategy used by our customers, we have found some minor naming conventions that are very powerful and we consider to be best-practice.

First of all, the name of your tenant Organization will have a unique ``nameKey``, for example ``bank-of-a``. This ``nameKey`` this can be used for organizing tenant Groups and sub-Groups.

For example, if your Organization's ``nameKey`` is ``bank-of-a``, you could name the Group ``bank-of-a.tenant``. If you want to create sub-Groups for roles like ``users`` and ``admins``, we recommend that you prepend the ``nameKey`` to their ``name`` Attribute, along with a descriptive name of what kind of Group it is:

``bank-of-a.role.users``

``bank-of-a.role.admin``

This has two benefits:

1. It makes it easy to find all the role Groups for that particular tenant, since you can search for the nameKey:

.. only:: rest

  ``GET https://api.stormpath.com/v1/directories/29E0XzabMwPGluegBqAl0Y/groups?name=bank-of-a.role.*``

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

Or, if you wanted to retrieve the tenant Group and all of its sub-Groups, make the query a little less restrictive by removing the "role"::

.. only:: rest

  GET https://api.stormpath.com/v1/directories/29E0XzabMwPGluegBqAl0Y/groups?name=bank-of-a.*

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

2. It ensures that no tenant sub-Groups have name collisions between tenants.

6.2.2. Organizations
--------------------

Once you have your application's tenants modeled as Directories or Groups, the final tool that Stormpath gives you is the Organization resource. These are umbrella entities that allow you to better structure and control multi-tenant applications.

.. note::

  The :ref:`ref-organization` resource is not to be confused with the Tenant resource. While the :ref:`ref-tenant` resource is so-called because it represents your tenancy inside the Stormpath server, the Organization resource represents the space alloted for a tenant of your application.

The Organization resource allows your application's tenants to have as many, or as few, Directories and Groups as they want, while also maintaining strict data segregation. So if a tenant requires a Cloud Directory, a Google Social Directory, and an LDAP Directory, all of these can sit under the umbrella of a single Organization resource that represents their data space in your app.

Although Organizations do not themselves own Accounts in the same way as Directories and Groups, they can be mapped to Applications as Account Stores for the purposes of user log in. This means that they can be used as, among other things, a single-point of access control to an Application. For example, if you wanted to enable login for a new tenant in your multi-tenant application, all you would have to do is map all of the relevant Directories and/or Groups to your Organization, and then map that Organization to your Application as an Account Store. If at some future point you want to disable that tenant, all you have to do is remove the Account Store Mapping between that Organization and your Application, and the tenant's users would no longer be able to log in.

.. _create-org:

How to Create an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can create an Organization in Stormpath by sending the following request:

.. only:: rest

  .. code-block:: http

    POST /v1/organizations HTTP/1.1
    Host: api.stormpath.com

    {
      "name": "Bank of A",
      "nameKey": "bank-of-a",
      "status": "ENABLED"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

Which would return the following:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE",
      "createdAt": "2015-10-02T15:27:01.658Z",
      "modifiedAt": "2015-10-02T15:27:01.658Z",
      "name": "Bank of A",
      "nameKey": "bank-of-a",
      "status": "ENABLED",
      "description": null,
      "customData": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE/customData"
      },
      "defaultAccountStoreMapping": null,
      "defaultGroupStoreMapping": null,
      "accountStoreMappings": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE/accountStoreMappings"
      },
      "groups": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE/groups"
      },
      "accounts": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE/accounts"
      },
      "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgexAMPLE"
      }
    }

  Notice here that both the Default Account Store and Group Store are ``null`` which means that Groups and Accounts added to the Organization (e.g. A POST to ``/v1/organizations/$ORGANIZATION_ID/groups``) would fail until a default Account Store is added.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

Adding an Account Store to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like other Account Stores, an Organization can be mapped to an Application so that users in the Organization can log-in to that application (for more about how logging-in works with Stormpath, please see :ref:`the Authentication chapter <authn>`). But before you do this, you must first associate some users with the Organization so that there is someone to log in! To do this, you have to map some Account Stores to your Organization.

.. only:: rest

  First, you will need the ``href`` value for a Directory or Group. This, combined with the ``href`` of the Organization will be sent in a request:

  .. code-block:: http

    POST /v1/organizations HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
      "organization": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE"
      },
      "accountStore": {
        "href": "https://api.stormpath.com/v1/groups/2SKhstu8Plaekcaexample"
      }
    }

  These two attributes, ``organization`` and ``accountStore`` are required, though you may add some optional attributes as well:

  - ``listIndex``: Represents the priority in which this accountStore will be consulted by the Organization during an authentication attempt. This is a zero-based index, meaning that an Account Store at ``listIndex`` of 0 will be consulted first, followed by the Account Store at listIndex 1, etc. Setting a negative value will default the value to 0, placing it first in the list. A listIndex of larger than the current list size will place the mapping at the end of the list and then default the value to (list size – 1).

  - ``isDefaultAccountStore``: A ``true`` value indicates that new Accounts created by the Organization’s ``/accounts`` endpoint will be automatically saved to this mapping’s Directory or Group.

  - ``isDefaultGroupStore``: A ``true`` value indicates that new Groups created by the Organization’s ``/groups`` endpoint will be automatically saved to this mapping’s Directory. Note that a ``true`` value will only be valid here if the accountStore is a Directory.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

In order to be able to add Groups and Accounts to the Organization in the way mentioned above, we should also make sure that we mark this Account Store as our default for both Accounts and Groups:

.. only:: rest

  .. code-block:: http

      POST /v1/organizations HTTP/1.1
      Host: api.stormpath.com
      Content-Type: application/json;charset=UTF-8

      {
        "organization": {
          "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE"
        },
        "accountStore": {
          "href": "https://api.stormpath.com/v1/groups/2SKhstu8Plaekcaexample"
        },
        "isDefaultAccountStore":true,
        "isDefaultGroupStore":true
      }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

Which would result in the following ``201 Created`` response:

.. only:: rest

  .. code-block:: http

    HTTP/1.1 201 Created
    Location: https://api.stormpath.com/v1/organizationAccountStoreMappings/3e9cNxhX8abxmPWexAMPle"
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/organizationAccountStoreMappings/3e9cNxhX8abxmPWexAMPle",
      "listIndex": 0,
      "isDefaultAccountStore": true,
      "isDefaultGroupStore": true,
      "organization": {
        "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE"
      },
      "accountStore": {
        "href": "https://api.stormpath.com/v1/groups/2SKhstu8Plaekcaexample"
      }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python

So our Organization now has an associated Directory which can be used as an Account Store to add new Accounts and Groups. To enable login for the Accounts in this Organization, we must now map the Organization to an Application.

Registering an Organization as an Account Store for an Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in :ref:`the Authentication chapter <authn>`, in order to allow users to log-in to an Application, you must map some kind of Account Store (e.g. a Group or Directory) to it. One approach is to go one-by-one and map each Directory and/or Group to the Application. However, since we are building a multi-tenant app, and the Organization is itself an Account Store, we can just map our Organization resource to our Application resource. This would enable login for all of the Directories and Groups currently inside that Organization, as well as any we add in the future.

To map an Organization to an Application, follow the steps you would for any Account Store, as described in :ref:`create-asm`.

.. _add-accnt-to-org:

Adding an Account to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Adding a new Account to an Organization is exactly the same as adding them to a Directory, except that you use the Organization to route the creation request:

.. only:: rest

  .. code-block:: http

    POST /v1/organizations/2P4XOanz26AUomIexAmple/accounts HTTP/1.1
    Host: api.stormpath.com
    Content-Type: application/json;charset=UTF-8

    {
        "givenName": "Annie",
        "surname": "Nguyen",
        "username": "annie@nguyengland.me",
        "email": "annie@nguyengland.me",
        "password":"Changeme1",
        "customData": {
            "favoriteColor": "fuschia"
        }
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/multitenancy/
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/multitenancy/
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/multitenancy/
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/multitenancy/
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/multitenancy/
    :language: php

.. only:: python

  .. literalinclude:: code/python/multitenancy/
      :language: python


6.3. Authenticating an Account against an Organization
======================================================

Authenticating an Account against an Organization works essentially the same way as described in :ref:`how-login-works`. The only difference is that adding the Organization resource allows for an additional level of Account Stores.

When a login attempt is made against an Application’s ``/loginAttempts`` endpoint without specifying an Account Store, Stormpath will iterate through the index of Account Stores mapped to the Application, in priority order. For every Account Store entry:

- If it is a Directory or Group, attempt to log in on that resource.

- If it is an Organization:

  - Iterate through the index of Account Stores mapped to the Organization, in priority order. For every Account Store entry:

    - If it is a Directory or Group, attempt to log in on that resource.

If the login attempt does specify an Organization, then we simply jump to that point in the steps, and the Organization's Account Stores are iterated through as described above.

.. _multitenant-routing-users:

6.4 Routing Users to their Tenant
==================================

If you are designing a public multi-tenant web application that supports multiple application tenants with private data partitioning, then you will probably want some way for users to specify which tenant they are logging in to.

This tenant selection also extends to the requests that the user makes. For example, let's say we have a multi-tenant e-commerce SaaS application that shows purchase history. If a user requests the ``/purchases`` view, they should only be able to see the purchases specific to their organization. This means that instead of executing a query like this to a database:

.. code-block:: sql

  SELECT * from purchases;

The application needs to know the request user’s tenant identifier so they can show only the purchases for that tenant. The application might instead execute the following query:

.. code-block:: sql

  SELECT * from purchases where tenant_id = ?;

where ? is the ``tenant_id`` value obtained by inspecting the request.

So if an application needs this identifier with every request, how do you ensure it is transmitted to the application in the easiest possible way for your end users? The best method is to use the :ref:`Organization resource <ref-organization>` and it's ``nameKey`` attribute.

.. note::

  Stormpath's ID Site supports multi-tenancy right out of the box. For more information about how to handle user login in a multi-tenant set-up with ID Site, please see :ref:`the ID Site chapter <idsite-multitenancy>`.

We present here two possible solutions that use this ``nameKey``. You may support both if you wish to give your customers convenience options.

6.4.1. Sub-Domain
------------------------

The first solution is to allow your users to access your application via a unique subdomain URL:

``https://organizationNameKey.myapplication.io``

The primary benefit here is that the application never needs to ask the user for the tenant identifier, because it is inherently part of every request in the ``HOST`` header. Also, since we are using the Organization resource's ``nameKey``, we can guarantee that the URL is unique.

There are also a few other things that we recommend with this approach:

Separate Domain Space
^^^^^^^^^^^^^^^^^^^^^

Keep your customer organization subdomains space completely separate from your company's subdomain space by using a different top-level domain name for your SaaS application.

So if your company's website URL is ``http://mycompany.com``, then your customers could use the ``http://mycompany.io`` domain space:

``http://customerA.mycompany.io``

If you use the same domain space, it is possible that one of your customer's will end up using a subdomain that you might want to use for your company.

If you didn't want to use a separate top-level domain, you could also use sub-subdomains. For example, the app could be accessible here:

``http://myapp.mycompany.com``

And customer organization subdomains for that app would be accessible via:

``http://customerA.myapp.mycompany.com``

It is our opinion that the separate top-level domain (e.g. ``http://mycompany.io``) is the nicer alternative: it is shorter, easier to remember, easier to type, and it also looks better.

Combine With Login Form Field
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a user from a customer organization ever accesses your app directly (``https://mycompany.io``) instead of using their subdomain (``https://customerA.mycompany.io``), you still might need to provide a tenant-aware login form (described below). After login, you can redirect them to their tenant-specific URL for all subsequent requests.

6.4.2. Login Form Field
------------------------

An alternative, or complimentary, approach to tenant subdomains is to allow the user to specify their tenant on the login page, then storing that information. Then, for all subsequent requests to your application, you can:

- Inspect the session
- Look up the tenant ID
- Customize data views and queries based on the session's Organization

We advise that you auto-remember the login form tenant ID value so that field is pre-populated whenever a user returns to log in. Users don’t like having to remember and type that value in every time they log in.

As already mentioned, it is strongly recommended that your tenant identifier be an Organization ``nameKey``. Firstly because Organizations are the recommended resource to use to model multi-tenancy, but also because the ``nameKey`` attribute is unique and follows the DNS specification, which means that you could at any time adopt the Sub-Domain approach mentioned above.

Stormpath supports quick implementation of all of these strategies with ID Site. For more information, please see :ref:`the ID Site chapter <idsite-multitenancy>`.
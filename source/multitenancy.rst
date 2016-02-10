.. _multitenancy:

*******************************
7. Multi-Tenancy with Stormpath
*******************************

7.1. What Is a Multi-Tenant Application? 
========================================

The best way to understand the concept of multi-tenancy is by thinking of a condo: lots of residents making use of a shared infrastructure while maintaining their own private and secure living areas. Similar to this, a **multi-tenant application** is a single application that services multiple tenants simultaneously. For privacy and security purposes, it's very important that the application maintain data segmentation between its multiple tenants. At Stormpath, this segmentation is baked-in to our data model. How do we do this? Well, it starts with an Organization.

7.2. Modeling Tenants in Stormpath
===================================

In our :ref:`Account Management <account-mgmt>` chapter we discussed two kinds of Account Stores: :ref:`Directories <directory-mgmt>`, and :ref:`Groups <group-mgmt>`. For multi-tenant applications there is an additional :ref:`Organization <ref-organization>` resource, which functions like a virtual Account Store that itself wraps both Directories and Groups. 

.. note::

  A Directory or Group can be added to multiple Organizations.

As with all user base modeling, we'll begin with the basics: Directories and Groups. Then we will move on to an explanation of how the Organization resource is used when modeling multi-tenancy.

7.2.1. Account Store Strategies for Multi-Tenancy
-------------------------------------------------

Your primary consideration when modeling users in Stormpath always begins with the Directory that will contain the user Accounts. With multi-tenancy, the additional consideration is whether you will have each one of your application's tenants represented by a Directory or a Group. 

Strategy 1: Tenants as Directories
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To understand the multi-tenancy considerations in modeling tenants as :ref:`Directories <ref-directory>`, there are three characteristics of Directories that are worth remembering:

- All Accounts within a Directory must have a unique ``email`` and ``username``
- All Groups within a Directory must have a unique ``name``
- User policies, such as the :ref:`Password Policy <ref-password-policy>` and the :ref:`Account Creation Policy <ref-accnt-creation-policy>` are set at the Directory level

From these points we can derive a few conditions where the tenants-as-Directories strategy is optimal. If your tenants satisfy one or more of these conditions:

- Every Account in a tenant must be guaranteed to have a unique ``email``  and ``username``. If a person had already registered for one tenant of your Application, and tried to use the same email address to register for another tenant, they would not be allowed.
- Each tenant has its own password strength policy.
- Each tenant has different emails that need to be sent (or not sent) as part of the user Account creation process.
- Each tenant requires different user Groups and/or :ref:`role Groups <role-groups>`. 

.. todo::

  What else? An example would be good.

Strategy 2: Tenants as Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The other multi-tenancy option is to have a single Directory under which each of your application's tenants has their own Group. Choosing this strategy is likely right for you if:

- You want to guarantee ``email`` and ``username`` uniqueness across all tenants. This allows for a unified user identity, which allows for things like single-sign-on and account sharing between tenants on your application.
- All tenants share password and email policies.
- You want to ensure that tenant names are unique, since the Group ``name`` must be unique within a Directory.

.. note::

  In both strategies you can still have different Groups and Roles that span the entire Application, regardless of whether you choose to model your tenants with Groups or with Directories. For more on this, see here: :ref:`app-wide-roles`.

As this is the most common strategy used by our customers, we have found some minor naming conventions that are very powerful and we consider to be best-practice.

Naming Your Tenant Groups
"""""""""""""""""""""""""

First of all, the name of your tenant Organization will have a unique ``nameKey``, for example ``aargau``. This ``nameKey`` this can be used for organizing tenant Groups and sub-Groups.

For example, if your Organization's ``nameKey`` is ``aargau``, you could name the Group ``aargau.tenant``. If you want to create sub-Groups for roles like ``users`` and ``admins``, we recommend that you prepend the ``nameKey`` to their ``name`` Attribute, along with a descriptive name of what kind of Group it is:

``aargau.role.users``

``aargau.role.administrators``

This has two benefits: 

1. It makes it easy to find all the role Groups for that particular tenant, since you can simply search for the nameKey in the ``name`` field:

  ``GET https://api.stormpath.com/v1/directories/29E0XzabMwPGluegBqAl0Y/groups?name=aargau.role.*``

Or, if you wanted to retrieve the tenant Group and all of its sub-Groups, make the query a little less restrictive by removing the "role"::

  GET https://api.stormpath.com/v1/directories/29E0XzabMwPGluegBqAl0Y/groups?name=aargau.*

2. It ensures that no tenant sub-Groups have name collisions between tenants.

7.2.2. Organizations
--------------------

Once you have your application's tenants modeled as Directories or Groups, the final tool that Stormpath gives you is the Organization resource. These are umbrella entities that allow you to better structure and control multi-tenant applications. 

.. note:: 
  
  The :ref:`ref-organization` resource is not to be confused with the Tenant resource. While the :ref:`ref-tenant` resource is so-called because it represents your tenancy inside the Stormpath server, the Organization resource represents the space alloted for a tenant of your application.

The Organization resource allows your application's tenants to have as many, or as few, Directories and Groups as they want, while also maintaining strict data segregation. So if a tenant requires a Cloud Directory, a Google Social Directory, and an LDAP Directory, all of these can sit under the umbrella of a single Organization resource that represents their data space in your app. 

Although Organizations do not themselves own Accounts in the same way as Directories and Groups, they can be mapped to Applications as Account Stores for the purposes of user log in. This means that they can be used as single-point for access control to an Application. So, if you wanted to enable login for a new tenant in your multi-tenant application, all you would have to do is map all of the relevant Directories and/or Groups to your Organization, and then map that Organization to your Application as an Account Store. If at some future point you want to disable that tenant, all you have to do is remove the Account Store Mapping between that Organization and your Application, and the tenant's users would no longer be able to log in. 

How to Create an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can create an Organization in Stormpath by simply performing an HTTP POST to the ``/v1/organizations`` endpoint.

So, if for example one of our application's tenants was the Bank of Aargau, we could send the following POST:

.. code-block:: http

  POST /v1/organizations HTTP/1.1
  Host: api.stormpath.com
  Content-Type: application/json;charset=UTF-8

  {
    "name": "Bank of Aargau",
    "nameKey": "aargau",
    "status": "ENABLED"
  }

Which would return the following:

.. code-block:: http 

  HTTP/1.1 201 Created
  Location: https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE
  Content-Type: application/json;charset=UTF-8

  {
    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofEXaMPLE",
    "createdAt": "2015-10-02T15:27:01.658Z",
    "modifiedAt": "2015-10-02T15:27:01.658Z",
    "name": "Bank of Aargau",
    "nameKey": "aargau",
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

Adding an Account Store to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like other Account Stores, an Organization can be mapped to an Application so that users in the Organization can log-in to that application (for more about how logging-in works with Stormpath, please see :ref:`the Authentication chapter <authn>`). But before you do this, you must first associate some users with the Organization so that there is someone to log in! To do this, you have to map some Account Stores to your Organization.

First, you will need the ``href`` value for a Directory or Group. This, combined with the ``href`` of the Organization will be sent in a POST:

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

In order to be able to add Groups and Accounts to the Organization in the way mentioned above, we should also make sure that we mark this Account Store as our default for both Accounts and Groups:

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

Which would result in the following ``201 Created`` response:

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

So our Organization now has an associated Directory which can be used as an Account Store to add new Accounts and Groups. To enable login for the Accounts in this Organization, we must now map the Organization to an Application.

Registering an Organization as an Account Store for an Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in :ref:`the Authentication chapter <authn>`, in order to allow users to log-in to an Application, you must map some kind of Account Store (e.g. a Group or Directory) to it. One approach is to go one-by-one and map each Directory and/or Group to the Application. However, since we are building a multi-tenant app, and the Organization is itself an Account Store, we can just map our Organization resource to our Application resource. This would enable login for all of the Directories and Groups currently inside that Organization, as well as any we add in the future. 

To map an Organization to an Application, simply follow the steps you would for any Account Store, as described in :ref:`create-asm`.

7.3. Authenticating an Account against an Organization
======================================================

Authenticating an Account against an Organization works essentially the same way as described in :ref:`how-login-works`. The only difference is that adding the Organization resource allows for an additional level of Account Stores. 

When a login attempt is made against an Application’s ``/loginAttempts`` endpoint without specifying an Account Store, Stormpath will iterate through the index of Account Stores mapped to the Application, in priority order. For every Account Store entry:

- If it is a Directory or Group, attempt to log in on that resource.

- If it is an Organization:
  
  - Iterate through the index of Account Stores mapped to the Organization, in priority order. For every Account Store entry:
  
    - If it is a Directory or Group, attempt to log in on that resource.

If the login attempt does specify an Organization, then we simply jump to that point in the steps, and the Organization's Account Stores are iterated through as described above. 
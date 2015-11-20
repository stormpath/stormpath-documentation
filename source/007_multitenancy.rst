.. _multitenancy:

*******************************
7. Multi-Tenancy with Stormpath
*******************************

a. What Is a Multi-Tenant Application? 
======================================

.. todo::

    Make sure the code-block directive is used throughout.

The best way to understand the concept of multi-tenancy is by thinking of a condo: lots of residents making use of a shared infrastructure while maintaining their own private and secure living areas. Similar to this, a **multi-tenant application** is a single application that services multiple tenants simultaneously. For privacy and security purposes, it's very important that the application maintain data segmentation between its multiple tenants. At Stormpath, this segmentation is baked-in to our data model. How do we do this? Well, it starts with an Organization.

b. Modeling Tenants in Stormpath
=================================

In our :ref:`Account Management <account-mgmt>` chapter we discussed two kinds of Account Stores: :ref:`Directories <directory-mgmt>`, and :ref:`Groups <group-mgmt>`. For multi-tenant applications there is an additional **Organization** resource, which functions like a virtual Account Store that itself wraps both Directories and Groups. 

.. note::

	A Directory or Group can be added to multiple Organizations.

Organizations
-------------

The Organization resource is not to be confused with the Tenant resource. While the `Tenant resource <http://docs.stormpath.com/rest/product-guide/#tenants>`_ is so-called because it represents your tenancy inside the Stormpath server, the Organization resource represents the space alloted for a tenant of your application.

The Organization resource allows your application's tenants to have as many, or as few, Directories and Groups as they want, while also maintaining strict data segregation. So if a tenant requires a Cloud Directory, a Google Social Directory, and an LDAP Directory, then all of these can sit under the umbrella of a single Organization resource that represents their data space in your app. 

How to Create an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can create an Organization in Stormpath by simply performing an HTTP POST to the ``/v1/organizations`` endpoint.

When you submit the POST, the following attributes are required and must be unique within your Tenant:

- name
- nameKey

The optional attributes are:

- status
- description
- customData

So, if for example one of our application's tenants was the Royal Bank of Canada, we could send the following POST to ``https://api.stormpath.com/v1/organizations``::

	{
	  "name": "Royal Bank of Canada",
	  "nameKey": "rbc",
	  "status": "ENABLED"
	}

Which would return the following::

	{
	  "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR",
	  "createdAt": "2015-10-02T15:27:01.658Z",
	  "modifiedAt": "2015-10-02T15:27:01.658Z",
	  "name": "Royal Bank of Canada",
	  "nameKey": "rbc",
	  "status": "ENABLED",
	  "description": null,
	  "customData": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR/customData"
	  },
	  "defaultAccountStoreMapping": null,
	  "defaultGroupStoreMapping": null,
	  "accountStoreMappings": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR/accountStoreMappings"
	  },
	  "groups": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR/groups"
	  },
	  "accounts": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR/accounts"
	  },
	  "tenant": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
	  }
	}

Notice here that both the Default Account Store and Group Store are blank which means that Groups and Accounts added to the Organization (e.g. A POST to ``/v1/organizations/:organizationId/groups``) would fail until a default Account Store is added. 

Adding an Account Store to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like other Account Stores, an Organization can be mapped to an Application so that users in the Organization can log-in to that application (for more about how logging-in works with Stormpath, please see :ref:`the Authentication chapter <authn>`). But before you do this, you must first associate some users with the Organization so that there is someone to log in! To do this, you have to map some Account Stores to your Organization.

First, you will need the ``href`` value for a Directory or Group. This, combined with the ``href`` of the Organization will be sent in a POST to the ``/v1/accountStoreMappings`` endpoint::

	{
	  "organization": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR"
	  },
	  "accountStore": {
	    "href": "https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYRXEh2KYf" 
	  } 
	}

These two attributes, ``organization`` and ``accountStore`` are required, though you may add some optional attributes as well:

- ``listIndex``: Represents the priority in whicch this accountStore will be consulted by the Organization during an authentication attempt. This is a zero-based index, meaning that an Account Store at ``listIndex`` of 0 will be consulted first, followed by the Account Store at listIndex 1, etc. Setting a negative value will default the value to 0, placing it first in the list. A listIndex of larger than the current list size will place the mapping at the end of the list and then default the value to (list size – 1).

- ``isDefaultAccountStore``: A ``true`` value indicates that new Accounts created by the Organization’s ``/accounts`` endpoint will be automatically saved to this mapping’s Directory or Group.

- ``isDefaultGroupStore``: A ``true`` value indicates that new Groups created by the Organization’s ``/groups`` endpoint will be automatically saved to this mapping’s Directory. Note that a ``true`` value will only be valid here if the accountStore is a Directory.

In order to be able to add Groups and Accounts to the Organization in the way mentioned above, we should also make sure that we mark this Account Store as our default for both Accounts and Groups::

  {
    "organization": {
      "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR"
    },
    "accountStore": {
      "href": "https://api.stormpath.com/v1/directories/7Fg2qiGIv8vEjTKHddd0mT" 
    },
    "isDefaultAccountStore":true,
    "isDefaultGroupStore":true
  }

Which would result in the following ``201 Created`` response::

  {
    "href": "https://api.stormpath.com/v1/organizationAccountStoreMappings/3e9cNxhX8abxmPWxiPDKdk",
    "listIndex": 0,
    "isDefaultAccountStore": true,
    "isDefaultGroupStore": true,
    "organization": {
      "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR"
    },
    "accountStore": {
      "href": "https://api.stormpath.com/v1/directories/7Fg2qiGIv8vEjTKHddd0mT"
    }
  }

So our Organization now has an associated Directory which can be used as an Account Store to add new Accounts and Groups. To enable login for the Accounts in this Organization, we must now map the Organization to an Application.

Registering an Organization as an Account Store for an Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As described in :ref:`the Authentication chapter <authn>`, in order to allow users to log-in to an Application, you must map some kind of Account Store (e.g. a Group or Directory) to it. One approach is to go one-by-one and map each Directory and/or Group to the Application. However, since we are building a multi-tenant app, and the Organization is itself an Account Store, we can just map our Organization resource to our Application resource. This would enable login for all of the Directories and Groups currently inside that Organization, as well as any we add in the future. 

To map an Organization to an Application, simply follow the steps you would for any Account Store, as described in :ref:`create-asm`.

c. Authenticating an Account against an Organization
====================================================

Authenticating an Account against an Organization works essentially the same way as described in :ref:`how-login-works`. The only difference is that adding the Organization resource allows for an additional level of Account Stores. 

When a login attempt is made against an Application’s ``/loginAttempts`` endpoint without specifying an Account Store, Stormpath will iterate through the index of Account Stores mapped to the Application, in priority order. For every Account Store entry:

- If it is a Directory or Group, attempt to log in on that resource.

- If it is an Organization:
	
  - Iterate through the index of Account Stores mapped to the Organization, in priority order. For every Account Store entry:
	
    - If it is a Directory or Group, attempt to log in on that resource.

If the login attempt does specify an Organization, then we simply jump to that point in the steps, and the Organization's Account Stores are iterated through as described above. 
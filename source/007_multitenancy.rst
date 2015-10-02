****************************
Multi-Tenancy with Stormpath
****************************

a. What Is a Multi-Tenant Application? 
======================================

Unlike most web applications that support a single company or organization with a tightly-coupled database, a **multi-tenant application** is a single application that services multiple organizations or tenants simultaneously. For privacy and security purposes, its very important that each tenant have its own private data partition. At Stormpath, this data partioning is baked-in to our data model. How do we do this? Well, it starts with an Organization.

b. Modelling Tenants in Stormpath
=================================

In our :ref:`Account Management <account-mgmt-header>` section we discussed two kinds of Account Stores: :ref:`Directories <directory-mgmt>`, and :ref:`Groups <group-mgmt>`. For multi-tenant applications there is an additional **Organization** resource, which functions like a virtual Account Store that itself wraps both Directories and Groups. 

Organizations
-------------

The Organization resource is not to be confused with the Tenant resource. While the `Tenant resource <http://docs.stormpath.com/rest/product-guide/#tenants>`_ is so-called because it represents your tenancy inside the Stormpath server, the Organization resource represents the space alloted for a tenant of your application.

The Organization resource allows your application's tenants to have as many, or as few, Directories and Groups as they want, while also maintaining strict data segregation. So if a tenant requires a Cloud Directory, a Google Social Directory, and an LDAP Directory, then all of these can sit under the umbrella of a single Organization resource that represents their data space in your app. 

The Organization Resource
^^^^^^^^^^^^^^^^^^^^^^^^^

An individual Organization resource may be accessed via its Resource URI:

**Directory URI**

``/v1/organizations/:organizationId``

**Organization Attributes**

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
	  - The resource's fully qualified location URL
	
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.

	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.

	* - ``name``
	  - String
	  - 1 <= N <= 255 characters. 
	  - The name of the Organization. Must be unique across all Organizations within your Stormpath Tenant.

	* - ``nameKey``
	  - String
	  - 1 <= N <= 63 characters. 
	  - A name key that represents the Organization. Must be unique across all organizations within your Stormpath tenant and must follow `DNS hostname rules <http://www.ietf.org/rfc/rfc0952.txt>`_. That is, it may only consist of: a-z, A-Z, 0-9, and -. It must not start or end with a hyphen. The uniqueness constraint is case insensitive.

	* - ``status``
	  - Enum
	  - ``ENABLED``, ``DISABLED``
	  - Indicates whether the Organization is enabled or not. Enabled Organizations can be used as Account Stores for applications. Disabled Organizations cannot be used as Account Stores.
	
	* - ``description``
	  - String
	  - 0 < N <= 1000 characters
	  - The description of the Organization.

	* - ``customData``
	  - Link 
	  - N/A
	  - A link to the Organization's customData resource that you can use to store your own Organization-specific custom fields.

	* - ``defaultAccountStoreMapping``
	  - Link
	  - ``null`` or Link
	  - A link to this Organization's default Account Store Mapping where the organization will store newly created Accounts. A null value disables the ability to add Groups to the Organization via the ``organizations/:organizationId/accounts`` endpoint.

	* - ``defaultGroupStoreMapping``
	  - Link
	  - ``null`` or Link
	  - A link to this Organization's default Account Store Mapping where the organization will store newly created Groups. A null value disables the ability to add Groups to the Organization via the ``organizations/:organizationId/groups`` endpoint.
	

	* - ``accountStoreMappings``
	  - Link
	  - N/A
	  - A link to the collection of all Account Store Mappings that represent the Organization. The Accounts and Groups within the mapped Account Stores are obtainable from the ``accounts`` and ``groups`` links, respectively.

	* - ``groups``
	  - Link
	  - N/A
	  - A link to a collection of the Groups wrapped by this Organization.

	* - ``accounts``
	  - Link
	  - N/A
	  - A link to a collection of the Accounts wrapped by this Organization. All of the Accounts in this collection can log in to the Organization.

	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the Stormpath Tenant that owns this Organization.

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

Notice here that both the Default Account Store and Group Store are blank which means that Groups and Accounts added using to the Organization (e.g. A POST to ``/v1/organizations/:organizationId/groups``) would fail. 

Adding an Account Store to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like other Account Stores, an Organization can be mapped to an Application so that users in the Organization can log-in to that application (for more about how logging-in works with Stormpath, please see :ref:`the Authentication chapter <authn-header>`). But before you do this, you must first map some Account Stores to your Organization.

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
			"href": "https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYRXEh2KYf" 
		},
		"isDefaultAccountStore":true,
		"isDefaultGroupStore":true
	}

Which would result in the following 201 Created response::

	{
	  "href": "https://api.stormpath.com/v1/organizationAccountStoreMappings/9Xs3WhNZFv8BekCUK4HNY",
	  "listIndex": 0,
	  "isDefaultAccountStore": true,
	  "isDefaultGroupStore": true,
	  "organization": {
	    "href": "https://api.stormpath.com/v1/organizations/DhfD17pJrUbsofPWaR3TR"
	  },
	  "accountStore": {
	    "href": "https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYRXEh2KYf"
	  }
	}

Registering an Organization as an Account Store for an Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




Directories VS Groups
---------------------

Sub-Heading L4
^^^^^^^^^^^^^^

Sub-Heading L5
""""""""""""""

c. Authenticating an Account against an Organization
====================================================

Sub-Heading L3
--------------

Sub-Heading L4
^^^^^^^^^^^^^^

Sub-Heading L5
""""""""""""""

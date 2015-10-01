****************************
Multi-Tenancy with Stormpath
****************************

a. What Is a Multi-Tenant Application? 
======================================

Unlike most web applications that support a single company or organization with a tightly-coupled database, a **multi-tenant application** is a single application that services multiple organizations or tenants simultaneously. For privacy and security purposes, its very important that each tenant have its own private data partition. At Stormpath, this data partioning is baked-in to our data model. How do we do this? Well, it starts with an Organization.

b. Modelling Tenants in Stormpath
=================================

In our :ref:`Account Management <account-mgmt-header>` section we discussed two kinds of Account Stores: :ref:`Directories <directory-mgmt>`, and :ref:`Groups <group-mgmt>`. In multi-tenant applications there is an additional **Organization** resource, which functions like a virtual Account Store that itself wraps both Directories and Groups. 

Organizations
--------------

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
	  - A link to this Organization's default Account Store Mapping where the organization will store newly created Accounts. A null value disables the Organization from directly creating new Accounts.

	* - ``defaultGroupStoreMapping``
	  - Link
	  - ``null`` or Link
	  - A link to this Organization's default Account Store Mapping where the organization will store newly created Groups. A null value disables the Organization from directly creating new Groups.
	

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


Adding an Account Store to an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

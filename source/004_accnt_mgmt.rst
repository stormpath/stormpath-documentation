**********************
4. Account Management
**********************

a. Modeling Your User Base
===========================

The first question that we need to address is how we are going to model our users inside the Stormpath database. User Accounts in Stormpath aren't directly associated with Applications, but only indirectly via **Directories** and also possibly **Groups**. 

All of your Accounts will have to be associated with at least one Directory resource, so we can start there.  

i. Directories
--------------
    
The **Directory** resource is a top-level container for Account and Group resources. A Directory also manages security policies (like password strength) for the Accounts it contains. Directories can be used to cleanly manage segmented user Account populations. For example, you might use one Directory for company employees and another Directory for customers, each with its own security policies.

Additionally:

- All Account resources within a Directory have a unique ``email`` and/or ``username``.
- All Group resources within a Directory have a unique ``name``.

The Directory Resource
^^^^^^^^^^^^^^^^^^^^^^

An individual Directory resource may be accessed via its Resource URI:

**Directory URI**

``/v1/directories/:directoryId``

**Directory Attributes**

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
	  - The resource's fully qualified location URI
	
	* - ``name``
	  - String
	  - 1 < N <= 255 characters
	  - Name of the Directory. Must be unique within a tenant.
	
	* - ``description``
	  - String
	  - 0 < N <= 1000 characters
	  - The Description of the directory.
	
	* - ``status``
	  - String (Enum)
	  - ``enabled`` , ``disabled``
	  - Enabled Directories can be used as Account Stores for Applications. Disabled Directories cannot be used for login.
	
	* - ``accounts``
	  - Link
	  - N/A
	  - A link to the Accounts owned by this Directory.
	
	* - ``groups``
	  - Link
	  - N/A
	  - A link to the Groups owned by this Directory.
	
	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the owning Tenant.
	
	* - ``accountCreationPolicy``
	  - Link
	  - N/A
	  - A link to the Directory’s Account Creation Policy

	* - ``passwordPolicy``
	  - Link
	  - N/A
	  - A link to the Directory’s Password Policy
	
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - When this resource was created.
	
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - When this resource’s attributes were last modified.
	    
.. todo::

	The JSON example below also returns ``applicationMappings`` and ``applications``, which are not included in the table in the REST API Guide. 

Types of Directories
^^^^^^^^^^^^^^^^^^^^
Stormpath supports three types of Directories:

1. Natively-hosted Cloud Directories that originate in Stormpath
2. Mirror Directories that act as secure replicas of existing LDAP user directories outside of Stormpath, for example those on Active Directory servers.
3. Social Directories that pull-in account information from four sites that support social login: Google, Facebook, Github and LinkedIn.
   
You can add as many Directories of each type as you require.

.. note::

	Multiple Directories are a more advanced feature of Stormpath. If you have one or more Applications that all access the same Accounts, you usually only need a single Directory, and you do not need to be concerned with creating or managing multiple Directories.

	If however, your Application(s) needs to support login for external third-party accounts like those in Active Directory, or you have more complex account segmentation needs, Directories will be a powerful tool to manage your application's user base.

Cloud Directories
^^^^^^^^^^^^^^^^^
The standard, default Directory resource. They can be created using a simple POST API.

How To Make A Cloud Directory
"""""""""""""""""""""""""""""

The following API request::

	POST https://api.stormpath.com/v1/directories
	Content-Type: application/json;charset=UTF-8

	{
	  "name" : "Captains",
	  "description" : "Captains from a variety of stories"
	}

Would yield the following response::

	{
	  "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp",
	  "name": "Captains",
	  "description": "Captains from a variety of stories",
	  "status": "ENABLED",
	  "createdAt": "2015-08-24T15:32:23.079Z",
	  "modifiedAt": "2015-08-24T15:32:23.079Z",
	  "tenant": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
	  },
	  "provider": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/provider"
	  },
	  "customData": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/customData"
	  },
	  "passwordPolicy": {
	    "href": "https://api.stormpath.com/v1/passwordPolicies/2SKhstu8Plaekcai8lghrp"
	  },
	  "accountCreationPolicy": {
	    "href": "https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8Plaekcai8lghrp"
	  },
	  "accounts": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/accounts"
	  },
	  "applicationMappings": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/applicationMappings"
	  },
	  "applications": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/applications"
	  },
	  "groups": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/groups"
	  }
	}

Mirror Directories
^^^^^^^^^^^^^^^^^^ 

Mirror Directories are a big benefit to Stormpath customers who need LDAP directory accounts to be able to securely log in to public web applications without breaking corporate firewall policies. Here is how they work:

- After creating an LDAP Directory in Stormpath, you download a Stormpath Agent. This is a simple standalone software application that you install behind the corporate firewall so it can communicate directly with the LDAP server.
- You configure the agent via LDAP filters to view only the accounts that you want to expose to your Stormpath-enabled applications.
- The Agent will start synchronizing immediately, pushing this select data outbound to Stormpath over a TLS (HTTPS) connection.
- The synchronized user Accounts and Groups appear in the Stormpath Directory. The Accounts will be able to log in to any Stormpath-enabled application that you assign.
- When the Agent detects local LDAP changes, additions or deletions to these specific Accounts or Groups, it will automatically propagate those changes to Stormpath to be reflected by your Stormpath-enabled applications.
  
User Accounts and Groups in mirrored directories are automatically deleted when any of the following things happen:

- The original object is deleted from the LDAP or AD directory service.
- The original LDAP/AD object information no longer matches the account filter criteria configured for the agent.
- The LDAP/AD directory is deleted.

The big benefit is that your Stormpath-enabled applications still use the same convenient REST+JSON API – they do not need to know anything about things like LDAP or legacy connection protocols.

How To Make A Mirror Directory
""""""""""""""""""""""""""""""

Presently, Mirror Directories can only be made via the Stormpath Admin Console. For more information, please see [this section of the Admin Console Guide].

Social Directories
^^^^^^^^^^^^^^^^^^

Stormpath works with user Accounts pulled from social login providers (currently Google, Facebook, Github, and LinkedIn) in a way very similar to the way it works with user Accounts from LDAP servers. These external Identity Providers (IdPs) are modeled as Stormpath Directories, much like Mirror Directories. The difference is that, while Mirror Directories always come with an Agent that takes care of synchronization, Social Directories have an associated **Provider** resource. This resource contains the information required by the social login site to work with their site (e.g. the App ID for your Google application or the App Secret).

Stormpath also simplifies the authorization process by doing things like automating Google's access token exchange flow. All you do is POST the authorization code from the end-user and Stormpath returns a new or updated user Account, along with the Google access token which you can use for any further API calls. 

Modeling your users who authorize via Social Login could be accomplished by creating a Directory resource for each social provider that you want to support, along with one master Directory for your Application. So, how this works in practice is: a new user visits your site, and chooses to "Sign-in with Google". Once they log in to their Google account and go through the OpenID flow, a new user Account is created in your Google Directory. After this Account is created, a search is performed inside the Application's master Directory for their email address, to see if they already exist in there. If the user Account is already in the master Directory, no action is taken. If the user Account is not found, a new one is created in the master Directory, and populated with the information pulled from the Google account. The customData resource for that Account is then used to store an ``href`` link to their Account in the Google Directory. If the user then chooses at some point to "Sign in with Facebook", then a similar process will occur, but this time with a link created to the user Account in the Facebook Directory. 

This approach has two major benefits: It allows for a user to have one unified identity in your Application, regardless of how many social identities they choose to log in with; this central identity can also be the central point that all authorization permissions (whether they be implicit or explicit) are then applied to.

For both Mirror and Social Directories, since the relationship with the outside directory is read-only, the remote directory is still the "system of record".

How To Make A Social Directory
""""""""""""""""""""""""""""""

Presently, Social Directories can only be made via the Stormpath Admin Console. For more information, please see [this section of the Admin Console Guide].

ii. Groups
----------

**Groups** are collections of Accounts found within a Directory. They can be thought of as labels applied to Accounts. 

An individual Group resource may be accessed via its Resource URI:

**Group URI**

``/v1/groups/:groupId``

**Group Attributes**

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
	  - The resource's fully qualified location URI
	
	* - ``name``
	  - String
	  - 1 < N <= 255 characters
	  - The name of the Group. Must be unique within a Directory.
		
	* - ``description``
	  - String
	  - 1 < N <= 1000 characters
	  - The description of the Group.

	* - ``status``
	  - String (Enum)
	  - ``enabled``, ``disabled``
	  - ``enabled`` Groups are able to authenticate against an Application. ``disabled`` Groups cannot authenticate against an Application.

	* - ``customData``
	  - Link 
	  - N/A
	  - A link to the Group’s customData resource that you can use to store your own Group-specific custom fields.

	* - ``tenant``
	  - Link
	  - N/A
	  - The Tenant that owns the Directory containing this Group.

	* - ``directory``
	  - Link
	  - N/A
	  - A link to the Directory resource that the Group belongs to. 

	* - ``accounts``
	  - Link 
	  - N/A
	  - A link to a collection of the Accounts that are contained within this Group. 

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - When this resource was created.

	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - When this resource’s properties were last modified.

Modeling User Hierarchies Using Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Groups, like labels, are inherently "flat". This means that they do not by default include any kind of hierarchy. If a hierarchical or nested user structure is desired, it can be simulated in one of two ways: Either, using the Group resource's ``description`` field, or with the Group's associated customData resource. 

A geographical region can, for example, be represented as ``"SysAdmin/SpaceAdmin/User"`` in the Group's ``description`` field, allowing for queries to be made using simple pattern-matching queries::

	GET https://api.stormpath.com/v1/directories/$DIR_ID/groups?description=US*

It can also be included in the customData resource, as a series of key-value relations. The downside to this second approach is that customData resources are not currently searchable in the same manner as the Group's `description` field is.

How To Create A Group
"""""""""""""""""""""

The following API request::

	POST https://api.stormpath.com/v1/directories/bckhcGMXQDujIXpbCDRb2Q/groups
	Content-Type: application/json;charset=UTF-8

	{
	  "name" : "Aquanauts",
	  "description" : "Sea Voyagers",
	  "status" : "enabled"
	}

Would yield this response::

	{
	  "href": "https://api.stormpath.com/v1/groups/1L1fiXUXzXE4TucxegUYtB",
	  "name": "Aquanauts",
	  "description": "Sea Voyagers",
	  "status": "ENABLED",
	  "createdAt": "2015-08-24T16:14:18.430Z",
	  "modifiedAt": "2015-08-24T16:14:18.430Z",
	  "customData": {
	    "href": "https://api.stormpath.com/v1/groups/1L1fiXUXzXE4TucxegUYtB/customData"
	  },
	  "directory": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
	  },
	  "tenant": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
	  },
	  "accounts": {
	    "href": "https://api.stormpath.com/v1/groups/1L1fiXUXzXE4TucxegUYtB/accounts"
	  },
	  "accountMemberships": {
	    "href": "https://api.stormpath.com/v1/groups/1L1fiXUXzXE4TucxegUYtB/accountMemberships"
	  },
	  "applications": {
	    "href": "https://api.stormpath.com/v1/groups/1L1fiXUXzXE4TucxegUYtB/applications"
	  }
	}

b. How to Store Accounts in Stormpath
=====================================

An **Account** is a unique identity within a Directory, with a unique ``username`` and/or ``email``. An Account can log in to an Application using either the email address or username associated with it. Accounts can represent your end users (people), but they can also be used to represent services, daemons, processes, or any “entity” that needs to log in to a Stormpath-enabled application. Additionally, an Account may only exist in a single Directory and may be in multiple Groups owned by that Directory. 

An individual Account resource may be accessed via its Resource URI:

**Group URI**

``/v1/accounts/:accountId``

**Account Attributes**

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
	  - The resource's fully qualified location URI

	* - ``username``
	  - String
	  - 1 < N <= 255 characters
	  - The username for the Account. Must be unique across the owning Directory. If not specified, the username will default to the ``email`` field.
	 
	* - ``email``
	  - String
	  - 1 < N <= 255 characters
	  - The email address for the Account. Must be unique across the owning Directory.	 
	  
	* - ``password``
	  - String
	  - 1 < N <= 255 characters
	  - The password for the Account. Only include this Attribute if setting or changing the Account password.

	* - ``fullName``
	  - String
	  - N/A
	  - The full name for the account holder. This is a computed attribute based on the ``givenName``, ``middleName`` and ``surname`` attributes. It cannot be modified. To change this value, change one of the three respective attributes to trigger a new computed value.
	 
	* - ``givenName``
	  - String
	  - 1 < N <= 255 characters
	  - The given (first) name for the Account holder.	
	
	* - ``middleName``
	  - String
	  - 1 < N <= 255 characters
	  - The middle (second) name for the Account holder.

	* - ``surname``
	  - String
	  - 1 < N <= 255 characters
	  - The surname (last name) for the Account holder.
	 
	* - ``status``
	  - String (Enum)
	  - ``enabled``,``disabled``,``unverified``
	  - ``enabled`` Accounts are able to log in to their assigned Applications, ``disabled`` Accounts may not log in to Applications, ``unverified`` Accounts are disabled and have not verified their email address.	 
	    
	* - ``customData``
	  - Link
	  - 
	  - .
	
	* - ``groups``
	  - Link
	  -
	  - .
	
	* - ``groupMemberships``
	  - Link
	  -
	  - .
	
	* - ``directory``
	  - Link
	  -
	  - .
	    
	* - ``tenant``
	  - Link
	  -
	  - .  
	    
	* - ``emailVerificationToken``
	  - Link
	  -
	  -

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  -
	  -

	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  -
	  -

New Account Creation
--------------------

aasdf


Add a new Account to a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Directory: 2SKhstu8Plaekcai8lghrp

Because Accounts are "owned" by Directories, you create new Accounts by adding them to a Directory. You can add an Account to a Directory directly, or you can add it indirectly by registering an Account with an Application. 

This section will show examples using a Directory's ``/accounts`` href, but they will also function the same if you use an Application’s ``/accounts`` href instead.

Add a new Account to a Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Group: 1L1fiXUXzXE4TucxegUYtB

Importing Accounts
------------------

Stormpath also makes it very easy to transfer your existing user directory into a Stormpath Directory using our API. Depending on how you store your passwords, you will use one of three approaches:

1. **Existing Passwords in Plaintext:** If you stored passwords in plaintext, you can use the Stormpath API to import them directly. Stormpath will create the Accounts and secure their passwords automatically (within our system). Make sure that your Stormpath Directory is configured to *not* send Account Verification emails before beginning import.
2. **Existing Passwords With MCF Hash:** If your password hashing algorithm follows a format Stormpath supports, you can use the API to import Accounts directly. Available formats and instructions are available here.
3. **Existing Passwords With Non-MCF Hash:** If you hashed passwords in a format Stormpath does not support, you can still use the API to create the Accounts, but you will need to issue a password reset afterwards. Otherwise, your users won't be able to use their passwords to login.
   
Accounts With Plaintext Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

aasdf
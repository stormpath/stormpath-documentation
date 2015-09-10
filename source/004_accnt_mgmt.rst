**********************
4. Account Management
**********************

a. Modeling Your User Base
===========================

The first question that we need to address is how we are going to model our users inside Stormpath. User Accounts in Stormpath aren't directly associated with Applications, but only indirectly via **Directories** and also possibly **Groups**. 

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
	  - The resource's fully qualified location URL
	
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

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.
	
	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the owning Tenant.

	* - ``provider``
	  - Link
	  - N/A
	  - A link to the Directory's Provider. 

	* - ``customData``
	  - Link 
	  - N/A
	  - A link to the Directory's customData resource that you can use to store your own Directory-specific custom fields.

	* - ``passwordPolicy``
	  - Link
	  - N/A
	  - A link to the Directory’s Password Policy
	    
	* - ``accountCreationPolicy``
	  - Link
	  - N/A
	  - A link to the Directory’s Account Creation Policy

	* - ``accounts``
	  - Link
	  - N/A
	  - A link to the Accounts owned by this Directory.
	
	* - ``applicationMappings``
	  - Link
	  - N/A
	  - A link to any Application Mapping resources for this Directory.
	    
	* - ``applications``
	  - Link
	  - N/A
	  - A link to a collection of all the Applications mapped to this Directory. 

	* - ``groups``
	  - Link
	  - N/A
	  - A link to the Groups owned by this Directory.

Types of Directories
^^^^^^^^^^^^^^^^^^^^
Stormpath supports three types of Directories:

1. Natively-hosted Cloud Directories that originate in Stormpath
2. Mirror Directories that act as secure replicas of existing LDAP user directories outside of Stormpath, for example those on Active Directory servers.
3. Social Directories that pull-in account information from four sites that support social login: Google, Facebook, Github and LinkedIn.
   
You can add as many Directories of each type as you require.

.. note::

	Multiple Directories are a more advanced feature of Stormpath. If you have one or more applications that all access the same Accounts, you usually only need a single Directory, and you do not need to be concerned with creating or managing multiple Directories.

	If however, your application(s) needs to support login for external third-party accounts like those in Active Directory, or you have more complex account segmentation needs, Directories will be a powerful tool to manage your application's user base.

Cloud Directories
^^^^^^^^^^^^^^^^^
The standard, default Directory resource. They can be created using a simple POST API.

How to Make a Cloud Directory
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

Of particular interest here is the `provider` resource referenced here. Different types of Directories have different types of Provider resources as well.

.. _provider-resource:

The Provider Resource
""""""""""""""""""""""

An individual Provider resource may be accessed via its Resource URI:

**Provider URI**

``/v1/directories/:directoryId/provider``

**Provider Attributes**

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
	
	* - ``providerId``
	  - String
	  - ``stormpath`` (for a Cloud Directory), ``ad`` or ``ldap`` (for Mirror Directories), ``facebook``, ``google``, ``github`` or ``linkedin`` (for Social Directories)
	  - Specifies the type of Provider for the associated Directory.
	
	* - ``clientId``
	  - String
	  - N/A
	  - The OAuth 2.0 Client ID for this Provider. Only used for Social providers.
	
	* - ``clientSecret``
	  - String
	  - N/A
	  - The OAuth 2.0 Client Secret for this Provider. Only used for Social providers.
	
	* - ``redirectUri``
	  - String 
	  - A valid URL
	  - The URL to redirect to after the user has authenticated. Currently only used for the Google providers. 
	
	* - ``agent``
	  - Link 
	  - N/A
	  - A link to the Provider's Agent. Currently only used for LDAP providers. For more information see :ref:`make-mirror-dir`.

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

Mirror Directories have associated Provider resources with either the ``ldap`` or ``ad`` ``providerId``, and that Provider resource contains an **Agent** resource. This Agent is what will scan your LDAP directory and map the accounts and groups in that directory to Stormpath Accounts and Groups.

The Agent Resource
""""""""""""""""""

An Agents collection may be accessed via its Resource URI:

**Agents URI**

``/v1/agents/:directoryId``

**Agent Attributes**

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
	
	* - ``id``
	  - String
	  - N/A
	  - A unique alphanumberic identifier for this Agent.
	  
	* - ``status``
	  - String
	  - ?
	  - The Agent's status.
	
	* - ``config``
	  - Object
	  - N/A
	  - The configuration information for this Agent, as an embedded ``config`` object. (see below)
	
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.
	
	* - ``directory``
	  - Link
	  - N/A
	  - A link to the Directory resource that the Agent belongs to. 
	
	* - ``download``
	  - Link
	  - N/A
	  - A link that allows this Agent to be downloaded for installation.
	
	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the Tenant that owns the Directory this Agent belongs to.

**Config Attributes**

The ``config`` object is found inside an Agent resource. It corresponds with the "Agent Configuration" tab in the Stormpath Admin Console "Agents" section.

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Attribute
	  - Type
	  - Valid Value(s)
	  - Description
	 
	* - ``directoryHost``
	  - String
	  - N/A
	  - The IP address or Host name of the LDAP directory server to connect to. 
	
	* - ``directoryPort``
	  - Number
	  - N/A
	  - The port to use when connecting to the LDAP directory server.
	
	* - ``sslRequired``
	  - Boolean
	  - .
	  - Indicates whether the Agent socket connection to the directory uses SSL encryption. 
	
	* - ``agentUserDn``
	  - String
	  - N/A
	  - The username that the Agent will use to connect to your LDAP directory.
	
	* - ``agentUserDnPassword``
	  - String
	  - N/A
	  - The password that the Agent will use to connect to your LDAP directory. 

	* - ``baseDn``
	  - String
	  - N/A
	  - The base DN (Distinguished Name) to use when querying the directory.
	
	* - ``pollInterval``
	  - Number
	  - N/A
	  - How often (in minutes) to poll Directory Services to detect directory object changes.
	    
	* - ``accountConfig``
	  - Object
	  - N/A
	  - The Account configuration information for this Agent, as an embedded ``accountConfig`` object. (see below)
	    
	* - ``groupConfig``
	  - Object
	  - N/A
	  - The Group configuration information for this Agent, as an embedded ``groupConfig`` object. (see below)
	
	* - ``referralMode``
	  - String
	  - ``follow``, ``ignore``
	  - Prevents referral problems for Active Directory servers that are not configured properly for DNS.
	
	* - ``ignoreReferralIssues``
	  - Boolean
	  - N/A
	  - Referral issues can arise when querying an Active Directory server without proper DNS. Setting this as true ignores referral exceptions and allows (potentially partial) results to be returned.

**accountConfig Attributes**

The ``accountConfig`` object is found inside a ``config`` object. It corresponds with the "Account Configuration" tab in the Stormpath Admin Console "Agents" section.

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Attribute
	  - Type
	  - Valid Value(s)
	  - Description
	 
	* - ``dnSuffix``
	  - String
	  - N/A
	  - Optional value appended to the Base DN when accessing accounts. If left unspecified, account searches will stem from the Base DN.
	
	* - ``objectClass``
	  - String
	  - N/A
	  - The LDAP object class to use when when loading accounts.
	
	* - ``objectFilter``
	  - String
	  - N/A
	  - LDAP query filter to use when searching for user accounts.
	
	* - ``emailRdn``
	  - String
	  - N/A
	  - The name of the attribute for an account's email address.
	
	* - ``givenNameRdn``
	  - String
	  - N/A
	  - The name of the attribute for an account's first name (aka 'Given Name').
	
	* - ``middleNameRdn``
	  - String
	  - N/A
	  - The name of the attribute for an account's middle name.
	    
	* - ``surnameRdn``
	  - String
	  - N/A
	  - The name of the attribute for an account's last name (aka 'Family Name' or 'Surname').
	    
	* - ``usernameRnd``
	  - String
	  - N/A
	  - The name of the attribute for an account's login name.
	
	* - ``passwordRdn``
	  - String
	  - N/A
	  - The name of the attribute for an account's password. 

**groupConfig Attributes**

The ``groupConfig`` object is found inside a ``config`` object.

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - ``dnSuffix``
	  - String
	  - N/A
	  - Optional value appended to the Base DN when accessing groups. If left unspecified, group searches will stem from the Base DN.
	
	* - ``objectClass``
	  - String
	  - N/A
	  - The LDAP object class to use when when loading accounts. 
	
	* - ``objectFilter``
	  - String
	  - N/A
	  - LDAP query filter to use when searching for groups.
	
	* - ``nameRdn``
	  - String
	  - N/A
	  - The name of the attribute for a group's name. For example cn. Please note: group names must be unique within a directory.
	
	* - ``descriptionRdn``
	  - String
	  - N/A
	  - The name of the attribute for a group's description.
	
	* - ``membersRdn``
	  - String
	  - N/A
	  - The name of the attribute that lists the group members.

.. _make-mirror-dir:

How to Make a Mirror Directory
""""""""""""""""""""""""""""""

Presently, Mirror Directories be made via the Stormpath Admin Console, or using REST API. If you'd like to do it with REST APIs, read on. If you'd like to do it with the Admin Console, please see `the Directory Creation section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/#create-a-directory>`_.

To make a Mirror Directory, you must HTTP POST a new Directory resource to the `/directories` endpoint. This Directory will contain a ``provider`` resource (see `above <provider-resource>`) with ``provider`` ``"ldap"``, which will in turn contain an LDAP ``agent`` object::

	{
	    "name":"My LDAP Directory",
	    "description": "An LDAP Directory created with the Stormpath API",
	    "provider": {
	        "providerId": "ldap",
	        "agent": {
	            "config": {
	                "directoryHost": "ldap.local",
	                "directoryPort": "636",
	                "sslRequired": true,
	                "agentUserDn": "tom@stormpath.com",
	                "agentUserDnPassword": "StormpathRulez",
	                "baseDn": "dc=example,dc=com",
	                "pollInterval": 60,
	                "referralMode": "ignore",
	                "ignoreReferralIssues": false,
	                "accountConfig": {
	                    "dnSuffix": "ou=employees",
	                    "objectClass": "person",
	                    "objectFilter": "(cn=finance)",
	                    "emailRdn": "email",
	                    "givenNameRdn": "givenName",
	                    "middleNameRdn": "middleName",
	                    "surnameRdn": "sn",
	                    "usernameRdn": "uid",
	                    "passwordRdn": "userPassword",
	                },
	                "groupConfig": {
	                    "dnSuffix": "ou=groups",
	                    "objectClass": "groupOfUniqueNames",
	                    "objectFilter": "(ou=*-group)",
	                    "nameRdn": "cn",
	                    "descriptionRdn": "description",
	                    "membersRdn": "uniqueMember"
	                }
	            }
	        }
	    }
	}


Installing Your Agent
+++++++++++++++++++++

Installing your Agent is done in three steps.

1. Download 

Download your Agent by following the ``download`` link.
   
2. Configure 
   
a. Make sure Java 1.8 is installed

b. Unzip to a location in your file system, for example ``C:\stormpath\agent`` in Windows or ``/opt/stormpath/agent`` in Unix.

In the same location, open the file ``dapper.properties`` from the config folder and replace this line::

	agent.id = PutAgentSpecificIdHere

With this line::

 	agent.id  = 72MlbWz6C4dLo1oBhgjjTt

Follow the instructions in the ``dapper.properties`` file to reference your account's API authentication.
   
3. Start

In Windows::

	(cd to your agent directory, for example C:\stormpath\agent)
	C:\stormpath\agent>cd bin
	C:\stormpath\agent\bin>startup.bat

In Unix::

	(cd to your agent directory, for example /opt/stormpath/agent)
	$ cd bin
	$ startup.sh
	  
Social Directories
^^^^^^^^^^^^^^^^^^

Stormpath works with user Accounts pulled from social login providers (currently Google, Facebook, Github, and LinkedIn) in a way very similar to the way it works with user Accounts from LDAP servers. These external Identity Providers (IdPs) are modeled as Stormpath Directories, much like Mirror Directories. The difference is that, while Mirror Directories always come with an Agent that takes care of synchronization, Social Directories have an associated **Provider** resource. This resource contains the information required by the social login site to work with their site (e.g. the App ID for your Google application or the App Secret).

Stormpath also simplifies the authorization process by doing things like automating Google's access token exchange flow. All you do is POST the authorization code from the end-user and Stormpath returns a new or updated user Account, along with the Google access token which you can use for any further API calls. 

Modeling your users who authorize via Social Login could be accomplished by creating a Directory resource for each social provider that you want to support, along with one master Directory for your application. So, how this works in practice is: a new user visits your site, and chooses to "Sign-in with Google". Once they log in to their Google account and go through the OpenID flow, a new user Account is created in your Google Directory. After this Account is created, a search is performed inside the Application's master Directory for their email address, to see if they already exist in there. If the user Account is already in the master Directory, no action is taken. If the user Account is not found, a new one is created in the master Directory, and populated with the information pulled from the Google account. The customData resource for that Account is then used to store an ``href`` link to their Account in the Google Directory. If the user then chooses at some point to "Sign in with Facebook", then a similar process will occur, but this time with a link created to the user Account in the Facebook Directory. 

This approach has two major benefits: It allows for a user to have one unified identity in your Application, regardless of how many social identities they choose to log in with; this central identity can also be the central point that all authorization permissions (whether they be implicit or explicit) are then applied to.

For both Mirror and Social Directories, since the relationship with the outside directory is read-only, the remote directory is still the "system of record".

How to Make a Social Directory
""""""""""""""""""""""""""""""

Presently, Social Directories can only be made via the Stormpath Admin Console or using REST API. For more information about creating them with the Admin Console please see the `Directories section of the Stormpath Admin Console Guide <http://docs.stormpath.com/console/product-guide/#create-a-directory>`_. For more information about creating them using REST API, please see :ref:`social-authn`. 

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
	  - The resource's fully qualified location URL
	
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

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.

	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s properties were last modified.

	* - ``customData``
	  - Link 
	  - N/A
	  - A link to the Group’s customData resource that you can use to store your own Group-specific custom fields.

	* - ``directory``
	  - Link
	  - N/A
	  - A link to the Directory resource that the Group belongs to. 
	
	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the Tenant that owns the Directory containing this Group.

	* - ``accounts``
	  - Link 
	  - N/A
	  - A link to a collection of the Accounts that are contained within this Group. 

	* - ``accountMemberships``
	  - Link
	  - N/A
	  - A link to any Account Memberships for this Group.
        
	* - ``applications``
	  - Link
	  - N/A
	  - A link to any Applications associated with this Group.

Modeling User Hierarchies Using Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Groups, like labels, are inherently "flat". This means that they do not by default include any kind of hierarchy. If a hierarchical or nested user structure is desired, it can be simulated in one of two ways: Either, using the Group resource's ``description`` field, or with the Group's associated customData resource. 

A geographical region can, for example, be represented as ``"SysAdmin/SpaceAdmin/User"`` in the Group's ``description`` field, allowing for queries to be made using simple pattern-matching queries::

	GET https://api.stormpath.com/v1/directories/$DIR_ID/groups?description=US*

It can also be included in the customData resource, as a series of key-value relations. The downside to this second approach is that customData resources are not currently searchable in the same manner as the Group's `description` field is.

How to Create a Group
"""""""""""""""""""""

So let's say we want to add a new Group resource with the name "Starfleet Officers" to the "Captains" Directory. 

The following API request::

	POST https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/groups
	Content-Type: application/json;charset=UTF-8

	{
	  "name" : "Starfleet Officers",
	  "description" : "Commissioned officers in Starfleet",
	  "status" : "enabled"
	}

Would yield this response::

	{
      "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc",
      "name": "Starfleet Officers",
      "description": "Commissioned officers in Starfleet",
      "status": "ENABLED",
      "createdAt": "2015-08-25T20:09:23.698Z",
      "modifiedAt": "2015-08-25T20:09:23.698Z",
      "customData": {
        "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc/customData"
      },
      "directory": {
        "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
      },
      "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
      },
      "accounts": {
        "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc/accounts"
      },
      "accountMemberships": {
        "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc/accountMemberships"
      },
      "applications": {
        "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc/applications"
      }
    }

-----

.. _account-creation:

b. How to Store Accounts in Stormpath
=====================================

An **Account** is a unique identity within a Directory, with a unique ``username`` and/or ``email``. An Account can log in to an Application using either the email address or username associated with it. Accounts can represent your end users (people), but they can also be used to represent services, daemons, processes, or any “entity” that needs to log in to a Stormpath-enabled application. Additionally, an Account may only exist in a single Directory and may be in multiple Groups owned by that Directory. 

An individual Account resource may be accessed via its Resource URI:

**Account URI**

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
	  - The resource's fully qualified location URL.

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
	
	* - ``fullName``
	  - String
	  - N/A
	  - The full name for the account holder. This is a computed attribute based on the ``givenName``, ``middleName`` and ``surname`` attributes. It cannot be modified. To change this value, change one of the three respective attributes to trigger a new computed value.
	 
	* - ``status``
	  - String (Enum)
	  - ``enabled``,``disabled``,``unverified``
	  - ``enabled`` Accounts are able to log in to their assigned Applications, ``disabled`` Accounts may not log in to Applications, ``unverified`` Accounts are disabled and have not verified their email address.	 
	
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.

	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s properties were last modified.

	* - ``emailVerificationToken``
	  - Link
	  - N/A
	  - A link to the Account’s email verification token. This will only be set if the Account needs to be verified.

	* - ``customData``
	  - Link
	  - N/A
	  - A link to the Account’s customData resource that you can use to store your own Account-specific custom fields.
	
	* - ``providerData``
	  - Link
	  - N/A
	  - A link to the information from the owner Directory's Provider.
	    
	* - ``directory``
	  - Link
	  - N/A
	  - A link to the Account's Directory.

	* - ``tenant``
	  - Link
	  - N/A
	  - A link to the Tenant that owns the Account’s Directory.  

	* - ``groups``
	  - Link
	  - N/A
	  - A link to the Groups that the Account belongs to. 
	    
	* - ``groupMemberships``
	  - Link
	  - N/A
	  - A link to the Group Memberships that the Account belongs to.

	* - ``applications``
	  - Link
	  - N/A
	  - A link to the Applications that the Account belongs to.
	    
	* - ``apiKeys``
	  - Link
	  - N/A
	  - A link to the apiKeys for this Account.
	
	* - ``accessTokens``
	  - Link
	  - N/A
	  - A collection of valid JSON Web Tokens associated with this Account, used for token-based authentication.
	
	* - ``refreshTokens``
	  - Link
	  - N/A
	  - A collection of valid JSON Web Tokens associated with this Account, used to generate additional ``accessTokens`` for token-based authentication. 

New Account Creation
--------------------

The basic steps for creating a new Account are covered in the :doc: . In that example, we cover how to add an Account to an Application. Below, we will also show how to add an Account to a specific Directory or Group. 

Add a New Account to a Directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because Accounts are "owned" by Directories, you create new Accounts by adding them to a Directory. You can add an Account to a Directory directly, or you can add it indirectly by registering an Account with an Application, like in the :doc:`Quickstart </003_quickstart>`. 

.. note::

	This section will show examples using a Directory's ``/accounts`` href, but they will also function the same if you use an Application’s ``/accounts`` href instead.

Let's say we want to add a new account for user "Jean-Luc Picard" to the "Captains" Directory, which has the ``directoryId`` value ``2SKhstu8Plaekcai8lghrp``. The following API request::

	POST https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/accounts
	Content-Type: application/json;charset=UTF-8

	{
	  "username" : "jlpicard",
	  "email" : "capt@enterprise.com",
	  "givenName" : "Jean-Luc",
	  "surname" : "Picard",
	  "password" : "uGhd%a8Kl!"
	}

Would yield this response::

	{
	  "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
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
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/customData"
	  },
	  "providerData": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/providerData"
	  },
	  "directory": {
	    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
	  },
	  "tenant": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
	  },
	  "groups": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/groups"
	  },
	  "applications": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/applications"
	  },
	  "groupMemberships": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/groupMemberships"
	  },
	  "apiKeys": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/apiKeys"
	  },
	  "accessTokens": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/accessTokens"
	  },
	  "refreshTokens": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/refreshTokens"
	  }
	}


Add an Existing Account to a Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If we now wanted to add "Jean-Luc Picard" to a Group that belongs to the "Captains" Directory, we would have to link the Account Resource to a Group Resource. This is done via a *groupMembership** resource that store this Account-to-Group link. Each Account we add to a Group has its own groupMembership resource created.  

**groupMembership URI**

``v1/groupMemberships/:groupMembershipId``

**groupMembership Attributes**

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
	  - The resource's fully qualified location URL.
	
	* - ``account``
	  - Link 
	  - N/A
	  - A link to the Account for this Group Membership. 
	 
	* - ``group``
	  - Link
	  - N/A
	  - A link to the Group for this Group Membership.
	
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s properties were last modified
	    
So let's say we want to add "Jean-Luc Picard" to "Starfleet Officers" Group inside the "Captains" Directory.

We make the following request::

	{
	  "account" : {
	      "href" : "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey"
	   },
	   "group" : {
	       "href" : "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc"
	   }
	}

And get the following response::

	HTTP/1.1 201 Created

	{
	  "href": "https://api.stormpath.com/v1/groupMemberships/1ufdzvjTWThoqnHf0a9vQ0",
	  "account": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey"
	  },
	  "group": {
	    "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKqFWhDc"
	  }
	}

Importing Accounts
------------------

Stormpath also makes it very easy to transfer your existing user directory into a Stormpath Directory using our API. Depending on how you store your passwords, you will use one of three approaches:

1. **Passwords in Plaintext:** If you stored passwords in plaintext, you can use the Stormpath API to import them directly. Stormpath will create the Accounts and secure their passwords automatically (within our system). Make sure that your Stormpath Directory is configured to *not* send Account Verification emails before beginning import.
2. **Passwords With MCF Hash:** If your password hashing algorithm follows a format Stormpath supports, you can use the API to import Accounts directly. Available formats and instructions are detailed :ref:`below <importing-mcf>`.
3. **Passwords With Non-MCF Hash:** If you hashed passwords in a format Stormpath does not support, you can still use the API to create the Accounts, but you will need to issue a password reset afterwards. Otherwise, your users won't be able to use their passwords to login.

.. note::

	To import user accounts from an LDAP or Social Directory, please see the :ref:`above section <make-mirror-dir>`.

Due to the sheer number of database types and the variation between individual data models, the actual importing of users is not something that Stormpath handles at this time. What we recommend is that you write a script that is able to iterate through your database and grab the necessary information. Then the script uses our APIs to re-create the user base in the Stormpath database. 
   
Importing Accounts with Plaintext Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this case, it is recommended that you suppress Account Verification emails. This can be done by simply adding a ``registrationWorkflowEnabled=false`` query parameter to the end of your API like so::

	https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbRvLk9KA/accounts?registrationWorkflowEnabled=false

.. _importing-mcf:

Importing Accounts with MCF Hash Passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you are moving from an existing user repository to Stormpath, you may have existing password hashes that you want to reuse in order to provide a seamless upgrade path for your end users. Stormpath does not allow for Account creation with *any* password hash, the password hash must follow modular crypt format (MCF), which is a ``$`` delimited string. 
This works as follows:

1. Create the Account specifying the password hash instead of a plain text password.
Stormpath will use the password hash to authenticate the Account’s login attempt.

2. If the login attempt is successful, Stormpath will recreate the password hash using a secure HMAC algorithm.
   
Supported Hashing Algorithms
""""""""""""""""""""""""""""

Stormpath only supports password hashes that use the following algorithms:

- bcrypt: These password hashes have the identifier ``$2a$``, ``$2b$``, ``$2x$``, ``$2a$``
- stormpath2: A Stormpath-specific password hash format that can be generated with common password hash information, such as algorithm, iterations, salt, and the derived cryptographic hash. For more information see :ref:`below <stormpath2-hash>`.
  
Once you have a bcrypt or stormpath2 MCF password hash, you can create the Account in Stormpath with the password hash by POSTing the Account information to the Directory or Application ``/accounts`` endpoint and specifying ``passwordFormat=mcf`` as a query parameter::

	https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbRvLk9KA/accounts?passwordFormat=mcf

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


How to Store Additional User Information as Custom Data
-------------------------------------------------------

While Stormpath’s default Account attributes are useful to many applications, you might want to add your own custom data to a Stormpath Account. If you want, you can store all of your custom account information in Stormpath so you don’t have to maintain another separate database to store your specific account data.

One example of this could be if we wanted to add information to our "Jean-Luc Picard" Account that didn't fit into any of the existing Account attributes.

For example, we could want to add information about this user's current location, like the ship this Captain is currently assigned to. To do this, we specify the ``accountId`` and the ``/customdata`` endpoint. 

So if we were to POST the following REST API::

	https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/customData

With the following payload::

	{
		"currentAssignment": "USS Enterprise (NCC-1701-E)"
	}

We would get this response::

	{
	  "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/customData",
	  "createdAt": "2015-08-25T19:57:05.976Z",
	  "modifiedAt": "2015-08-26T19:25:27.936Z",
	  "currentAssignment": "USS Enterprise (NCC-1701-E)"
	}

This information can also be appended as part of the initial Account creation payload. 

For more information about the customData resource, please see the `customData section <http://docs.stormpath.com/rest/product-guide/#custom-data>`_ of the REST API Product Guide .

c. How to Search Accounts
=========================

You can search Stormpath Accounts, just like all Resource Collections, using one of three search methods: 

**Filter Search:** 

This searches across all attributes on all resources within the specified Collection and finds any attribute that matches the specified query parameter ``q``. 

Example: All instances where the string "path" is found in any attribute in the specified collection of Accounts.

``https://api.stormpath.com/v1/applications/someAppId/accounts?q=path``

**Attribute Search:** 

This searches across the specified attribute on all resources within the specified Collection and finds any matches of specific resource attributes. 

Example: All instances where the string "path" is found in the ``email`` attribute in the specified Collection of Accounts.

``https://api.stormpath.com/v1/applications/someAppId/accounts?email=path``

**Datetime Search**

It is also possible to search the ``createdAt`` and ``modifiedAt`` properties found on many Stormpath resources.  The ``datetime`` range is denoted as::

	createdAt|modifiedAt=[ISO-8601-BEGIN-DATETIME, ISO-8601-END-DATETIME]

So, if you want wanted to get all Accounts created between Jan 12, 2015 and Jan 14, 2015 you would request:

	https://api.stormpath.com/v1/applications/someAppId/accounts?createdAt=[2015-01-12, 2015-01-14]

The response would be a collection of Accounts created between the two days. 

.. note::

	Omitting the beginning or ending date is valid for requests. Omitting the start ``datetime`` range (e.g. ``createdAt=[,ISO-8601-END-DATETIME]``) would include all resources created or modified before the ending datetime. Omitting the end datetime range (e.g. ``createdAt=[ISO-8601-BEGIN-DATETIME,]``) would include all resources created or modified after the specified beginning datetime.

For more information about how search works in Stormpath, please see the `Search section <http://docs.stormpath.com/rest/product-guide/#search>`_ of the REST API Product Guide.

d. How to Manage an Account's Password
======================================

In Stormpath, password policies are defined on a Directory level. Specifically, they are controlled in a **Password Policy** resource associated with the Directory. Modifying this resource also modifies the behavior of all Accounts that are included in this Directory. 

.. note::

	This section assumes a basic familiarity with Stormpath Workflows. For more information about Workflows, please see `the Directory Workflows section of the Admin Console Guide <http://docs.stormpath.com/console/product-guide/#directory-workflows>`_. 

**passwordPolicy URI**

``/v1/passwordPolicies/:passwordPolicyID``

**passwordPolicy Attributes**

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
	  - The resource's fully qualified location URL.
	  
	* - ``resetTokenTtl``
	  - Number
	  - A positive integer, less than 169 (0 < i < 169). Default is 24.
	  - An integer that defines how long the password reset token is valid for during the password reset email workflow.
	  
	* - ``resetEmailStatus``
	  - String
	  - ``ENABLED`` or ``DISABLED``
	  - The status of the reset email workflow. If this is set to ``ENABLED``, then Stormpath will allow for passwords to be reset through the email workflow and will use the template that is stored in the passwordPolicy’s ``resetEmailTemplates``.
	  	  
	* - ``strength``
	  - Link
	  - N/A 
	  - A link to the password strength requirements for the Directory.
	
	* - ``resetEmailTemplates``
	  - Link
	  - N/A
	  - A collection of email templates that can be used for sending the password reset email. A template stores all relevant properties needed for an email. This is a collection but currently only allows one value. It is not possible to create new ``resetEmailTemplates`` with a POST.
	  
	* - ``resetSuccessEmailStatus``
	  - String
	  - ``ENABLED`` or ``DISABLED``
	  - The status of the reset success email. If this is set to ``ENABLED``, then Stormpath will send the email when an Account’s password reset email workflow is successful. The email template that is sent is defined in the passwordPolicy’s ``resetSuccessEmailTemplates``.
	  
	* - ``resetSuccessEmailTemplates``
	  - Link
	  - N/A
	  - A collection of email templates that can be used for sending password reset success emails. A template stores all relevant properties needed for an email. This is a collection but currently only allows one value. It is not possible to create new ``resetEmailTemplates`` with a POST.

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	  
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.

For a Directory's password policies, you can modify:

- The Password Strength policy
- The Password Reset Workflow 

Password Strength
-----------------

The Password Strength Policy for a Directory can be modified through the Administrator Console and through the REST API. Password Strength Policy is part of the Directory’s Password Policy and can be accessed through the ``strength`` property.

**strength Properties**

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Property
	  - Type
	  - Valid Value(s)
	  - Description

	* - ``maxLength``
	  - Number
	  - Default is 100
	  - Represents the maximum length for a password. For example ``maxLength`` of ``10`` indicates that a password can have no more than 10 characters.
	    
	* - ``minLength``
	  - Number
	  - Default is 8
	  - Represents the minimum length for a password. For example ``minLength`` of ``5`` requires that a password has no less than 5 characters.
	    
	* - ``minLowerCase``
	  - Number	
	  - Default is 1
	  - Represents the minimum number of lower case characters required for the password. characters	
	  
	* - ``minNumeric``		
	  - Number	
	  - Default is 1
	  - Represents the minimum number of numeric characters required for the password. 
	
	* - ``minSymbol``	
	  - Number	
	  - Default is 0
	  - Represents the minimum number of symbol characters required for the password. 

	* - ``minUpperCase``	
	  - Number	
	  - Default is 1
	  - Represents the minimum number of upper case characters required for the password. 

	* - ``minDiacritic``	
	  - Number	
	  - Default is 0
	  - Represents the minimum number of diacritic characters required for the password.

Changing the Password Strength resource for a Directory modifies the requirement for new Accounts and also password changes on existing Accounts in that Directory. To update Password Strength, simple HTTP POST to the appropriate ``$directoryId`` and ``/strength`` resource with the changes.

This call::

	https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID/strength

with this body::

	{
	  "minLength": 1,
	  "maxLength": 24,
	  "minSymbol": 1
	}

would result in the following response::

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

.. _password-reset-flow:

Password Reset
--------------

The Password Reset Email is configurable for a Directory. There is a set of properties that define its behavior, including ``resetEmailStatus`` and the ``resetEmailTemplates`` for the initial password reset email that is sent to the Account’s email address with a link to reset the Account’s password. The properties ``resetSuccessEmailStatus`` and ``resetSuccessEmailTemplates`` for the resulting email that is sent when the password reset is successful through the email workflow.

Enable Password Reset Emails 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To control whether an email is sent or not is simply a matter of setting the appropriate value to either ``ENABLED`` or ``DISABLED``. For example, if you would like a Password Reset email to be sent, send the following POST::

	https://api.stormpath.com/v1/passwordPolicies/$DIRECTORY_ID

*Body*::

	{
	  "resetEmailStatus": "ENABLED"
	}'

Email Templates
^^^^^^^^^^^^^^^

To modify the emails that get sent during the password reset workflow, let’s take a look at the email templates for the password reset. Email templates in Stormpath have common properties that can be modified to change the appearance of the emails. The properties below apply to both email templates that reside in the password policy (resetEmailTemplate and resetSuccessEmailTemplate).

**EmailTemplate Properties**

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Property
	  - Type
	  - Valid Value(s)
	  - Description

	* - fromEmailAddress		
	  - String	
	  - N/A
	  - The address that appears in the email’s "from" field.
	    
	* - fromName		
	  - String 
	  - N/A
  	  - The name that appears in the email’s "from" field 
 
	* - subject		
	  - String 
	  - N/A
  	  - The subject that appears in the email’s subject field				

	* - htmlBody		
	  - String	
	  - For the ``resetEmailTemplate`` it is required to include the macro for the ${url}, ${sptoken} or, ${sptokenNameValuePair}
	  - The body of the email in HTML format. This body is only sent when the mimeType for the template is set to text/html. This body can take valid HTML snippets.
	    
	* - textBody	
	  - String
	  - For the ``resetEmailTemplate`` it is required to include the macro for the ${url}, ${sptoken} or, ${sptokenNameValuePair}.
	  - The body of the email is plain text format. This body is only sent when the mimeType for the template is set to text/plain.

	* - mimeType
	  - String	
	  - ``text/plain`` or ``text/html``
	  - A property that defines whether Stormpath will send an email with the mime type of ``text/plain`` or ``text/html``.	


	* - defaultModel	
	  - Object	
	  - Object that includes one property ``linkBaseUrl`` which is itself a String
	  - An object that defines the model of the email template. The defaultModel currently holds one value, which is the ``linkBaseUrl``. The linkBaseUrl is used when using the macro ${url} in an email template. This macro generates a URL that includes the ``linkBaseUrl`` and the ``sptoken`` used in password reset workflows.

Changing any of these is as simple as sending an HTTP POST with the desired property in the payload body.

e. How to Verify an Account's Email 
===================================

If you want to verify that an Account’s email address is valid and that the Account belongs to a real person, Stormpath can help automate this for you using `Workflows <http://docs.stormpath.com/console/product-guide/#directory-workflows>`_.

Understanding the Email Verification Workflow
---------------------------------------------

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

Configuring the Verification Workflow
-------------------------------------

This workflow is disabled by default on Directories, but you can enable it, and set up the account verification base URL, easily in the Stormpath Admin Console UI. Refer to the `Stormpath Admin Console Guide <https://stormpath.com/docs/console/product-guide#!ManageWorkflowAutomation>`_ for complete instructions.

Triggering the Verification Email (Creating A Token)
----------------------------------------------------

In order to verify an Account’s email address, an ``emailVerificationToken`` must be created for that Account. To create this token, you simply create an Account in a Directory, either programmatically or via a public account creation form of your own design, that has the account registration and verification workflows enabled.

Verifying the Email Address (Consuming The Token)
-------------------------------------------------

The email that is sent upon Account creation contains a link to the base URL that you've configured, along with the ``sptoken`` query string parameter::

	http://www.yourapplicationurl.com/path/to/validator/?sptoken=$VERIFICATION_TOKEN

The token you capture from the query string is used to form the full ``href`` for a special email verification endpoint used to verify the Account::

	/v1/accounts/emailVerificationsToken/:verificationToken

To verify the Account, you use the token from the query string to form the above URL and POST a body-less request against the fully-qualified end point::

	POST https://api.stormpath.com/v1/accounts/emailVerificationTokens/6YJv9XBH1dZGP5A8rq7Zyl

Which will return a result that looks like this::

	HTTP/1.1 200 OK
	Content-Type: application/json;charset=UTF-8;

	{
	  href: "https://api.stormpath.com/v1/accounts/6XLbNaUsKm3E0kXMTTr10V"
	}

If the validation succeeds, you will receive back the ``href`` for the Account resource which has now been verified. An email confirming the verification will be automatically sent to the Account’s email address by Stormpath afterwards, and the Account will then be able to authenticate successfully.

If the verification token is not found, a "404 Not Found" error is returned with a payload explaining why the attempt failed.

.. note::

	For more about Account Authentication you can read :doc:`the next chapter </005_auth_n>`.


******************
1. About Stormpath
******************

What is Stormpath?
Features
Who should use Stormpath

Data Model Core Concepts
========================

.. todo::

	Tenants
	Account Stores
	Organizations


This section will give a high-level overview of the Stormpath data model, with more in-depth information available in the [Reference] section.

An **Application** resource in Stormpath contains information about any real-world software that communicates with Stormpath via REST APIs.  

The top-level container resource for both Users and Groups is referred to as a **Directory**. Directories can either be hosted inside Stormpath, or can be used to replicate outside user directories, as in the case of Active Directory or Facebook. Security policies, like password strength, are defined on a Directory level. An Application can access multiple Directories, and multiple Applications can also access the same Directory.

Users are modelled inside Stormpath as **Accounts**. Every Account is unique within a Directory, with this uniqueness usually tied to an email address.

**Groups** are collections of Accounts found within a directory. They can be thought of as labels applied to Accounts. 

The relation between every Account and its Group is contained in a **GroupMembership** resource. If you imagine Groups as labels for Accounts, the GroupMembership object contains information about which labels have been applied to which Accounts. 

Stormpath uses the **customData** resource to store custom information. It is a schema-less map object that is automatically created at the same time as, and linked to, another Stormpath resource, such as an Account, Group, or Directory.

Now that we understand the players, we can get you jump right in and get started with Stormpath by going through your first time set-up!
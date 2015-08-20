**********************
4. Account Management
**********************

The first question that we need to address is how we are going to model our users inside the Stormpath database. User Accounts in Stormpath aren't directly associated with Applications, but only indirectly via **Directories** and **Groups**. 

Both of these resources are what are called **Account Stores**, named so because they contain or "store" user Accounts. In Stormpath, you control who may log in to an Application by associating (or 'mapping') one or more Account Stores to an Application. All of the user Accounts across all of an Application's assigned Account Stores form the Application's effective "user base": those Accounts that may log in to the Application. If no Account Stores are assigned to an Application, no Accounts will be able to log in to it.

You control which Account Stores are assigned (mapped) to an Application, and the order in which they are consulted during a login attempt, by manipulating an application's AccountStoreMapping resources.

All of your users will have to be associated with at least one Directory resource, so we can start there.  

i. Directories
==============
    
The **Directory** resource is a top-level container for Account and Group resources. A Directory also manages security policies (like password strength) for the Accounts it contains. Allowing users to log in to an application is simply a matter of creating an AccountStoreMapping that maps the Directory resource that contains them to the Application resource that you want them to access. 

Directories can be used to cleanly manage segmented user Account populations. For example, you might use one Directory for company employees and another Directory for customers, each with its own security policies.

Additionally:

* All Account resources within a Directory have a unique ``email`` and/or ``username``.
* All Group resources within a Directory have a unique ``name``.

Stormpath supports three types of Directories:

1. Natively-hosted Directories that originate in Stormpath
2. Mirror Directories that act as secure replicas of existing LDAP user directories outside of Stormpath, for example those on Active Directory servers.
3. Social Directories that pull-in account information from four sites that support social login: Google, Facebook, Github and LinkedIn.
   
You can add as many directories of each type as you require.

.. note::

	Multiple Directories are a more advanced feature of Stormpath. If you have one or more Applications that all access the same user Accounts, you usually only need a single Directory, and you do not need to be concerned with creating or managing multiple Directories.

	If however, your Application(s) needs to support login for external third-party user Accounts like those in Active Directory, or you have more complex Account segmentation needs, Directories will be a powerful tool to manage your application's user base.

LDAP Directories
---------------- 

Mirror Directories are a big benefit to Stormpath customers who need LDAP directory accounts to be able to securely log in to public web applications without breaking corporate firewall policies. Here is how they work:

- After creating an LDAP Directory in Stormpath, you download a Stormpath Agent. This is a simple standalone software application that you install behind the corporate firewall so it can communicate directly with the LDAP server.
- You configure the agent via LDAP filters to view only the accounts that you want to expose to your Stormpath-enabled applications.
- The Agent will start synchronizing immediately, pushing this select data outbound to Stormpath over a TLS (HTTPS) connection.
- The synchronized user Accounts and Groups appear in the Stormpath Directory. The Accounts will be able to log in to any Stormpath-enabled application that you assign.
- When the Agent detects local LDAP changes, additions or deletions to these specific Accounts or Groups, it will automatically propagate those changes to Stormpath to be reflected by your Stormpath-enabled applications.
  
The big benefit is that your Stormpath-enabled applications still use the same convenient REST+JSON API – they do not need to know anything about things like LDAP or legacy connection protocols.
 
Social Directories
------------------

Stormpath works with user Accounts pulled from Social Networks (currently Google, Facebook, Github, and LinkedIn) in a way very similar to the way it works with user Accounts from LDAP servers. These external Identity Providers (IdPs) are modeled as Stormpath Directories, much like Mirror Directories. The difference is that, while Mirror Directories always come with an Agent that takes care of synchronization, Social Directories have an associated Provider resource. This `Provider` resource contains the information required by Google / Facebook to work with their site (E.g. the App ID for your Google/FB application or the App Secret).

Stormpath also simplifies the authorization process by doing things like automating Google's access token exchange flow. All you do is POST the authorization code from the end-user and Stormpath returns a new or updated user Account, along with the Google access token which you can use for any further API calls. 

Modeling your users who authorize via Social Login could be accomplished by creating a Directory resource for each social provider that you want to support, along with one master Directory for your Application. So, how this works in practice is: a new user visits your site, and chooses to "Sign-in with Google". Once they log in to their Google account and go through the OpenID flow, a new user Account is created in your Google Directory. After this Account is created, a search is performed inside the Application's master Directory for their email address, to see if they already exist in there. If the user Account is already in the master Directory, no action is taken. If the user Account is not found, a new one is created in the master Directory, and populated with the information pulled from the Google account. The `customData` resource for that Account is then used to store an `href` link to their Account in the Google Directory. If the user then chooses at some point to "Sign in with Facebook", then a similar process will occur, but this time with a link created to the user Account in the Facebook Directory. 

This approach has two major benefits: It allows for a user to have one unified identity in your Application, regardless of how many social identities they choose to log in with; this central identity can also be the central point that all authorization permissions (whether they be implicit or explicit) are then applied to.

For both Mirror and Social Directories, since the relationship with the outside directory is read-only, the remote directory is still the "system of record".

ii. Groups
==========


*****************************************
5. Authenticating Accounts with Stormpath
*****************************************

a. How Password Authentication works in Stormpath
=================================================

Both **Directory** and **Group** resources are what are called **Account Stores**, named so because they contain or "store" user Accounts. In Stormpath, you control who may log in to an Application by associating (or 'mapping') one or more Account Stores to an Application. All of the user Accounts across all of an Application's assigned Account Stores form the Application's effective "user base": those Accounts that may log in to the Application. If no Account Stores are assigned to an Application, no Accounts will be able to log in to it.

You control which Account Stores are assigned (mapped) to an Application, and the order in which they are consulted during a login attempt, by manipulating an application's AccountStoreMapping resources. More about this can be found in the [Authenticating Accounts] section below.
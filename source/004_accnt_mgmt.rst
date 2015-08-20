**********************
4. Account Management
**********************

The first question that we need to address is how we are going to model our users inside the Stormpath database. User *Accounts* in Stormpath aren't directly associated with Applications, but only indirectly via Directories and Groups. All of your users will have to be associated with at least one ``directory`` resource, so we can start there.  



i. Directories
    
The ``directory`` resource is a top-level container for ``account`` and ``group`` resources. 

ii. Groups


An *Account Store* is a generic term for either a Directory or a Group. Both Directories and Groups are considered "Account Stores" because they both are capable of containing, or "storing", user Accounts. 


*Account Store* is a generic term for either a
Directory or a Group. Directories and
Groups are both considered "account stores" because they both
contain, or 'store', user Accounts. An *Account Store Mapping*, then,
represents an Account Store that is mapped (assigned) to an Application.

In Stormpath, you control who may log in to an Application by associating
(or 'mapping') one or more Account Stores to an Application. All of the
user Accounts across all of an Application's assigned Account Stores form the
Application's effective "user base": those Accounts that may log in to the
Application. If no Account Stores are assigned to an Application, no
Accounts will be able to log in to the Application.

You control which Account Stores are assigned (mapped) to an
Application, and the order in which they are consulted during a login attempt, 
by manipulating an application's ``AccountStoreMapping`` resources.
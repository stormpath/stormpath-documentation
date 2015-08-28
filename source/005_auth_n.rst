*****************************************
5. Authenticating Accounts with Stormpath
*****************************************

a. How Password Authentication works in Stormpath
=================================================

Authenticating An Account
-------------------------

After an Account has been created, you can authenticate it given an input of a ``username`` or ``email`` and a ``password`` from the end-user. When authentication occurs, you are authenticating a user within a specific Application against the Application’s Directories and Groups (more on these [below]). That being said, the Application resource is the starting point for authentication attempts.

Once you have the Application resource you may attempt authentication by sending a POST request to the Application’s ``/loginAttempts`` endpoint and providing a base64 encoded ``username``/``email`` and ``password`` pair that is separated with a colon (for example ``testuser``:``testpassword``). Stormpath requires that the ``username``/``email`` and ``password`` are base64 encoded so these values are not passed as clear text.

So, if we had a new user Account "Han Solo" added to the "Captains" Directory, and we wanted to log him in, we would first need to take the combination of his ``username`` and ``password`` ("first2shoot:Change+me1") and then Base64 encode them: ``Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ==``.

We would issue the following POST to our Application with ID ``1gk4Dxzi6o4PbdlBVa6tfR``:

``https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/loginAttempts``

With the following body, using the Base64 encoded ``value`` from above::

	{
	    "type": "basic",
	    "value": "Zmlyc3Qyc2hvb3Q6Q2hhbmdlK21lMQ=="
	}

Which would return the ``href`` for the "Han Solo" Account::

	{
	  "account": {
	    "href": "https://api.stormpath.com/v1/accounts/72EaYgOaq8lwTFHILydAid"
	  }
	}

Now the reason why this succeeds is because there is an existing **Account Store Mapping** between the "Han Solo" Account's "Captains" Directory and our Application. This mapping is what grants this Account the authorization to log in to the Application. 

Account Store Mappings 
----------------------
Both **Directory** and **Group** resources are what are called **Account Stores**, named so because they contain or "store" Accounts. In Stormpath, you control who may log in to an Application by associating (or 'mapping') one or more Account Stores to an Application. All of the user Accounts across all of an Application's assigned Account Stores form the Application's effective "user base": those Accounts that may log in to the Application. If no Account Stores are assigned to an Application, no Accounts will be able to log in to it.

You control which Account Stores are assigned (mapped) to an Application, and the order in which they are consulted during a login attempt, by manipulating an Application's AccountStoreMapping resources. 

An individual Directory resource may be accessed via its Resource URI:

**accountStoreMapping URI**

``/v1/accountStoreMappings/:accountStoreMappingId``

**accountStoreMapping Attributes**

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
	  - The resource's fully qualified location URI.
	    
	* - listIndex
	  - Integer
	  - 0 <= N < list size
	  - The order (priority) in which the associated Account Store will be consulted by the Application during an authentication attempt. This is a zero-based index; an Account Store with a ``listIndex`` of ``0`` will be consulted first (has the highest priority), followed by the Account Store at ``listIndex`` ``1`` (next highest priority), and so on. Setting a negative value will default the value to 0, placing it first in the list. A ``listIndex`` of larger than the current list size will place the mapping at the end of the list and then default the value to ``(list size - 1)``.
	    
	* - isDefaultAccountStore
	  - String (boolean)
	  - ``true``, ``false``
	  - A ``true`` value indicates that new Accounts created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they will not.
	    
	* - isDefaultGroupStore
	  - String (boolean)
	  - ``true``, ``false``
	  - A ``true`` value indicates that new Groups created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they won't. **This may only be set to true if the Account Store is a Directory. Stormpath does not currently support Groups storing other Groups**.
	
	* - application
	  - Link
	  - N/A
	  - A link to the mapping’s Application. **Required.**

	* - accountStore
	  - Link 
	  - N/A
	  - A link to the mapping’s Account Store (either a Group or Directory) containing Accounts that may login to the application. **Required.** 

.. todo::

	The following don't actually appear...
	  
	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	    
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.
	    


How Login Attempts Work 
^^^^^^^^^^^^^^^^^^^^^^^

When the "Han Solo" Account tried to log in to the Application, the user submitted a request to the Application’s ``/loginAttempts`` endpoint. Stormpath then consults the Application’s assigned Account Stores (Directories and Groups) in the order that they are assigned to the Application. When a matching Account is discovered in a mapped Account Store, it is used to verify the authentication attempt and all subsequent Account Stores are ignored. In other words, Accounts are matched for Application login based on a "first match wins" policy.

Let’s look at an example to illustrate this behavior. Assume that two Account Stores, a ‘Customers’ Directory and an "Employees" Directory, have been assigned (mapped) to a "Foo" application. "Customers" was assigned first, and "Employees" was assigned next, and this will dictate the order in which they are checked. 

The following flow chart shows what happens when an account attempts to login to the Foo application:

.. figure:: images/auth_n/LoginAttemptFlow.png
	:align: center
	:scale: 100%
	:alt: Login Attempt Flow 

	*The Login Attempt Flow* 

As you can see, Stormpath tries to find the Account in the "Customers" Directory first because it has a higher priority than the "Employees" directory. If not found, the "Employees" Directory is tried next as it has a lower priority.

You can assign multiple Account Stores to an Application, but only one is required to enable login for an Application. Assigning multiple Account Stores to an Application, as well as configuring their priority, allows you precise control over the Account populations that may log in to your various Applications.

b. How to Retrieve Additional Account Data On Authentication 
============================================================

Lorem ipsum.

c. How Token Authentication Works
=================================

Lorem ipsum.

d. How Social Authentication Works
==================================

i. Google
---------

Lorem ipsum.

ii. Facebook
------------

Lorem ipsum.

iii. Github
-----------

Lorem ipsum.

iv. LinkedIn
------------

Lorem ipsum.

e. How API Authentication Works
===============================

Lorem ipsum.

i. How to Use API Keys and Secret Authentication
------------------------------------------------

Lorem ipsum.

ii. How to Authenticate Using HTTP Basic
----------------------------------------

Lorem ipsum.

iii. How to Authenticate Using Bearer Tokens
--------------------------------------------

Lorem ipsum.

iv. How to use Tokens With API Authentication
---------------------------------------------

Lorem ipsum.
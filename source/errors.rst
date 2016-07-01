.. _errors:

*********************
Stormpath Error Codes
*********************

110X: Communication
===================

Error 1100
-----------

**Message**

The specified HTTP request method is not supported.

**User Message**

*(Same as above)*

Error 1101
----------

**Message**

Bad request 'Content-Type'. This error will specify what the expected value is.

**User Message**

*(Same as above)*

19XX: Billing / Payment
=======================

Error 1900
------------

**Message**

Subscription upgrade required.

To upgrade your subscription, go to the "My Subscription" section of the Stormpath Admin Console.

**User Message**

*(Same as above)*

Error 1902
-------------

**Message**

Application limit reached. Please add more Applications in the "My Subscription" section of the Stormpath Admin Console.

**User Message**

*(Same as above)*

**Further Information**

Your "Available Applications" is your Application limit and the "Active Applications" is the current number of Applications in your Tenant. To be able to create additional ones, delete unused Applications, or update your subscription to include more Applications.

Error 1903
----------

**Message**

The specified subscription level is not available for your active subscription plan.

**User Message**

The specified subscription level is not available.

**Further Information**

This error normally only occurs with older Stormpath Tenants. Please contact us at support@stormpath.com for assistance.

Error 1904
-----------

**Message**

In order to change your subscription, you need to add a payment method first.

**User Message**

You cannot modify your subscription because you have not added a payment method.

Error 1905
-----------

**Message**

You cannot lower the number of Applications for your subscription without first deleting Applications. Please delete the specified number of Applications and then try again.

**User Message**

*(Same as above)*

Error 1906
-----------

**Message**

You cannot add more than one credit card to your subscription. A credit card already exists for your subscription.

**User Message**

You cannot add more than one credit card to your subscription.

Error 1910
-----------

**Message**

Cannot send an email with the specified mime type on the developer tier. Modify the email template or upgrade your Stormpath Tenant.

**User Message**

*(Same as above)*

2XXX: General Validation
========================

Error 2000
-------------

**Message**

The specified property value is required; it cannot be null, empty, or blank.

**User Message**

*(Same as above)*

**Further Information**

For example, you attempted to create an Account without providing a value for the ``email`` property.

Error 2001
-------------

**Message**

The specified property value already exists. Please choose another value.

**User Message**

*(Same as above)*

**Further Information**

For example, you attempted to create an Account with the same ``email`` as another Account in the same Directory.

Error 2002
-------------

**Message**

The specified property value is invalid.

**User Message**

*(Same as above)*

**Further Information**

This is a generic property invalid error. For example, supplying a fraction of 15/0 – cannot divide by zero. Stormpath only uses this code if a more accurate status code is not available. For example, an email without an ‘@’ should return error code 2006, not 2002.

Error 2003
-------------

**Message**

The specified property value is unsupported.

**User Message**

*(Same as above)*

**Further Information**

For example, ``enabled`` or ``disabled`` is expected, but the value passed was ``foo``.

Error 2004
-------------

**Message**

The specified property value is an invalid type.

**User Message**

*(Same as above)*

**Further Information**

For example, specifying a string when a number is required.

Error 2005
-------------

**Message**

The specified property value uses an invalid character encoding.

**User Message**

*(Same as above)*

Error 2006
-------------

**Message**

The specified property is in an invalid format.

**User Message**

*(Same as above)*

**Further Information**

For example, specifying the “12/15/2012” date format when “2012-12-15” is expected. Some forms of this error will include more specific information.

Error 2007
-------------

**Message**

The specified property value's minimum length is not satisfied.

**User Message**

*(Same as above)*

Error 2008
-------------

**Message**

The specified property value exceeded the maximum allowed length.

**User Message**

*(Same as above)*

Error 2009
-------------

**Message**

The specified property's minimum value is not satisfied.

**User Message**

*(Same as above)*

Error 2010
-------------

**Message**

The specified property exceeded the maximum allowed value.

**User Message**

*(Same as above)*

Error 2011
-------------

**Message**

The specified property's minimum date/time is not satisfied.

**User Message**

*(Same as above)*

Error 2012
-------------

**Message**

The specified property's maximum date/time is exceeded.

**User Message**

*(Same as above)*

Error 2013
-------------

**Message**

The specified property's value is not within range.

**User Message**

*(Same as above)*

**Further Information**

This error will also return what the minimum and maximum values are for the range.

Error 2014
-------------

**Message**

The specified property value is an invalid reference.

**User Message**

*(Same as above)*

**Further Information**

For example, linking to an object that is not allowed to be linked to. This error will sometimes return with more specific information.

Error 2015
-------------

**Message**

Unknown property.

**User Message**

*(Same as above)*

**Further Information**

For example, trying to set a ‘srname’ property instead of ‘surname’.

Error 2016
-------------

**Message**

Property value does not match a known Stormpath resource.

**User Message**

*(Same as above)*

**Further Information**

For example, you specified an invalid ``href`` for a resource that does not exist in your Tenant.

Error 2017
-------------

**Message**

The specified property is unsupported.

**User Message**

*(Same as above)*

**Further Information**

For example, you set-up a generic LDAP agent and then try to use properties that are only for Active Directory agents.

Error 2020
----------

**Message**

The specified resource reference is invalid: the specified resource does not exist. It may have been deleted before the request was submitted.

**User Message**

*(Same as above)*


Error 2021
-------------

**Message**

The specified resource reference is invalid: the resource's status is such that it may not be used.

**User Message**

*(Same as above)*

Error 2022
-----------

**Message**

The specified resource reference is invalid: the specified Account Store is not a SAML Directory and may not be used.

**User Message**

*(Same as above)*

Error 2100
-------------

**Message**

Malformed query. Ensure each name/value pair has a valid name and value.

**User Message**

*(Same as above)*

Error 2101
-------------

**Message**

The specified query parameter must have a corresponding value.

**User Message**

*(Same as above)*

Error 2102
-------------

**Message**

The specified query parameter can only have a single value.

**User Message**

*(Same as above)*

Error 2103
-------------

**Message**

The specified query parameter value is invalid or an unexpected type.

**User Message**

*(Same as above)*

Error 2104
-------------

**Message**

The ``orderBy`` query value contains an invalid order statement. An order statement must be a queryable property optionally followed by a ``\`` space character and order direction token (``asc`` or ``desc``).

**User Message**

*(Same as above)*

Error 2105
-------------

**Message**

The specified query value is not supported.

**User Message**

*(Same as above)*

Error 2106
-------------

**Message**

The specified orderBy value is not supported.

**User Message**

*(Same as above)*

Error 2107
-------------

**Message**

The specified reference does not support expansion.

**User Message**

*(Same as above)*

Error 2108
-----------

**Message**

Invalid range specified: end value should be greater than start value.

**User Message**

*(Same as above)*

3XXX: Custom Data
=================

Error 3000
-------------

**Message**

Property names cannot be null, empty or blank.

**User Message**

*(Same as above)*

Error 3001
-------------

**Message**

Property name is invalid. Property names cannot exceed 255 characters.

**User Message**

*(Same as above)*

Error 3002
-------------

**Message**

Property name is invalid. Property names may contain only alphanumeric characters ``0-9A-Za-z``, underscores ``_``, or dashes ``-``, but cannot start with a dash.

**User Message**

*(Same as above)*

Error 3003
-------------

**Message**

Property names may not equal any of the following reserved names: ``href``, ``createdAt``, ``modifiedAt``, ``meta``, ``spMeta``, ``spmeta``, ``ionmeta``, or ``ionMeta``.

**User Message**

*(Same as above)*

Error 3004
-------------

**Message**

Property value exceeds maximum size. The value exceeds the maximum storage size limit of 10 MB per customData resource.

**User Message**

*(Same as above)*

400X: Tenant
============

Error 4001
-------------

**Message**

Your Stormpath Tenant owner Account cannot be deleted.

**User Message**

Sorry, that Account cannot be deleted.

Error 4002
-------------

**Message**

Your Stormpath Tenant owner Account’s status cannot be modified.

**User Message**

Sorry, that Account's status cannot be changed.


4XXX: Organization
==================

Error 4520
-----------

**Message**

The specified Directory name is already in use by another Directory and cannot be used to auto-create a Directory for the new Organization.  Please choose a different name for the auto-created Directory.

**User Message**

*(Same as above)*

Error 4600
-----------

**Message**

This Organization does not have a default storage location configured for newly created Accounts. To fix this problem: in the Organization's 'Account Stores' configuration, specify the Account Store that will be used to store newly created Accounts.

**User Message**

*(Same as above)*

Error 4601
-----------

**Message**

This Organization's default Account Store for new Accounts is disabled.  New Accounts cannot be added to disabled Groups or Directories. To fix this problem: in the Organization's 'Account Stores' configuration, change the status of the default Account Store to ``ENABLED``.

**User Message**

*(Same as above)*

Error 4602
-----------

**Message**

No default Account Store has been mapped to this Organization for newly created Groups. To fix this problem: in the Organization's 'Account Stores' configuration, specify the Account Store that will be used to store newly created Groups.

**User Message**

*(Same as above)*

Error 4603
-----------

**Message**

This Organization's default Account Store for new Groups is disabled.  New Groups cannot be added to disabled Account Stores. To fix this problem: in the Organization's 'Account Stores' configuration, change the status of the Account Store used for storing new Groups to ``ENABLED``.

**User Message**

*(Same as above)*

Error 4604
-----------

**Message**

The specified Account Store is already mapped to the Organization. Please choose another Account Store to map.

**User Message**

*(Same as above)*

Error 4605
-----------

**Message**

Login attempt failed because the Organization does not have any assigned Account Stores.

**User Message**

*(Same as above)*

Error 4606
-----------

**Message**

The specified Directory is a read-only mirror of an externally managed directory. It cannot be used to directly store new Accounts.

**User Message**

*(Same as above)*

Error 4608
----------

**Message**

The specified Group is a read-only mirror of an externally-managed Group. It cannot be used to directly store new Accounts.

**User Message**

*(Same as above)*

Error 4610
-----------

**Message**

The specified Directory is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Groups.

**User Message**

*(Same as above)*

Error 4612
-----------

**Message**

Specifying a Group as a default Group Store is not currently supported.

**User Message**

*(Same as above)*

4614
-----------

**Message**

An Organization cannot be mapped as an Account Store for another Organization.

**User Message**

*(Same as above)*

Error 4700
-----------

**Message**

A Directory of the specified type is already mapped to this Organization. An Organization may be mapped to only one Directory of this type.

**User Message**

*(Same as above)*

**Further Information**

This can occur with various kinds of social login Directories (e.g. GitHub, Facebook).

5XXX: Application
=================

Error 5010
-------------

**Message**

**User Message**

Sorry, that Directory name is not available. Please choose another.

The specified Directory name is already in use by another Directory and cannot be used to auto-create a Directory for the new Application. Please choose a different Directory name for the auto-created Directory.

Error 5100
-------------

**Message**

This Application does not have a default Account Store for newly created Accounts.  To fix this problem: in the Application's 'Account Stores' configuration, specify the Account Store that will be used to store newly created Accounts.

**User Message**

*(Same as above)*

Error 5101
-------------

**Message**

This Application's default Account Store for new Accounts is disabled - new Accounts cannot be added to disabled Account Stores. To fix this problem: in the Application's 'Account Stores' configuration, change the status of the default Account Store used for storing new Accounts to ``ENABLED``.

**User Message**

*(Same as above)*

Error 5102
-------------

**Message**

This Application does not have a default Account Store for newly created Groups.  To fix this problem: in the Application's 'Account Stores' configuration, specify the Account Store that will be used to store newly created Groups.

**User Message**

*(Same as above)*

Error 5103
-------------

**Message**

This Application's default Account Store for new Groups is disabled - new Groups cannot be added to disabled Account Stores. To fix this problem: in the Application's 'Account Stores' configuration, change the status of the default Account Store used for storing new Groups to ``ENABLED``.

**User Message**

*(Same as above)*

Error 5104
-------------

**Message**

The specified Account Store is already mapped to that Application. Please choose another Account Store.

**User Message**

*(Same as above)*

Error 5105
-------------

**Message**

Login attempt failed because the Application is not assigned any Account Stores.

**User Message**

*(Same as above)*

Error 5106
-------------

**Message**

The specified Directory Account Store is a read-only mirror of an externally-managed Directory. It cannot be used to directly store new Accounts.

**User Message**

*(Same as above)*

Error 5108
-------------

**Message**

The specified Group Account store is a read-only mirror of an externally-managed Group. It cannot be used to directly store new Accounts.

**User Message**

*(Same as above)*

Error 5110
-------------

**Message**

The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Groups.

**User Message**

*(Same as above)*

Error 5112
-------------

**Message**

Specifying a Group as a default Group Store is not currently supported.

**User Message**

*(Same as above)*

Error 5114
-------------

**Message**

The specified Account Store is not one of the Application's assigned Account Stores.

**User Message**

*(Same as above)*

Error 5116
-------------

**Message**

This Application's default Account Store for new Accounts is an Organization, but this Organization itself has not been configured with a default Account Store. For an Account to be saved to an Organization, the Organization must be assigned a default Account Store. To fix this problem: in the Organization's 'Account Stores' configuration, specify an Account Store that will be used to store new Accounts for the Organization, and ensure its status is ``ENABLED``.

**User Message**

*(Same as above)*

Error 5117
-------------

**Message**

This Application's default Account Store for new Accounts is is an Organization, but the Organization's own default Account Store is disabled. Account Stores must be enabled to allow new Accounts to be added. To fix this problem: in the Organization's `Account stores' configuration, find the Organization's default Account Store and ensure its status is set to ``ENABLED``.

**User Message**

*(Same as above)*

Error 5118
-------------

**Message**

This Application's default Account Store for new Groups is an Organization, but this Organization itself has not been configured with a default Group Store. For a Group to be saved to an Organization, the Organization must be assigned a default Account Store. To fix this problem: in the Organization's 'Account Stores' configuration, specify an Account Store that will be used to store new Groups for the Organization, and ensure its status is ``ENABLED``.

**User Message**

*(Same as above)*

Error 5119
-------------

**Message**

This Application's default Account Store for new Groups is is an Organization, but the Organization's own default Group Store is disabled. Group Stores must be enabled to allow new Groups to be added. To fix this problem: in the Organization's `Account Stores' configuration, find the Organization's default Group Store and ensure its status is set to ``ENABLED``.

**User Message**

*(Same as above)*

Error 5120
-------------

**Message**

The specified Application does not have an authorizedCallbackUri and can not be used in a SAML workflow until it is configured. Please update the Application's authorizedCallbackUris property.

**User Message**

*(Same as above)*

Error 5121
-------------

**Message**

The specified callbackUri is not configured as an authorizedCallbackUri for the Application. Please check the Application's authorizedCallbackUris property for the list of valid callbackUris.

**User Message**

*(Same as above)*

Error 5122
-------------

**Message**

The specified Application does not have a default authorizedCallbackUri (a non-wildcard subdomain URI) and cannot be used in a SAML workflow until it is configured. Please update the Application's authorizedCallbackUris property.

**User Message**

*(Same as above)*

Error 5200
-------------

**Message**

A Directory of the specified type is already mapped to this Application. An Application may be assigned only one Directory of this type.

**User Message**

*(Same as above)*

6XXX: Directory
===============

Error 6100
-------------

**Message**

This externally-managed Directory does not allow creation of new Accounts or Groups.

**User Message**

*(Same as above)*

Error 6101
-------------

**Message**

The Account's Directory does not have a verification email workflow enabled. Please enable the Directory's email verification workflow and try again.

**User Message**

*(Same as above)*

Error 6201
-------------

**Message**

This Directory cannot be converted to a Mirror Directory.

**User Message**

*(Same as above)*

Error 6202
-------------

**Message**

The specified Directory cannot be updated to reflect a different identity provider. Please create a new Directory instead.

**User Message**

*(Same as above)*

Error 6203
-------------

**Message**

Stormpath was not able to complete the request to LinkedIn. This is caused by the LinkedIn configuration missing the redirectUri property in the Stormpath Directory configuration. When using an authorization code from LinkedIn, a redirectUri property must be set.

**User Message**

*(Same as above)*

7XXX: Account
=============

Error 7100
-------------

**Message**

Login attempt failed because the specified password is incorrect.

**User Message**

*(Same as above)*

**Further Information**

During a login attempt, Stormpath found an Account from the specified ``username`` or ``email``, but the password was incorrect.

Error 7101
-------------

**Message**

Login attempt failed because the Account is disabled.

**User Message**

*(Same as above)*

**Further Information**

During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``DISABLED``. Accounts with the ``DISABLED`` status cannot login.

Error 7102
-------------

**Message**

Login attempt failed because the Account is not verified.

**User Message**

*(Same as above)*

**Further Information**

During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``UNVERIFIED``. Accounts with the ``UNVERIFIED`` status cannot login.

Error 7103
-------------

**Message**

Login attempt failed because the Account is locked.

**User Message**

*(Same as above)*

Error 7104
-------------

**Message**

Login attempt failed because there is no Account in the Application’s associated Account Stores with the specified ``username`` or ``email``.

**User Message**

*(Same as above)*

Error 7105
-------------

**Message**

Login attempt failed because the Account is in a Group that is disabled.

**User Message**

*(Same as above)*

Error 7106
-------------

**Message**

Login attempt failed because the Account is in a Directory that is disabled.

**User Message**

*(Same as above)*

Error 7107
-------------

**Message**

Login attempt failed because the Account is in an Organization that is disabled.

**User Message**

*(Same as above)*

Error 7200
-------------

**Message**

Stormpath was not able to complete the request to the Social Login site: this can be caused by either a bad Social Directory configuration, or the provided Account credentials are not valid.

**User Message**

*(Same as above)*

Error 7201
-------------

**Message**

Stormpath is unable to create or update the Account because the Social Login site response did not contain the required property.

**User Message**

*(Same as above)*

Error 7202
-------------

**Message**

This property is a read-only property on a externally managed Directory Account, and consequently cannot be modified.

**User Message**

*(Same as above)*

Error 7205
-------------

**Message**

Cannot create the Account because the email matches the Directory's emailDomainBlacklist

**User Message**

Cannot create the Account because your email's domain is not allowed.

Error 7206
-------------

**Message**

Cannot create the Account because the email domain does not match the Directory's emailDomainWhitelist

**User Message**

Cannot create the Account because your email's domain is not allowed

Error 7301
-------------

**Message**

The email body must contain at least one of the following placeholders: ``${url}``, ``${sptoken}``, ``${sptokenNameValuePair}``.

**User Message**

*(Same as above)*

9XXX: Agent
===========

Error 9000
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory service, was not able to reach the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your directory's Stormpath Agent is online and successfully communicating with Stormpath.

**User Message**

*(Same as above)*

Error 9001
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory service, was not able to reach your directory server. Please ensure that the Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

**User Message**

*(Same as above)*

Error 9002
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory service, did not receive a timely response from the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your directory's Stormpath Agent is online and successfully communicating with Stormpath.

**User Message**

*(Same as above)*

Error 9003
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory server, did not receive a timely response from the directory server. Please ensure that your directory's Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

**User Message**

*(Same as above)*

Error 9004
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory service, received an invalid response from the Stormpath Directory Agent. Please ensure you are running the latest stable version of the Stormpath Directory Agent for your Directory Server.

**User Message**

*(Same as above)*

Error 9005
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your directory service, received an invalid response from your directory server. Please ensure that you are using a supported directory service version and that the Stormpath Directory Agent is configured correctly to communicate with that Directory Server.

**User Message**

*(Same as above)*

Error 9006
-------------

**Message**

Stormpath, while acting as a gateway/proxy to your Active Directory server, encountered a referral error while communicating with the Active Directory server. Potential solutions are to ensure that your Active Directory server's DNS settings are correctly configured or to log in to the Stormpath UI Console and change your Active Directory server's Stormpath Agent configuration to 'Ignore Referral Issues'.

**User Message**

*(Same as above)*

100XX: OAuth Errors
===================

Error 10010
-------------

**Message**

Token is no longer valid because the Account is not enabled.

**User Message**

*(Same as above)*

Error 10011
-------------

**Message**

Token is no longer valid because it has expired.

**User Message**

*(Same as above)*

**Further Information**

Stormpath tokens have an expiration time that is configurable through the Application’s OAuth Policy. If you try authenticating with an expired token, this error will return.

Error 10012
-------------

**Message**

Token is invalid because the issued at time (``iat``) is after the current time.

**User Message**

*(Same as above)*

Error 10013
-------------

**Message**

This can occur if the token has been manually deleted, or if the token has expired and removed by Stormpath.

**User Message**

*(Same as above)*

Error 10014
-------------

**Message**

Token is invalid because the issuer of the token does not match the Application validating the token.

**User Message**

*(Same as above)*

Error 10015
-------------

**Message**

Token is no longer valid because the Application that issued the token is not enabled.

**User Message**

*(Same as above)*

Error 10016
-------------

**Message**

Token is no longer valid because the Account is not in an Account Store mapped to the Application that issued the token.

**User Message**

*(Same as above)*

Error 10017
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because verifying the signature of a JWT failed.

101XX: SAML Errors
==================

Error 10100
-------------

**Message**

The SAML Response object is malformed or cannot be used by Stormpath. Please contact us at support@stormpath.com to help troubleshoot this problem.

**User Message**

*(Same as above)*

Error 10101
-------------

**Message**

The SAML Response has an invalid signature and cannot be trusted. Please contact us at support@stormpath.com to help troubleshoot this problem.

**User Message**

*(Same as above)*

Error 10102
-------------

**Message**

Authentication failed at the SAML Identity Provider, please check the SAML Identity Provider logs for more information.

**User Message**

*(Same as above)*

110XX: Token Errors
====================

Error 11001
-------------

**Message**

Token is invalid because the specified Organization ``nameKey`` does not exist in your Stormpath Tenant.

**User Message**

*(Same as above)*

Error 11002
-------------

**Message**

Token is invalid because the specified Organization is disabled.

**User Message**

*(Same as above)*

Error 11003
-------------

**Message**

Token is invalid because the specified Organization is not one of the Application’s assigned Account Stores.

**User Message**

*(Same as above)*

Error 11004
-------------

**Message**

Token is invalid because the specified claim value cannot be null or empty.

**User Message**

*(Same as above)*

Error 11005
-------------

**Message**

Token is invalid because a token with the same identifier (``jti``) has been already used.

**User Message**

*(Same as above)*

120XX: ID Site JWT
==================

Error 12001
-----------

**Message**

The session on ID Site has timed out. This can occur if the user stays on ID Site without logging in, registering, or resetting a password.

**User Message**

The session on ID Site has timed out.

Error 12002
------------

**Message**

The ID Site token that was submitted was not authenticated by ID Site. Stormpath can only generate an access token for ID Site tokens that include the status claim of ``AUTHENTICATED``, meaning that ID Site authenticated the Account with a valid login attempt.

**User Message**

*(Same as above)*

.. _errors-130xx:

130XX: SMTP Server
==================

Error 13000
-----------

**Message**

Unable to connect to an SMTP server located at the address and port provided.

**User Message**

*(Same as above)*


Error 13001
-----------

**Message**

Unable to authenticate to an SMTP server with the username and password provided.

**User Message**

*(Same as above)*

Error 13002
-----------

**Message**

Unable to connect to an SMTP server using the security protocol provided.

**User Message**

*(Same as above)*

Error 13003
-----------

**Message**

You cannot create a new email server because one already exists for your Tenant.

**User Message**

*(Same as above)*
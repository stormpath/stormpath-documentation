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

Error 2017 <<<
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

**User Message**

*(Same as above)*

**Further Information**


Error 2100
-------------

**Message**

**User Message**

*(Same as above)*

Malformed query. One or more query criteria parameters were not specified correctly.

Error 2101
-------------

**Message**

**User Message**

*(Same as above)*

The supplied query parameter must have a corresponding value.

Error 2102
-------------

**Message**

**User Message**

*(Same as above)*

The supplied query parameter may only have a single value and the parameter cannot be specified more than once.

Error 2103
-------------

**Message**

**User Message**

*(Same as above)*

The supplied query parameter value is invalid or an unexpected type.

Error 2104
-------------

**Message**

**User Message**

*(Same as above)*

The ``orderBy`` query parameter value contains an invalid order statement.

Error 2105
-------------

**Message**

**User Message**

*(Same as above)*

Unsupported Query Property: specifying a property not recognized as queryable.

Error 2106
-------------

**Message**

**User Message**

*(Same as above)*

Unsupported Order Property: specifying a property for sort ordering that cannot be sorted.

Error 2107
-------------

**Message**

**User Message**

*(Same as above)*

Unsupported Expand Property: specifying a property for expansion when the property is not expandable.

Error 108
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**


3XXX: Custom Data
=================

Error 3000
-------------

**Message**

**User Message**

*(Same as above)*

Property names cannot be null, empty or blank.

Error 3001
-------------

**Message**

**User Message**

*(Same as above)*

Property name is invalid. Property names cannot exceed 255 characters.

Error 3002
-------------

**Message**

**User Message**

*(Same as above)*

Property name is invalid. Property names may contain only alphanumeric characters, underscores, or dashes, but cannot start with a dash.

Error 3003
-------------

**Message**

**User Message**

*(Same as above)*

Property names may not equal any of the following reserved names: ``href``, ``createdAt``, ``modifiedAt``, ``meta``, ``spMeta``, ``spmeta``, ``ionmeta``, or ``ionMeta``.

Error 3004
-------------

**Message**

**User Message**

*(Same as above)*

Property value exceeds maximum size. The value exceeds the maximum storage size limit of 10 MB per customData resource.

400X: Tenant
============

Error 4001
-------------

**Message**

**User Message**

*(Same as above)*

Your Stormpath Tenant owner Account cannot be deleted.

Error 4002
-------------

**Message**

**User Message**

*(Same as above)*

Your Stormpath Tenant owner Account’s status cannot be modified.

4XXX: Organization
==================

Error 4520
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**


Error 4600
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**

Error 4601
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**

Error 4602
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4603
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4604
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4605
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4606
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4610
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4612
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**

4614
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4700
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 4701
-------------

**Message**

**User Message**

*(Same as above)*

**Further Information**



5XXX: Application
=================

Error 5010
-------------

**Message**

**User Message**

*(Same as above)*

The specified Directory name is already in use by another Directory and cannot be used to auto-create a Directory for the new Application. Please choose a different Directory name for the auto-created Directory.

Error 5100
-------------

**Message**

**User Message**

*(Same as above)*

The Account Store is unspecified.

Error 5101
-------------

**Message**

**User Message**

*(Same as above)*

The Account Store is disabled.

Error 5102
-------------

**Message**

**User Message**

*(Same as above)*

The Group Store is unspecified.

Error 5103
-------------

**Message**

**User Message**

*(Same as above)*

This Application’s default storage location for new Groups is disabled. New Groups cannot be added to disabled Directories.

Error 5104
-------------

**Message**

**User Message**

*(Same as above)*

The specified Account Store is already mapped to that Application. Please choose another Group or Directory.

Error 5105
-------------
**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5106
-------------

**Message**

**User Message**

*(Same as above)*

The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Accounts.

Error 5108
-------------

**Message**

**User Message**

*(Same as above)*

The specified Group Account store is a read-only mirror of an externally managed Group. It cannot be used to directly store new Accounts.

Error 5110
-------------

**Message**

**User Message**

*(Same as above)*

The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Groups.

Error 5112
-------------

**Message**

**User Message**

*(Same as above)*

Specifying a Group as a defaultGroupStore is not currently supported.

Error 5114
-------------

**Message**

**User Message**

*(Same as above)*

The specified Account Store reference is invalid.

Error 5116
-------------
**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5117
-------------
**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5118
-------------
**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5119
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5120
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5121
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**


Error 5122
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 5200
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



5201
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



6XXX: Directory
===============

Error 6100
-------------

**Message**

**User Message**

*(Same as above)*

This Directory does not allow creation of new Accounts or Groups.

Error 6101
-------------

**Message**

**User Message**

*(Same as above)*

The Account’s Directory is not enabled for the verification email workflow.

Error 6201
-------------

**Message**

**User Message**

*(Same as above)*

This Directory cannot be converted to an external provider Directory.

Error 6202
-------------

**Message**

**User Message**

*(Same as above)*

The Directory cannot be updated to reflect a different identity provider. Please create a new Directory instead.

Error 6203
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



7XXX: Account
=============

Error 7100
-------------

**Message**

**User Message**

*(Same as above)*

Login attempt failed because the specified password is incorrect.

**Further Information**


During a login attempt, Stormpath found an Account from the specified ``username`` or ``email``, but the password was incorrect.

Error 7101
-------------

**Message**

**User Message**

*(Same as above)*

Login attempt failed because the Account is disabled.

During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``DISABLED``. Accounts with the ``DISABLED`` status cannot login.

Error 7102
-------------

**Message**

**User Message**

*(Same as above)*

Login attempt failed because the Account is not verified.

**Further Information**


During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``UNVERIFIED``. Accounts with the ``UNVERIFIED`` status cannot login.

Error 7103
-------------

**Message**

**User Message**

*(Same as above)*

Login attempt failed because the Account is locked.

Error 7104
-------------

**Message**

**User Message**

*(Same as above)*

Login attempt failed because there is no Account in the Application’s associated Account Stores with the specified ``username`` or ``email``.

Error 7105
-------------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 7106
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 7107
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 7200
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath was not able to complete the request to the Social Login site: this can be caused by either a bad Social Directory configuration, or the provided Account credentials are not valid.

Error 7201
-------------
Stormpath is unable to create or update the Account because the Social Login site response did not contain the required property.

**Message**

**User Message**

*(Same as above)*



Error 7202
-------------

**Message**

**User Message**

*(Same as above)*

This property is a read-only property on a externally managed Directory Account, and consequently cannot be modified.

Error 7203
-------------


**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 7301
-------------
**Message**

**User Message**

*(Same as above)*

**Further Information**



9XXX: Agent
===========

Error 9000
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

Error 9001
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach your Directory Server. Please ensure that the Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

Error 9002
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, did not receive a timely response from the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

Error 9003
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory server, did not receive a timely response from the Directory Server. Please ensure that your Directory’s Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

Error 9004
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from the Stormpath Directory Agent. Please ensure you are running the latest stable version of the Stormpath Directory Agent for your Directory Server.

Error 9005
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from your Directory Server. Please ensure that you are using a supported Directory service version and that the Stormpath Directory Agent is configured correctly to communicate with that Directory Server.

Error 9006
-------------

**Message**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Active Directory server, encountered a referral error while communicating with the Active Directory server. Potential solutions are to ensure that your Active Directory server's DNS settings are correctly configured or to log in to the Stormpath UI Console and change your Active Directory server's Stormpath Agent configuration to ‘Ignore Referral Exceptions’.

100XX: OAuth Errors
===================

Error 10010
-------------

**Message**

**User Message**

*(Same as above)*

Token is no longer valid because the Account is not enabled.

**Further Information**


This error can occur when you validate a token for an Account that has been changed to have a status of ``DISABLED``.

Error 10011
-------------

**Message**

**User Message**

*(Same as above)*

Token is no longer valid because it has expired.

**Further Information**


Stormpath tokens have an expiration time that is configurable through the Application’s OAuth Policy. If you try authenticating with an expired token, this error will return.

Error 10012
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because the issued at time (``iat``) is after the current time.

Error 10013
-------------

**Message**

**User Message**

*(Same as above)*

Token does not exist.

**Further Information**

This can occur if the token has been manually deleted, or if the token has expired and been removed by Stormpath.

Error 10014
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because the issuer of the token does not match the Application validating the token.

Error 10015
-------------

**Message**

**User Message**

*(Same as above)*

Token is no longer valid because the Application that issued the token is not enabled.

Error 10016
-------------

**Message**

**User Message**

*(Same as above)*

Token is no longer valid because the Account is not in an Account Store assigned to the Application that issued the token.

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

**User Message**

*(Same as above)*

The SAML Response object is malformed or cannot be used by Stormpath. Please contact us at support@stormpath.com to help troubleshoot this problem.

Error 10101
-------------

**Message**

**User Message**

*(Same as above)*

The SAML Response has an invalid signature and cannot be trusted. Please contact us at support@stormpath.com to help troubleshoot this problem.

Error 10102
-------------

**Message**

**User Message**

*(Same as above)*

Authentication failed at the SAML Identity Provider, please check the SAML Identity Provider logs for more information.

110XX: Token Errors
====================

Error 11001
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization nameKey does not exist in your Stormpath Tenant.

Error 11002
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization is disabled.

Error 11003
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization is not one of the Application’s assigned Account Stores.

Error 11004
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because a required claim value cannot be null or empty.

Error 11005
-------------

**Message**

**User Message**

*(Same as above)*

Token is invalid because a token with the same identifier (jti) has been already used.

120XX: ID Site JWT
==================

Error 12001
-----------

**Message**

**User Message**

*(Same as above)*

**Further Information**



Error 12002
------------

**Message**

**User Message**

*(Same as above)*

**Further Information**



.. _errors:

*********************
Stormpath Error Codes
*********************

110X: Communication
===================

1100
----

**Error Condition**

The specified HTTP request method is not supported.

**User Message**

*(Same as above)*

1101
----

**Error Condition**

Bad request 'Content-Type'. This error will specify what the expected value is.

**User Message**

*(Same as above)*

19XX: Billing / Payment
=======================

1900
------------

**Error Condition**

Subscription upgrade required.

To upgrade your subscription, go to the "My Subscription" section of the Stormpath Admin Console.

**User Message**

*(Same as above)*

1902
-------------

**Error Condition**

Application limit reached. Please add more Applications in the "My Subscription" section of the Stormpath Admin Console.

Your "Available Applications" is your Application limit and the "Active Applications" is the current number of Applications in your Tenant. To be able to create additional ones, delete unused Applications, or update your subscription to include more Applications.

**User Message**

*(Same as above)*

1903
----

**Error Condition**

The specified subscription level is not available for your active subscription plan.

This error normally only occurs with older Stormpath Tenants. Please contact us at support@stormpath.com for assistance.

**User Message**

The specified subscription level is not available.

1904
----

**Error Condition**

In order to change your subscription, you need to add a payment method first.

**User Message**

You cannot modify your subscription because you have not added a payment method.

1905
----

**Error Condition**

You cannot lower the number of Applications for your subscription without first deleting Applications. Please delete the specified number of Applications and then try again.

**User Message**

*(Same as above)*

1906
----

**Error Condition**

You cannot add more than one credit card to your subscription. A credit card already exists for your subscription.

**User Message**

You cannot add more than one credit card to your subscription.

1910
----

**Error Condition**

Cannot send an email with the specified mime type on the developer tier. Modify the email template or upgrade your Stormpath Tenant.

**User Message**

Cannot send an email with the specified mime type on the developer tier. Modify the email template or upgrade your Stormpath Tenant.

2XXX: General Validation
========================

2000
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value is required; it cannot be null, empty, or blank.

For example, you attempted to create an Account without providing a value for the ``email`` property.

2001
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value must be unique.

For example, you attempted to create an Account with the same ``email`` as another Account in the same Directory.

2002
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value is invalid.

This is a generic property invalid error. For example, supplying a fraction of 15/0 – cannot divide by zero. Stormpath only uses this code if a more accurate status code is not available. For example, an email without an ‘@’ should return error code 2006, not 2002.

2003
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value is unsupported. For example, ``enabled`` or ``disabled`` is expected, but the value passed was ``foo``.

2004
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value is an invalid type. For example, specifying a string when a number is required.

2005
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value uses an invalid character encoding.

2006
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value format is invalid.

For example, specifying the “12/15/2012” date format when “2012-12-15” is expected. Some forms of this error will include more specific information.

2007
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value's minimum length is not satisfied.

2008
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value's maximum length is not satisfied.

2009
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property's minimum value is not satisfied.

2010
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property's maximum value is exceeded.

2011
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property's minimum date/time is not satisfied.

2012
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property's maximum date/time is exceeded.

2013
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property's value is not within range.

2014
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified property value is an invalid reference. For example, linking to an object that is not allowed to be linked to. Also known as a ‘constraint violation’.

2015
-------------

**Error Condition**

**User Message**

*(Same as above)*

Unknown property. For example, trying to set a ‘srname’ property instead of ‘surname’.

2016
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property value does not match a known Stormpath resource.

For example, you specified an invalid ``href`` for a resource that does not exist in your Tenant.

2017
-------------

**Error Condition**

**User Message**

*(Same as above)*

2020
----

**Error Condition**

**User Message**

*(Same as above)*

2021
----

**Error Condition**

**User Message**

*(Same as above)*

2022
----

**Error Condition**

**User Message**

*(Same as above)*

2100
-------------

**Error Condition**

**User Message**

*(Same as above)*

Malformed query. One or more query criteria parameters were not specified correctly.

2101
-------------

**Error Condition**

**User Message**

*(Same as above)*

The supplied query parameter must have a corresponding value.

2102
-------------

**Error Condition**

**User Message**

*(Same as above)*

The supplied query parameter may only have a single value and the parameter cannot be specified more than once.

2103
-------------

**Error Condition**

**User Message**

*(Same as above)*

The supplied query parameter value is invalid or an unexpected type.

2104
-------------

**Error Condition**

**User Message**

*(Same as above)*

The ``orderBy`` query parameter value contains an invalid order statement.

2105
-------------

**Error Condition**

**User Message**

*(Same as above)*

Unsupported Query Property: specifying a property not recognized as queryable.

2106
-------------

**Error Condition**

**User Message**

*(Same as above)*

Unsupported Order Property: specifying a property for sort ordering that cannot be sorted.

2107
-------------

**Error Condition**

**User Message**

*(Same as above)*

Unsupported Expand Property: specifying a property for expansion when the property is not expandable.

2108
----

**Error Condition**

**User Message**

*(Same as above)*

3XXX: Custom Data
=================

3000
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property names cannot be null, empty or blank.

3001
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property name is invalid. Property names cannot exceed 255 characters.

3002
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property name is invalid. Property names may contain only alphanumeric characters, underscores, or dashes, but cannot start with a dash.

3003
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property names may not equal any of the following reserved names: ``href``, ``createdAt``, ``modifiedAt``, ``meta``, ``spMeta``, ``spmeta``, ``ionmeta``, or ``ionMeta``.

3004
-------------

**Error Condition**

**User Message**

*(Same as above)*

Property value exceeds maximum size. The value exceeds the maximum storage size limit of 10 MB per customData resource.

400X: Tenant
============

4001
-------------

**Error Condition**

**User Message**

*(Same as above)*

Your Stormpath Tenant owner Account cannot be deleted.

4002
-------------

**Error Condition**

**User Message**

*(Same as above)*

Your Stormpath Tenant owner Account’s status cannot be modified.

4xxx: Organization
==================

4520
----

**Error Condition**

**User Message**

*(Same as above)*


4600
----

**Error Condition**

**User Message**

*(Same as above)*


4601
----

**Error Condition**

**User Message**

*(Same as above)*


4602
----

**Error Condition**

**User Message**

*(Same as above)*


4603
----

**Error Condition**

**User Message**

*(Same as above)*


4604
----

**Error Condition**

**User Message**

*(Same as above)*


4605
----

**Error Condition**

**User Message**

*(Same as above)*


4606
----

**Error Condition**

**User Message**

*(Same as above)*


4610
----

**Error Condition**

**User Message**

*(Same as above)*


4612
----

**Error Condition**

**User Message**

*(Same as above)*


4614
----

**Error Condition**

**User Message**

*(Same as above)*


4700
----

**Error Condition**

**User Message**

*(Same as above)*


4701
----

**Error Condition**

**User Message**

*(Same as above)*


5XXX: Application
=================

**Error Condition**

**User Message**

*(Same as above)*


5010
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Directory name is already in use by another Directory and cannot be used to auto-create a Directory for the new Application. Please choose a different Directory name for the auto-created Directory.

5100
-------------

**Error Condition**

**User Message**

*(Same as above)*

The Account Store is unspecified.

5101
-------------

**Error Condition**

**User Message**

*(Same as above)*

The Account Store is disabled.

5102
-------------

**Error Condition**

**User Message**

*(Same as above)*

The Group Store is unspecified.

5103
-------------

**Error Condition**

**User Message**

*(Same as above)*

This Application’s default storage location for new Groups is disabled. New Groups cannot be added to disabled Directories.

5104
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Account Store is already mapped to that Application. Please choose another Group or Directory.

5105
----

**Error Condition**

**User Message**

*(Same as above)*


5106
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Accounts.

5108
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Group Account store is a read-only mirror of an externally managed Group. It cannot be used to directly store new Accounts.

5110
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Groups.

5112
-------------

**Error Condition**

**User Message**

*(Same as above)*

Specifying a Group as a defaultGroupStore is not currently supported.

5114
-------------

**Error Condition**

**User Message**

*(Same as above)*

The specified Account Store reference is invalid.

5116
----

**Error Condition**

**User Message**

*(Same as above)*


5117
----

**Error Condition**

**User Message**

*(Same as above)*


5118
----

**Error Condition**

**User Message**

*(Same as above)*


5119
----

**Error Condition**

**User Message**

*(Same as above)*


5120
----

**Error Condition**

**User Message**

*(Same as above)*


5121
----

**Error Condition**

**User Message**

*(Same as above)*


5122
----

**Error Condition**

**User Message**

*(Same as above)*


5200
----

**Error Condition**

**User Message**

*(Same as above)*


5201
----

**Error Condition**

**User Message**

*(Same as above)*


6XXX: Directory
===============

**Error Condition**

**User Message**

*(Same as above)*


6100
-------------

**Error Condition**

**User Message**

*(Same as above)*

This Directory does not allow creation of new Accounts or Groups.

6101
-------------

**Error Condition**

**User Message**

*(Same as above)*

The Account’s Directory is not enabled for the verification email workflow.

6201
-------------

**Error Condition**

**User Message**

*(Same as above)*

This Directory cannot be converted to an external provider Directory.

6202
-------------

**Error Condition**

**User Message**

*(Same as above)*

The Directory cannot be updated to reflect a different identity provider. Please create a new Directory instead.

6203
----

**Error Condition**

**User Message**

*(Same as above)*


7XXX: Account
=============

7100
-------------

**Error Condition**

**User Message**

*(Same as above)*

Login attempt failed because the specified password is incorrect.

During a login attempt, Stormpath found an Account from the specified ``username`` or ``email``, but the password was incorrect.

7101
-------------

**Error Condition**

**User Message**

*(Same as above)*

Login attempt failed because the Account is disabled.

During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``DISABLED``. Accounts with the ``DISABLED`` status cannot login.

7102
-------------

**Error Condition**

**User Message**

*(Same as above)*

Login attempt failed because the Account is not verified.

During a login attempt Stormpath found an Account from the specified ``username`` or ``email``, but the Account had a status of ``UNVERIFIED``. Accounts with the ``UNVERIFIED`` status cannot login.

7103
-------------

**Error Condition**

**User Message**

*(Same as above)*

Login attempt failed because the Account is locked.

7104
-------------

**Error Condition**

**User Message**

*(Same as above)*

Login attempt failed because there is no Account in the Application’s associated Account Stores with the specified ``username`` or ``email``.

7105
-------------

**Error Condition**

**User Message**

*(Same as above)*


7106
----

**Error Condition**

**User Message**

*(Same as above)*


7107
----

**Error Condition**

**User Message**

*(Same as above)*


7200
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath was not able to complete the request to the Social Login site: this can be caused by either a bad Social Directory configuration, or the provided Account credentials are not valid.

7201
-------------
Stormpath is unable to create or update the Account because the Social Login site response did not contain the
**Error Condition**

**User Message**

*(Same as above)*

required property.

7202
-------------

**Error Condition**

**User Message**

*(Same as above)*

This property is a read-only property on a externally managed Directory Account, and consequently cannot be modified.

7203
----

**Error Condition**

**User Message**

*(Same as above)*


7301
----

**Error Condition**

**User Message**

*(Same as above)*


9XXX: Agent
===========

9000
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

9001
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach your Directory Server. Please ensure that the Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

9002
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, did not receive a timely response from the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

9003
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory server, did not receive a timely response from the Directory Server. Please ensure that your Directory’s Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

9004
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from the Stormpath Directory Agent. Please ensure you are running the latest stable version of the Stormpath Directory Agent for your Directory Server.

9005
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from your Directory Server. Please ensure that you are using a supported Directory service version and that the Stormpath Directory Agent is configured correctly to communicate with that Directory Server.

9006
-------------

**Error Condition**

**User Message**

*(Same as above)*

Stormpath, while acting as a gateway/proxy to your Active Directory server, encountered a referral error while communicating with the Active Directory server. Potential solutions are to ensure that your Active Directory server's DNS settings are correctly configured or to log in to the Stormpath UI Console and change your Active Directory server's Stormpath Agent configuration to ‘Ignore Referral Exceptions’.

100XX: OAuth Errors
===================

10010
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is no longer valid because the Account is not enabled.

This error can occur when you validate a token for an Account that has been changed to have a status of ``DISABLED``.

10011
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is no longer valid because it has expired.

Stormpath tokens have an expiration time that is configurable through the Application’s OAuth Policy. If you try authenticating with an expired token, this error will return.

10012
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because the issued at time (``iat``) is after the current time.

10013
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token does not exist. This can occur if the token has been manually deleted, or if the token has expired and been removed by Stormpath.

10014
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because the issuer of the token does not match the Application validating the token.

10015
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is no longer valid because the Application that issued the token is not enabled.

10016
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is no longer valid because the Account is not in an Account Store assigned to the Application that issued the token.

10017
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because verifying the signature of a JWT failed.

101XX: SAML Errors
==================

10100
-------------

**Error Condition**

**User Message**

*(Same as above)*

The SAML Response object is malformed or cannot be used by Stormpath. Please contact us at support@stormpath.com to help troubleshoot this problem.

10101
-------------

**Error Condition**

**User Message**

*(Same as above)*

The SAML Response has an invalid signature and cannot be trusted. Please contact us at support@stormpath.com to help troubleshoot this problem.

10102
-------------

**Error Condition**

**User Message**

*(Same as above)*

Authentication failed at the SAML Identity Provider, please check the SAML Identity Provider logs for more information.

110XX: Token Errors
====================

11001
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization nameKey does not exist in your Stormpath Tenant.

11002
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization is disabled.

11003
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because the specified Organization is not one of the Application’s assigned Account Stores.

11004
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because a required claim value cannot be null or empty.

11005
-------------

**Error Condition**

**User Message**

*(Same as above)*

Token is invalid because a token with the same identifier (jti) has been already used.

120XX: ID Site JWT
==================

12001
-----

**Error Condition**

**User Message**

*(Same as above)*


12002
-----

**Error Condition**

**User Message**

*(Same as above)*


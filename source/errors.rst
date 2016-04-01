.. _errors:

*********************
Stormpath Error Codes
*********************

19XX: Billing / Payment
=======================

**1902:** Application limit reached. Please add more Applications in the "My Subscription" section of the Stormpath Admin Console.

2XXX: General Validation
========================

**2000:** The specified property value is required; it cannot be null, empty, or blank.

**2001:** The specified property value must be unique.

**2002:** The specified property value is invalid. This is a generic property invalid error. For example, supplying a fraction of 15/0 – cannot divide by zero. Only use this code if a more accurate status code is not available. For example, an email without an ‘@’ should return error code 2006, not 2002.

**2003:** The specified property value is unsupported. For example, enum ‘enabled’ or ‘disabled’ is expected, but the value passed was ‘foo’.

**2004:** The specified property value is an invalid type. For example, specifying a string when a number is required.

**2005:** The specified property value uses an invalid character encoding.

**2006:** The specified property value format is invalid. For example, specifying the “12/15/2012” date format when “2012-12-15” is expected.

**2007:** The specified property value's minimum length is not satisfied.

**2008:** The specified property value's maximum length is not satisfied.

**2009:** The specified property's minimum value is not satisfied.

**2010:** The specified property's maximum value is exceeded.

**2011:** The specified property's minimum date/time is not satisfied.

**2012:** The specified property's maximum date/time is exceeded.

**2013:** The specified property's value is not within range.

**2014:** The specified property value is an invalid reference. For example, linking to an object that is not allowed to be linked to. Also known as a ‘constraint violation’.

**2015:** Unknown property. For example, trying to set a ‘srname’ property instead of ‘surname’.

**2016:** Property value does not match a known Stormpath resource.

**2100:** Malformed query. One or more query criteria parameters were not specified correctly.

**2101:** The supplied query parameter must have a corresponding value.

**2102:** The supplied query parameter may only have a single value and the parameter cannot be specified more than once.

**2103:** The supplied query parameter value is invalid or an unexpected type.

**2104:** The orderBy query parameter value contains an invalid order statement.

**2105:** Unsupported Query Property: specifying a property not recognized as queryable.

**2106:** Unsupported Order Property: specifying a property for sort ordering that cannot be sorted.

**2107:** Unsupported Expand Property: specifying a property for expansion when the property is not expandable.

3XXX: Custom Data
=================

**3000:** Property names cannot be null, empty or blank.

**3001:** Property name is invalid. Property names cannot exceed 255 characters.

**3002:** Property name is invalid. Property names may contain only alphanumeric characters, underscores, or dashes, but cannot start with a dash.

**3003:** Property names may not equal any of the following reserved names: ‘href’, 'createdAt’, 'modifiedAt’, ‘meta’, ‘spMeta’, ‘spmeta’, ‘ionmeta’, or ‘ionMeta’.

**3004:** Property value exceeds maximum size. The value exceeds the maximum storage size limit of 10 MB per customData resource.

4XXX: Tenant
============

**4001:** Your Stormpath Tenant owner Account cannot be deleted.

**4002:** Your Stormpath Tenant owner Account’s status cannot be modified.

5XXX: Application
=================

**5010:** The specified Directory name is already in use by another Directory and cannot be used to auto-create a Directory for the new Application. Please choose a different Directory name for the auto-created Directory.

**5100:** The Account Store is unspecified.

**5101:** The Account Store is disabled.

**5102:** The Group Store is unspecified.

**5103:** This Application’s default Account Store for new Groups is disabled. New Groups cannot be added to disabled Directories.

**5104:** The specified Account Store is already mapped to that Application. Please choose another Group or Directory.

**5106:** The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Accounts.

**5108:** The specified Group Account store is a read-only mirror of an externally managed Group. It cannot be used to directly store new Accounts.

**5110:** The specified Directory Account Store is a read-only mirror of an externally managed Directory. It cannot be used to directly store new Groups.

**5112:** Specifying a Group as a defaultGroupStore is not currently supported.

**5114:** The specified Account Store reference is invalid.

6XXX: Directory
===============

**6100:** This Directory does not allow creation of new Accounts or Groups.

**6101:** The Account’s Directory is not enabled for the verification email workflow.

**6201:** This Directory cannot be converted to an external provider Directory.

**6202:** The Directory cannot be updated to reflect a different identity provider. Please create a new Directory instead.

7XXX: Account
=============

**7100:** Login attempt failed because the specified password is incorrect.

**7101:** Login attempt failed because the Account is disabled.

**7102:** Login attempt failed because the Account is not verified.

**7103:** Login attempt failed because the Account is locked.

**7104:** Login attempt failed because there is no Account in the Application’s associated Account Stores with the specified username or email.

**7200:** Stormpath was not able to complete the request to the Social Login site: this can be caused by either a bad Social Directory configuration, or the provided Account credentials are not valid.

**7201:** Stormpath is unable to create or update the Account because the Social Login site response did not contain the required property.

**7202:** This property is a read-only property on a externally managed Directory account, it cannot be modified.

9XXX: Agent
===========

**9000:** Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

**9001:** Stormpath, while acting as a gateway/proxy to your Directory service, was not able to reach your Directory Server. Please ensure that the Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

**9002:** Stormpath, while acting as a gateway/proxy to your Directory service, did not receive a timely response from the Stormpath Directory Agent that communicates with your Directory Server. Please ensure that your Directory’s Stormpath Agent is online and successfully communicating with Stormpath.

**9003:** Stormpath, while acting as a gateway/proxy to your Directory server, did not receive a timely response from the Directory Server. Please ensure that your Directory’s Stormpath Agent is configured correctly and successfully communicating with your Directory Server.

**9004:** Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from the Stormpath Directory Agent. Please ensure you are running the latest stable version of the Stormpath Directory Agent for your Directory Server.

**9005:** Stormpath, while acting as a gateway/proxy to your Directory service, received an invalid response from your Directory Server. Please ensure that you are using a supported Directory service version and that the Stormpath Directory Agent is configured correctly to communicate with that Directory Server.

**9006:** Stormpath, while acting as a gateway/proxy to your Active Directory server, encountered a referral error while communicating with the AD server. Potential solutions are to ensure that your AD server's DNS settings are correctly configured or to log in to the Stormpath UI Console and change your AD server's Stormpath Agent configuration to ‘Ignore Referral Exceptions’.

100XX: OAuth Errors
===================

1**0010:** Token is no longer valid because the Account is not enabled.

1**0011:** Token is no longer valid because it has expired.

1**0012:** Token is invalid because the issued at time (iat) is after the current time.

1**0013:** Token does not exist. This can occur if the token has been manually deleted, or if the token has expired and removed by Stormpath.

1**0014:** Token is invalid because the issuer of the token does not match the Application validating the token.

1**0015:** Token is no longer valid because the Application that issued the token is not enabled.

1**0016:** Token is no longer valid because the Account is not in an Account Store assigned to the Application that issued the token.

1**0017:** Token is invalid because verifying the signature of a JWT failed.

101XX: SAML Errors
==================

1**0100:** The SAML Response object is malformed or cannot be used by Stormpath. Please contact us at support@stormpath.com to help troubleshoot this problem.

1**0101:** The SAML Response has an invalid signature and cannot be trusted. Please contact us at support@stormpath.com to help troubleshoot this problem.

1**0102:** Authentication failed at the SAML Identity Provider, please check the SAML Identity Provider logs for more information.

110XX: Token Errors
===================

.. todo::

  I don't see why these are called "Token" errors and not "Organization" errors, since 100xx errors aren't called "Token errors".

1**1001:** Token is invalid because the specified Organization nameKey does not exist in your Stormpath Tenant.

1**1002:** Token is invalid because the specified Organization is disabled.

1**1003:** Token is invalid because the specified Organization is not one of the Application’s assigned Account Stores.

1**1004:** Token is invalid because a required claim value cannot be null or empty.

1**1005:** Token is invalid because a token with the same identifier (jti) has been already used.
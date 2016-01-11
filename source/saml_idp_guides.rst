SAML Set-Up, end-to-end, with the Admin Console

You have a Stormpath Account, Advanced level + an account with an IdP that supports SAML

The documentation stops at the point where they CAN actually authenticate with SAML

Attribute mapping and testing would be separate 

Start in the IdP and gather required information there

Create Directory in Stormpath, gather Service Provider information 

Go back to IDP and enter Service Provider configuration information (entity ID and Signing Cert)

enter configuration information into Directory, Provider, and Application 

----

This guide will show you how to set-up Stormpath to allow your users to login in with a SAML-enabled Identity Provider (IdP). It assumes that you have only two things:

- A Stormpath account with at least an Advanced plan

- A developer Account with one of the following Identity Providers who support SAML:

- Salesforce
- OneLogin
- Okta

.. note::

    These are not the only SAML-enabled Identity Providers that Stormpath supports, but they are the ones that have been tested and verified as working.

This guide will also show you how to set-up login against a private deployment running ADFS with SAML 2.0 support.

---
**Conventions:**

- Clickable navigation items are in **bold**

- Page elements (things to look for on a page) will be in "quotes". So the name of the value on the IdP's settings page, as well as the name of what that value is in the Stormpath API (e.g. "SP-Initiated Redirect Endpoint" and "SSO Login URL"). 
---

Step 1: Gather Information From Your Identity Provider 
======================================================

Salesforce 
----------

.. note::

    A pre-requisite of these steps is that you already have a Connected App created and configured in Salesforce.

Log in to your Salesforce Administrator Account: https://login.salesforce.com/

This will take you to your Salesforce homepage. From here you will need to navigate the Salesforce settings pages in order to gather the following pieces of information:

- X.509 Signing Certificate
- SSO Login URL
- SSO Logout URL
- Request Signature Algorithm

1.1 IdP Signing Certificate 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Back in the left navigation pane, in the **Administer** section, click on **Security Controls** > **Identity Provider**. On this page, click on "Download Certificate". This should download a .crt file with a name starting with ``SelfSignedCert``. 

Open this file in your text editor of choice. Its content should be an x509 certificate starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

1.2 The SSO Login / Logout URLs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the navigation pane on the left, find the **Administer** section, click on **Manage Apps** > **Connected Apps**. On this page, under "SAML Login Information", you will find the "SP-Initiated Redirect Endpoint". It will be a URL ending in ``idp/endpoint/HttpRedirect``. This value will be used for both your "SSO Login URL" and "SSO Logout URL".

1.3 Signature Algorithm
^^^^^^^^^^^^^^^^^^^^^^^

As per `their documentation <https://help.salesforce.com/apex/HTViewHelpDoc?id=security_keys_about.htm>`__, Salesforce uses the SHA-256 signature algorithm for all self-signed certificates.

It is recommended that you stay your Connected App's page, as we will be returning here in Step 3 to add more configuration details.

Step 2: Create Your SAML Directory in Stormpath 
===============================================

Unified
-------

We will now create our SAML Directory in Stormpath, using the values we gathered in the previous step. Then we will use information from this newly-created Directory to configure Stormpath as a Service Provider in the IdP in the next step.

Log in to the Stormpath Admin Console: https://api.stormpath.com

From here, click on the **Directories** tab. On this page, click on **Create Directory**. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialogue.

Next, enter in a name and (optionally) a description, then set the Directory's status.

For both the "SAML SSO Login Url" and "SAML SSO Logout Url" fields, you will enter in the ``HttpRedirect`` URL gathered in step 1.2 above.

For the "SAML X.509 Signing Cert" field, paste in the text content from the Salesforce certificate you downloaded in step 1.1. 

Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

Once all this information is entered, click on "Create Directory". At this point, you will arrive back on the main Directories page. Find and click on your new SAML Directory. 

On this page, you will need the follow information found in the "SAML Identity Provider Configuration" section:

- Entity ID 
- Assertion Consumer Service (ACS) URL
- Service Provider Signing Cert 

Copy the "Entity ID" and "ACS URL" values somewhere temporarily, and download the Certificate. We will now input these values in the Identity Provider.

Step 3: Configure Your Service Provider in Your IdP 
===================================================

IdP-specific 

Step 4: Configure Your Application in Stormpath 
===============================================

General

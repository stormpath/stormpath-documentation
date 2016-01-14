***************
SAML IdP Guides
*************** 

This guide will show you how to set-up Stormpath to allow your users to login in with a SAML-enabled Identity Provider (IdP). It assumes that you have only two things:

- A Stormpath account with at least an Advanced plan

- A developer Account, plus a configured Application, with one of the following Identity Providers who support SAML:

    - Salesforce
    - OneLogin
    - Okta

.. note::

    These are not the only SAML-enabled Identity Providers that Stormpath can integrate with, but they are the ones that have been tested and verified as working.

This guide will also show you how to set-up login against a private deployment running ADFS with SAML 2.0 support.

.. todo::
    
    ---

    **Conventions:**

    - Clickable navigation items are in **bold**

    - Page elements (things to look for on a page) will be in "quotes". So the name of the value on the IdP's settings page, as well as the name of what that value is in the Stormpath API (e.g. "SP-Initiated Redirect Endpoint" and "SSO Login URL"). 

    ---

OneLogin 
========

Step 1: Gather Information From Your Identity Provider 
------------------------------------------------------

You will now have to gather information about your Identity Provider from their settings console. 

#. Log in to your OneLogin Administrator Account: https://app.onelogin.com/. This will take you to your OneLogin Apps page. 

#. From here, click on **Apps** in the top navigation pane, then on **Company Apps**. 

#. Select your App from the list below. 

You will now need to gather the following pieces of information:

- X.509 Signing Certificate
- SSO Login URL
- SSO Logout URL
- Request Signature Algorithm

Click on **SSO** in your App's navigation pane. 

1.1 IdP Signing Certificate 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Under "X.509 Certificate", click on **View Details**. This will take you to the certificate details page. 

#. Copy the contents of the "X.509 Certificate" textbook, starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

1.2. The SSO Login / Logout URLs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Return to the **App** > **SSO** section. On this page there are two different URLS: 

#. Copy the "SAML 2.0 Endpoint (HTTP)", which is the SSO Login URL that Stormpath needs, and
#. Copy the "SLO Endpoint (HTTP)", which is the SSO Logout URL.

1.3. Signature Algorithm
^^^^^^^^^^^^^^^^^^^^^^^^^

OneLogin uses the SHA-256 signature algorithm for all self-signed certificates.

.. note::

    It is recommended that you stay on this page, as we will be returning here in Step 3 to add more configuration details.

Step 2: Create Your SAML Directory in Stormpath 
-----------------------------------------------

We will now create our SAML Directory in Stormpath, using the values we gathered in the previous step. Then we will use information from this newly-created Directory to configure Stormpath as a Service Provider in the IdP in the next step.

2.1. Create Your SAML Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab. 

#. Click on **Create Directory**. 

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status.

#. For "SAML SSO Login Url" paste in the "SAML 2.0 Endpoint (HTTP)" from the OneLogin site.
 
#. For "SAML SSO Logout Url" fields, paste in the "SLO Endpoint (HTTP)" from step 1.2 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate in step 1.1. 

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on "Create Directory". At this point, you will arrive back on the main Directories page. 

2.2. Gather Your SAML Directory Information 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Find and click on your new SAML Directory. 

#. Copy the "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section

.. note::

    You should leave this page open, since you'll be back here in Step 4. 

We will now input this value into the Identity Provider.

Step 3: Configure Your Service Provider in Your IdP 
---------------------------------------------------

#. Back in your App's settings page (found under **Apps** > **Company Apps**), click **Configuration** in the App's navigation pane.

#. Copy your Directory's "Assertion Consumer Service URL" into both the "ACS (Consumer) URL Validator" and "ACS (Consumer) URL" fields.

#. Now click on **Parameters** in the App navigation pane. On this page, you need to ensure that your "Email (SAML NameID)" field has the value "Email", which it should by default.  

Step 4: Configure Your Application in Stormpath 
-----------------------------------------------

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Application, and mapping your SAML Directory to your Application. 

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab. 

#. Select the Application that will be using the SAML Directory. 

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane. 

#. Once you are on your Application's Account Stores page, click "Add Account Store". This will bring up the "Map Account Store" dialog. 

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

Salesforce
========== 

Step 1: Gather Information From Your Identity Provider 
------------------------------------------------------

#. Log in to your Salesforce Administrator Account: https://login.salesforce.com/

This will take you to your Salesforce homepage. From here you will need to navigate the Salesforce settings pages in order to gather the following pieces of information:

- X.509 Signing Certificate
- SSO Login URL
- SSO Logout URL
- Request Signature Algorithm

1.1. IdP Signing Certificate 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Back in the left navigation pane, in the **Administer** section, click on **Security Controls** > **Identity Provider**. 

#. On this page, click on "Download Certificate". This should download a .crt file with a name starting with ``SelfSignedCert``. 

#. Open this file in your text editor of choice. Its content should be an x509 certificate starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

1.2. The SSO Login / Logout URLs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. In the navigation pane on the left, find the **Administer** section, click on **Manage Apps** > **Connected Apps**. 

#. Under "SAML Login Information", copy the "SP-Initiated Redirect Endpoint". It will be a URL ending in ``idp/endpoint/HttpRedirect``. This value will be used for both your "SSO Login URL" and "SSO Logout URL".

.. note::

    It is recommended that you stay on this "Connected App" page, as we will be returning here in Step 3 to add more configuration details.

1.3. Signature Algorithm
^^^^^^^^^^^^^^^^^^^^^^^^^

As per `their documentation <https://help.salesforce.com/apex/HTViewHelpDoc?id=security_keys_about.htm>`__, Salesforce uses the SHA-256 signature algorithm for all self-signed certificates.

Step 2: Create Your SAML Directory in Stormpath 
-----------------------------------------------

We will now create our SAML Directory in Stormpath, using the values we gathered in the previous step. Then we will use information from this newly-created Directory to configure Stormpath as a Service Provider in the IdP in the next step.

2.1. Create Your SAML Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Log in to the Stormpath Admin Console: https://api.stormpath.com

#. Click on the **Directories** tab. 

#. Click on **Create Directory**. 

#. From the "Directory Type" drop-down menu, select "SAML", which will bring up a Directory creation dialog.

#. Next, enter in a name and (optionally) a description, then set the Directory's status.

#. For both the "SAML SSO Login Url" and "SAML SSO Logout Url" fields, you will enter in the URL gathered in step 1.2 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate you downloaded in step 1.1. 

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on "Create Directory". At this point, you will arrive back on the main Directories page. 

2.2. Gather Your SAML Directory Information 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Find and click on your new SAML Directory. 

On this page, you will need the follow information:

- The Directory's "HREF" found at the very top.

- The "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section: 

- The "Service Provider Signing Cert", which will download a .pem file.  

.. note::

    You should leave this page open, since you'll be back here in Step 4. 

We will now input these values into the Identity Provider.

Step 3: Configure Your Service Provider in Your IdP 
---------------------------------------------------

#. Back on your Connected App's page (found under **Administer** > **Connected Apps**), click "Edit". 

We will now enter in the following fields:

- "ACS URL" 
- "Name ID Format"

#. For the "Entity ID", you will need to enter in the Directory "HREF" for your SAML Directory.

#. The "ACS URL" is the "Assertion Consumer Service URL" from the previous step.

#. For "Name ID Format" select the "emailAddress" format.

Step 4: Configure Your Application in Stormpath 
-----------------------------------------------

We will now complete the final steps in the Stormpath Admin Console: adding one or more Callback URIs to the Application, and mapping your SAML Directory to your Application. 

#. Switch back to the `Stormpath Admin Console <https://api.stormpath.com>`__ and go to the **Applications** tab. 

#. Select the Application that will be using the SAML Directory. 

#. On the main "Details" page, you will see "Authorized Callback URIs". You should include here a list of the URLs that your users will be redirected to at the end of the SAML authentication flow.

#. Next click on **Account Stores** in the navigation pane. 

#. Once you are on your Application's Account Stores page, click "Add Account Store". This will bring up the "Map Account Store" dialog. 

#. Ensure that you are in the "Directories" tab and select your SAML Directory from the list.

#. Click **Create Mappings**.

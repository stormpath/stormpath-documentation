***************
SAML IdP Guides
*************** 

This guide will show you how to set-up Stormpath to allow your users to login in with a SAML-enabled Identity Provider (IdP). It assumes that you have only two things:

- A Stormpath account with at least an Advanced plan

- A developer Account with one of the following Identity Providers who support SAML:

    - :ref:`Salesforce <salesforce>`
    - :ref:`OneLogin <onelogin>`
    - :ref:`Okta <okta>`

.. note::

    These are not the only SAML-enabled Identity Providers that Stormpath can integrate with, but they are the ones that have been tested and verified as working.

This guide will also show you how to set-up login against a private deployment running ADFS with SAML 2.0 support.

.. todo::
    
    ---

    **Conventions:**

    - Clickable navigation items are in **bold**

    - Page elements (things to look for on a page) will be in "quotes". So the name of the value on the IdP's settings page, as well as the name of what that value is in the Stormpath API (e.g. "SP-Initiated Redirect Endpoint" and "SSO Login URL"). 

    ---

.. _onelogin:

OneLogin 
========

.. contents::
    :local:
    :depth: 1

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

#. Copy the contents of the "X.509 Certificate" text box, starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

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

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page. 

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

.. _salesforce:

Salesforce
==========

.. contents::
    :local:
    :depth: 1

Step 0: Create Your Salesforce App
----------------------------------

#. In the navigation pane on the left, find the **Create** section, then click on **Apps**.
#. From the "Apps" page, find the "Connected Apps" section and click the **New** button.
#. Enter in you information.
#. Click on **Enable SAML**
#. For the "Entity ID" field enter in "changeme" as a temporary value
#. For the "ACS URL" we will also enter in a temporary value: "http://example.com"
#. Click **Save**


Step 1: Gather Information From Your Identity Provider 
------------------------------------------------------

We will now be on your Connected App's page. We will gather the following pieces of information:

- SSO Login URL
- SSO Logout URL
- X.509 Signing Certificate
- Request Signature Algorithm

1.1. The SSO Login / Logout URLs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Under "SAML Login Information", copy the "SP-Initiated Redirect Endpoint". It will be a URL ending in ``idp/endpoint/HttpRedirect``. This value will be used for both your "SSO Login URL" and "SSO Logout URL" when you are setting up your Stormpath SAML Directory.

1.2. IdP Signing Certificate 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. In the navigation pane on the left, find the **Administer** section, click on **Security Controls** > **Identity Provider**. 

#. On this page, click on "Download Certificate". This should download a .crt file with a name starting with ``SelfSignedCert``. 

#. Open this file in your text editor of choice. Its content should be an x509 certificate starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

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

#. For both the "SAML SSO Login Url" and "SAML SSO Logout Url" fields, you will enter in the URL gathered in step 1.1 above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate you downloaded in step 1.2. 

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page. 

2.2. Gather Your SAML Directory Information 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Find and click on your new SAML Directory. 

On this page, you will need the follow information:

- The Directory's "HREF" found at the very top.

- The "Assertion Consumer Service URL" found in the "SAML Identity Provider Configuration" section: 

.. note::

    You should leave this page open, since you'll be back here in Step 4. 

We will now input these values into the Identity Provider.

Step 3: Configure Your Service Provider in Your IdP 
---------------------------------------------------

#. Back on your Connected App's page (found under **Administer** > **Connected Apps**), click "Edit". 

We will now enter in our Directory information:

#. For the "Entity ID", you will need to enter in the Directory "HREF" for your SAML Directory.

#. The "ACS URL" is the "Assertion Consumer Service URL" from the previous step.

#. For "Name ID Format" select the "emailAddress" format.

#. Click **Save**

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

.. _okta:

Okta 
====

.. contents::
    :local:
    :depth: 1

Step 0: Create Your Okta App
----------------------------

You will now have to gather information about your Identity Provider from their settings console. 

#. Log in to your Okta Administrator Account. From the landing page click on **Admin** to go to your Admin Dashboard. 

#. From here, click on **Add Applications** in the shortcuts on the right. 

#. Click on **Create New App**, which will bring up a "Create a New Application Integration" dialog.

#. Select "SAML 2.0" and click **Create**.     

#. Enter in the information on the "General Settings" page and then click **Next**.

.. note:: 

    For now we will enter dummy data here, and then return later to input the actual values.

#. For both the "Single sign on URL" and "Audience URI", enter in the dummy value "http://example.com/saml/sso/example-okta-com" then click **Next** at the bottom of the page.

#. On the "Feedback" page, select **I'm an Okta customer adding an internal app** and **This is an internal app that we have created**, then select **Finish**. 

You will now arrive at your App's Admin page. 

#. Click on **View Setup Instructions**

Step 1: Gather Information From Your Identity Provider 
------------------------------------------------------

You will now need to gather the required IdP information:

#. Copy the "Identity Provider Single Sign-On URL". This will be the value for both the "SSO Login URL" and "SSO Logout URL" in your Stormpath configuration.

#. Copy the contents of the "X.509 Certificate" text box, starting with the line ``-----BEGIN CERTIFICATE-----`` and ending with ``-----END CERTIFICATE-----``. The contents of this file are your "SAML X.509 Signing Cert". 

#. By default, Okta uses the SHA-256 signature algorithm for all self-signed certificates. Click on the **General** tab in the App navigation pane, and look under "SAML Settings" to confirm that the Signature Algorithm is "RSA_SHA256".

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

#. For "SAML SSO Login Url" paste in the "Identity Provider Single Sign-On URL" from above.
 
#. For "SAML SSO Logout Url" fields, paste in the "Identity Provider Single Sign-On URL" from above.

#. For the "SAML X.509 Signing Cert" field, paste in the text content from the IdP certificate in Step 1. 

#. Finally, select "RSA-SHA256" as the "SAML Request Signature Algorithm".

#. Once all this information is entered, click on **Create Directory**. At this point, you will arrive back on the main Directories page. 

2.2. Gather Your SAML Directory Information 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Find and click on your new SAML Directory.

In the "SAML Identity Provider Configuration" section:
   
#. Copy the "Entity ID" URN.

#. Copy the "Assertion Consumer Service URL". 

.. note::

    You should leave this page open, since you'll be back here in Step 4. 

We will now input these values into the Identity Provider.

Step 3: Configure Your Service Provider in Your IdP 
---------------------------------------------------

#. Back in your App's "General" tab, find the "SAML Settings" section and click **Edit**.

#. From the "General Settings" page click **Next**.   

#. Copy your Directory's "Assertion Consumer Service URL" into the "Single sign on URL" field, replacing the dummy value.

#. Copy the "Entity ID" URN into the "Audience URI (SP Entity ID)", also replacing the dummy value.

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

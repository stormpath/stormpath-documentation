****************
8. Using ID Site
****************

a. What is an ID Site?
======================

Stormpath ID Site is a set of hosted and pre-built user interface screens that take care of common identity functions for your applications — log in, registration, and password reset. ID Site can be accessed via your own custom domain like ``id.mydomain.com`` and shared across multiple applications to create centralized authentication.

The screens and functionality of ID Site are completely customizable. You have full access to the source code of the ID Site screens so you can make simple changes like adding your own logo and changing CSS or more complex changes like adding fields, JavaScript code, screens, removing screens, and even changing how the screens behave.

Why should I use Stormpath ID Site?
-----------------------------------

Building, securing, and maintaining identity screens for your users is time consuming, full of security concerns, and often more complex than many developers estimate. Stormpath ID Site gives you and your development team peace of mind that you will have best in class user security quickly and easily, with very little code — minimizing risk to your project timeline.

Stormpath ID Site fully decouples your identity screens from your applications, making it incredibly easy to provide the same login / registration pages for multiple applications — achieving centralized user management and authentication with a clean and easy user experience.

b. How does ID Site Work?
=========================

To demonstrate how the SDK works, we’ll use an example. Imagine you are building an application for managing Stormtrooper equipment — like awesome helmets and blasters. The application is "Imperial Exchange", available at http://imperialxchange.com/, and it uses Stormpath ID Site for login and registration.

Once ImperialXchange.com is rendered by the browser, login and registration buttons are available for the unauthenticated user. Clicking on these buttons will call your server-side application at specific endpoints. For illustration, the login button will invoke ``/login`` and registration will invoke ``/register``. Your application using the Stormpath SDK will securely redirect the user to the ID Site along with a cryptographically signed JSON Web Token (JWT) that includes information like the Callback URI, the path to a specific ID Site page, and any State you think is important for your application.

On the ID Site, the user will enter their data and complete the appropriate action, like login. ID Site will automatically detect any Workflow or Social Login configurations set in Stormpath and show the appropriate buttons, messaging, and behavior.

After the user has logged-in successfully, they will be redirected back to your application’s Callback URI. For illustration purposes, this could be ``https://imperialxchange.com/idSiteResult``. When the ID Site redirects back to your application, it will pass a secure JWT that represents the account in Stormpath. Using the Stormpath SDK, your application will handle the request to ``/idSiteResult``, validate that the JWT is correct, and return an ``ID Site Account Result``. The ``ID Site Account Result`` will include the Stormpath Account object and additional information, such as any state that was passed by your application or whether or not the Account returned is newly created.

.. image:: http://docs.stormpath.com/images/docs/ID-diagram.png

.. _idsite-set-up:

c. ID Site Set Up
=================

Setting Up Your ID Site
-----------------------

Your ID Site uses a default configuration for testing purposes, but can be fully configured to host customized code or to use your own custom domain.

To set up your ID Site, log into the `Administrator Console <https://api.stormpath.com/>`_ and:

1. Click on the "ID Site" Tab.
2. Add your application URLs that will be allowed to process the callbacks from the ID Site to the "Authorized Redirect URIs" property. These URLs will be hosted by your application and will use the Stormpath SDK to process the security assertions about the user that ID Site sends back.
3. Click the "Update" button at the bottom of the page.
   
Once you configure your ID site, a default subdomain will be created on ``stormpath.io``. The default ID Site URL follows the format of ``tenant-name.id.stormpath.io`` where ``tenant-name`` is the name of your Stormpath Tenant.

.. warning::

	Your ID Site URL can only be accessed via a redirect from a Stormpath-enabled application because ID Site expects a cryptographically signed token with specific data in it. Simply visiting your ID Site URL in a browser will give you an error.

For more advanced configurations, there are additional properties in the ID Site configuration that can help:

- Set a Logo to appear at the top of the default ID Site
- Set a custom domain name (like id.mydomain.com) and SSL certificate to host your ID Site from your domain, securely
- Set a custom GitHub repo to host your ID Site (to host custom code)

Setting Your Own Custom Domain Name and SSL Certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, the address of your ID Site is ``tenant-name.id.stormpath.io``. However, you can change the address to a subdomain of your own website, such as ``id.mysite.com``. The Stormtrooper equipment application’s main website is ``imperialxchange.com``, so the initial address of the ID Site might be something like ``happy-rebel.id.stormpath.io``. You can change the ID Site’s address to a subdomain of your company website, like ``id.trooperxchange.com``. In our example, ImperialXchange.com is actually part of a family of sites owned by the parent company Galactic Gear. Galactic Gear wants single-sign-on across its family of websites, so the ID Site is actually found at ``id.galacticgear.co``.

The workflow for changing the address consists of the following steps:

1. Get a domain name and a subdomain (if you have not already)
2. Configure the subdomain as an alias of your ID Site 
3. Enable the custom domain in Stormpath’s ID Site configuration
4. Input SSL information for Stormpath to host

For more information on each of these steps, read on.

1. Get a Domain Name and a Subdomain
""""""""""""""""""""""""""""""""""""

Purchase and register a domain name with a domain registrar. You can purchase and register a domain name from any domain registrar, including GoDaddy, Yahoo! Domains, 1&1, Netregistry, or Register.com. For instructions, see the Help on the registrar’s website.

Create a subdomain for your domain for your ID Site. See the Help on the registrar’s website for instructions on adding a subdomain. You can call the subdomain “id”, “login” or something similar. Example: "id.galacticgear.com".

2. Make the Subdomain an Alias of your ID Site on Stormpath
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

The next step is to make your subdomain an alias of your ID Site on Stormpath. An alias is simply an alternate address for a website. For example, you can make the addresses “id.galacticgear.com” and “happy-rebel.id.stormpath.io” interchangeable as far as web browsers are concerned.

To make your subdomain an alias of your ID Site website on Stormpath, you must use your domain registrar’s tools and UI. These steps will generally require you to:

- Log in to your domain registrar’s control panel.
- Look for the option to change DNS records.
- Locate or create the CNAME records for your domain.
- Point the CNAME record from your subdomain (ex. “id” or “login”) to your ID Site subdomain (ex. happy-rebel.id.stormpath.io)

.. note::

	It takes time for changes to the DNS system to be implemented. Typically, it can take anywhere from a few hours to a day, depending on your Time To Live (TTL) settings in the registrar’s control panel.


3. Enable the Custom Domain in Stormpath's ID Site Configuration
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

After making your subdomain an alias of your ID Site on Stormpath, you must enable a custom domain in the Stormpath Admin Console. If you omit this step, your subdomain will point to a error page rather than your ID Site.

To set up a custom domain on ID Site, log into the Administrator Console and:

- Click on the "ID Site" Tab
- Click the "Custom" option under "Domain Name".
- Type in the subdomain for your ID Site (ex: id.galacticgear.com)
- Click the "Update" button at the bottom of the page

4. Set up SSL on your ID Site
"""""""""""""""""""""""""""""

Since Stormpath is hosting the ID Site under your custom subdomain, to secure it using SSL you must provide the SSL certificate information to Stormpath. Creating SSL certificates is an involved task which requires working with a certificate authority such as Verisign and includes:

- Generating a certificate request (CSR) with a Distinguished Name (DN) that matches your subdomain (ex. id.galacticgear.com)
- Provide the CSR file to a certificate authority such as Verisign. The certificate authority generates a SSL certificate and gives it to you so that it can be installed on Stormpath’s servers.

Once the SSL certificate is retrieved from the certificate authority, you can log-in to the Administrator Console and configure SSL:

- Click on the ID Site Tab
- Open the zip to retrieve your .pem file if needed.
- Copy the text for the SSL certificate and Private Key to the appropriate text boxes on the ID Site Tab
- Click the Update button at the bottom of the page
- When the ID Site is updated, the SSL information is uploaded to Stormpath and will update your ID Site automatically.

.. _idsite-app-set-up:

Setting up your Application to use ID Site
------------------------------------------

In order to set up your application to use ID Site, you will need to install the Stormpath SDK and register the application in Stormpath. The Stormpath SDK and hosted ID Site will do most of the work for your application, including signing and unpacking secure communication between themselves. With the SDK installed, you will need to implement two steps:

1. Send a User to the ID Site to Login, Register, etc.
2. Consume responses from the ID Site to your Application

1. Send A User to the ID Site to Authenticate/Sign-up 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a user wants to log in to or register for your application, you will need to redirect them to your ID Site. The Stormpath SDK will generate a secure URL for the HTTP redirect on your application’s behalf and include data needed by ID Site.

A typical set of steps in your application are as follows:

1. You render your application with a login button
2. The user clicks the login button which will send a request to your server
3. Your server will use the Stormpath SDK to get the redirection URL for the ID Site
4. Your server responds with an HTTP 302 which redirects the user to the ID Site URL

To build an ID Site URL for redirection, you must ask the Stormpath Application object for an ``ID Site URL Builder``. From the builder, you can set important properties to pass information and make sure the ID Site can call back to your application.

.. todo::

	In the original guide, code examples go here.

The ID Site URL Builder will allow you to configure the URL to include:

- ``Callback URI`` (required) – The callback URI will be called by ID Site when a successful login or registration event occurs. The Callback URI is required for the builder and it must match an Authorized Redirect URI in the Admin Console’s ID Site settings. See the Setting up your ID Site section in this guide.

- ``Path`` (optional) – a relative link to a page in your ID Site. The default ID Site does not require a path and will default to the login page. If you would like to send the user to a specific page in ID site, like the registration page or the forgot password page, you would set that in the Path. If you are using the default ID Site, the URLs are:
  - Registration – ``/#/register``
  - Forgot Password – ``/#/forgot``

- ``State`` (optional) – a string that stores information that your application needs after the user is redirected back to your application. You may need to store information about what page the user was on, or any variables that are important for your application.

2. Consume Responses from the ID Site to Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the user has logged in, created, or verified an account, the ID Site will redirect the user along with a security assertion back to your application. ID Site will use the Callback URI you included when you first redirected the user. The Stormpath SDK will verify the cryptographic signature on the assertion and unpack the user information.

.. todo::

	More code examples here in the original...

The ``AccountResult`` will be able to give your application the ability to understand:

- The Account resource for the successful authentication result
- A boolean that will return ``true`` for a newly created account
- A String of the state that was set when using the ID Site URL Builder

Once the account is retrieved, you can get access to additional account properties that are important to your application, such as Groups or CustomData.

Handling Errors from ID Site
""""""""""""""""""""""""""""

During communication from your application to ID Site, there are specific errors that can occur. These errors will redirect back to your application through the specified callbackUri. Your application has the ability to handle these errors or even send the user back to ID Site.

.. list-table:: 
	:widths: 15 10 20 60
	:header-rows: 1

	* - Error Code
	  - Message
	  - Developer Message
	  - Explanation

	* - ``10011``
	  - "Token is invalid"
	  - "Token is no longer valid because it has expired"
	  - Stormpath uses a token with signed information to take the user from your application to ID Site, if the redirect takes too long, the token will expire. This usually can occur if your user experiencing severe internet connectivity problems.

	* - ``11001``
	  - "Token is invalid"
	  - "Token is invalid because the specified Organization nameKey does not exist in your Stormpath Tenant"
	  - When using ID Site for multitenancy, if you specify an ``organizationNameKey`` for an organization that does not exist, this error will occur.

	* - ``11002``
	  - "Token is invalid"
	  - "Token is invalid because the specified Organization is disabled"
	  - When using ID Site for multitenancy, if you specify an ``organizationNameKey`` for an organization that is disabled, this error will occur. Disabled organizations can not be logged into.

	* - ``11003``
	  - "Token is invalid"
	  - "Token is invalid because the specified organization nameKey is not one of the Application’s assigned Account Stores"
	  - When using ID Site for multitenancy, if you specify an ``organizationNameKey`` for an organization that isn’t an account store for the application, this error will occur.

	* - ``12001``
	  - "The session on ID Site has timed out."
	  - "The session on ID Site has timed out. This can occur if the user stays on ID Site without logging in, registering, or resetting a password."
	  - When your user arrives at ID Site, there is a 5 minute session where they need to take an action (login, register, or reset their password). If they timeout, the next action will redirect to your ``callbackUri`` with this error.

Single-Sign-On For Multiple Applications 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ID Site supports single-sign-on (SSO) for multiple applications. SSO allows your user to log-in to ID Site once, and allows ID Site to send a cryptographically signed JSON Web Token (JWT) to other applications.

The way that SSO works is that ID Site will keep a configurable session for authenticated users. When a user is sent from your application to ID Site, if ID Site can confirm that the session is still valid for the user, they will be automatically redirected to the ``callbackUri``. This ``callbackUri`` can be the originating application or any application supported by a Stormpath SDK.

To enable these applications for SSO, there is some configuration needed in the Admin Console. This includes setting up the Authorized Redirect URIs and configuring session properties.

To set up the Authorized Redirect URIs, log into the Admin Console and:

- Click on the "ID Site" tab
- Add Authorized Redirect URIs for each of your applications you want to use for SSO. This allows Stormpath to only redirect the user to applications that you configured.

When on the ID Site tab, configure the "Session Max Age" and "Session Time to Live" to meet your application’s needs.

- Session Max Age – The maximum time the session is allowed to be valid, regardless on how often the user visits ID Site.
- Session Time to Live – The maximum time that the session is allowed to idle.

.. todo::

	Here, once again, there's more code samples...


Logging-out of ID Site
^^^^^^^^^^^^^^^^^^^^^^

Since ID Site keeps a session for a user if the ``Session Max Age`` and ``Session Idle Time`` are configured, ID Site also gives you the ability to log the user out. This will ultimately remove the session from ID Site.

.. todo::

	Original has code samples here.

Once the user is logged out of ID Site, they are automatically redirected to the ``callbackUri`` which was specified using the ``ID Site URL Builder``. Your application will know that the user logged out because the resulting ``ID Site Account Result`` will contain a status claim of ``LOGOUT``. From here, your application can let the user know they have successfully logged out or show them a homepage.

Using ID Site for Multitenancy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a user wants to log in to your application, you may want to specify an tenant for the user to log in to. Stormpath ID Site is configurable to support multitenancy with Organization resources. An Organization in Stormpath is a resource used to group together Account Stores for an Application and can represent a tenant for your application. These Organization resources can be mapped to your Application as Account Stores.

To imagine how this works, we can go back to our previous example. You are building a trooper application, ImperialXchange.com where you have three different Organizations:

- Stormtroopers
- Snowtroopers
- Sandtroopers

Each of these types of troopers can only access their own Organization. To be able to support this, you create three Organization resources in Stormpath, specifying the ``nameKey`` that matches the subdomain.

Once these Organizations are mapped to your Application as Account Stores, you can use ID Site in a multitenant fashion. Including:

- Specifying the organization, which forces the user to log in to a particular Organization.
- Allowing the user to specify their organization, which gives an additional login form field for the user to fill out while logging in or resetting their password.

Specifying The Organization
"""""""""""""""""""""""""""

In the case where you are using a subdomain to designate the Organization, you can tell ID Site which Organization the user is logging in to. For example, when the user is logging in to the subdomain of ``stormtropper.trooperapp.com``, they would be logging into the Organization with the ``nameKey`` value ``stormtrooper``.

.. todo::

	Code samples here 

Allowing the User to Specify their Organization on ID Site
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

In some cases, you may want your users to specify the organization when they are on ID Site. This will require that your users know their organization name key when logging into ID Site. 

.. todo::

	To achieve this, you need code samples

Using Subdomains
""""""""""""""""

.. todo::

	Almost nothing here but code samples.

Using ID Site to Generate OAuth 2.0 Access Tokens
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
NOT DOCUMENTED - https://stormpath.atlassian.net/wiki/display/AM/ID+Site+OAuth+Access+Token+Grant+Type

Using ID Site as your Password Reset page for your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
NOT DOCUMENTED - 

Customizing ID Site
===================

Your ID Site can be customized to have your own look and feel. Simple customization, like adding a logo, can be done via Stormpath’s Admin Console.

Based on your ID Site requirements, you may need to more extensively customize the ID Site’s look and feel or use the default ID site as a base for enhancements. This section will explain how you can leverage the existing Stormpath ID Site source code to make modifications.

.. note::

	ID Site Customization requires features that are available on Lite Plans and above. More information about pricing can be found `here <https://stormpath.com/pricing/>`_.

Prerequisites
------------- 
Customizing and creating your own ID Site requires that you have already follow the set-up steps described :ref:`earlier in this guide <idsite-set-up>`. Having ID Site set up and working with the default Stormpath ID Site is required to work with this guide.

The other installation prerequisites are:

- `NodeJS <http://nodejs.org/download/>`_
- `Bower <http://bower.io/>`_

Getting Set Up 
--------------

Stormpath hosts the ID Site’s source on `Github <https://github.com/stormpath/idsite-src>`_. This repository is the development environment for the Stormpath-hosted ID Site. You can use this repository to build the same single page application that Stormpath provides, or you can modify it to suit your needs. The single page application uses `AngularJS <https://angularjs.org/>`_ and `Browserify <http://browserify.org/>`_. It is built using `Grunt <http://gruntjs.com/>`_ and `Yeoman <http://yeoman.io/>`_.

The ID Site contains all the HTML, CSS, JavaScript assets, as well as scripts needed to build and maintain your own ID Site. To get started, there are four steps required:

1. Set up a fork of ID Site in Github to clone locally
2. Install dependencies and build the ID Site using Grunt
3. Host the built ID Site on Github
4. Configure Stormpath to use your ID Site
  
Set-up a Fork of ID Site in Github to Clone Locally
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First, it is required to fork Stormpath’s ID Site source git repository. This will allow you to have a fork of the git repository that you can modify when customizing. To fork a Github repository it is required that you have a Github account.

To fork the ID Site source git repository, click here and select the destination for the fork.

Once Github forks the repository, you can clone it locally by running this command from the terminal::

	git clone https://github.com/YOUR_USERNAME/idsite-src/

Install Dependencies and Build the ID Site Using Grunt 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once you have a local clone of a fork of the ID Site source repository, you need to install the dependencies required to build and run the ID Site. To accomplish this, in your terminal:

1. Install grunt if necessary: ``npm install -g grunt-cli``
2. Navigate to the local ``idsite-src`` folder
3. Run: ``npm install``
4. Run: ``bower install``

After installing the dependencies, you can build the site by running::

	grunt build

This will produce a ``dist`` folder with the compiled and minified ID Site.

Host the Built ID Site on GitHub
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the ID Site is built to the ``dist`` folder, it needs to be hosted on Github. This will allow Stormpath to clone and host the ID Site once configured in the Admin Console.

To host the built ID Site on Github:

1. Create a new Github repo by visiting this link: https://github.com/new
 
   - Make sure the git repository is marked as public
   - Once created – note the URL for the git repo (it will end with .git). It will be used in the next couple steps

2. Create a new git repo for the build ID Site

   - Navigate into the ``dist`` folder
   - Run: ``git init`` to initialize the git repository
   - Run: ``git add .`` to add the built files to staging
   - Run: ``git commit`` to commit these to the repository

3. Create a remote for your dist git repo for Github and push your ID Site to Github

   - Run: ``git remote add origin YOUR_GIT_REPO_URL``
   - Run: ``git push -u origin master``

Configure Stormpath to use your ID Site
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the built ID Site is hosted on Github, you can use the Stormpath Administrator Console to point to your git repository.

To update your ID Site configuration to use your fork:

1. Log in to the Stormpath Admin Console

2. Click on the "ID Site" tab

3. Under "Git Repository HTTPS URL"

   - Click the Custom radio button
   - Add your Github repository URL to the textbox. Ex: https://github.com/stormpath/my-custom-id-site.git

4. Scroll to the bottom of the dialog and click Update

Once the configuration is updated, Stormpath will clone your repository and host it on Stormpath infrastructure to provide your ID Site.

.. note::

	Stormpath can also be pointed to a specific branch to use for the ID Site, by default Stormpath uses the master branch. To configure this, update the Git Repository Branch Name property of the ID Site confguration page in the Administrator Console

Once the ID Site configuration is updated, you can view it by visiting a web application that was set up to use ID Site using the :ref:`instructions for setting up an application to use an ID Site <idsite-app-set-up>`.

Building an ID Site with stormpath.js
=====================================

Stormpath provides a library to enable developers to build their own ID Site outside of Stormpath’s default AngularJS ID Site. This is `hosted on Github <https://github.com/stormpath/stormpath.js>`_ with installation and instructions. This is useful for developers that want to Stormpath to host your login and user management screens but require full control of the site or want to leverage another JavaScript framework for building out their site.

Getting a User to ID Site
-------------------------

Handling the Callback to your Application From ID Site
------------------------------------------------------

Logging-out of ID Site with REST 
--------------------------------

Using ID Site Without an SDK
============================
****************
8. Using ID Site
****************

a. What is an ID Site?
======================

Stormpath ID Site is a set of hosted and pre-built user interface screens that take care of common identity functions for your applications — login, registration, and password reset. ID Site can be accessed via your own custom domain like id.mydomain.com and shared across multiple applications to create centralized authentication if needed.

The screens, and even the functionality, of ID site are completely customizable. You have full access to the source code of the ID Site screens so you can make simple changes like adding your own logo and changing CSS or more complex changes like adding fields, adding JavaScript code, adding screens, removing screens, and even changing how the screens behave.

Why should I use Stormpath ID Site?
-----------------------------------

Building, securing, and maintaining identity screens for your users is time consuming, full of security concerns, and often more complex than many developers estimate. Stormpath ID Site gives you and your development team peace of mind that you will have best in class user security quickly and easily, with very little code— minimizing risk to your project timeline.

Stormpath ID Site fully decouples your identity screens from your applications, making it incredibly easy to provide the same login / registration pages for multiple applications — achieving centralized user management and authentication with a clean and easy user experience.

b. How does ID Site Work?
=========================

To demonstrate how the SDK works, we’ll use an example. Imagine you are building a Stormtrooper application for managing Stormtrooper equipment — like awesome helmets and blasters. The application is trooperapp.com and is using Stormpath ID Site for login and registration.

Once trooperapp.com is rendered by the browser, login and registration buttons are available for the unauthenticated user. Clicking on these buttons will call your server-side application at specific endpoints. For illustration, the login button will invoke /login and registration will invoke /register. Your application using the Stormpath SDK will securely redirect the user to the ID Site along with a cryptographically signed JSON Web Token (JWT) that includes information like the Callback URI, Path to a specific ID Site page, and any State you think is important for your application.

On the ID Site, the user will enter their data and complete the appropriate action, like login. ID Site will automatically detect any Workflow or Social Login configurations set in Stormpath and show the appropriate buttons, messaging, and behavior.

After the user has logged in successfully, they will be redirected back to your application’s Callback URI. For illustration purposes, this could be http://trooperapp.com/handle-id-site-redirect. When the ID Site redirects back to your application, it will pass a secure JWT that represents the account in Stormpath. Using the Stormpath SDK, your application will handle the request to /handle-id-site-redirect, validate that the JWT is correct, and return an ID Site Account Result. The ID Site Account Result will include the Stormpath Account object and additional information, such as any state that was passed by your application or if the account returned is newly created.

c. ID Site Set-up
=================

Setting-up Your ID Site
-----------------------

Setting Your Own Custom Domain Name and SSL Certificate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Getting a Domain Name and a Subdomain
"""""""""""""""""""""""""""""""""""""

Making the Subdomain an Alias of your ID Site on Stormpath
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Enabling the Custom Domain in Stormpath's ID Site Configuration 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""



Setting up your Application to use an ID Site
---------------------------------------------

Sending A User to the ID Site to Authenticate/Sign-up 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Consuming Responses from the ID Site to Your Application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handling Errors from ID Site
""""""""""""""""""""""""""""

Single-Sign-On For Multiple Applications 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Logging-out of ID Site
^^^^^^^^^^^^^^^^^^^^^^

Using ID Site for Multitenancy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specifying The Organization
"""""""""""""""""""""""""""

Allowing the User to Specify their Organization on ID Site
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Using Subdomains
""""""""""""""""

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

ID Site Customization requires features that are available on Lite Plans and above. More information about pricing can be found here

Prerequisites
------------- 
Customizing and creating your own ID Site requires that you have already follow the Using Stormpath’s ID Site. Having ID Site set up and working with the default Stormpath ID Site is required to work with this guide.

Installation prerequisites include:

- `NodeJS <http://nodejs.org/download/>`_
- `Bower <http://bower.io/>`_

Getting Set Up 
--------------

Stormpath hosts the ID Site’s source on `Github <https://github.com/stormpath/idsite-src>`_. This repository is the development environment for the Stormpath hosted ID Site. You can use this repository to build the same single page application that Stormpath provides, or you can modify it to suit your needs. The single page application uses `AngularJS <https://angularjs.org/>`_ and `Browserify <http://browserify.org/>`_. It is built using `Grunt <http://gruntjs.com/>`_ and `Yeoman <http://yeoman.io/>`_.

The ID Site contains all HTML, CSS, JavaScript assets, and scripts needed to build and maintain your own ID Site. To get started, there are four steps required:

1. Set up a fork of ID Site in Github to clone locally
2. Install dependencies and build the ID Site using grunt
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
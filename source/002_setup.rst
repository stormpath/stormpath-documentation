.. _set-up:

********************
2. First-Time Set-Up
********************

Now that you've decided that Stormpath is right for you, let's jump right in and get you set-up. 

a. Sign-up for Stormpath
========================

1. First, go to `https://api.stormpath.com/register <https://api.stormpath.com/register>`_ and complete the form.
2. You will receive a confirmation email with an activation link. 
3. Once you click the link, Stormpath will create a Stormpath Account along with a Tenant. Your Tenant name will be a unique pair of two randomly-generated words separated by a hyphen (i.e. "iron-troop"). 

.. note::

	Note your tenant name! You will need this in the future in order to log-in to your Account's Admin Console. 

4. From this screen, re-enter your password and click "Log In" to enter the Admin Console. From here you will be able to perform all of the administrative functions required for your Stormpath Account. Let's start by creating an API key.


b. Create an API Key Pair
===========================

In order to use the Stormpath API, you will need an API key. To get one, follow these steps:

1. On the right side of the Admin Console Dashboard, under "Developer Tools", click the "Create API Key" button.

2. A dialogue box will come up, with additional information about the key. You will now be able to download your key in the form of a ``apiKey.properties`` file. This file contains your Stormpath API Key information, which can be used to authenticate with the Stormpath API.
   
.. note::

	Your API Key should be stored in a secure location. For example, you could place it in a hidden ``stormpath`` directory::

		$ mkdir ~/.stormpath
 		$ mv ~/Downloads/apiKey.properties ~/.stormpath/

 	We also recommend that you change the file’s permissions to prevent access by other users. You can do this by running::

		$ chmod go-rwx ~/.stormpath/apiKey.properties

*{Integration-only section for SDK Installation}*

c. Install Your SDK
===================
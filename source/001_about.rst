******************
1. About Stormpath
******************

In this "About" section, we will discuss some general topics about both Stormpath and the Stormpath REST API. 

What is Stormpath?
==================

Features
========

Who should use Stormpath
========================


The Stormpath Data Model
========================
.. todo::

	Tenants
	Account Stores
	Organizations


This section will give a high-level overview of the Stormpath data model, with more in-depth information available in the [Reference] section.

Entities inside Stormpath are referred to as **resources**. Each Stormpath resource has a unique ``href`` link associated with it, and contains one or more "attributes". For example, an Account resource has an "email" attribute, which contains the value for the email address.

Resources that contain other sources are known as **Collection** resources. These support additional behavior specific to Collections, such as pagination, sort ordering, and searching.

An **Application** resource in Stormpath contains information about any real-world software that communicates with Stormpath via REST APIs.  

The top-level container resource for both Users and Groups is referred to as a **Directory**. Directories can either be hosted inside Stormpath, or can be used to replicate outside user directories, as in the case of Active Directory or Facebook. Security policies, like password strength, are defined on a Directory level. An Application can access multiple Directories, and multiple Applications can also access the same Directory.

Users are modelled inside Stormpath as **Accounts**. Every Account is unique within a Directory, with this uniqueness usually tied to an email address.

**Groups** are collections of Accounts found within a directory. They can be thought of as labels applied to Accounts. 

The relation between every Account and its Group is contained in a **GroupMembership** resource. If you imagine Groups as labels for Accounts, the GroupMembership object contains information about which labels have been applied to which Accounts. 

Stormpath uses the **customData** resource to store custom information. It is a schema-less map object that is automatically created at the same time as, and linked to, another Stormpath resource, such as an Account, Group, or Directory.

For more information about all of these, please see the [Reference section].

REST API Core Concepts
======================

Base URL
^^^^^^^^

All URLs referenced in the API documentation begin with the following base URL::

	https://api.stormpath.com/v1

Resource Format 
^^^^^^^^^^^^^^^
The Stormpath REST API currently only supports JSON resource representations. If you would like other formats supported, please email us at support@stormpath.com to let us know!

Authentication
^^^^^^^^^^^^^^

Every request to the Stormpath REST API must be authenticated with an **API key** over **HTTPS**. HTTP is not supported. If you want to make a REST request to Stormpath, we assume you have already:

- :ref:`Signed up for Stormpath <set-up>`.
- :ref:`Obtained your API key <set-up>`.

When you have an API key, you can choose one of two ways to authenticate with Stormpath:

When you have an API key, you can choose one of two ways to authenticate with Stormpath:

- HTTP Basic authentication
- Digest authentication

Basic Authentication over HTTPS
"""""""""""""""""""""""""""""""

Most clients (including web browsers) show a dialog or prompt for you to provide a username and password for HTTP Basic authentication.

When using an API key with Basic authentication, the API key ID is the username and the API key secret is the password:

**HTTP basic username:** apiKey.id value
**HTTP basic password:** apiKey.secret value

For example, if using curl::

	curl -u $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
	     -H "Accept: application/json" \
	     -L https://api.stormpath.com/v1/tenants/current

Digest Authentication
"""""""""""""""""""""

Stormpath also supports a more secure authentication scheme known as **Digest authentication**. This approach computes a cryptographic digest of the request and sends the digest value along with the request. If the transmitted digest matches what the Stormpath API server computes for the same request, the request is authenticated.

This technique is especially secure because the API key secret is never transmitted outside of the application, making it extremely difficult for anything outside of the application to interfere with a request or see the secret.

We recommend using Digest authentication whenever possible because it is inherently more secure. However, due to its complexity, it might not be feasible for some projects.

All Stormpath SDKs (currently Java, Ruby, PHP, and Python) use this more secure Digest authentication so we recommend that you use the SDKs whenever possible. However, if we do not yet have an SDK for your programming language, you should use basic authentication over HTTPS.

Finally, if you would like to use Stormpath Digest authentication in a programming language that Stormpath does not yet support, you can attempt to port the algorithm to that language. You can try to replicate the algorithm and use Stormpath existing code as examples or the documented algorithm:

- Java: `SAuthc1RequestAuthenticator <https://github.com/stormpath/stormpath-sdk-java/blob/master/impl/src/main/java/com/stormpath/sdk/impl/http/authc/SAuthc1RequestAuthenticator.java>`_ (the **authenticate** method)
- Node: `Sauthc1RequestAuthenticator <https://github.com/stormpath/stormpath-sdk-node/blob/master/lib/authc/Sauthc1RequestAuthenticator.js>`_
- PHP: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-php/blob/master/src/Stormpath/Http/Authc/Sauthc1RequestSigner.php>`_ (the **signRequest** method)
- Python: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-python/blob/master/stormpath/auth.py>`_ (the **call** method)
- Ruby: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-ruby/blob/master/lib/stormpath-sdk/http/authc/sauthc1_signer.rb>`_ (the **sign_request** method)

If you port the algorithm to other languages, please let us know. We are happy to help. Email us at support@stormpath.com and we will help as best as we can.

.. note::

	The Stormpath SAuthc1 digest algorithm is NOT the same as `RFC 2617 <http://www.ietf.org/rfc/rfc2617.txt>`_ HTTP Digest authentication. The Stormpath SAuthc1 digest-based authentication scheme is more secure than standard HTTP Digest authentication.

Creating, Retrieving, Updating, and Deleting Resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath entities have a full set of creation, retrieval, update and deletion (CRUD) actions associated with them. Here we give some information about all of these actions. For a complete description of every resource and the actions that can be performed with it, please see the [Reference section]. 

Creating Resources
""""""""""""""""""

You create a resource by submitting an HTTP **POST** to a resource URI. Any POST body must be represented as **JSON**. Requests that contain body content must specify the HTTP ``Content-Type`` header with a value of ``application/json``.

Responses to your create POST calls will contain: 

- An HTTP Status Code indicating success or failure (possible codes can be found below)
- Any HTTP Headers
- A Response Body, which will contain the created entity resource (if the call succeeded), or a detailed error (if the call failed)

.. _create-error-codes:

**Create POST Response Status Codes:**

.. list-table::
	:widths: 15 60
	:header-rows: 1

	* - Response Code
	  - Description
	    
	* - ``201 CREATED``
	  - The request was successful, we created a new resource, and the response body contains the representation. The ``Location`` header contains the new resource’s canonical URI.

	* - ``400 BAD REQUEST``
	  - The data given in the POST failed validation. Inspect the response body for details.
	  
	* - ``401 UNAUTHORIZED``
	  - Authentication credentials are required to access the resource. All requests must be authenticated.

	* - ``403 FORBIDDEN``
	  - The supplied authentication credentials are not sufficient to access the resource.

	* - ``404 NOT FOUND``
	  - We could not locate the resource based on the specified URI.

	* - ``405 METHOD NOT ALLOWED``
	  - POST is not supported for the resource.

	* - ``409 CONFLICT``
	  - You cannot create or update a resource because another resource already exists or conflicts with one you are submitting.

	* - ``415 UNSUPPORTED MEDIA TYPE``
	  - You did not specify the request ``Content-Type`` header to have a value of ``application/json``. Only ``application/json`` is currently supported.

	* - ``429 TOO MANY REQUESTS``
	  - Your application is sending too many simultaneous requests.

	* - ``500 SERVER ERROR``
	  - We could not create or update the resource. Please try again.

	* - ``503 SERVICE UNAVAILABLE``
	  - We are temporarily unable to service the request. Please wait for a bit and try again.

Retrieving Resources
""""""""""""""""""""

You can retrieve a resource representation by sending a GET. 

Responses to your GET calls will contain: 

- An HTTP Status Code indicating success or failure (possible codes can be found below)
- Any HTTP Headers
- A Response Body, which will contain the requested entity resource (if the call succeeded), or a detailed error (if the call failed)

**GET Response Status Codes:**

.. list-table::
	:widths: 15 60
	:header-rows: 1

	* - Response Code
	  - Description
	    
	* - ``200 OK``
	  - The request was successful and the response body contains the resource requested.
	  
	* - ``302 FOUND``
	  - A common redirect response; you can GET the resource at the URI found in the ``location`` response header.

	* - ``304 NOT MODIFIED``
	  - Your client's cached version of the representation is still up-to-date.

	* - ``400 BAD REQUEST``
	  - The data given in the POST failed validation. Inspect the response body for details.
	  
	* - ``401 UNAUTHORIZED``
	  - Authentication credentials are required to access the resource. All requests must be authenticated.

	* - ``403 FORBIDDEN``
	  - The supplied authentication credentials are not sufficient to access the resource.

	* - ``404 NOT FOUND``
	  - We could not locate the resource based on the specified URI.

	* - ``429 TOO MANY REQUESTS``
	  - Your application is sending too many simultaneous requests.

	* - ``500 SERVER ERROR``
	  - We could not create or update the resource. Please try again.

	* - ``503 SERVICE UNAVAILABLE``
	  - We are temporarily unable to service the request. Please wait for a bit and try again.
	    
Updating Resources
""""""""""""""""""

If you want to update a resource, submit an HTTP POST to the resource's URI. Any POST body must be represented as JSON. You must submit at least one attribute. As with the creation POST calls, requests that contain body content must specify the HTTP ``Content-Type`` header with a value of ``application/json``.

Responses to your update POST calls will contain: 

- An HTTP Status Code indicating success or failure (possible codes can be found below)
- Any HTTP Headers
- A Response Body, which will contain the created entity resource (if the call succeeded), or a detailed error (if the call failed)

**Update POST Response Status Codes:**

.. list-table::
	:widths: 15 60
	:header-rows: 1

	* - Response Code
	  - Description
	    
	* - ``200 OK``
	  - The request was successful and the response body contains the resource requested.

	* - ``400 BAD REQUEST``
	  - The data given in the POST failed validation. Inspect the response body for details.
	  
	* - ``401 UNAUTHORIZED``
	  - Authentication credentials are required to access the resource. All requests must be authenticated.

	* - ``403 FORBIDDEN``
	  - The supplied authentication credentials are not sufficient to access the resource.

	* - ``404 NOT FOUND``
	  - We could not locate the resource based on the specified URI.

	* - ``405 METHOD NOT ALLOWED``
	  - POST is not supported for the resource.

	* - ``409 CONFLICT``
	  - You cannot create or update a resource because another resource already exists or conflicts with one you are submitting.

	* - ``415 UNSUPPORTED MEDIA TYPE``
	  - You did not specify the request ``Content-Type`` header to have a value of ``application/json``. Only ``application/json`` is currently supported.

	* - ``429 TOO MANY REQUESTS``
	  - Your application is sending too many simultaneous requests.

	* - ``500 SERVER ERROR``
	  - We could not create or update the resource. Please try again.

	* - ``503 SERVICE UNAVAILABLE``
	  - We are temporarily unable to service the request. Please wait for a bit and try again.

Deleting Resources
""""""""""""""""""

To delete a resource, make an HTTP DELETE request to the resource URL. Note that not all Stormpath REST API resources support delete.

.. note::

	If your HTTP does not support the DELETE method, you can simulate it by sending a POST request to the resource endpoint with a ``_method=DELETE`` query string parameter::

		curl -X POST -u $API_KEY_ID:$API_KEY_SECRET "https://api.stormpath.com/v1/applications/$APPLICATION_ID?_method=DELETE"

**DELETE Response Status Codes:**

.. list-table::
	:widths: 15 60
	:header-rows: 1

	* - Response Code
	  - Description
	    
	* - ``204 NO CONTENT``
	  - The request was successful; the resource was deleted. The deleted resource will not be returned..
	  
	* - ``401 UNAUTHORIZED``
	  - Authentication credentials are required to access the resource. All requests must be authenticated.

	* - ``403 FORBIDDEN``
	  - The supplied authentication credentials are not sufficient to access the resource.

	* - ``404 NOT FOUND``
	  - We could not locate the resource based on the specified URI.

	* - ``405 METHOD NOT ALLOWED``
	  - DELETE is not supported for the resource.

	* - ``429 TOO MANY REQUESTS``
	  - Your application is sending too many simultaneous requests.

	* - ``500 SERVER ERROR``
	  - We could not create or update the resource. Please try again.

	* - ``503 SERVICE UNAVAILABLE``
	  - We are temporarily unable to service the request. Please wait for a bit and try again.

REST Error Responses
""""""""""""""""""""

REST API responses indicating an error or warning are represented by a proper response HTTP status code (403, 404, etc) along with a response body containing the following information:

.. list-table::
	:widths: 20 10 60
	:header-rows: 1

	* - Attribute
	  - Type
	  - Description
	
	* - ``status``
	  - Number
	  - The corresponding HTTP status code.
	
	* - ``code``
	  - Number
	  - A `Stormpath-specific error code <http://docs.stormpath.com/errors>`_ that can be used to obtain more information.
	
	* - ``message``
	  - String
	  - A simple, easy to understand message that you can show directly to your application's end-user.
	
	* - ``developerMessage``
	  - String
	  - A clear, plain text explanation with technical details that might assist a developer calling the Stormpath API.
	
	* - ``moreInfo``
	  - String
	  - A fully qualified URL that may be accessed to obtain more information about the error.

Links
"""""
REST resources that reference other resources, such as an Account referencing its parent Directory, represent the references as a **Link** object.

A Link is an object nested within an existing resource representation that has, at a minimum, an ``href`` attribute.

The ``href`` attribute is the fully qualified location URL of the linked resource. When encountering a link object, you can use the link ``href`` attribute to interact with that resource as necessary.

**Link Expansion**

When requesting a resource you might want the Stormpath API server to return not only that resource, but also one or more of its linked resources. Link expansion allows you to retrieve related resources in a single request to the server instead of having to issue multiple separate requests.

To expand one or more links, simply add an ``expand`` query parameter with one or more comma-delimited attributes to the resource URI::

	https://api.stormpath.com/v1/accounts/$ACCOUNT_ID?expand=directory,tenant

.. note::

	It is currently only possible to expand a resource’s immediate links but not fruther links inside those links.



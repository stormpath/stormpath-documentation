******************
REST API Reference
******************

This section covers the Core Concepts of the Stormpath REST API, as well as serving as a complete reference for all of the interactions that are possible with the various Stormpath resources. 

.. _rest-concepts:

REST API Core Concepts
======================

The following information is essential to understanding how the Stormpath API functions. You should familiarize yourself with it before moving on to the rest of this guide.

Base URL
--------

All URLs referenced in the API documentation begin with the following base URL::

	https://api.stormpath.com/v1

Resource Format 
---------------
The Stormpath REST API currently only supports JSON resource representations. If you would like other formats supported, please email us at support@stormpath.com to let us know!

Authentication
--------------

Every request to the Stormpath REST API must be authenticated with an **API key** over **HTTPS**. HTTP is not supported. If you want to make a REST request to Stormpath, we assume you have already:

- :ref:`Signed up for Stormpath <set-up>`.
- :ref:`Obtained your API key <set-up>`.

When you have an API key, you can choose one of two ways to authenticate with Stormpath:

When you have an API key, you can choose one of two ways to authenticate with Stormpath:

- HTTP Basic authentication
- Digest authentication

Basic Authentication over HTTPS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most clients (including web browsers) show a dialog or prompt for you to provide a username and password for HTTP Basic authentication.

When using an API key with Basic authentication, the API key ID is the username and the API key secret is the password:

**HTTP basic username:** apiKey.id value
**HTTP basic password:** apiKey.secret value

For example, if using curl::

	curl -u $YOUR_API_KEY_ID:$YOUR_API_KEY_SECRET \
	     -H "Accept: application/json" \
	     -L https://api.stormpath.com/v1/tenants/current

Digest Authentication
^^^^^^^^^^^^^^^^^^^^^

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
------------------------------------------------------

Stormpath entities have a full set of creation, retrieval, update and deletion (CRUD) actions associated with them. Here we give some information about all of these actions. For a complete description of every resource and the actions that can be performed with it, please see the `REST API Product Guide <http://docs.stormpath.com/rest/product-guide/>`. 

Creating Resources
^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^

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
--------------------

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

.. _about-collections:

Collection Resources
--------------------

A **Collection** Resource is a resource containing other resources. It is known as a Collection Resource because it is itself a first class resource – it has its own attributes in addition to the resources it contains.

If you want to interact with multiple resources, you must do so with a Collection Resource. Collection Resources also support additional behavior specific to collections, such as :ref:`pagination <about-pagination>`, :ref:`sorting <about-sorting>`, and :ref:`searching <about-search>`.

.. _about-pagination:

Pagination 
----------

If a Collection Resource represents a large enough number of resource instances, it will not include them all in a single response. Instead a technique known as pagination is used to break up the results into one or more pages of data. You can request additional pages as separate requests.

*Query Parameters*

There are two optional query parameters that may be specified to control pagination:

- ``offset``: The zero-based starting index in the entire collection of the first item to return. Default is 0.
- ``limit``: The maximum number of collection items to return for a single request. Minimum value is 1. Maximum value is 100. Default is 25.

.. _about-sorting:

Sorting
-------

.. _about-search:

Search 
------

.. _about-links:

Links
-----

REST resources that reference other resources, such as an Account referencing its parent Directory, represent the references as a **Link** object.

A Link is an object nested within an existing resource representation that has, at a minimum, an ``href`` attribute.

The ``href`` attribute is the fully qualified location URL of the linked resource. When encountering a link object, you can use the link ``href`` attribute to interact with that resource as necessary.

**Link Expansion**

When requesting a resource you might want the Stormpath API server to return not only that resource, but also one or more of its linked resources. Link expansion allows you to retrieve related resources in a single request to the server instead of having to issue multiple separate requests.

To expand one or more links, simply add an ``expand`` query parameter with one or more comma-delimited attributes to the resource URI::

	https://api.stormpath.com/v1/accounts/$ACCOUNT_ID?expand=directory,tenant

.. note::

	It is currently only possible to expand a resource’s immediate links but not further links inside those links.

.. _ref-tenant:

Tenant
======

**Description**

When you sign up for Stormpath, a private data space is created for you. This space is represented as a Tenant resource in the Stormpath REST API. Your Tenant resource can be thought of as your global starting point. You can access everything in your space by accessing your Tenant resource first and then interacting with its other linked resources (Applications, Directories, etc).

**Tenant URL**

``/v1/tenants/:tenantId``

**Tenant Attributes**

.. list-table::
	:widths: 15 10 20 60
	:header-rows: 1

	* - Attribute
	  - Type
	  - Valid Value(s)
	  - Description
	
	* - ``href`` 
	  - String (Link)
	  - N/A
	  - The resource's fully qualified location URL

	* - ``name`` 
	  - String
	  - 1 < N <= 255 characters
	  - Name of the Tenant, by default this is the same as the key, but can be modified.

	* - ``key`` 
	  - String
	  - 1 < N <= 63 characters, no whitespace, lower-case a-z and dash ‘–’ characters only, cannot start or end with a dash ‘–’ character.
	  - Human-readable unique key. This key is unique and assigned by Stormpath. If you would like to change it, please contact Stormpath.

	* - ``createdAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource was created.
	
	* - ``modifiedAt``
	  - String (ISO-8601 Datetime)
	  - N/A
	  - Indicates when this resource’s attributes were last modified.
	
	* - ``customData``
	  - String (Link) 
	  - N/A
	  - A link to the Tenant's customData resource that you can use to store your own custom fields.

	* - ``organizations`` 
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the Organizations mapped to this Tenant.

	* - ``applications``
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the Applications mapped to this Tenant. 
	    	
	* - ``directories`` 
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the Directories mapped to this Tenant.

	* - ``accounts``
	  - String (Link)
	  - N/A
	  - A link to a Collection of the Accounts mapped to this Tenant.

	* - ``agents`` 
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the Agents configured for this Tenant.

	* - ``groups`` 
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the Groups configured for this Tenant.

	* - ``idSites`` 
	  - String (Link)
	  - N/A
	  - A link to a Collection of all the ID Sites configured for this Tenant.

**Tenant Example**

.. code::

	{
	  "href": "https://api.stormpath.com/v1/tenants/:TenantId",
	  "name": "tenantName",
	  "key": "tenantKey",
	  "createdAt": "dateTime",
	  "modifiedAt": "dateTime",
	  "customData": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/customData"
	  },
	  "organizations": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/organizations"
	  },
	  "applications": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/applications"
	  },
	  "directories": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/directories"
	  },
	  "accounts": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/accounts"
	  },
	  "agents": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/agents"
	  },
	  "groups": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/groups"
	  },
	  "idSites": {
	    "href": "https://api.stormpath.com/v1/tenants/:TenantId/idSites"
	  }
	}

Tenant Operations
-----------------

Get A Tenant
^^^^^^^^^^^^^^^^^^^

When retrieving a Tenant resource, you can either retrieve a Tenant specified by a Tenant ID, or you can simply retrieve the current Tenant.

.. note::

	 You may only retrieve the Tenant corresponding to the API Key that you use.

.. _get-tenantid:

Get A Specified Tenant
""""""""""""""""""""""

If you know your Tenant ID, you can use the following call::

	GET /v1/tenants/:tenantId

**Request Parameters**

*None*

**Example Request & Response**

Request::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R'

Response::

	{
	  "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R",
	  "name": "iron-troop",
	  "key": "iron-troop",
	  "createdAt": "2015-08-18T20:46:35.565Z",
	  "modifiedAt": "2015-08-18T20:46:36.083Z",
	  "customData": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/customData"
	  },
	  "organizations": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/organizations"
	  },
	  "applications": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/applications"
	  },
	  "directories": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/directories"
	  },
	  "accounts": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/accounts"
	  },
	  "agents": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/agents"
	  },
	  "groups": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/groups"
	  },
	  "idSites": {
	    "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/idSites"
	  }
	}

.. _get-current-tenant:

Get The Current Tenant
"""""""""""""""""""""""""""""

If you do not know, or do not want to use, your Tenant ID, you can instead send the following call to retrieve the Tenant associated with the API Key that you are using::

	GET /v1/tenants/current

**Request Parameters**

*None*

**Example Request & Response**

Request::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/tenants/current'

Response:

The response will be a ``302 Redirect`` response. You will find the location of the Tenant in a ``Location`` header::

	Connection → keep-alive
	Content-Length → 0
	Date → Thu, 15 Oct 2015 21:28:04 GMT
	Location → https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R
	Server → Apache
	Set-Cookie → rememberMe=deleteMe; Path=/; Max-Age=0; Expires=Wed, 14-Oct-2015 21:28:05 GMT
	Strict-Transport-Security → max-age=31536000; includeSubDomains; preload 

Most REST libraries and web browsers will automatically issue a request for the resource in the Location header. If you do not see this, just execute a GET request to that ``Location`` (as described :ref:`above <get-tenantid>`) and you will receive back your Tenant resource.

Get Resources Associated With A Tenant
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are many options for using the Tenant to look up other resources. This means that, with an Tenant ID, you can look up something like all of the Groups associated with that Tenant, and you can also use optional parameters to further refine your queries. For more information, keep reading. 

Get A Tenant's Applications
"""""""""""""""""""""""""""

You can retrieve the Application resources associated with a Tenant by going to this endpoint::

	/v1/tenants/:tenantId/applications

List All of a Tenant's Applications
+++++++++++++++++++++++++++++++++++

If you just want a list of all of a Tenant's applications, send this request to the Tenant's ``/applications`` endpoint::

	GET /v1/tenants/:tenantId/applications

**Request Parameters**

:ref:`Pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters are available.

**Example Request & Response**

Request::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:API_KEY_SECRET" -H "Accept: application/json" 'https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/applications'

Response::

	{
	  "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/applications",
	  "offset": 0,
	  "limit": 25,
	  "size": 2,
	  "items": [
	    {
	      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR",
	      "name": "My Application",
	      [...]
	    },
	    {
	      "href": "https://api.stormpath.com/v1/applications/1gDDswrSeoAppLDb3GWzzx",
	      "name": "Stormpath",
	      [...]
	    }
	  ]
	}

Search A Tenant's Applications
+++++++++++++++++++++++++++++++++++

If you would like to search the Applications associated with the Tenant, you can use [search query parameters], and any matching Application resources will be returned as a paginated list::

	GET /v1/tenants/:tenantId/applications?searchParams

**Request Parameters**

In addition to [pagination] and [sorting parameters], the following Application attributes are searchable via filter and attribute searches:

- ``name``
- ``description``
- ``status``

**Example Request & Response**

We could send the following query to find all applications with the string "stormpath" in their ``name`` attribute.

Request::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:API_KEY_SECRET" -H "Accept: application/json" 'https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/applications?name=stormpath&offset=0&limit=5'

Response::

	{
	  "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R/applications",
	  "offset": 0,
	  "limit": 5,
	  "size": 1,
	  "items": [
	    {
	      "href": "https://api.stormpath.com/v1/applications/1gDDswrSeoAppLDb3GWzzx",
	      "name": "Stormpath",
	      [...]
	    }
	  ]
	}

Get A Tenant's Directories
""""""""""""""""""""""""""

(short description)::

	callItself

**Request Parameters**

(params go here)

**Example Request & Response**

Request::

	cURL goes here

Response::

	Response JSON goes here

Get A Tenant's Accounts
"""""""""""""""""""""""

(short description)::

	callItself

**Request Parameters**

(params go here)

**Example Request & Response**

Request::

	cURL goes here

Response::

	Response JSON goes here

Get A Tenant's Groups
""""""""""""""""""""""""""""""""""

(short description)::

	callItself

**Request Parameters**

(params go here)

**Example Request & Response**

Request::

	cURL goes here

Response::

	Response JSON goes here
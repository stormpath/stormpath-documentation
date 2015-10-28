******************
REST API Reference
******************

.. todo::

	Clear up the cURL commands, include line breaks.

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

- Java: `SAuthc1RequestAuthenticator <https://github.com/stormpath/stormpath-sdk-java/blob/master/impl/src/main/java/com/stormpath/sdk/impl/http/authc/SAuthc1RequestAuthenticator.java>`__ (the **authenticate** method)
- Node: `Sauthc1RequestAuthenticator <https://github.com/stormpath/stormpath-sdk-node/blob/master/lib/authc/Sauthc1RequestAuthenticator.js>`__
- PHP: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-php/blob/master/src/Stormpath/Http/Authc/Sauthc1RequestSigner.php>`__ (the **signRequest** method)
- Python: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-python/blob/master/stormpath/auth.py>`__ (the **call** method)
- Ruby: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-ruby/blob/master/lib/stormpath-sdk/http/authc/sauthc1_signer.rb>`__ (the **sign_request** method)

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
^^^^^^^^^^

If a Collection Resource represents a large enough number of resource instances, it will not include them all in a single response. Instead a technique known as pagination is used to break up the results into one or more pages of data. You can request additional pages as separate requests.

*Query Parameters*

There are two optional query parameters that may be specified to control pagination:

- ``offset``: The zero-based starting index in the entire collection of the first item to return. Default is 0.
- ``limit``: The maximum number of collection items to return for a single request. Minimum value is 1. Maximum value is 100. Default is 25.

*Usage*

This following request will retrieve a Tenant’s Applications Collection Resource from the server with page results starting at index 10 (the 11th element), with a maximum of 40 total elements::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/tenants/:tenantId/applications?offset=10&limit=40'

This would result in the following response::

	HTTP/1.1 200 OK

	{
	  "href": "https://api.stormpath.com/v1/tenants/:tenantId/applications?offset=10&limit=40"
	  "offset": 10,
	  "limit": 40,
	  "items" : [
	    [...]
	  ]
	}

.. _about-sorting:

Sorting
^^^^^^^^^^
A request for a Collection Resource can contain an optional ``orderBy`` query parameter. The query parameter value is a URL-encoded comma-delimited list of ordering statements. Each ordering statement identifies a **sortable attribute**, and whether you would like the sorting to be **ascending or descending**.

For example, a sorted request (where %2C is the URL encoding for the comma character) might look like this::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/tenants/:tenantId/applications?offset=10&limit=40'

When URL-decoded, the URL looks like this::

	https://api.stormpath.com/v1/accounts?orderBy=orderStatement1,orderStatement2,...,orderStatementN

Each ``orderStatement`` is defined as follows::

	``sortableAttributeName optionalAscendingOrDescendingStatement``

- ``sortableAttributeName`` is the name of a sortable attribute of a resource in the Collection. Sortable attributes are non-complex and non-link attributes, such as integers and strings.
- ``optionalAscendingOrDescendingStatement`` is composed of the following:
   - a space character (``%20`` when URL encoded) followed by:
   - ``asc`` (ascending) or ``desc`` (descending)
   - If not included, ``asc`` is assumed by default 

So, putting this all together now. If we wanted to sort all Accounts associated with an Application by Surname ascending and given name descending:

- our two ``sortableAttributeName`` parameters are: ``surname`` and ``givenName``
- our ``optionalAscendingOrDescendingStatement`` is ``asc`` for ``surname`` and ``desc`` for ``givenName``

Which would look like this::

	orderBy=surname,givenName desc

Properly URL encoded it would look like this::

	https://api.stormpath.com/v1/applications/someRandomId/accounts?orderBy=surname%20asc%2CgivenName%20desc

.. note::

	Since ``asc`` is the default, we could actually omit it::

		?orderBy=surname%2CgivenName%20desc

.. _about-search:

Search 
^^^^^^^^^^

Search in the contest of the Stormpath REST API means retrieving only the members of a Collection that match a specific query. You search by sending a GET for a Collection, along with query parameters, and Stormpath returns only the resources from the Collection that match your parameters. 

There are currently three different types of searches that might be performed: 

#. A generic :ref:`filter-based search <search-filter>`.
#. A more targeted :ref:`attribute-based search <search-attribute>`. 
#. An even more targeted kind of attribute search, the :ref:`Datetime <search-datetime>` search.

The primary difference between the first two is that the **filter search** matches across all attributes, while **attribute search** looks only for matches in a specified attribute. The **Datetime search** is a kind of attribute search which is used to find resources based on the time they were created or modified. All three options support result :ref:`sorting <about-sorting>`, :ref:`pagination<about-pagination>`, and :ref:`link expansion <about-links>`.

.. _search-filter:

Filter Search
"""""""""""""

A filter search consists of specifying a query parameter ``q`` and a corresponding search value on a Collection Resource URL::

	/v1/someCollection?q=some+criteria

For example, to search across an Application’s Accounts for any Account that has a :ref:`searchable attribute <searchable-attributes>` containing the text "Joe"::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/applications/someAppId/accounts?q=Joe'

Matching Logic
++++++++++++++

A resource will return for a filter search when the following criteria are met:

Stormpath will perform a case-insensitive matching query on all viewable attributes in all the resources in the Collection. Note that "viewable" means that the attribute can be viewed by the current caller.

So the following query::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/accounts?q=Joe'

Returns all Accounts where:

- Each Account is owned by the caller’s Tenant AND
- The Account's ``givenName`` equals or contains "joe" (case insensitive) OR
- The Account's ``middlename`` equals or contains "joe" (case insensitive) OR
- The Account's ``email`` equals or contains "joe" (case insensitive) OR
- And so on. For more information about which Account attributes are searchable, please see [here]

It may help to think about each attribute comparison as similar to a ‘like’ operation in a traditional relational database context. For example, if SQL was used to execute the query, it might look like this::

	select * from my_tenant_accounts where
	    (lower(givenName) like '%joe%' OR
	     lower(surname) like '%joe%' OR
	     lower(email) like '%joe%' OR ... );

.. _search-attribute:

Attribute Search
""""""""""""""""

In the above example, our query returned all Accounts that had any searchable attribute with the query in it. It is also possible to tell Stormpath to only return matches from a particular attribute::

	/v1/someCollection?anAttribute=someValue&anotherAttribute=anotherValue

For example, to search an Application’s Accounts for an Account with a ``givenName`` of ``Joe``::

	/v1/applications/someAppId/accounts?givenName=Joe

.. _searchable-attributes:

Searchable Attributes 
+++++++++++++++++++++

The following attributes can be filtered by and searched for:

.. list-table::
	:widths: 15 30
	:header-rows: 1

	* - Resource 
	  - Searchable Attributes 

	* - Application 
	  - ``name``, ``description``, ``status``, ``createdAt``, ``modifiedAt``

	* - Directory 
	  - ``name``, ``description``, ``status``, ``createdAt``, ``modifiedAt``

	* - Account 
	  - ``givenName``, ``middleName``, ``surname``, ``username``, ``email``, ``createdAt``, ``modifiedAt`` 

	* - Group 
	  - ``name``, ``description``, ``status``, ``createdAt``, ``modifiedAt``

	* - Organization 
	  - ``name``, ``nameKey``, ``status``, ``description``, ``createdAt``, ``modifiedAt``	

Matching Logic
++++++++++++++

Attribute-based queries use standard URI query parameters and function as follows:

- Each query parameter name is the same name of a :ref:`searchable attribute <searchable-attributes>` on an instance in the Collection Resource.

- A query parameter value triggers one of four types of matching criteria:
   
   #. No asterisk at the beginning or end of the value indicates a direct case-insensitive match.
   #. An asterisk only at the beginning of the value indicates that the case-insensitive value is at the end.
   #. An asterisk only at the end of the value indicates that the case-insensitive value is at the beginning.
   #. An asterisk at the end AND at the beginning of the value indicates the value is contained in the string.

So the following query::

	curl -X GET -H "Authorization: Basic $API_KEY_ID:$API_KEY_SECRET" -H "Accept: application/json" -H 'https://api.stormpath.com/v1/accounts?givenName=Joe&middleName=*aul&surname=*mit*&email=joePaul*&status=disabled'

Returns all accounts where:

- Each Account is owned by the caller Tenant.
- The Account's ``givenName`` is equal to "Joe" (case insensitive) AND
- The Account's ``middleName`` ends with "aul" (case insensitive) AND
- The Account's ``surname`` equals or contains "mit" (case insensitive) AND
- The Account's ``email`` starts with with "joePaul" (case insensitive) AND
- The Account's ``status`` equals "disabled" (case insensitive).

.. note::

	For resources with a ``status`` attribute, status query values must be the exact value. For example, ``enabled`` or ``disabled`` must be passed, while fragments such as ``ena``, ``dis``, ``bled`` are not acceptable.

.. _search-datetime:

Datetime Search 
"""""""""""""""

The Datetime search is a sub-type of the attribute search that allows you to filter or search collections that were created or modified at a particular time. 

Stormpath exposes attributes on all resources that will give you information about when the resource was created or modified. For example, an Account resource will have the ``createdAt`` and ``modifiedAt`` attributes::

	{
	  "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
	  [...]
	  "createdAt": "2015-08-25T19:57:05.976Z",
	  "modifiedAt": "2015-08-25T19:57:05.976Z",
	  "emailVerificationToken": null,
	  "customData": {
	    "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/customData"
	  },
	  [...]
	}

Stormpath stores the datetime in `ISO 8601 <http://www.w3.org/TR/NOTE-datetime>`__ which is human readable and has common support across all languages. The timezone is coordinated universal time (UTC). So a datetime range would look like this::

	[ISO-8601-BEGIN-DATETIME, ISO-8601-END-DATETIME

.. note::

	Omitting the beginning or ending date is valid for requests. Omitting the begin datetime range [,ISO-8601-END-DATETIME] would include all resources created or modified before the end datetime. Omitting the end datetime range [ISO-8601-BEGIN-DATETIME,] would include all resources created or modified after the the begin datetime.

As an example, if you want wanted to get all Accounts created between January 12, 2015 and January 14, 2015 your query would look like this::

	/v1/applications/MYNK0ruvbKziwc/accounts?createdAt=[2015-01-12, 2015-01-14]

The response would be a Collection of Accounts created between the two days. 

Exclusion vs Inclusion
++++++++++++++++++++++

The square brackets [] denote **inclusion**, but ``createdAt`` and ``modifiedAt`` also support **exclusion** with parentheses (). For example, if you wanted to get all accounts created between Jan 12, 2015 and Jan 14, 2015 not including the 14th, your request would look like this::

	v1/applications/MYNK0ruvbKziwc/accounts?createdAt=[2015-01-12, 2015-01-14)

Precision
+++++++++

The precision of your query is controlled by the granularity of the `ISO 8601 <http://www.w3.org/TR/NOTE-datetime>`__ Datetime that you specify. 

For example, if you need precision in seconds::

	?createdAt=[2015-01-12T12:00:00, 2015-01-12T12:00:05]

And, if you need precision in years::

	?createdAt=[2014, 2015]

Shorthand
+++++++++

It is also possible to use shorthand with ranges of ``createdAt`` and ``modifiedAt`` to simplify the query parameter. This is useful for queries where the range can be encapsulated in a particular year, month, day, hour, minute or second.

For example if you wanted all accounts created in Jan 2015, instead of::

	?createdAt=[2015-01-01T00:00:00.000Z,2015-02-01T00:00:00.000)

You could just write::

	?createdAt=2015-01

And if you want all Accounts modified on the 12th hour UTC on Feb 03, 2015, instead of this query::

	?modifiedAt=[2015-02-03T12:00:00.000Z, 2015-02-04T13:00:00.000)

You can simply write::

	?modifiedAt=2015-02-03T12

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

.. contents::
	:local:
	:depth: 2

Get A Tenant
^^^^^^^^^^^^^^^^^^^

When retrieving a Tenant resource, you can either retrieve a Tenant specified by a Tenant ID, or you can simply retrieve the current Tenant.

.. note::

	 You may only retrieve the Tenant corresponding to the API Key that you use.

.. _get-tenantid:

Get A Specified Tenant
""""""""""""""""""""""

If you know your Tenant ID, you can use the following call::

	GET https://api.stormpath.com/v1/tenants/:tenantId

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

	GET https://api.stormpath.com/v1/tenants/current

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

	GET https://api.stormpath.com/v1/tenants/:tenantId/applications

**Request Parameters**

:ref:`Pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters are available.

Search A Tenant's Applications
+++++++++++++++++++++++++++++++++++

If you would like to search the Applications associated with the Tenant, you can use :ref:`search query parameters <about-search>`, and any matching Application resources will be returned as a :ref:`paginated <about-pagination>` list::

	GET https://api.stormpath.com/v1/tenants/:tenantId/applications?searchParams

**Request Parameters**

In addition to :ref:`pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters, you can also find a list of the searchable attributes for an Application resource :ref:`here <searchable-attributes>`.

Get A Tenant's Directories
""""""""""""""""""""""""""

You can retrieve the Directory resources associated with a Tenant by going to this endpoint::

	/v1/tenants/:tenantId/directories 

List A Tenant's Directories
+++++++++++++++++++++++++++

You can list your Tenant’s Directories by sending a GET request to your Tenant’s Directories Collection resource ``href``::

	GET https://api.stormpath.com/v1/tenants/:tenantId/directories

**Request Parameters**

:ref:`Pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters are available.

Search A Tenant's Directories
+++++++++++++++++++++++++++++

Instead of just retrieving a list of the Directories, it is also possible to search within the Collection and retrieve only the Directories that match your query::

	GET https://api.stormpath.com/v1/tenants/:tenantId/directories?q=queryText

**Request Parameters**

In addition to :ref:`pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters, you can also find a list of the searchable attributes for a Directory resource :ref:`here <searchable-attributes>`.

Get A Tenant's Accounts
"""""""""""""""""""""""

You can retrieve the Account resources associated with a Tenant by going to this endpoint::

	/v1/tenants/:tenantId/accounts  

List A Tenant's Accounts 
++++++++++++++++++++++++

You can list your Tenant’s Accounts by sending a GET request to your Tenant’s Accounts Collection resource ``href``::

	GET https://api.stormpath.com/v1/tenants/:tenantId/accounts

**Request Parameters**

:ref:`Pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters are available.

Search A Tenant's Accounts 
++++++++++++++++++++++++++

Instead of just retrieving a list of the Accounts, it is also possible to search within the Collection and retrieve only the Accounts that match your query::

	GET https://api.stormpath.com/v1/tenants/:tenantId/accounts?q=queryText

**Request Parameters**

In addition to :ref:`pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters, you can also find a list of the searchable attributes for an Account resource :ref:`here <searchable-attributes>`.

Get A Tenant's Groups
""""""""""""""""""""""""""""""""""

You can retrieve the Group resources associated with a Tenant by going to this endpoint::

	/v1/tenants/:tenantId/groups  

List A Tenant's Groups 
++++++++++++++++++++++++

You can list your Tenant’s Groups by sending a GET request to your Tenant’s Groups Collection resource ``href``::

	GET https://api.stormpath.com/v1/tenants/:tenantId/groups

**Request Parameters**

:ref:`Pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters are available.

Search A Tenant's Groups 
++++++++++++++++++++++++++

Instead of just retrieving a list of the Groups, it is also possible to search within the Collection and retrieve only the Groups that match your query::

	GET https://api.stormpath.com/v1/tenants/:tenantId/groups?q=queryText

**Request Parameters**

In addition to :ref:`pagination <about-pagination>` and :ref:`sorting <about-sorting>` parameters, you can also find a list of the searchable attributes for a Group resource :ref:`here <searchable-attributes>`.
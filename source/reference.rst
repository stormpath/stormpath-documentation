******************
REST API Reference
******************

This section covers the Core Concepts of the Stormpath REST API, as well as serving as a complete reference for all of the interactions that are possible with the various Stormpath resources. 

.. _rest-concepts:

REST API Core Concepts
======================

.. contents::
    :local:
    :depth: 2

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

For example, if using curl:

  .. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/current"

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

      "https://api.stormpath.com/v1/applications/$APPLICATION_ID?_method=DELETE"


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

This following request will retrieve a Tenant’s Applications Collection Resource from the server with page results starting at index 10 (the 11th element), with a maximum of 40 total elements:

  .. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/:tenantId/applications?offset=10&limit=40"

This would result in the following response:

  .. code-block:: json

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

For example, a sorted request (where %2C is the URL encoding for the comma character) might look like this:

  .. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/:tenantId/applications?offset=10&limit=40"

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

For example, to search across an Application’s Accounts for any Account that has a :ref:`searchable attribute <searchable-attributes>` containing the text "Joe":
    
    .. code-block:: bash

      curl --request GET \
      --user $API_KEY_ID:$API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/applications/someAppId/accounts?q=Joe"

Matching Logic
++++++++++++++

A resource will return for a filter search when the following criteria are met:

Stormpath will perform a case-insensitive matching query on all viewable attributes in all the resources in the Collection. Note that "viewable" means that the attribute can be viewed by the current caller.

So the following query:
  
  .. code-block:: bash

      curl --request GET \
      --user $API_KEY_ID:$API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/accounts?q=Joe"

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

So the following query:

  .. code-block:: bash

      curl --request GET \
      --user $API_KEY_ID:$API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/accounts?givenName=Joe&middleName=*aul&surname=*mit*&email=joePaul*&status=disabled"

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

**Paginating Expanded Collections**

If you choose to expand one or more Collections, you can provide :ref:`pagination <about-pagination>` parameters as well. The ``offset`` and ``limit`` values are enclosed in parentheses and delimited by the colon ``:`` character. For example::

    https://api.stormpath.com/v1/accounts/$ACCOUNT_ID?expand=groups(offset:0,limit:10)

.. _ref-tenant:

Tenant
======

.. contents::
    :local:
    :depth: 2

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
      - String (:ref:`Link <about-links>`)
      - N/A
      - The resource's fully qualified location URL

    * - ``name`` 
      - String
      - 1 < N <= 255 characters
      - Name of the Tenant, by default this is the same as the key, but can be modified.

    * - ``key`` 
      - String
      - 1 < N <= 63 characters
      - Human-readable unique key. This key is unique and assigned by Stormpath. If you would like to change it, please contact Stormpath. The key must have: no whitespace, lower-case a-z and dash ‘–’ characters only, and it cannot start or end with a dash ‘–’ character.

    * - ``createdAt``
      - String 
      - ISO-8601 Datetime
      - Indicates when this resource was created.
    
    * - ``modifiedAt``
      - String 
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.
    
    * - ``customData``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to the Tenant's customData resource that you can use to store your own custom fields.

    * - ``organizations`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Organizations mapped to this Tenant.

    * - ``applications``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Applications mapped to this Tenant. 
            
    * - ``directories`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Directories mapped to this Tenant.

    * - ``accounts``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of the Accounts mapped to this Tenant.

    * - ``agents`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Agents configured for this Tenant.

    * - ``groups`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Groups configured for this Tenant.

    * - ``idSites`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the ID Sites configured for this Tenant.

**Tenant Example**

.. code-block:: json 

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

Retrieve A Tenant 
^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/tenants/current
      - N/A
      - Retrieves the Tenant associated with the current API key. The response will be a ``302 Redirect``. You will find the location of the Tenant in a Location header, although most REST libraries and web browsers will automatically issue a request for it.
        
    * - GET /v1/tenants/$TENANT_ID
      - N/A 
      - Retrieves the Tenant with the specified ID.
    
Retrieve Resources Associated With A Tenant 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, independent, resources using the Tenant for look-up. 

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/tenants/$TENANT_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a collection of all of a Tenant's associated resources of the specified type. Possible resource types are: ``customData``, ``organizations``, ``applications``, ``directories``, ``accounts``, ``agents``, ``groups``, and ``idsites``. 
        
    * - GET /v1/tenants/$TENANT_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`  
      - Searches a collection of all of the Tenant's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with a Tenant are: ``customData``, ``organizations``, ``applications``, ``directories``, ``accounts``, ``agents``, ``groups``, and ``idsites``. 

Example Queries
"""""""""""""""

**Retrieving a Collection Associated with a Tenant**

.. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --url "https://api.stormpath.com/v1/tenants/$TENANT_ID"
    

This query would retrieve a collection containing all the Accounts associated with the specified Tenant.

**Searching a Collection Associated with a Tenant**

.. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --url "https://api.stormpath.com/v1/tenants/$TENANT_ID/applications?q=foo&orderBy=name&offset=0&limit=50"

This query would retrieve a collection containing the Applications associated with this Tenant that have the string "foo" as the value of any :ref:`searchable attribute <searchable-attributes>`.

The result body would:
  
  - be :ref:`sorted <about-sorting>` by the ``name`` attribute
  
  - have a :ref:`pagination <about-pagination>` offset of 0 and 
  
  - a limit of 50 results per response

.. _ref-application:

Application
=============

.. contents::
    :local:
    :depth: 2

**Description**

.. todo::

    Lots of opportunities for hyperlinking here.

An **Application** resource in Stormpath contains information about any real-world software that communicates with Stormpath via REST APIs. You control who may log in to an application by assigning (or ‘mapping’) one or more Directory, Group, or Organization resources (generically called Account Stores) to an Application resource. The Accounts in these associated Account Stores collectively form the application’s user base.

**Application URL**

``/v1/applications/$APPLICATION_ID`` 

**Application Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description
    
    * - ``href`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - The resource's fully qualified location URL

    * - ``name`` 
      - String
      - 1 < N <= 255 characters
      - Name of the Application. Must be unique across all Applications within a Tenant.

    * - ``description`` 
      - String  
      - 0 <= N <= 4000 chars
      - A description of the application that this resource represents.

    * - ``status`` 
      - String (Enum)
      - ``enabled`` (Default) ``disabled``
      - ``enabled`` applications allow mapped Accounts to log in. ``disabled`` Applications prevent mapped Accounts from logging in.

    * - ``createdAt``
      - String 
      - ISO-8601 Datetime
      - Indicates when this resource was created.
    
    * - ``modifiedAt``
      - String 
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

    * - ``tenant`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to the Tenant that owns this Application.

    * - ``defaultAccountStoreMapping`` 
      - String (:ref:`Link <about-links>`)
      - Could be ``null``
      - A link to the Account Store Mapping that reflects the default Account Store where the application will store newly created Accounts. A ``null`` value disables the application from directly creating new Accounts.

    * - ``defaultGroupStoreMapping`` 
      - String (:ref:`Link <about-links>`)
      - Could be ``null``
      - A link to the Account Store Mapping that reflects the default Group Store where the application will store newly created Groups. A ``null`` value disables the application from directly creating new Groups.

    * - ``customData``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to the Tenant's customData resource that you can use to store your own custom fields.

    * - ``oAuthPolicy`` 
      - String (:ref:`Link <about-links>`)
      - 
      - A link to this Application OAuth policy. For more information, see :ref:`token-authn-config`.

    * - ``accounts``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Accounts mapped to this Application.

    * - ``groups`` 
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to a Collection of all the Groups mapped to this Application.

    * - ``accountStoreMappings``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to the collection of all Account Store Mappings for this Application.

    * - ``loginAttempts``
      - String (:ref:`Link <about-links>`)
      - N/A
      - The endpoint for :ref:`Login Attempts <ref-loginattempts>` for this Application..

    * - ``passwordResetTokens``
      - String (:ref:`Link <about-links>`)
      - N/A
      - The endpoint for Password Reset Tokens, used in :ref:`password reset workflows <password-reset-flow>`.

    * - ``apiKeys``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A collection of API Keys for this Application. 
    
    * - ``verificationEmails``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A link to the collection of Verification Emails for this Application.

    * - ``authTokens``
      - String (:ref:`Link <about-links>`)
      - N/A
      - A collection of Auth Tokens for this Application. For more information, see :ref:`about-token-validation`. 

**Application Example**

.. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR",
      "name": "My Application",
      "description": "This application was automatically created for you in Stormpath for use with our Quickstart guides(https://docs.stormpath.com). It does apply to your subscription's number of reserved applications and can be renamed or reused for your own purposes.",
      "status": "ENABLED",
      "createdAt": "2015-08-18T20:46:36.061Z",
      "modifiedAt": "2015-08-25T18:11:29.774Z",
      "tenant": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
      },
      "defaultAccountStoreMapping": {
        "href": "https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp"
      },
      "defaultGroupStoreMapping": {
        "href": "https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp"
      },
      "customData": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/customData"
      },
      "oAuthPolicy": {
        "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdlBVa6tfR"
      },
      "accounts": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/accounts"
      },
      "groups": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/groups"
      },
      "accountStoreMappings": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/accountStoreMappings"
      },
      "loginAttempts": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/loginAttempts"
      },
      "passwordResetTokens": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/passwordResetTokens"
      },
      "apiKeys": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/apiKeys"
      },
      "verificationEmails": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/verificationEmails"
      },
      "authTokens": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/authTokens"
      }  
    }

Application Operations
-----------------------

.. contents:: 
    :local:
    :depth: 1

Create An Application 
^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/applications
      - Required: ``name``; Optional: ``description``, ``status``
      - ``createDirectory``: either ``true`` or a specified "Directory Name"
      - Creates a new Application resource. If ``createDirectory`` is set to ``true``, a new Directory will be automatically created along with the Application. The generated Directory's ``name`` will reflect the new Application’s ``name`` as best as is possible, guaranteeing that it is unique compared to any of your existing Directories. If you would like a different ``name``, simply put value you would like instead of ``true``.

.. note::

    If the Directory name you choose is already in use by another of your existing Directories, the request will fail.


Retrieve an Application  
^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/applications/$APPLICATION_ID
      - ``expand`` 
      - Retrieves the specified Application resource. ``tenant``, ``accounts``, and ``groups`` can all be expanded. More info :ref:`above <about-links>`.
        
Update an Application 
^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/applications/$APPLICATION_ID
      - ``name``, ``description``, ``status``
      - Updates the specified attributes with the values provided.

Delete an Application 
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/applications/$APPLICATION_ID
      - N/A
      - Deletes the specified Application.

Deleting an application completely erases the application and any of its related data from Stormpath. 

Instead of deleting an Application resource, we recommend that you disable it instead by sending a POST with a ``status`` value of "DISABLED".

Example Queries
"""""""""""""""

**Retrieve an Application**

.. code-block:: bash

    curl --request GET \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/$APPLICATION_ID?expand=tenant,accounts(offset:0,limit:50)" 

This query would retrieve the specified Application, with the associated Tenant resource and Accounts collection expanded. The expanded Accounts collection would be returned with an ``offset`` of 0 and a result ``limit`` of 50.

**Disable an Application**

.. code-block:: bash

    curl --request POST \
    --user $API_KEY_ID:$API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/$APPLICATION_ID" \
    --data '{
    "status":"disabled"
    }'

This query would disable the Application and prevent any associated Accounts from logging in.

.. _get-refs-via-app:

Retrieve Resources Associated With An Application 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, independent, resources using the Application for look-up. All of these resources have the following namespacing: ``/v1/applications/$APPLICATION_ID/$RESOURCE_TYPE``.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/tenants/$APPLICATION_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a resource of the specified type. Possible resource types are: ``customData``, ``oAuthPolicy``, ``accounts``, ``groups``, ``accountStoreMappings``, and ``idSiteModel``. 
        
    * - GET /v1/tenants/$APPLICATION_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`  
      - Searches a collection of all of the Application's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with an Application are: ``accounts``, ``groups``, ``accountStoreMappings``

Application Endpoints
---------------------

There are certain collections that are exposed by the Application as endpoints. This means that they cannot be retrieved using ``GET`` calls :ref:`like other collections <get-refs-via-app>`, but are instead using for other flows. These are detailed in this section, and have the same namespacing as regular collections: ``/v1/applications/$APPLICATION_ID/$ENDPOINT``.

.. _ref-loginattempts:

Login Attempts
^^^^^^^^^^^^^^

A ``POST`` is sent to this endpoint in order to authenticate an Account. For in-depth more information, please see :ref:<how-login-works>.

**loginAttempts URL**

``/v1/applications/$APPLICATION_ID/loginAttempts``

**loginAttempts Properties**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Property
      - Type
      - Valid Value(s)
      - Description
        
    * - ``type``
      - String (Enum)
      - N/A
      - The type of the login attempt. The only currently supported type is ``basic``. Additional types will likely be supported in the future.

    * - ``value``
      - String (Base64)
      - N/A
      - The Base64 encoded ``username``:``plaintextPassword`` pair.
        
    * - ``accountStore``
      - String 
      - ``href`` or ``nameKey``
      - An optional link to the Application’s Account Store (Organization, Directory, Group) OR Organization ``nameKey``. You should be certain that the specified Account Store contains the Account attempting to login. 

.. note::

    Specifying the ``accountStore`` can speed up logins if you know exactly which of the Application’s assigned Account Stores contains the Account. Stormpath will not have to iterate over the assigned Account Stores to find the Account to authenticate it. This can speed up logins significantly if you have many Account Stores (> 15) assigned to the Application.

**loginAttempts Example**

.. code-block: json 

    {
        "type": "basic",
        "value": "YmFzZTY0LWVuY29kZWQtbG9naW4tYW5kLXBhc3N3b3Jk"
        "accountStore": {
             "href": "https://api.stormpath.com/v1/groups/$YOUR_GROUP_ID"
       }
    }

Password Reset Tokens 
^^^^^^^^^^^^^^^^^^^^^

This is the endpoint for Password Reset Tokens that are passed as part of the :ref:`Password Reset Flow <password-reset-flow>`.

Verification Email 
^^^^^^^^^^^^^^^^^^

Where do we explain how this works?

OAuth Tokens 
^^^^^^^^^^^^

Token generation endpoint

Auth Tokens 
^^^^^^^^^^^^^^^

Token validation endpoint. If so, where do we explain how this works?

.. _ref-account-store-mapping:

Account Store Mapping
=====================

.. contents::
    :local:
    :depth: 2

**Description**

In Stormpath, you control who may log in to an Application by associating (or 'mapping') one or more Account Stores to an Application. All of the user Accounts across all of an Application's assigned Account Stores form the Application's effective "user base": those Accounts that may log in to the Application. If no Account Stores are assigned to an Application, no Accounts will be able to log in to it. The following resources may be mapped as Account Stores:

- Organization 
- Directory
- Group 

An individual Account Store Mapping resource may be accessed via its Resource URI:

**accountStoreMapping URI**

``/v1/accountStoreMappings/:accountStoreMappingId``

**accountStoreMapping Attributes**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description
     
    * - ``href``
      - String
      - N/A
      - The resource's fully qualified location URI.
        
    * - listIndex
      - Number
      - 0 <= N < list size
      - The order (priority) in which the associated Account Store will be consulted by the Application during an authentication attempt. This is a zero-based index; an Account Store with a ``listIndex`` of ``0`` will be consulted first (has the highest priority), followed by the Account Store at ``listIndex`` ``1`` (next highest priority), and so on. Setting a negative value will default the value to 0, placing it first in the list. A ``listIndex`` of larger than the current list size will place the mapping at the end of the list and then default the value to ``(list size - 1)``.
        
    * - isDefaultAccountStore
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Accounts created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they will not.
        
    * - isDefaultGroupStore
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Groups created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they won't. **This may only be set to true if the Account Store is a Directory. Stormpath does not currently support Groups storing other Groups**.
    
    * - application
      - String (Link)
      - N/A
      - A link to the mapping’s Application. **Required.**

    * - accountStore
      - String (Link) 
      - N/A
      - A link to the mapping's Account Store (Group, Directory or Organization) containing Accounts that may log in to the application. **Required.** 
      
    * - ``createdAt``
      - String (ISO-8601 Datetime)
      - N/A
      - Indicates when this resource was created.
    
        
    * - ``modifiedAt``
      - String (ISO-8601 Datetime)
      - N/A
      - Indicates when this resource’s attributes were last modified.

**Account Store Mapping Example**

.. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accountStoreMappings/1NUhrCPT0q66bjy6Yv9nS4",
      "listIndex": 0,
      "isDefaultAccountStore": true,
      "isDefaultGroupStore": true,
      "application": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR"
      },
      "accountStore": {
        "href": "https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYRXEh2KYf"
      }
    }

.. _asm-operations:

Account Store Mapping Operations
--------------------------------

.. contents:: 
    :local:
    :depth: 1

Create an Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/accountStoreMappings
      - Required: ``application``, ``accountStore``; Optional: ``listIndex``, ``isDefaultAccountStore``, ``isDefaultGroupStore``
      - N/A
      - Creates a new accountStoreMapping resource, thereby enabling the Accounts in the specified Store to log in to the specified Application. By default ``isDefaultAccountStore`` and ``isDefaultGroupStore`` are set to ``false``.

Retrieve an Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/accountStoreMappings/$ACCOUNT_STORE_MAPPING_ID
      - ``expand`` 
      - Retrieves the specified Application resource. ``accountStore` and ``application`` can be expanded. More info :ref:`above <about-links>`.
        
Update an Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/accountStoreMappings/$ACCOUNT_STORE_MAPPING_ID
      - ``listIndex``, ``isDefaultAccountStore``, ``isDefaultGroupStore``
      - Updates the specified attributes with the values provided.

Delete an Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/accountStoreMappings/$ACCOUNT_STORE_MAPPING_ID
      - N/A
      - Deletes the specified Account Store Mapping.
        

Example Queries
"""""""""""""""

**Retrieving an Account Store Mapping with embedded resources**

.. code-block:: bash

  curl --request GET \
  --user $API_KEY_ID:$API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/accountStoreMappings/1NUhrCPT0q66bjyeXamPLE?expand=application,accountStore"

This query would retrieve the specified Account Store Mapping with the Application and accountStore entities embedded with :ref:`link expansion <about-links>`.

**Updating an Account Store Mapping's login priority**

.. code-block:: bash

  curl --request POST \
  --user $API_KEY_ID:$API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/accountStoreMappings/1NUhrCPT0q66bjyeXamPLE?expand=application,accountStore" \
  --data '{
    "listIndex":"0"
    }'

This query would update an Account Store Mapping to give it the highest position in the :ref:`login priority index <how-login-works>`.

.. _ref-directory:

Directory  
=========

.. contents::
    :local:
    :depth: 2

**Description**

The **Directory** resource is a top-level container for Account and Group resources. A Directory also manages security policies (like password strength) for the Accounts it contains. Directories can be used to cleanly manage segmented user Account populations. For example, you might use one Directory for company employees and another Directory for customers, each with its own security policies.

Additionally:

- All Account resources within a Directory have a unique ``email`` and ``username``.
- All Group resources within a Directory have a unique ``name``.
  
An individual Directory resource may be accessed via its Resource URI:

**Directory URI**

``/v1/directories/$DIRECTORY_ID``

**Directory Attributes**

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``href``
    - String
    - N/A
    - The resource's fully qualified location URL
  
  * - ``name``
    - String
    - 1 < N <= 255 characters
    - Name of the Directory. Must be unique within a Tenant.
  
  * - ``description``
    - String
    - 0 < N <= 1000 characters
    - The description of the Directory.
  
  * - ``status``
    - String (Enum)
    - ``enabled`` , ``disabled``
    - Enabled Directories can be used as Account Stores for Applications. Disabled Directories cannot be used for login.

  * - ``createdAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource was created.
  
  * - ``modifiedAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.
  
  * - ``tenant``
    - String (Link)
    - N/A
    - A link to the owning :ref:`Tenant <ref-tenant>`.

  * - ``provider``
    - String (Link)
    - N/A
    - A link to the Directory's Provider. 

  * - ``customData``
    - String (Link) 
    - N/A
    - A link to the Directory's customData resource that you can use to store your own Directory-specific custom fields.

  * - ``passwordPolicy``
    - String (Link)
    - N/A
    - A link to the Directory’s Password Policy
      
  * - ``accountCreationPolicy``
    - String (Link)
    - N/A
    - A link to the Directory’s Account Creation Policy

  * - ``accounts``
    - String (Link)
    - N/A
    - A link to the Accounts owned by this Directory.
  
  * - ``applicationMappings``
    - String (Link)
    - N/A
    - A link to a collection of any accountStoreMapping resources that include this Directory.
      
  * - ``applications``
    - String (Link)
    - N/A
    - A link to a collection of all the :ref:`Applications <ref-application>` mapped to this Directory. 

  * - ``groups``
    - String (Link)
    - N/A
    - A link to a collection of the Groups mapped to this Directory.

**Directory Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp",
    "name": "Captains",
    "description": "Captains from a variety of stories",
    "status": "ENABLED",
    "createdAt": "2015-08-24T15:32:23.079Z",
    "modifiedAt": "2015-08-24T15:32:23.079Z",
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
    },
    "provider": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/provider"
    },
    "customData": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/customData"
    },
    "passwordPolicy": {
      "href": "https://api.stormpath.com/v1/passwordPolicies/2SKhstu8Plaekcai8lghrp"
    },
    "accountCreationPolicy": {
      "href": "https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8Plaekcai8lghrp"
    },
    "accounts": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/accounts"
    },
    "applicationMappings": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/applicationMappings"
    },
    "applications": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/applications"
    },
    "groups": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp/groups"
    }
  }

.. _directory-operations:

Directory Operations
--------------------------------

.. contents:: 
    :local:
    :depth: 1

Create a Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/directories
      - Required: ``name``; Optional: ``description``, ``status``
      - N/A
      - Creates a new Directory resource.

.. note::

  Currently it is only possible to make a Cloud or Social Directories via the REST API. To make a Mirror Directory you will need to use the `Admin Console <http://docs.stormpath.com/console/product-guide#create-a-mirrored-directory>`__.

Retrieve a Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/directories/$DIRECTORY_ID
      - ``expand`` 
      - Retrieves the specified Directory. ``accounts`` and ``groups``, ``tenant`` can be expanded. More info :ref:`above <about-links>`.
        
Update a Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/directories/$DIRECTORY_ID
      - ``name``, ``description``, ``status``
      - Updates the specified attributes with the values provided.

Delete a Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/directories/$DIRECTORY_ID
      - N/A
      - Deletes the specified

.. note::

  The "Stormpath Administrators" Directory cannot be deleted.
        
Example Queries
"""""""""""""""

**Disable a Directory**

.. code-block:: bash

  curl --request POST \
  --user $API_KEY_ID:$API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/bckhcGMXQDujIXpeXAMple" \
  --data '{
    "status" : "DISABLED"
    }'

This query would disable the specified Directory, which would mean that all of its associated Accounts and Groups would be unable to log in to any Application that this Directory was mapped to as an Account Store. 

**Retrieve Directory with Tenant embedded**

.. code-block:: bash

  curl --request GET \
  --user $API_KEY_ID:$API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/bckhcGMXQDujIXpeXAMple?expand=tenant" \

This query would retrieve the specified Directory with the Tenant resource embedded via :ref:`link expansion <about-links>`.

Retrieve Resources Associated With A Directory 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, independent, resources using the Directory for look-up. All of these resources have the following namespacing: ``/v1/directories/$DIRECTORY_ID/$RESOURCE_TYPE``.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/tenants/$DIRECTORY_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a resource of the specified type. Possible resource types are: ``customData``, ``accounts``, ``applicationMappings``, ``applications``, accountStoreMappings``, and ``groups``. 
        
    * - GET /v1/tenants/$APPLICATION_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`  
      - Searches a collection of all of the Application's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with an Application are: ``accounts``, ``groups``, ``accountStoreMappings``

Directory Endpoints
---------------------

There are no collections that are exposed by the Directory as endpoints.

.. _ref-provider:

Provider 
^^^^^^^^^^^^^^

The Provider resource contains information about the source of the information found in its associated Directory resource. 

For example, a Social Directory could be created for GitHub. This Directory would contain Accounts created using "Log In With Github", and its Provider resource would contain information about your Github login integration (e.g. the OAuth Client and Secret required for Github login). An individual Provider resource may be accessed via its Resource URI:

**Provider URI**

``/v1/directories/:directoryId/provider``

**Provider Attributes**

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``href``
    - String
    - N/A
    - The resource's fully qualified location URL

  * - ``createdAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource was created.
  
  * - ``modifiedAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.
  
  * - ``providerId``
    - String
    - ``stormpath`` (for a Cloud Directory), ``ad`` or ``ldap`` (for Mirror Directories), ``facebook``, ``google``, ``github`` or ``linkedin`` (for Social Directories)
    - Specifies the type of Provider for the associated Directory.
  
  * - ``clientId``
    - String
    - N/A
    - The OAuth 2.0 Client ID for this Provider. Only used for Social providers.
  
  * - ``clientSecret``
    - String
    - N/A
    - The OAuth 2.0 Client Secret for this Provider. Only used for Social providers.
  
  * - ``redirectUri``
    - String 
    - A valid URL
    - The URL to redirect to after the user has authenticated. Currently only used for the Google providers. 
  
  * - ``agent``
    - String (Link) 
    - N/A
    - A link to the Provider's Agent. Currently only used for LDAP providers. For more information see :ref:`make-mirror-dir`.

**Provider Example**

.. code-block:: json 

  {
    "href":"https://api.stormpath.com/v1/directories/3S8qv2u78JzwSXzEXAMplE/provider",
    "providerId":"ldap",
    "agent":{
      "href":"https://api.stormpath.com/v1/agents/3S8vF6CIUET9R4PEXAMplE"
    }
  }

.. _ref-ldap-agent:

LDAP Agent
""""""""""""""""""

:ref:`Mirror Directories <about-mirror-dir>` have an associated :ref:`Provider resource <ref-provider>` with either the ``ldap`` or ``ad`` ``providerId``. That Provider in turn contains an **Agent** resource. This Agent is what will scan your LDAP directory and map the accounts and groups in that directory to Stormpath Accounts and Groups.

An Agents collection may be accessed via its Resource URI:

**Agent URI**

``/v1/agents/:directoryId``

**Agent Attributes**

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``href``
    - String
    - N/A
    - The resource's fully qualified location URL
  
  * - ``id``
    - String
    - N/A
    - A unique alphanumeric identifier for this Agent.
    
  * - ``status``
    - String
    - ``online``, ``offline``, ``error``
    - The Agent's status.
  
  * - ``config``
    - Object
    - N/A
    - The configuration information for this Agent, as an embedded ``config`` object. (see below)
  
  * - ``createdAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource was created.
  
  * - ``modifiedAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.
  
  * - ``directory``
    - String (Link)
    - N/A
    - A link to the Directory resource that the Agent belongs to. 
  
  * - ``download``
    - String (Link)
    - N/A
    - A link that allows this Agent to be downloaded for installation.
  
  * - ``tenant``
    - String (Link)
    - N/A
    - A link to the Tenant that owns the Directory this Agent belongs to.

For an example JSON see :ref:`below <agent-json-ex>`.

**Config Attributes**

The ``config`` object is found inside an Agent resource. It corresponds with the "Agent Configuration" tab in the Stormpath Admin Console "Agents" section.

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``directoryHost``
    - String
    - N/A
    - The IP address or Host name of the LDAP directory server to connect to. 
  
  * - ``directoryPort``
    - Number
    - N/A
    - The port to use when connecting to the LDAP directory server.
  
  * - ``sslRequired``
    - Boolean
    - .
    - Indicates whether the Agent socket connection to the directory uses SSL encryption. 
  
  * - ``agentUserDn``
    - String
    - N/A
    - The username that the Agent will use to connect to your LDAP directory.
  
  * - ``agentUserDnPassword``
    - String
    - N/A
    - The password that the Agent will use to connect to your LDAP directory. 

  * - ``baseDn``
    - String
    - N/A
    - The base DN (Distinguished Name) to use when querying the directory.
  
  * - ``pollInterval``
    - Number
    - N/A
    - How often (in minutes) to poll Directory Services to detect directory object changes.
      
  * - ``accountConfig``
    - Object
    - N/A
    - The Account configuration information for this Agent, as an embedded ``accountConfig`` object. (see below)
      
  * - ``groupConfig``
    - Object
    - N/A
    - The Group configuration information for this Agent, as an embedded ``groupConfig`` object. (see below)
  
  * - ``referralMode``
    - String
    - ``follow``, ``ignore``
    - Prevents referral problems for Active Directory servers that are not configured properly for DNS.
  
  * - ``ignoreReferralIssues``
    - Boolean
    - N/A
    - Referral issues can arise when querying an Active Directory server without proper DNS. Setting this as true ignores referral exceptions and allows (potentially partial) results to be returned.

For an example JSON see :ref:`below <agent-json-ex>`.

**accountConfig Attributes**

The ``accountConfig`` object is found inside a ``config`` object. It corresponds with the "Account Configuration" tab in the Stormpath Admin Console "Agents" section.

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``dnSuffix``
    - String
    - N/A
    - Optional value appended to the Base DN when accessing accounts. If left unspecified, account searches will stem from the Base DN.
  
  * - ``objectClass``
    - String
    - N/A
    - The LDAP object class to use when when loading accounts.
  
  * - ``objectFilter``
    - String
    - N/A
    - LDAP query filter to use when searching for user accounts.
  
  * - ``emailRdn``
    - String
    - N/A
    - The name of the attribute for an account's email address.
  
  * - ``givenNameRdn``
    - String
    - N/A
    - The name of the attribute for an account's first name (aka 'Given Name').
  
  * - ``middleNameRdn``
    - String
    - N/A
    - The name of the attribute for an account's middle name.
      
  * - ``surnameRdn``
    - String
    - N/A
    - The name of the attribute for an account's last name (aka 'Family Name' or 'Surname').
      
  * - ``usernameRnd``
    - String
    - N/A
    - The name of the attribute for an account's login name.
  
  * - ``passwordRdn``
    - String
    - N/A
    - The name of the attribute for an account's password.

For an example JSON see :ref:`below <agent-json-ex>`.

**groupConfig Attributes**

The ``groupConfig`` object is found inside a ``config`` object.

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - ``dnSuffix``
    - String
    - N/A
    - Optional value appended to the Base DN when accessing groups. If left unspecified, group searches will stem from the Base DN.
  
  * - ``objectClass``
    - String
    - N/A
    - The LDAP object class to use when when loading accounts. 
  
  * - ``objectFilter``
    - String
    - N/A
    - LDAP query filter to use when searching for groups.
  
  * - ``nameRdn``
    - String
    - N/A
    - The name of the attribute for a group's name. For example cn. Please note: group names must be unique within a directory.
  
  * - ``descriptionRdn``
    - String
    - N/A
    - The name of the attribute for a group's description.
  
  * - ``membersRdn``
    - String
    - N/A
    - The name of the attribute that lists the group members.

.. _agent-json-ex:

**Agent example with embedded Config, accountConfig and groupConfig resources**

.. code-block:: json 

  {
    "href":"https://api.stormpath.com/v1/agents/2PjCYRg3mhGNLUieXamPLE",
    "id":"2PjCYRg3mhGNLUixcSdK0k",
    "status":"OFFLINE",
    "config":{
      "directoryHost":"someValue",
      "directoryPort":636,
      "sslRequired":true,
      "agentUserDn":"someValue",
      "baseDn":"someValue",
      "pollInterval":60,
      "accountConfig":{
        "dnSuffix":"someValue",
        "objectClass":"person",
        "objectFilter":"someValue",
        "emailRdn":"someValue",
        "givenNameRdn":"givenName",
        "middleNameRdn":"someValue",
        "surnameRdn":"sn",
        "usernameRdn":"uid",
        "passwordRdn":"userPassword"
      },
      "groupConfig":{
        "dnSuffix":"someValue",
        "objectClass":"groupOfUniqueNames",
        "objectFilter":"someValue",
        "nameRdn":"cn",
        "descriptionRdn":"description",
        "membersRdn":"uniqueMember"
      }
    },
    "createdAt":"2014-11-25T03:22:39.000Z",
    "modifiedAt":"2014-11-25T03:22:39.000Z",
    "directory":{
      "href":"https://api.stormpath.com/v1/directories/2Pj8EONsQmnAMyIeXamPLE"
    },
    "download":{
      "href":"https://api.stormpath.com/v1/agents/2PjCYRg3mhGNLUieXamPLE/download"
    },
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/7g9HG1YMBX8ohFbeXamPLE"
    }
  }

.. _ref-group:

Group   
=====

.. contents::
    :local:
    :depth: 2

**Groups** are collections of Accounts found within a Directory. They can be thought of as labels applied to Accounts. Aside from the relatively simple task of grouping together Accounts, Groups can also be used to implement "roles" for authorization purposes. For more information about this, please see :ref:`role-groups`. 

An individual Group resource may be accessed via its Resource URI:

**Group URI**

``/v1/groups/:groupId``

**Group Attributes**

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
   
  * - ``href``
    - String
    - N/A
    - The resource's fully qualified location URL.
  
  * - ``name``
    - String
    - 1 < N <= 255 characters
    - The name of the Group. Must be unique within a Directory.
    
  * - ``description``
    - String
    - 1 < N <= 1000 characters
    - The description of the Group.

  * - ``status``
    - String (Enum)
    - ``enabled``, ``disabled``
    - ``enabled`` Groups are able to authenticate against an Application. ``disabled`` Groups cannot authenticate against an Application.

  * - ``createdAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource’s properties were last modified.

  * - ``customData``
    - String (Link) 
    - N/A
    - A link to the Group’s customData resource that you can use to store your own Group-specific custom fields.

  * - ``directory``
    - String (Link)
    - N/A
    - A link to the Directory resource that the Group belongs to. 
  
  * - ``tenant``
    - String (Link)
    - N/A
    - A link to the Tenant that owns the Directory containing this Group.

  * - ``accounts``
    - String (Link) 
    - N/A
    - A link to a collection of the Accounts that are contained within this Group. 

  * - ``accountMemberships``
    - String (Link)
    - N/A
    - A link to a collection of groupMemberships that this Group is found in.
        
  * - ``applications``
    - String (Link)
    - N/A
    - A link to any Applications associated with this Group.

**Group Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExaMPLe",
    "name": "Starfleet Officers",
    "description": "Commissioned officers in Starfleet",
    "status": "ENABLED",
    "createdAt": "2015-08-25T20:09:23.698Z",
    "modifiedAt": "2015-08-25T20:09:23.698Z",
    "customData": {
      "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJKExaMPLe/customData"
    },
    "directory": {
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8Plaekcai8lghrp"
    },
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExaMPLe"
    },
    "accounts": {
      "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExaMPLe/accounts"
    },
    "accountMemberships": {
      "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExaMPLe/accountMemberships"
    },
    "applications": {
      "href": "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExaMPLe/applications"
    }
  }

.. _Group-operations:

Group Operations
--------------------------------

.. contents:: 
    :local:
    :depth: 1

Create a Group  
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/
      - Required: ``.``; Optional: ``.``
      - N/A
      - Creates a new ? resource

Retrieve a Group  
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - ``expand`` 
      - Retrieves the specified ?. ``.`` and ``.`` can be expanded. More info :ref:`above <about-links>`.
        
Update a Group  
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/
      - 
      - Updates the specified attributes with the values provided.

Delete a Group 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/
      - N/A
      - Deletes the specified
        

Example Queries
"""""""""""""""

**Example Description**

.. code-block:: bash

  curl --request GET \
  --user $API_KEY_ID:$API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url " "

This query would...

**Example Description**

.. code-block:: bash

  curl --request POST \
  --user $API_KEY_ID:$API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url " " \
  --data '{
    }'

This query would...

Retrieve Resources Associated With A ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Intro text 

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - 
      -  .

? Endpoints
---------------------

There are certain collections that are exposed by the ? as endpoints.

Endpoint Name
^^^^^^^^^^^^^^

Description text 

**Endpoint URL**

**Endpoint Properties**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Property
      - Type
      - Valid Value(s)
      - Description
    
    * - .
      - .
      - .
      - .

Endpoint Name
^^^^^^^^^^^^^^

Description text 

**Endpoint URL**

**Endpoint Properties**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Property
      - Type
      - Valid Value(s)
      - Description
    
    * - . 
      - .
      - .
      - .


Group Membership   
=====================

.. contents::
    :local:
    :depth: 2

Accounts and Groups are linked via a **groupMembership** resource that stores this Account-to-Group link. Each Account we add to a Group has its own groupMembership resource created.  

**groupMembership URI**

``v1/groupMemberships/:groupMembershipId``

**groupMembership Attributes**

.. list-table:: 
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description
  
  * - ``href``
    - String
    - N/A
    - The resource's fully qualified location URL.
  
  * - ``account``
    - String (Link) 
    - N/A
    - A link to the Account for this Group Membership. 
   
  * - ``group``
    - String (Link)
    - N/A
    - A link to the Group for this Group Membership.
  
  * - ``createdAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource was created.
  
  * - ``modifiedAt``
    - String 
    - ISO-8601 Datetime
    - Indicates when this resource’s properties were last modified

**ResourceName Example**

.. code-block:: json

    {
    }

.. _ResourceName-operations:

ResourceName Operations
--------------------------------

.. contents:: 
    :local:
    :depth: 1

Create a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/
      - Required: ``.``; Optional: ``.``
      - N/A
      - Creates a new ? resource

Retrieve a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - ``expand`` 
      - Retrieves the specified ?. ``.`` and ``.`` can be expanded. More info :ref:`above <about-links>`.
        
Update a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/
      - 
      - Updates the specified attributes with the values provided.

Delete a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/
      - N/A
      - Deletes the specified
        

Example Queries
"""""""""""""""

**Example Description**

.. code-block:: bash

  curl --request GET \
  --user $API_KEY_ID:$API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url " "

This query would...

**Example Description**

.. code-block:: bash

  curl --request POST \
  --user $API_KEY_ID:$API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url " " \
  --data '{
    }'

This query would...

Retrieve Resources Associated With A ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Intro text 

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - 
      -  .

? Endpoints
---------------------

There are certain collections that are exposed by the ? as endpoints.

Endpoint Name
^^^^^^^^^^^^^^

Description text 

**Endpoint URL**

**Endpoint Properties**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Property
      - Type
      - Valid Value(s)
      - Description
    
    * - .
      - .
      - .
      - .

ResourceName  
=====================

.. contents::
    :local:
    :depth: 2

**Description**

Text

**? URI**

``/v1/``

**ResourceName Attributes**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description
     
    * - ``href``
      - String
      - N/A
      - The resource's fully qualified location URI.
      
    * - ``createdAt``
      - String (ISO-8601 Datetime)
      - N/A
      - Indicates when this resource was created.
        
    * - ``modifiedAt``
      - String (ISO-8601 Datetime)
      - N/A
      - Indicates when this resource’s attributes were last modified.

**ResourceName Example**

.. code-block:: json

    {
    }

.. _ResourceName1-operations:

ResourceName Operations
--------------------------------

.. contents:: 
    :local:
    :depth: 1

Create a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Optional Parameters 
      - Description
    
    * - POST /v1/
      - Required: ``.``; Optional: ``.``
      - N/A
      - Creates a new ? resource

Retrieve a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - ``expand`` 
      - Retrieves the specified ?. ``.`` and ``.`` can be expanded. More info :ref:`above <about-links>`.
        
Update a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - POST /v1/
      - 
      - Updates the specified attributes with the values provided.

Delete a ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Attributes
      - Description
    
    * - DELETE /v1/
      - N/A
      - Deletes the specified
        

Example Queries
"""""""""""""""

**Example Description**

.. code-block:: bash

  curl --request GET \
  --user $API_KEY_ID:$API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url " "

This query would...

**Example Description**

.. code-block:: bash

  curl --request POST \
  --user $API_KEY_ID:$API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url " " \
  --data '{
    }'

This query would...

Retrieve Resources Associated With A ResourceName 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Intro text 

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation 
      - Optional Parameters 
      - Description
    
    * - GET /v1/
      - 
      -  .

? Endpoints
---------------------

There are certain collections that are exposed by the ? as endpoints.

Endpoint Name
^^^^^^^^^^^^^^

Description text 

**Endpoint URL**

**Endpoint Properties**

.. list-table:: 
    :widths: 15 10 20 60
    :header-rows: 1

    * - Property
      - Type
      - Valid Value(s)
      - Description
    
    * - .
      - .
      - .
      - .
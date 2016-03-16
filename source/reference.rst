.. _reference:

******************
REST API Reference
******************

This section covers the Core Concepts of the Stormpath REST API, as well as serving as a complete reference for all of the Stormpath resources as well as the operations that it is possible to perform with them.

.. _rest-concepts:

REST API Core Concepts
======================

The following information is essential to understanding how the Stormpath API functions. You should familiarize yourself with it before moving on to the rest of this guide.

.. contents::
    :local:
    :depth: 2

Base URL
--------

All URLs referenced in the API documentation begin with the following base URL:

  ``https://api.stormpath.com/v1/``

This is the base URL for Stormpath's public API. If you are using an Enterprise deployment, your base URL will instead be:

  ``https://enterprise.stormpath.io/v1/``

And if you have a private Stormpath deployment, the base URL could be a completely custom URL, or simply:

  ``https://yourOrganization.stormpath.io/v1/``

Resource Format
---------------
The Stormpath REST API currently only supports JSON resource representations. If you would like other formats supported, please email us at support@stormpath.com to let us know!

Authentication
--------------

Every request to the Stormpath REST API must be authenticated with an **API key** over **HTTPS**. HTTP is not supported. If you want to make a REST request to Stormpath, we assume you have already:

- :ref:`Signed up for Stormpath <quickstart-signup>`.
- :ref:`Obtained your API key <quickstart-create-apikey>`.

When you have an API key, you can choose one of two ways to authenticate with Stormpath:

- HTTP Basic authentication
- Digest authentication

Basic Authentication over HTTPS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most clients (including web browsers) show a dialog or prompt for you to provide a username and password for HTTP Basic authentication.

When using an API key with Basic authentication, the API key ID is the username and the API key secret is the password:

- **HTTP basic username:** apiKey.id value
- **HTTP basic password:** apiKey.secret value

For example, if using cUrl:

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
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
- PHP: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-php/blob/master/src/Http/Authc/SAuthc1RequestSigner.php>`__ (the **signRequest** method)
- Python: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-python/blob/master/stormpath/auth.py>`__ (the **call** method)
- Ruby: `Sauthc1Signer <https://github.com/stormpath/stormpath-sdk-ruby/blob/master/lib/stormpath-sdk/http/authc/sauthc1_signer.rb>`__ (the **sign_request** method)

If you port the algorithm to other languages, please let us know. We are happy to help. Email us at support@stormpath.com and we will help as best as we can.

.. note::

    The Stormpath SAuthc1 digest algorithm is not the same as `RFC 2617 <http://www.ietf.org/rfc/rfc2617.txt>`__ HTTP Digest authentication. The Stormpath SAuthc1 digest-based authentication scheme is more secure than standard HTTP Digest authentication.

Creating, Retrieving, Updating, and Deleting Resources
------------------------------------------------------

Stormpath entities have a full set of creation, retrieval, update and deletion actions associated with them. Here we give some information about all of these actions. For a complete description of every resource and the actions that can be performed with it, please see the :ref:`below <ref-tenant>`.

Creating Resources
^^^^^^^^^^^^^^^^^^

You create a resource by submitting an HTTP **POST** to a resource URL. Any POST body must be represented as **JSON**. Requests that contain body content must specify the HTTP ``Content-Type`` header with a value of ``application/json``.

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
      - The request was successful, we created a new resource, and the response body contains the representation. The ``Location`` header contains the new resource’s canonical URL.

    * - ``400 BAD REQUEST``
      - The data given in the POST failed validation. Inspect the response body for details.

    * - ``401 UNAUTHORIZED``
      - Authentication credentials are required to access the resource. All requests must be authenticated.

    * - ``403 FORBIDDEN``
      - The supplied authentication credentials are not sufficient to access the resource.

    * - ``404 NOT FOUND``
      - We could not locate the resource based on the specified URL.

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
      - A common redirect response; you can GET the resource at the URL found in the ``location`` response header.

    * - ``304 NOT MODIFIED``
      - Your client's cached version of the representation is still up-to-date.

    * - ``400 BAD REQUEST``
      - The data given in the POST failed validation. Inspect the response body for details.

    * - ``401 UNAUTHORIZED``
      - Authentication credentials are required to access the resource. All requests must be authenticated.

    * - ``403 FORBIDDEN``
      - The supplied authentication credentials are not sufficient to access the resource.

    * - ``404 NOT FOUND``
      - We could not locate the resource based on the specified URL.

    * - ``429 TOO MANY REQUESTS``
      - Your application is sending too many simultaneous requests.

    * - ``500 SERVER ERROR``
      - We could not create or update the resource. Please try again.

    * - ``503 SERVICE UNAVAILABLE``
      - We are temporarily unable to service the request. Please wait for a bit and try again.

Updating Resources
^^^^^^^^^^^^^^^^^^

If you want to update a resource, submit an HTTP POST to the resource's URL. Any POST body must be represented as JSON. You must submit at least one attribute. As with the creation POST calls, requests that contain body content must specify the HTTP ``Content-Type`` header with a value of ``application/json``.

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
      - We could not locate the resource based on the specified URL.

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
      - We could not locate the resource based on the specified URL.

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

Collection Resource
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
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/applications?offset=10&limit=40"

This would result in the following 200 response:

  .. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/applications?offset=10&limit=40",
      "offset": 10,
      "limit": 40,
      "items": [
        {
          "comment": "// This JSON has been truncated for readability"
        }
      ]
    }

.. _about-sorting:

Sorting
^^^^^^^
A request for a Collection Resource can contain an optional ``orderBy`` query parameter. The query parameter value is a URL-encoded comma-delimited list of ordering statements. Each ordering statement identifies a **sortable attribute**, and whether you would like the sorting to be **ascending or descending**.

For example, a sorted request (where %2C is the URL encoding for the comma character) might look like this:

  .. code-block:: bash

    curl --request GET \
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/accounts?orderBy=orderStatement1%2CorderStatement2%2C...%2CorderStatementN"

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

    https://api.stormpath.com/v1/applications/$APPLICATION_ID/accounts?orderBy=surname%20asc%2CgivenName%20desc

.. note::

    Since ``asc`` is the default, we could actually omit it::

        ?orderBy=surname%2CgivenName%20desc

.. _about-search:

Search
^^^^^^

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

    /v1/$CONTAINER_TYPE/$CONTAINER_ID/$RESOURCE_TYPE?q=some+criteria

For example, to search across an Application’s Accounts for any Account that has a :ref:`searchable attribute <searchable-attributes>` containing the text "Joe":

    .. code-block:: bash

      curl --request GET \
      --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/applications/$APPLICATION_ID/accounts?q=Joe"

Matching Logic
++++++++++++++

Stormpath will perform a case-insensitive matching query on all viewable attributes in all the resources in the Collection. Note that "viewable" means that the attribute can be viewed by the current caller.

So the following query:

  .. code-block:: bash

      curl --request GET \
      --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJExaMPLe/accounts?q=Joe"

Returns all Accounts where:

- Each Account is associated to the specified Group
- The Account's ``givenName`` equals or contains "joe" (case insensitive) OR
- The Account's ``middlename`` equals or contains "joe" (case insensitive) OR
- The Account's ``email`` equals or contains "joe" (case insensitive) OR
- And so on. For more information about which Account attributes are searchable, please see :ref:`below <searchable-attributes>`.

It may help to think about each attribute comparison as similar to a ‘like’ operation in a traditional relational database context. For example, if SQL was used to execute the query, it might look like this::

    select * from my_tenant_accounts where
        (lower(givenName) like '%joe%' OR
         lower(middlename) like '%joe%' OR
         lower(email) like '%joe%' OR ... );

.. _search-attribute:

Attribute Search
""""""""""""""""

In the above example, our query returned all Accounts that had any searchable attribute with the query in it. It is also possible to tell Stormpath to only return matches from a particular attribute::

    /v1/$RESOURCE_TYPE?anAttribute=someValue&anotherAttribute=anotherValue

For example, to search an Application’s Accounts for an Account with a ``givenName`` of ``Joe``::

    /v1/applications/$APPLICATION_ID/accounts?givenName=Joe

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
      - ``givenName``, ``middleName``, ``surname``, ``username``, ``email``, ``status``, ``createdAt``, ``modifiedAt``

    * - Group
      - ``name``, ``description``, ``status``, ``createdAt``, ``modifiedAt``

    * - Organization
      - ``name``, ``nameKey``, ``status``, ``description``, ``createdAt``, ``modifiedAt``

Matching Logic
++++++++++++++

Attribute-based queries use standard URL query parameters and function as follows:

- Each query parameter name is the same name of a :ref:`searchable attribute <searchable-attributes>` on an instance in the Collection Resource.

- A query parameter value triggers one of four types of matching criteria:

   #. No asterisk at the beginning or end of the value indicates a direct match.
   #. An asterisk only at the beginning of the value indicates that value is at the end.
   #. An asterisk only at the end of the value indicates that the value is at the beginning.
   #. An asterisk at the end AND at the beginning of the value indicates the value is contained in the string.

.. note ::

  Just like with Filter search, queries are case-insensitive.

So the following query:

  .. code-block:: bash

      curl --request GET \
      --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
      --header 'content-type: application/json' \
      --url "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/accounts?givenName=Joe&middleName=*aul&surname=*mit*&email=joePaul*&status=disabled"

Returns all accounts where:

- Each Account belongs to the specified Application
- The Account's ``givenName`` is equal to "Joe" AND
- The Account's ``middleName`` ends with "aul" AND
- The Account's ``surname`` equals or contains "mit" AND
- The Account's ``email`` starts with with "joePaul" AND
- The Account's ``status`` equals "disabled".

.. note::

    For resources with a ``status`` attribute, status query values must be the exact value. For example, ``ENABLED`` or ``DISABLED`` must be passed, while fragments such as ``ena``, ``dis``, ``bled`` are not acceptable.

.. _search-datetime:

Datetime Search
"""""""""""""""

The Datetime search is a sub-type of the attribute search that allows you to filter or search collections that were created or modified at a particular time.

Stormpath exposes attributes on all resources that will give you information about when the resource was created or modified. For example, an Account resource will have the ``createdAt`` and ``modifiedAt`` attributes:

.. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accounts/$ACCOUNT_ID",
      "comment":" // This JSON has been truncated for readability",
      "createdAt": "2015-08-25T19:57:05.976Z",
      "modifiedAt": "2015-08-25T19:57:05.976Z",
      "emailVerificationToken": null,
      "customData": {
        "href": "https://api.stormpath.com/v1/accounts/$ACCOUNT_ID/customData"
      },
      "...":"..."
    }

Stormpath stores the datetime in `ISO 8601 <http://www.w3.org/TR/NOTE-datetime>`__ which is human readable and has common support across all languages. The timezone is coordinated universal time (UTC). So a datetime range would look like this::

    [ISO-8601-BEGIN-DATETIME, ISO-8601-END-DATETIME]

.. note::

    Omitting the beginning or ending date is valid for requests. Omitting the begin datetime range [,ISO-8601-END-DATETIME] would include all resources created or modified before the end datetime. Omitting the end datetime range [ISO-8601-BEGIN-DATETIME,] would include all resources created or modified after the the begin datetime.

As an example, if you want wanted to get all Accounts created between January 12, 2015 and January 14, 2015 your query would look like this::

    /v1/applications/$APPLICATION_ID/accounts?createdAt=[2015-01-12, 2015-01-14]

The response would be a Collection of Accounts created between the two days.

Exclusion vs Inclusion
++++++++++++++++++++++

The square brackets [] denote **inclusion**, but ``createdAt`` and ``modifiedAt`` also support **exclusion** with parentheses (). For example, if you wanted to get all accounts created between Jan 12, 2015 and Jan 14, 2015 not including the 14th, your request would look like this::

    v1/applications/$APPLICATION_ID/accounts?createdAt=[2015-01-12, 2015-01-14)

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

To expand one or more links, simply add an ``expand`` query parameter with one or more comma-delimited attributes to the resource URL::

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

``/v1/tenants/$TENANT_ID``

**Tenant Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``href``
      - Link
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
      - Link
      - N/A
      - A link to the Tenant's customData resource that you can use to store your own custom fields.

    * - ``organizations``
      - Link
      - N/A
      - A link to a Collection of all the Organizations mapped to this Tenant.

    * - ``applications``
      - Link
      - N/A
      - A link to a Collection of all the Applications mapped to this Tenant.

    * - ``directories``
      - Link
      - N/A
      - A link to a Collection of all the Directories mapped to this Tenant.

    * - ``accounts``
      - Link
      - N/A
      - A link to a Collection of the Accounts mapped to this Tenant.

    * - ``agents``
      - Link
      - N/A
      - A link to a Collection of all the Agents configured for this Tenant.

    * - ``groups``
      - Link
      - N/A
      - A link to a Collection of all the Groups configured for this Tenant.

    * - ``idSites``
      - Link
      - N/A
      - A link to a Collection of all the ID Sites configured for this Tenant.

**Tenant Example**

.. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE",
      "name": "tenantName",
      "key": "tenantKey",
      "createdAt": "dateTime",
      "modifiedAt": "dateTime",
      "customData": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/customData"
      },
      "organizations": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/organizations"
      },
      "applications": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/applications"
      },
      "directories": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/directories"
      },
      "accounts": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/accounts"
      },
      "agents": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/agents"
      },
      "groups": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/groups"
      },
      "idSites": {
        "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgeXAMPLE/idSites"
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

Using A Tenant for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other independent resources using the Tenant for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/tenants/$TENANT_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a collection of all of a Tenant's associated resources of the specified type. Possible resource types are: ``organizations``, ``applications``, ``directories``, ``accounts``, ``agents``, ``groups``, and ``idsites``.

    * - GET /v1/tenants/$TENANT_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Tenant's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with a Tenant are: ``customData``, ``organizations``, ``applications``, ``directories``, ``accounts``, ``agents``, ``groups``, and ``idsites``.

Example Queries
"""""""""""""""

**Retrieving a Collection Associated with a Tenant**

.. code-block:: bash

    curl --request GET \
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --url "https://api.stormpath.com/v1/tenants/$TENANT_ID"


This query would retrieve a collection containing all the Accounts associated with the specified Tenant.

**Searching a Collection Associated with a Tenant**

.. code-block:: bash

    curl --request GET \
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --url "https://api.stormpath.com/v1/tenants/$TENANT_ID/applications?q=foo&orderBy=name&offset=0&limit=50"

This query would retrieve a collection containing the Applications associated with this Tenant that have the string "foo" as the value of any :ref:`searchable attribute <searchable-attributes>`.

The result body would:

  - be :ref:`sorted <about-sorting>` by the ``name`` attribute

  - have a :ref:`pagination <about-pagination>` offset of 0 and

  - a limit of 50 results per response

Other Resources Associated with a Tenant
----------------------------------------

.. _ref-id-site:

ID Site
^^^^^^^

This resource contains information about this Tenant's ID Site. For more information, see :ref:`idsite`.

**idSite URL**

``/v1/idSites/$IDSITE_ID``

**idSite Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``href``
      - Link
      - N/A
      - The resource's fully qualified location URL.

    * - ``domainName``
      - String
      - N/A
      - The custom domain name (if any) for your ID Site. For more information see :ref:`idsite-custom-domain-ssl`.

    * - ``tlsPublicCert``
      - String
      - N/A
      - The public SSL certificate for your ID Site. For more information see :ref:`idsite-custom-domain-ssl`.

    * - ``tlsPrivateKey``
      - String
      - N/A
      - The private SSL certificate for your ID Site. For more information see :ref:`idsite-custom-domain-ssl`.

    * - ``gitRepoUrl``
      - String
      - N/A
      - If you are customizing the ID Site code, you will need to put the URL of your GitHub repo here.

    * - ``gitBranch``
      - String
      - N/A
      - If you are customizing the ID Site code, you will need to put the branch name of the custom code here.

    * - ``authorizedOriginURLs``
      - Array (String)
      - N/A
      - An array of URLs where the ID Site requests can originate from, used for local development or custom domain names.

    * - ``authorizedRedirectURLs``
      - Array (String)
      - N/A
      - An array of URLs that the user can be sent to after they log in or register at the ID Site.

    * - ``logoUrl``
      - String
      - N/A
      - The URL of the custom logo, if any.

    * - ``sessionTti``
      - String
      - ISO-8601
      - The time-to-idle for the session. Represents the session idle timeout as an `ISO 8601 Duration <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

    * - ``sessionTtl``
      - String
      - ISO-8601
      - The time-to-live for the session. Represents the session timeout as an `ISO 8601 Duration <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

    * - ``sessionCookiePersistent``
      - String (Boolean)
      - ``true`` or ``false``
      - When this value is ``true``, Stormpath will create a persistent cookie for the ID Site session. This means that the cookie will persist even if the browser is closed and reopened. Setting this ``false`` will ensure that the session is terminated when the user closes their browser.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant associated with this ID Site.

**idSite Example**

.. code-block:: json

    {
      "href":"https://api.stormpath.com/v1/idSites/1XBJMqDmsNQuOZ18gNCT42",
      "domainName":"elastic-rebel.id.stormpath.io",
      "tlsPublicCert":"",
      "tlsPrivateKey":"",
      "gitRepoUrl":"https://github.com/stormpath/idsite",
      "gitBranch":"master",
      "authorizedOriginURLs":[
        "http://google.com"
      ],
      "authorizedRedirectURLs":[
        "http://localhost",
        "http://limitless-ravine-7645.herokuapp.com/",
        "http://stormpath.localhost:8001"
      ],
      "logoUrl":"http://www.manic.com.sg/blog/images/CocaCola_co.jpg",
      "sessionTti":"PT5M",
      "sessionTtl":"PT5M",
      "sessionCookiePersistent":true,
      "tenant":{
        "href":"https://api.stormpath.com/v1/tenants/7g9HG1YMBX8ohFbu0KAFKR"
      }
    }

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
      - Link
      - N/A
      - The resource's fully qualified location URL.

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
      - ``ENABLED`` (Default), ``DISABLED``
      - ``ENABLED`` applications allow mapped Accounts to log in. ``DISABLED`` Applications prevent mapped Accounts from logging in.

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``modifiedAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant that owns this Application.

    * - ``defaultAccountStoreMapping``
      - Link
      - Could be ``null``
      - A link to the Account Store Mapping that reflects the default Account Store where the application will store newly created Accounts. A ``null`` value disables the application from directly creating new Accounts.

    * - ``defaultGroupStoreMapping``
      - Link
      - Could be ``null``
      - A link to the Account Store Mapping that reflects the default Group Store where the application will store newly created Groups. A ``null`` value disables the application from directly creating new Groups.

    * - ``customData``
      - Link
      - N/A
      - A link to the Tenant's customData resource that you can use to store your own custom fields.

    * - ``oAuthPolicy``
      - Link
      -
      - A link to this Application OAuth policy. For more information, see :ref:`token-authn-config`.

    * - ``accounts``
      - Link
      - N/A
      - A link to a Collection of all the :ref:`Accounts <ref-account>` mapped to this Application. (see note :ref:`below <application-accounts-note>`)

    * - ``groups``
      - Link
      - N/A
      - A link to a Collection of all the :ref:`Groups <ref-group>` mapped to this Application.

    * - ``accountStoreMappings``
      - Link
      - N/A
      - A link to the collection of all :ref:`Account Store Mappings <ref-asm>` for this Application.

    * - ``loginAttempts``
      - Link
      - N/A
      - The endpoint for :ref:`Login Attempts <ref-loginattempts>` for this Application.

    * - ``passwordResetTokens``
      - Link
      - N/A
      - The endpoint for :ref:`Password Reset Tokens <ref-password-reset-token>`, used in :ref:`password reset workflows <password-reset-flow>`.

    * - ``apiKeys``
      - Link
      - N/A
      - A collection of all the API Keys for this Application.

    * - ``verificationEmails``
      - Link
      - N/A
      - The endpoint for Verification Emails for this Application.

    * - ``authTokens``
      - Link
      - N/A
      - A collection of Auth Tokens for this Application. For more information, see :ref:`about-token-validation`.

    * - ``authorizedCallbackUris``
      - String
      - N/A
      - Authorized callback URIs for the purposes of :ref:`SAML authentication flows <saml-authn>`.

    * - ``samlPolicy``
      - Object
      - N/A
      - An embedded object that contains information about the Directory's SAML Policy (if any). For more information, see :ref:`the Authentication chapter <ref-samlpolicy>`.

.. _application-accounts-note:

.. note::

  An Application’s Accounts collection is a virtual collection in the sense that none of the Accounts directly belong to the Application, but only indirectly via Directories. So the ``applications/$APPLICATION_ID/accounts`` collection is an aggregate view of all Accounts that are:

  - in any Directory assigned to the Application
  - in any Group directly assigned to the Application

**Application Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple",
    "name": "My Application",
    "description": "This application was automatically created for you in Stormpath for use with our Quickstart guides(https://docs.stormpath.com). It does apply to your subscription's number of reserved applications and can be renamed or reused for your own purposes.",
    "status": "ENABLED",
    "createdAt": "2015-08-18T20:46:36.061Z",
    "modifiedAt": "2015-08-25T18:11:29.774Z",
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExaMPLe"
    },
    "defaultAccountStoreMapping": {
      "href": "https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp"
    },
    "defaultGroupStoreMapping": {
      "href": "https://api.stormpath.com/v1/accountStoreMappings/5WKhSDXNR8Wiksjv808XHp"
    },
    "customData": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/customData"
    },
    "oAuthPolicy": {
      "href": "https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdlexaMple"
    },
    "accounts": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/accounts"
    },
    "groups": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/groups"
    },
    "accountStoreMappings": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/accountStoreMappings"
    },
    "loginAttempts": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/loginAttempts"
    },
    "passwordResetTokens": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/passwordResetTokens"
    },
    "apiKeys": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/apiKeys"
    },
    "verificationEmails": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/verificationEmails"
    },
    "authTokens": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/authTokens"
    },
    "samlPolicy" : {
      "href" : "http://localhost:9191/v1/samlPolicies/QONHxosYAWIwIvZnFA85E"
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
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/$APPLICATION_ID?expand=tenant,accounts(offset:0,limit:50)"

This query would retrieve the specified Application, with the associated Tenant resource and Accounts collection expanded. The expanded Accounts collection would be returned with an ``offset`` of 0 and a result ``limit`` of 50.

**Disable an Application**

.. code-block:: bash

    curl --request POST \
    --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
    --header 'content-type: application/json' \
    --url "https://api.stormpath.com/v1/applications/$APPLICATION_ID" \
    --data '{
    "status":"disabled"
    }'

This query would disable the Application and prevent any associated Accounts from logging in.

.. _get-refs-via-app:

Using an Application for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, independent, resources using the Application for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/tenants/$APPLICATION_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a resource of the specified type. Possible resource types are: ``accounts`` and ``groups``. These collections can also be :ref:`paginated <about-pagination>` and :ref:`sorted <about-sorting>`.

    * - GET /v1/tenants/$APPLICATION_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Application's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with an Application are: ``accounts``, ``groups``.

Application Endpoints
---------------------

There are certain resources that are exposed by the Application as endpoints. This means that they cannot be retrieved using ``GET`` calls :ref:`like other resources <get-refs-via-app>`, but are instead used for other flows. These are detailed in this section.

.. _ref-loginattempts:

Login Attempts
^^^^^^^^^^^^^^

A ``POST`` is sent to this endpoint in order to authenticate an Account. For in-depth more information, please see :ref:`how-login-works`.

**loginAttempts URL**

``/v1/applications/$APPLICATION_ID/loginAttempts``

**loginAttempts Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
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

This is an example of a well-formed JSON body that could be sent to the ``/loginAttempts`` endpoint.

.. code-block:: json

  {
      "type": "basic",
      "value": "YmFzZTY0LWVuY29kZWQtbG9naW4tYW5kLXBhc3N3b3Jk"
      "accountStore": {
           "href": "https://api.stormpath.com/v1/groups/$YOUR_GROUP_ID"
     }
  }

.. _ref-password-reset-token:

Password Reset Tokens
^^^^^^^^^^^^^^^^^^^^^

This is the endpoint for Password Reset Tokens that are passed as part of the :ref:`Password Reset Flow <password-reset-flow>`. When you send a POST to an Application's ``/passwordResetTokens`` endpoint with a valid email address (and, optionally, accountStore information), you will receive back the Password Reset Token. For a full description, please see the :ref:`Password Reset Flow <password-reset-flow>` section.

**passwordResetTokens URL**

``/v1/applications/$APPLICATION_ID/passwordResetTokens``

**passwordResetTokens Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``href``
      - Link
      - N/A
      - The resource's fully qualified location URL.

    * - ``email``
      - String
      - Must correspond to an existing Stormpath Account.
      - Email address of the Account for which the password reset will occur. This is the value that must be passed in order to trigger the token generation.

    * - ``account``
      - Link
      - N/A
      - A link to the Account for which the password reset will occur.

**passwordResetTokens Example**

This is an example of the JSON response to a successful POST to the ``/passwordResetTokens`` endpoint.

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR/passwordResetTokens/eyJraWQiOiIxZ0JUbmNXc3AyT2JRR2dEbjlSOTFSIiwiYWxnIjoiSFMeXAMpLE.eyJleHAiOjE0NDc4ODU1ODIsImp0aSI6IjFucDE1UkJVTXJQR0FxSlVpOGVJYlEifQ.AiL5ejbhPnjzxOWZkZGrAfYP8KvqT62r_zktvlkGQE0",
    "email": "capt@enterprise.com",
    "account": {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple"
    }
  }

.. _ref-verification-email:

Verification Email
^^^^^^^^^^^^^^^^^^

This endpoint is used to trigger the resending of a verification email. For more information, see :ref:`resending-verification-email`.

Auth Tokens
^^^^^^^^^^^

This endpoint is used for token validation. For more information see :ref:`about-token-validation`.

.. _ref-oauth-token:

OAuth Token
^^^^^^^^^^^

This endpoint's URL is found as part of the :ref:`ref-oauth-policy` resource. It is used to generate OAuth 2.0 tokens. For more information see :ref:`token-authn-config`.

Other Resources Associated with an Application
----------------------------------------------

These are the other resources that can be found associated with any particular Application.

.. _ref-application-apikeys:

Application API Keys
^^^^^^^^^^^^^^^^^^^^

A ``GET`` can be sent to this endpoint along with an :ref:`API Key <ref-account-apikeys>` ID, in order to retrieve the Account associated with that API Key.

**Application apiKeys URL**

``/v1/applications/$APPLICATION_ID/apiKeys?id=$SP_API_KEY_ID``

If you would like to retrieve the API Key with the :ref:`ref-account` expanded you can include the ``?expand=account`` parameter.

**Application apiKeys Attributes**

This call would return an :ref:`API Key <ref-account-apikeys>`.

.. _ref-oauth-policy:

OAuth Policy
^^^^^^^^^^^^

This resource contains information about the Application's OAuth Policy. For more information about how this is used, see :ref:`token-authn-config`.

**oAuthPolicy URL**

``/v1/oAuthPolicies/$DIRECTORY_ID``

**oAuthPolicy Attributes**

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``href``
      - Link
      - N/A
      - The resource's fully qualified location URL.

    * - ``accessTokenTtl``
      - String
      - ISO-8601
      - The time-to-live for the OAuth Access Token, represented as an `ISO 8601 Duration <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

    * - ``refreshTokenTtl``
      - String
      - ISO-8601
      - The time-to-live for the OAuth Refresh Token, represented as an `ISO 8601 Duration <https://en.wikipedia.org/wiki/ISO_8601#Durations>`_.

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``modifiedAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

    * - ``tokenEndpoint``
      - Link
      - N/A
      - The location of the :ref:`OAuth Token <ref-oauth-token>` generation endpoint.

    * - ``application``
      - Link
      - N/A
      - A link to the Application associated with this Policy.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant associated with this Policy.

**oAuthPolicy Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/oAuthPolicies/1gk4Dxzi6o4PbdlexaMple",
    "accessTokenTtl":"PT30M",
    "refreshTokenTtl":"P7D",
    "createdAt":"2015-08-18T20:46:36.063Z",
    "modifiedAt":"2015-09-01T14:18:14.709Z",
    "tokenEndpoint":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple/oauth/token"
    },
    "application":{
      "href":"https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple"
    },
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDexAMPLE"
    }
  }

.. _ref-samlpolicy:

SAML Policy Resource
^^^^^^^^^^^^^^^^^^^^

This resource contains information about the Application's SAML policy. For more information about this, please see :ref:`saml-authn`.

**samlPolicy URL**

``https://api.stormpath.com/v1/applicationSamlPolicies/$POLICY_ID``

**samlPolicy Attributes**

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
      - The resource's fully qualified location URL.

    * - ``serviceProvider``
      - Object
      - N/A
      - The embedded Service Provider resource. This contains the ``ssoInitiationEndpoint`` URL that is used to initiate the Service Provider initiated SAML flow, as well as the ``defaultRelayStates`` endpoint used for IdP-initiated SAML authentication.

**samlPolicy Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/applicationSamlPolicies/$POLICY_ID",
    "serviceProvider": {
      "href": "https://api.stormpath.com/v1/samlServiceProviders/$SERVICE_PROVIDER_ID",
        "ssoInitiationEndpoint": {
          "href": "https://api.stormpath.com/v1/applications/$APPLICATION_ID/saml/sso/idpRedirect"
        },
        "defaultRelayStates": {
          "href": "https://api.stormpath.com/v1/samlServiceProviders/$SERVICE_PROVIDER_ID/defaultRelayStates"
        }
    }
  }

.. _ref-asm:

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

An individual Account Store Mapping resource may be accessed via its Resource URL:

**accountStoreMapping URL**

``/v1/accountStoreMappings/$ACCOUNT_STORE_MAPPING_ID``

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
      - The resource's fully qualified location URL.

    * - ``listIndex``
      - Number
      - 0 <= N < list size
      - The order (priority) in which the associated Account Store will be consulted by the Application during an authentication attempt. This is a zero-based index; an Account Store with a ``listIndex`` of ``0`` will be consulted first (has the highest priority), followed by the Account Store at ``listIndex`` ``1`` (next highest priority), and so on. Setting a negative value will default the value to 0, placing it first in the list. A ``listIndex`` of larger than the current list size will place the mapping at the end of the list and then default the value to ``(list size - 1)``.

    * - ``isDefaultAccountStore``
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Accounts created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they will not.

    * - ``isDefaultGroupStore``
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Groups created by the Application will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they won't. **This may only be set to true if the Account Store is a Directory. Stormpath does not currently support Groups storing other Groups**.

    * - ``application``
      - Link
      - N/A
      - A link to the mapping’s Application. **Required.**

    * - ``accountStore``
      - Link
      - N/A
      - A link to the mapping's Account Store (Group, Directory or Organization) containing Accounts that may log in to the application. **Required.**

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``modifiedAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

**Account Store Mapping Example**

.. code-block:: json

    {
      "href": "https://api.stormpath.com/v1/accountStoreMappings/1NUhrCPT0q66bjy6Yv9nS4",
      "listIndex": 0,
      "isDefaultAccountStore": true,
      "isDefaultGroupStore": true,
      "application": {
        "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlexaMple"
      },
      "accountStore": {
        "href": "https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYReXample"
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
      - Retrieves the specified Account Store Mapping resource. ``accountStore` and ``application`` can be expanded. More info :ref:`above <about-links>`.

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
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/accountStoreMappings/1NUhrCPT0q66bjyeXamPLE?expand=application,accountStore"

This query would retrieve the specified Account Store Mapping with the Application and accountStore entities embedded with :ref:`link expansion <about-links>`.

**Updating an Account Store Mapping's login priority**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
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

An individual Directory resource may be accessed via its Resource URL:

**Directory URL**

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
    - The resource's fully qualified location URL.

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
    - ``ENABLED`` , ``DISABLED``
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
    - Link
    - N/A
    - A link to the owning :ref:`Tenant <ref-tenant>`.

  * - ``provider``
    - Link
    - N/A
    - A link to the Directory's :ref:`Provider <ref-provider>`.

  * - ``customData``
    - Link
    - N/A
    - A link to the Directory's :ref:`customData <ref-customData>` resource that you can use to store your own Directory-specific custom fields.

  * - ``passwordPolicy``
    - Link
    - N/A
    - A link to the Directory’s :ref:`Password Policy <ref-password-policy>`.

  * - ``accountCreationPolicy``
    - Link
    - N/A
    - A link to the Directory’s :ref:`Account Creation Policy <ref-accnt-creation-policy>`.

  * - ``accounts``
    - Link
    - N/A
    - A link to a collection of the :ref:`Accounts <ref-account>` owned by this Directory.

  * - ``applicationMappings``
    - Link
    - N/A
    - A link to a collection of any :ref:`accountStoreMapping <ref-asm>` resources that include this Directory.

  * - ``applications``
    - Link
    - N/A
    - A link to a collection of all the :ref:`Applications <ref-application>` mapped to this Directory.

  * - ``groups``
    - Link
    - N/A
    - A link to a collection of the :ref:`Groups <ref-group>` mapped to this Directory.

  * - ``organizations``
    - Link
    - N/A
    - A link to a collection of the :ref:`Organizations <ref-organization>` mapped to this Directory.

  * - ``organizationMappings``
    - Link
    - N/A
    - A link to a collection of any :ref:`organizationAccountStoreMappings <ref-org-asm>` resources that include this Directory.


**Directory Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe",
    "name":"Captains",
    "description":"Captains from a variety of stories",
    "status":"ENABLED",
    "createdAt":"2015-08-24T15:32:23.079Z",
    "modifiedAt":"2015-08-24T15:32:23.079Z",
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExaMPLe"
    },
    "provider":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/provider"
    },
    "customData":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/customData"
    },
    "passwordPolicy":{
      "href":"https://api.stormpath.com/v1/passwordPolicies/2SKhstu8PlaekcaexaMPLe"
    },
    "accountCreationPolicy":{
      "href":"https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaexaMPLe"
    },
    "accounts":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/accounts"
    },
    "applicationMappings":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/applicationMappings"
    },
    "applications":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/applications"
    },
    "groups":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/groups"
    },
    "organizations":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/organizations"
    },
    "organizationMappings":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe/organizationMappings"
    }
  }

.. _directory-operations:

Directory Operations
--------------------

.. contents::
    :local:
    :depth: 1

Create a Directory
^^^^^^^^^^^^^^^^^^

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

Retrieve a Directory
^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^

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
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/bckhcGMXQDujIXpeXAMple" \
  --data '{
    "status" : "DISABLED"
    }'

This query would disable the specified Directory, which would mean that all of its associated Accounts and Groups would be unable to log in to any Application that this Directory was mapped to as an Account Store.

**Retrieve Directory with Tenant embedded**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/bckhcGMXQDujIXpeXAMple?expand=tenant" \

This query would retrieve the specified Directory with the Tenant resource embedded via :ref:`link expansion <about-links>`.

Using A Directory for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, independent, resources using the Directory for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/tenants/$DIRECTORY_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a resource of the specified type. Possible resource types are: ``accounts`` and ``groups``.

    * - GET /v1/tenants/$DIRECTORY_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Directory's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with a Directory are: ``accounts`` and ``groups``

Other Resources Associated with a Directory
-------------------------------------------

.. _ref-accnt-creation-policy:

Account Creation Policy
^^^^^^^^^^^^^^^^^^^^^^^

A Directory’s Account Creation Policy resource contains data and attributes that control what Stormpath does when an Account is created. This includes email verification and welcome emails.

**Account Creation Policy URL**

``https://api.stormpath.com/v1/accountCreationPolicies/$DIRECTORY_ID``

**Account Creation Policy Attributes**

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

  * - ``verificationEmailStatus``
    - String
    - ``ENABLED``, ``DISABLED``
    - The status of the verification email workflow. If this is set to ``ENABLED``, Stormpath will send an email to a newly registered user to have them verify their email. The email sent is configurable through the ``verificationEmailTemplates`` attribute.

  * - ``verificationSuccessEmailStatus``
    - String
    - ``ENABLED``, ``DISABLED``
    - The status of the verification success email. If this is set to ``ENABLED``, Stormpath will send an email to a newly verified user to let them know that they have successfully verified their email. The email sent is configurable through the ``verificationSuccessEmailTemplates`` attribute.

  * - ``welcomeEmailStatus``
    - String
    - ``ENABLED``, ``DISABLED``
    - The status of the welcome email. If this is set to ``ENABLED``, Stormpath will send an email to a newly registered user (if ``verificationEmailStatus`` is set to ``DISABLED``) or a newly verified user (if ``verificationEmailStatus`` is set to ``ENABLED``). The email sent is configurable through the ``welcomeEmailTemplates`` attribute.

  * - ``verificationEmailTemplates``
    - Link
    - N/A
    - A collection of :ref:`email templates <ref-emailtemplates>` that can be used for sending the verification email.

  * - ``verificationSuccessEmailTemplates``
    - Link
    - N/A
    - A collection of :ref:`email templates <ref-emailtemplates>` that can be used for sending the verification success email.

  * - ``welcomeEmailTemplates``
    - Link
    - N/A
    - A collection of :ref:`email templates <ref-emailtemplates>` that can be used for sending a welcome email.

**Account Creation Policy Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaexaMPLe",
    "verificationEmailStatus":"DISABLED",
    "verificationSuccessEmailStatus":"DISABLED",
    "welcomeEmailStatus":"DISABLED",
    "verificationEmailTemplates":{
      "href":"https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaexaMPLe/verificationEmailTemplates"
    },
    "verificationSuccessEmailTemplates":{
      "href":"https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaexaMPLe/verificationSuccessEmailTemplates"
    },
    "welcomeEmailTemplates":{
      "href":"https://api.stormpath.com/v1/accountCreationPolicies/2SKhstu8PlaekcaexaMPLe/welcomeEmailTemplates"
    }
  }

.. _ref-password-policy:

Password Policy
^^^^^^^^^^^^^^^

The Directory's Password Policy is configured inside the passwordPolicy resource. Specifically, this resource contains information about how passwords are reset and links to further information about the strength requirements for a user's password. The Account Management chapter has more information about the :ref:`Password Reset Flow <password-reset-flow>`.

**Password Policy URL**

``/v1/passwordPolicies/$DIRECTORY_ID``

**passwordPolicy Attributes**

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

  * - ``resetTokenTtl``
    - Number
    - A positive integer, less than 169 (0 < i < 169). Default is 24.
    - An integer that defines how long the password reset token is valid for during the password reset email workflow.

  * - ``resetEmailStatus``
    - String
    - ``ENABLED`` or ``DISABLED``
    - The status of the reset email workflow. If this is set to ``ENABLED``, then Stormpath will allow for passwords to be reset through the email workflow and will use the template that is stored in the passwordPolicy’s ``resetEmailTemplates``.

  * - ``strength``
    - Link
    - N/A
    - A link to the password strength requirements for the Directory.

  * - ``resetEmailTemplates``
    - Link
    - N/A
    - A collection of :ref:`email templates <ref-emailtemplates>` that can be used for sending the password reset email. A template stores all relevant attributes  needed for an email. This is a collection but currently only allows one value. It is not possible to create new ``resetEmailTemplates`` with a POST.

  * - ``resetSuccessEmailStatus``
    - String
    - ``ENABLED`` or ``DISABLED``
    - The status of the reset success email. If this is set to ``ENABLED``, then Stormpath will send the email when an Account’s password reset email workflow is successful. The email template that is sent is defined in the passwordPolicy’s ``resetSuccessEmailTemplates``.

  * - ``resetSuccessEmailTemplates``
    - Link
    - N/A
    - A collection of :ref:`email templates <ref-emailtemplates>` that can be used for sending password reset success emails. A template stores all relevant attributes needed for an email. This is a collection but currently only allows one value. It is not possible to create new ``resetEmailTemplates`` with a POST.

  * - ``createdAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.

.. _ref-emailtemplates:

Email Templates
^^^^^^^^^^^^^^^

This resource defines the contents of emails that are sent as part of the Account creation and password reset flows. For more information about templates and how to customize them, see the :ref:`Account Management chapter <customizing-email-templates>`.

**EmailTemplate URL**

``/v1/emailTemplates/$EMAILTEMPLATE_ID"``

**emailTemplate Attributes**

.. list-table::
  :widths: 15 10 20 60
  :header-rows: 1

  * - Property
    - Type
    - Valid Value(s)
    - Description

  * - ``fromEmailAddress``
    - String
    - N/A
    - The address that appears in the email's "from" field.

  * - ``fromName``
    - String
    - N/A
    - The name that appears in the email's "from" field

  * - ``subject``
    - String
    - N/A
    - The subject that appears in the email's subject field

  * - ``htmlBody``
    - String
    - See below.
    - The body of the email in HTML format. This body is only sent when the ``mimeType`` for the template is set to ``text/html`` or ``multipart/alternative``. This body can take valid HTML snippets.

  * - ``textBody``
    - String
    - See below.
    - The body of the email is plain text format. This body is only sent when the ``mimeType`` for the template is set to ``text/plain`` or ``multipart/alternative``.

  * - ``mimeType``
    - String
    - ``text/plain`` or ``text/html`` or ``multipart/alternative``
    - A property that defines whether Stormpath will send an email as plaintext, HTML, or both.

  * - ``defaultModel``
    - Object
    - Object that includes one property ``linkBaseUrl`` which is itself a String
    - An object that defines the model of the email template. The defaultModel currently holds one value, which is the ``linkBaseUrl``. The linkBaseUrl is used when using the macro ${url} in an email template. This macro generates a URL that includes the ``linkBaseUrl`` and the ``sptoken`` used in account creation and password reset workflows.

.. _ref-email-macros:

Macros
""""""

The ``htmlBody`` and ``textBody`` fields support the use of macros. For a full account of what macros are and how to use them, see :ref:`customizing-email-templates`.

.. list-table::
  :widths: 30 70
  :header-rows: 1

  * - Macro
    - Description

  * - ${account.givenName}
    - The Account's first name.

  * - ${account.surname}
    - The Account's surname.

  * - ${account.fullName}
    - The Account's full name (first name and surname).

  * - ${account.username}
    - The Account's username.

  * - ${account.email}
    - The Account's email.

  * - ${account.directory.name}
    - The name of the Directory that the Account belongs to.

  * - $!{application.name}
    - The name of the Application that the Account belongs to. Should always be used with the ``!`` :ref:`quiet reference notation <quiet-macro-reference>`.

  * - $!{application.customData.$KEY}
    - Some value from the Application's customData resource. Replace ``$KEY`` with a key from the Application's Custom Data. Should always be used with the ``!`` :ref:`quiet reference notation <quiet-macro-reference>`.

  * - $!{account.customData.$KEY}
    - Some value from the Account's customData resource. Replace ``$KEY`` with a key from the Account's Custom Data. Should always be used with the ``!`` :ref:`quiet reference notation <quiet-macro-reference>`.

  * - $!{account.directory.customData.$KEY}
    - Some value from the Directory’s customData resource. Replace ``$KEY`` with a key from the Directory's Custom Data. Should always be used with the ``!`` :ref:`quiet reference notation <quiet-macro-reference>`.

  * - ${url}
    - The ``linkBaseUrl`` value from the template's associated ``defaultModel`` object.

  * - ${sptoken}
    - The value of the Stormpath token for password reset.

  * - ${sptokenNameValuePair}
    - A string that is shown as "sptoken=$TOKEN" Where "$TOKEN" is either the verification or password reset token.

.. note::

  For more information about customizing email templates, please see :ref:`customizing-email-templates`.

.. _ref-password-strength:

Password Strength
^^^^^^^^^^^^^^^^^

The Password Strength Policy for a Directory can be modified through the Administrator Console and through the REST API. Password Strength Policy is part of the Directory’s Password Policy and can be accessed through the ``strength`` attribute.

**Strength URL**

``/v1/passwordPolicies/$DIRECTORY_ID/strength``

**strength Attributes**

.. list-table::
  :widths: 15 10 20 60
  :header-rows: 1

  * - Attribute
    - Type
    - Valid Value(s)
    - Description

  * - ``maxLength``
    - Number
    - Default is 100
    - Represents the maximum length for a password. For example ``maxLength`` of ``10`` indicates that a password can have no more than 10 characters.

  * - ``minLength``
    - Number
    - Default is 8
    - Represents the minimum length for a password. For example ``minLength`` of ``5`` requires that a password has no less than 5 characters.

  * - ``minLowerCase``
    - Number
    - Default is 1
    - Represents the minimum number of lower case characters required for the password. characters

  * - ``minNumeric``
    - Number
    - Default is 1
    - Represents the minimum number of numeric characters required for the password.

  * - ``minSymbol``
    - Number
    - Default is 0
    - Represents the minimum number of symbol characters required for the password.

  * - ``minUpperCase``
    - Number
    - Default is 1
    - Represents the minimum number of upper case characters required for the password.

  * - ``minDiacritic``
    - Number
    - Default is 0
    - Represents the minimum number of diacritic characters required for the password.

.. _ref-provider:

Provider
^^^^^^^^

The Provider resource contains information about the source of the information found in its associated Directory resource.

For example, a Social Directory could be created for GitHub. This Directory would contain Accounts created using "Log In With Github", and its Provider resource would contain information about your Github login integration (e.g. the OAuth Client and Secret required for Github login). An individual Provider resource may be accessed via its Resource URL:

**Provider URL**

``/v1/directories/$DIRECTORY_ID/provider``

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
    - ``stormpath`` (for a Cloud Directory); ``ad`` or ``ldap`` (for LDAP Directories); ``facebook``, ``google``, ``github`` or ``linkedin`` (for Social Directories); ``saml`` (for SAML Directories)
    - Specifies the type of Provider for the associated Directory.

  * - ``clientId``
    - String
    - N/A
    - (Social only) The OAuth 2.0 Client ID for this Provider.

  * - ``clientSecret``
    - String
    - N/A
    - (Social only) The OAuth 2.0 Client Secret for this Provider.

  * - ``redirectURL``
    - String
    - A valid URL
    - (Social only) The URL to redirect to after the user has authenticated. Currently only used for the Google providers.

  * - ``agent``
    - Link
    - N/A
    - (LDAP only) A link to the Provider's Agent. For more information see :ref:`below <ref-ldap-agent>`.

  * - ``ssoLoginUrl``
    - String
    - N/A
    - (SAML only) The URL for the IdP's SSO URL. For more information see :ref:`saml-configuration`.

  * - ``ssoLogoutUrl``
    - String
    - N/A
    - (SAML only) The URL for the IdP's SSO logout endpoint. For more information see :ref:`saml-configuration`.

  * - ``encodedX509SigningCert``
    - Object
    - N/A
    - (SAML only) The public key from the SAML Identity Provider used to sign the assertions that are returned to Stormpath. For more information see :ref:`saml-configuration`.

  * - ``requestSignatureAlgorithm``
    - String
    - ``RSA-SHA256`` (Default), ``RSA-SHA1``
    - (SAML only) The algorithm used by the SAML Identity Provider to sign SAML assertions that are returned to Stormpath. For more information see :ref:`saml-configuration`.

  * - ``attributeStatementMappingRules``
    - Object
    - N/A
    - (SAML only) This object contains the rules that map SAML assertions to Stormpath resource attributes.

  * - ``serviceProviderMetadata``
    - Link
    - N/A
    - (SAML only) This object contains metadata related to your Service Provider. For more information, please see :ref:`Step 3 of the SAML configuration section <configure-sp-in-idp>`.


**Provider Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/directories/2TL06yrJ05EAM9gEXAMpLe/provider",
    "createdAt": "2014-03-28T22:21:32.937Z",
    "modifiedAt": "2014-03-28T22:21:32.949Z",
    "clientId": "5014174166example",
    "clientSecret": "e7c1274966b0844913953281example",
    "providerId": "facebook"
  }

.. _ref-ldap-agent:

LDAP Agent
""""""""""

:ref:`LDAP Directories <about-ldap-dir>` have an associated :ref:`Provider resource <ref-provider>` with either the ``ldap`` or ``ad`` ``providerId``. That Provider in turn contains an **Agent** resource. This Agent is what will scan your LDAP directory and map the accounts and groups in that directory to Stormpath Accounts and Groups.

An Agents collection may be accessed via its Resource URL:

**Agent URL**

``/v1/agents/$DIRECTORY_ID``

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
    - The configuration information for this Agent, as an embedded ``config`` object. For more information see :ref:`below <ref-ldap-agent-config>`.

  * - ``createdAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.

  * - ``directory``
    - Link
    - N/A
    - A link to the Directory resource that the Agent belongs to.

  * - ``download``
    - Link
    - N/A
    - A link that allows this Agent to be downloaded for installation.

  * - ``tenant``
    - Link
    - N/A
    - A link to the Tenant that owns the Directory this Agent belongs to.

For an example JSON see :ref:`below <agent-json-ex>`.

.. _ref-ldap-agent-config:

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
    - The Account configuration information for this Agent, as an embedded ``accountConfig`` object. For more information see :ref:`below <ref-accountconfig>`.

  * - ``groupConfig``
    - Object
    - N/A
    - The Group configuration information for this Agent, as an embedded ``groupConfig`` object. For more information see :ref:`below <ref-groupconfig>`.

  * - ``referralMode``
    - String
    - ``follow``, ``ignore``
    - Prevents referral problems for Active Directory servers that are not configured properly for DNS.

  * - ``ignoreReferralIssues``
    - Boolean
    - N/A
    - Referral issues can arise when querying an Active Directory server without proper DNS. Setting this as true ignores referral exceptions and allows (potentially partial) results to be returned.

For an example JSON see :ref:`below <agent-json-ex>`.

.. _ref-accountconfig:

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

.. _ref-groupconfig:

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

An individual Group resource may be accessed via its Resource URL:

**Group URL**

``/v1/groups/$GROUP_ID``

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
    - ``ENABLED``, ``DISABLED``
    - ``ENABLED`` Groups are able to authenticate against an Application. ``DISABLED`` Groups cannot authenticate against an Application.

  * - ``createdAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.

  * - ``customData``
    - Link
    - N/A
    - A link to the Group’s customData resource that you can use to store your own Group-specific custom fields.

  * - ``directory``
    - Link
    - N/A
    - A link to the Directory resource that the Group belongs to.

  * - ``tenant``
    - Link
    - N/A
    - A link to the Tenant that owns the Directory containing this Group.

  * - ``accounts``
    - Link
    - N/A
    - A link to a collection of the Accounts that are contained within this Group.

  * - ``accountMemberships``
    - Link
    - N/A
    - A link to a collection of groupMemberships that this Group is found in.

  * - ``applications``
    - Link
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
      "href": "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe"
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
----------------

.. contents::
    :local:
    :depth: 1

Create a Group
^^^^^^^^^^^^^^

Groups must be created under a specified Directory resource.

.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Optional Parameters
      - Description

    * - POST v1/directories/$DIRECTORY_ID/groups
      - Required: ``name``; Optional: ``description``, ``status``
      - N/A
      - Creates a new Group resource.

Retrieve a Group
^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/groups/$GROUP_ID
      - ``expand``
      - Retrieves the specified Group. ``tenant``, ``directory`` and ``accounts`` can be expanded. More info :ref:`above <about-links>`.

Update a Group
^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/groups/$GROUP_ID
      - ``name``, ``description``, ``status``
      - Updates the specified attributes with the values provided.

Delete a Group
^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/groups/$GROUP_ID
      - N/A
      - Deletes the specified Group resource.


Example Queries
"""""""""""""""

**Example Description**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/groups/ZgoHUG0oSoVNeU0ExaMPLE?expand=tenant,directory,accounts(offset:0,limit:50)"

This query would retrieve a Group resource along with its associated Tenant and Directory resources embedded via link expansion. It would also return with the embedded collection of associated Accounts, to a maximum of 50 Accounts in this particular return payload.

**Disable a Group**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/groups/ZgoHUG0oSoVNeU0ExaMPLE" \
  --data '{ \
   "status" : "DISABLED" \
 }'

This query would disable a Group, which means that any associated Accounts would not be able to log in to any Applications that they were mapped to.

Using a Group for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, associated resources using the Group for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/groups/$GROUP_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a collection of all of a Group's associated resources of the specified type. Possible resource types are: ``accounts`` and ``applications``.

    * - GET /v1/groups/$GROUP_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Group's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with a Group are: ``accounts`` and ``applications``.

.. _ref-groupmembership:

Group Membership
================

.. contents::
    :local:
    :depth: 2

Accounts and Groups are linked via a **groupMembership** resource that stores this Account-to-Group link. Each Account you add to a Group has its own groupMembership resource created.

**groupMembership URL**

``v1/groupMemberships/$GROUP_MEMBERSHIP_ID``

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
    - Link
    - N/A
    - A link to the Account for this Group Membership.

  * - ``group``
    - Link
    - N/A
    - A link to the Group for this Group Membership.

**Group Membership Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/groupMemberships",
    "offset":0,
    "limit":25,
    "size":1,
    "items":[
      {
        "href":"https://api.stormpath.com/v1/groupMemberships/1ufdzvjTWThoqnHexaMple",
        "account":{
          "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdexaMple"
        },
        "group":{
          "href":"https://api.stormpath.com/v1/groups/1ORBsz2iCNpV8yJexaMple"
        }
      }
    ]
  }

.. _groupmembership-operations:

Group Membership Operations
---------------------------

.. contents::
    :local:
    :depth: 1

Create a Group Membership
^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Optional Parameters
      - Description

    * - POST /v1/groupMemberships/$GROUP_MEMBERSHIP_ID
      - Required: ``account``, ``group``
      - N/A
      - Creates a new groupMembership resource.

Retrieve a Group Membership
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/groupMemberships/$GROUP_MEMBERSHIP_ID
      - ``expand``
      - Retrieves the specified groupMembership. ``account`` and ``group`` can be expanded. More info :ref:`above <about-links>`.

Update a Group Membership
^^^^^^^^^^^^^^^^^^^^^^^^^

A groupMembership resource cannot be updated once it has been created.

Delete a Group Membership
^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/groupMemberships/$GROUP_MEMBERSHIP_ID
      - N/A
      - Deletes the specified groupMembership resource.


Example Queries
"""""""""""""""

**Deleting a Group Membership**

.. code-block:: bash

  curl --request DELETE \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/groupMemberships/57YZCqrNgrzcIGYexaMpLe"

This query would delete the groupMembership resource.

**Retrieving a Group Membership with its Account expanded**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/groupMemberships/57YZCqrNgrzcIGYexaMpLe?expand=account"

This query would retrieve the groupMembership resource with the associate Account expanded inside the JSON.

.. _ref-organization:

Organization
============

.. contents::
    :local:
    :depth: 2

**Description**

The Organization resource is two things:

1. A top-level container for both :ref:`Directories <ref-directory>` and :ref:`Groups <ref-group>` .
2. A pseudo-Account Store that can :ref:`be mapped to an Application <create-asm>` (just like a Directory or Group) for the purposes of user login. Unlike Directories and Groups, however, they do not themselves own Accounts, and Users and Groups cannot be associated to them without also being associated with a Directory.

Organizations are primarily intended to represent "tenants" in multi-tenant applications. For more information about multitenancy in Stormpath, see the :ref:`multitenancy` chapter.

An individual Organization resource may be accessed via its Resource URL:

**Organization URL**

``/v1/organizations/$ORGANIZATION_ID``

**Organization Attributes**

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

  * - ``createdAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.

  * - ``name``
    - String
    - 1 <= N <= 255 characters.
    - The name of the Organization. Must be unique across all Organizations within your Stormpath Tenant.

  * - ``nameKey``
    - String
    - 1 <= N <= 63 characters.
    - A name key that represents the Organization. Must be unique across all organizations within your Stormpath tenant and must follow `DNS hostname rules <http://www.ietf.org/rfc/rfc0952.txt>`_. That is, it may only consist of: a-z, 0-9, and -. It must not start or end with a hyphen. The uniqueness constraint is case insensitive.

  * - ``status``
    - String (Enum)
    - ``ENABLED``, ``DISABLED``
    - Indicates whether the Organization is enabled or not. Enabled Organizations can be used as Account Stores for applications; disabled Organizations cannot.

  * - ``description``
    - String
    - 0 < N <= 1000 characters
    - The description of the Organization.

  * - ``customData``
    - Link
    - N/A
    - A link to the Organization's customData resource that you can use to store your own Organization-specific custom fields.

  * - ``defaultAccountStoreMapping``
    - Link
    - ``null`` or Link
    - A link to this Organization's default Account Store Mapping where the organization will store newly created Accounts. A ``null`` value disables the ability to add Groups to the Organization via the ``organizations/$ORGANIZATION_ID/accounts`` endpoint.

  * - ``defaultGroupStoreMapping``
    - Link
    - ``null`` or Link
    - A link to this Organization's default Account Store Mapping where the organization will store newly created Groups. A ``null`` value disables the ability to add Groups to the Organization via the ``organizations/$ORGANIZATION_ID/groups`` endpoint.

  * - ``accountStoreMappings``
    - Link
    - N/A
    - A link to the collection of all Account Store Mappings that represent the Organization. The Accounts and Groups within the mapped Account Stores are obtainable from the ``accounts`` and ``groups`` links, respectively.

  * - ``groups``
    - Link
    - N/A
    - A link to a collection of the Groups wrapped by this Organization.

  * - ``accounts``
    - Link
    - N/A
    - A link to a collection of the Accounts wrapped by this Organization. All of the Accounts in this collection can log-in to the Organization.

  * - ``tenant``
    - Link
    - N/A
    - A link to the Stormpath Tenant that owns this Organization.

**Organization Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE",
    "createdAt":"2015-10-01T17:39:04.114Z",
    "modifiedAt":"2015-10-01T17:39:04.114Z",
    "name":"Canadian Imperial Bank of Commerce",
    "nameKey":"cibc",
    "status":"ENABLED",
    "description":null,
    "customData":{
      "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE/customData"
    },
    "defaultAccountStoreMapping":null,
    "defaultGroupStoreMapping":null,
    "accountStoreMappings":{
      "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE/accountStoreMappings"
    },
    "groups":{
      "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE/groups"
    },
    "accounts":{
      "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE/accounts"
    },
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExaMPLe"
    }
  }

.. _organization-operations:

Organization Operations
--------------------------------

.. contents::
    :local:
    :depth: 1

Create an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Optional Parameters
      - Description

    * - POST /v1/organizations
      - Required: ``name``, ``nameKey``; Optional: ``status``, ``description``, ``customData``
      - N/A
      - Creates a new Organization resource

Retrieve an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

  If you don’t have the Organization's URL, you can find it by looking it up in the Stormpath Admin Console or by searching your Tenant’s Organizations by sending a GET to ``/v1/tenants/$TENANT_ID/organizations``.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/organizations/$ORGANIZATION_ID
      - ``expand``
      - Retrieves the specified Organization. ``groups``, ``accounts``, and ``tenant`` can be expanded. More info :ref:`above <about-links>`.

Update an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/organizations/$ORGANIZATION_ID
      - ``name``, ``nameKey``, ``description``, ``status``, ``customData``
      - Updates the specified attributes with the values provided.

Delete an Organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning::

  Deleting an Organization completely erases it and any of its related data from Stormpath. We recommend that you disable the Organization instead of deleting it if you anticipate that you might use it again or if you want to retain its data for historical reference. To disable an Organization, you can update the Organization and set the ``status`` attribute to ``DISABLED``.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/organizations/$ORGANIZATION_ID
      - N/A
      - Deletes the specified Organization.


Example Queries
"""""""""""""""

**Create a new Organization resource**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/organizations" \
  --data '{ \
    "name": "Finance Organization",
    "nameKey": "finance",
    "status": "ENABLED"
    }'

This query would create a new Organization with the attribute values.

**Disable an Organization**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/organizations"
  --data '{ \
    "status": "DISABLED"
    }'

This query would disable the Organization. No Accounts mapped to an Application via this Organization would be able to log in.

Using an Organization for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, associated resources using the Organization for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/organizations/$ORGANIZATION_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a collection of all of an Organization's associated resources of the specified type. Possible resource types are: ``accounts``, ``accountStoreMappings``, and ``groups``.

    * - GET /v1/Organization/$ORGANIZATION_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Organization's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Searchable collections associated with an Organization are: ``accounts``, and ``groups``.

.. _ref-org-asm:

Organization Account Store Mapping
==================================

.. contents::
    :local:
    :depth: 2

**Description**

In the same way that :ref:`Account Store Mappings <ref-asm>` map Groups, Directories, or Organizations to Applications, so Organization Account Store Mappings map Groups or Directories to Organizations.

An individual Organization Account Store Mapping resource may be accessed via its Resource URL:

**organizationAccountStoreMapping URL**

``/v1/organizationAccountStoreMappings/$ORG_ACCOUNT_STORE_MAPPING_ID``

**organizationAccountStoreMapping Attributes**

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

    * - ``listIndex``
      - Number
      - 0 <= N < list size
      - The order (priority) in which the associated Account Store will be consulted by the Application during an authentication attempt. This is a zero-based index; an Account Store with a ``listIndex`` of ``0`` will be consulted first (has the highest priority), followed by the Account Store at ``listIndex`` ``1`` (next highest priority), and so on. Setting a negative value will default the value to 0, placing it first in the list. A ``listIndex`` of larger than the current list size will place the mapping at the end of the list and then default the value to ``(list size - 1)``.

    * - ``isDefaultAccountStore``
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Accounts created by the Organization will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they will not.

    * - ``isDefaultGroupStore``
      - String (boolean)
      - ``true``, ``false``
      - A ``true`` value indicates that new Groups created by the Organization will be automatically saved to the mapped Account Store, while a ``false`` value indicates that they won't.

    * - ``organization``
      - Link
      - N/A
      - A link to the mapping’s Organization. **Required.**

    * - ``accountStore``
      - Link
      - N/A
      - A link to the mapping's Account Store (Group or Directory) containing Accounts that may log in to the Organization. **Required.**

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``modifiedAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

**Organization Account Store Mapping Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/organizationAccountStoreMappings/EWHgZiOWPJyD5Pexample",
    "listIndex":0,
    "isDefaultAccountStore":false,
    "isDefaultGroupStore":false,
    "organization":{
      "href":"https://api.stormpath.com/v1/organizations/2P4XOanz26AUomIexaMplE"
    },
    "accountStore":{
      "href":"https://api.stormpath.com/v1/directories/2jw4Kslj97zYjYReXample"
    }
  }

.. _org-asm-operations:

Organization Account Store Mapping Operations
---------------------------------------------

.. contents::
    :local:
    :depth: 1

Create an Organization Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Optional Parameters
      - Description

    * - POST /v1/organizationAccountStoreMappings
      - Required: ``application``, ``accountStore``; Optional: ``listIndex``, ``isDefaultAccountStore``, ``isDefaultGroupStore``
      - N/A
      - Creates a new organizationAccountStoreMapping resource, thereby enabling the Accounts in the specified Store to log in to the specified Organization. By default ``isDefaultAccountStore`` and ``isDefaultGroupStore`` are set to ``false``.

Retrieve an Organization Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/organizationAccountStoreMappings/$ORG_ACCOUNT_STORE_MAPPING_ID
      - ``expand``
      - Retrieves the specified Organization Account Store Mapping resource. ``accountStore` and ``organization`` can be expanded. More info :ref:`above <about-links>`.

Update an Organization Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/organizationAccountStoreMappings/$ORG_ACCOUNT_STORE_MAPPING_ID
      - ``listIndex``, ``isDefaultAccountStore``, ``isDefaultGroupStore``
      - Updates the specified attributes with the values provided.

Delete an Organization Account Store Mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/organizationAccountStoreMappings/$ORG_ACCOUNT_STORE_MAPPING_ID
      - N/A
      - Deletes the specified Organization Account Store Mapping.


Example Queries
"""""""""""""""

**Retrieving an Organization Account Store Mapping with embedded resources**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/organizationAccountStoreMappings/1NUhrCPT0q66bjyeXamPLE?expand=organization,accountStore"

This query would retrieve the specified Organization Account Store Mapping with the Organization and accountStore entities embedded with :ref:`link expansion <about-links>`.

**Updating an Organization Account Store Mapping's login priority**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/organizationAccountStoreMappings/1NUhrCPT0q66bjyeXamPLE?expand=application,accountStore" \
  --data '{
    "listIndex":"0"
    }'

This query would update an Organization Account Store Mapping to give it the highest position in the :ref:`login priority index <how-login-works>`.

.. _ref-account:

Account
=======

.. contents::
    :local:
    :depth: 2

**Description**

An **Account** is a unique identity within a Directory, with a unique ``username`` and ``email``.

.. note::

  Specifying a ``username`` is optional, if not included it will default to the ``email`` value.

An Account can log in to an Application using either the ``email`` or ``username``. Accounts can represent your end users (people), but they can also be used to represent services, daemons, processes, or any “entity” that needs to log in to a Stormpath-enabled application. Additionally, an Account may only exist in a single Directory but may be in multiple Groups owned by that Directory.

An individual Account resource may be accessed via its Resource URL:

**Account URL**

``/v1/accounts/$ACCOUNT_ID``

**Account Attributes**

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

  * - ``username``
    - String
    - 1 < N <= 255 characters
    - The username for the Account. Must be unique across the owning Directory. If not specified, the username will default to the same value as the ``email`` field.

  * - ``email``
    - String
    - 1 < N <= 255 characters
    - The email address for the Account. Must be unique across the owning Directory.

  * - ``password``
    - String
    - 1 < N <= 255 characters
    - The password for the Account. Only include this attribute if setting or changing the Account password.

  * - ``givenName``
    - String
    - 1 < N <= 255 characters
    - The given (first) name for the Account holder.

  * - ``middleName``
    - String
    - 1 < N <= 255 characters
    - The middle (second) name for the Account holder.

  * - ``surname``
    - String
    - 1 < N <= 255 characters
    - The surname (last name) for the Account holder.

  * - ``fullName``
    - String
    - N/A
    - The full name for the Account holder. This is a computed attribute based on the ``givenName``, ``middleName`` and ``surname`` attributes. It cannot be modified. To change this value, change one of the three respective attributes to trigger a new computed value.

  * - ``status``
    - String (Enum)
    - ``ENABLED``, ``DISABLED``, ``unverified``
    - ``ENABLED`` Accounts are able to log in to their assigned Applications, ``DISABLED`` Accounts may not log in to Applications, ``unverified`` Accounts are disabled and have not verified their email address.

  * - ``createdAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource was created.

  * - ``modifiedAt``
    - String
    - ISO-8601 Datetime
    - Indicates when this resource’s attributes were last modified.

  * - ``emailVerificationToken``
    - Link
    - N/A
    - A link to the Account’s email verification token. This will only be set if the Account needs to be verified.

  * - ``customData``
    - Link
    - N/A
    - A link to the Account’s customData resource that you can use to store your own Account-specific custom fields.

  * - ``providerData``
    - Link
    - N/A
    - A link to the information from the owner Directory's Provider.

  * - ``directory``
    - Link
    - N/A
    - A link to the Account's Directory.

  * - ``tenant``
    - Link
    - N/A
    - A link to the Tenant that owns the Account’s Directory.

  * - ``groups``
    - Link
    - N/A
    - A link to a collection of the Groups that the Account belongs to.

  * - ``groupMemberships``
    - Link
    - N/A
    - A link to the :ref:`Group Memberships <ref-groupmembership>` that the Account is in.

  * - ``applications``
    - Link
    - N/A
    - A link to the Applications that the Account belongs to.

  * - ``apiKeys``
    - Link
    - N/A
    - A link to the apiKeys for this Account.

  * - ``accessTokens``
    - Link
    - N/A
    - A collection of valid JSON Web Tokens associated with this Account, used for token-based authentication.

  * - ``refreshTokens``
    - Link
    - N/A
    - A collection of valid JSON Web Tokens associated with this Account, used to generate additional ``accessTokens`` for token-based authentication.

**Account Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple",
    "username":"jlpicard",
    "email":"capt@enterprise.com",
    "givenName":"Jean-Luc",
    "middleName":null,
    "surname":"Picard",
    "fullName":"Jean-Luc Picard",
    "status":"ENABLED",
    "createdAt":"2015-08-25T19:57:05.976Z",
    "modifiedAt":"2015-08-25T19:57:05.976Z",
    "emailVerificationToken":null,
    "customData":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/customData"
    },
    "providerData":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey/providerData"
    },
    "directory":{
      "href":"https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaexaMPLe"
    },
    "tenant":{
      "href":"https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgExaMPLe"
    },
    "groups":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/groups"
    },
    "applications":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/applications"
    },
    "groupMemberships":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/groupMemberships"
    },
    "apiKeys":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/apiKeys"
    },
    "accessTokens":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/accessTokens"
    },
    "refreshTokens":{
      "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/refreshTokens"
    }
  }

.. _account-operations:

Account Operations
------------------

.. contents::
    :local:
    :depth: 1

Create an Account
^^^^^^^^^^^^^^^^^

Because an Account is "owned" by a Directory, you can add it either directly through the Directory that owns it, or indirectly via an Application or Organization that has that Directory as an Account Store:

.. list-table::
    :widths: 30 15 15 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Optional Parameters
      - Description

    * - POST /v1/directories/$DIRECTORY_ID/accounts *or* /v1/applications/$APPLICATION_ID/accounts *or* /v1/organizations/$ORGANIZATION_ID/accounts
      - Required: ``email``, ``password``, ``givenName``, ``surname``; Optional: ``username``, ``middleName``, ``status``, ``customData``
      - ``registrationWorkflowEnabled=false``, ``passwordFormat=mcf`` (see note below)
      - Creates a new Account resource.

.. note::

  The ``registrationWorkflowEnabled=false`` parameter disables the default Registration Workflow. For more information about Workflows, please see the `Admin Console Guide <http://docs.stormpath.com/console/product-guide/#directory-workflows>`__. The ``passwordFormat=mcf`` parameter is used for :ref:`importing-mcf`.

Retrieve an Account
^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/accounts/$ACCOUNT_ID
      - ``expand``
      - Retrieves the specified Account. ``customData``, ``tenant``, ``directory``, ``groups`` and ``groupMemberships`` can be expanded. More info :ref:`above <about-links>`. Also, since ``groups`` and ``groupMemberships`` are collections, they can be expanded and :ref:`paginated <about-pagination>`.

Update an Account
^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/accounts/$ACCOUNT_ID
      - ``username``, ``email``, ``password``, ``givenName``, ``middleName``, ``surname``, ``status``, ``customData``
      - Updates the specified attributes with the values provided.

Delete an Account
^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/accounts/$ACCOUNT_ID
      - N/A
      - Deletes the specified

.. warning::

  Be careful deleting an Account for a single application’s needs - ensure that the deletion is OK for any and all applications that may be associated with the Account. More often than not it is advisable to simply update the Account's ``status`` to ``DISABLED``.


Example Queries
"""""""""""""""

**Create an Account while suppressing the registration email**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbexaMPLE/accounts?registrationWorkflowEnabled=false"
  --data '{
           "username" : "jlpicard",
           "email" : "capt@enterprise.com",
           "givenName" : "Jean-Luc",
           "middleName" : "",
           "surname" : "Picard",
           "password" : "uGhd%a8Kl!"
           "status" : "ENABLED",
  }'

This query would create an Account with the specified attributes, while also suppressing the configured `Registration Workflow <http://docs.stormpath.com/console/product-guide/#directory-workflows>`__.

**Example Description**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple"
  --data '{
           "status" : "ENABLED",
           "customData": {
               "favoriteColor": "blue",
               "hobby": "Kendo"
  }'

This query would update an Account's ``status`` attribute at the same time as it updated/added two entries in the Account's customData resource.

Using an Account for Look-Up
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to retrieve other, associated resources using the Account for look-up.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/accounts/$ACCOUNT_ID/$RESOURCE_TYPE
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`
      - Retrieves a collection of all of an Account's associated resources of the specified type. Currently the only possible resource types are ``groups``.

    * - GET /v1/accounts/$ACCOUNT_ID/$RESOURCE_TYPE?(searchParams)
      - :ref:`Pagination <about-pagination>`, :ref:`sorting <about-sorting>`, Search: :ref:`Filter <search-filter>`, :ref:`Attribute <search-attribute>`, :ref:`Datetime <search-datetime>`
      - Searches a collection of all of the Account's associated resources of the specified type. For more about Search, please see :ref:`here <about-search>`. Currently the only searchable collection is ``groups``.


Other Resources Associated with an Account
------------------------------------------

.. _ref-account-apikeys:

Account API Keys
^^^^^^^^^^^^^^^^

This collection stores any API Keys that have been generated for this Account.

**apiKeys URL**

``/v1/accounts/$ACCOUNT_ID/apiKeys``

**apiKeys Attributes**

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

    * - ``id``
      - String
      - N/A
      - The API Key ID.

    * - ``secret``
      - String
      - N/A
      - The API Key Secret.

    * - ``status``
      - String (Enum)
      - ``ENABLED`` or ``DISABLED``
      - Indicates whether this API Key is enabled or not.

    * - ``account``
      - Link
      - N/A
      - A link to the Account that this API Key is associated with.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant that this API Key is associated with.

**apiKeys Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/apiKeys/5G5KR4W3K1BP235X8KEXAMPLE",
    "id": "5G5KR4W3K1BP235X8K6NEBL93",
    "secret": "GRiCelvEblNU7Xl4l3oOCw30c72Rwj8TkRn8cUQCrvU",
    "status": "ENABLED",
    "account": {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple"
    },
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDexAMPLE"
    }
  }

Account API Key Operations
""""""""""""""""""""""""""
An Account's API Keys have a full set of CRUD operations available via REST.

Creating an API Key
+++++++++++++++++++

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/accounts/$ACCOUNT_ID/apiKeys
      - N/A
      - Generates a new API Key.

Retrieving an API Key
+++++++++++++++++++++

.. list-table::
    :widths: 30 30 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/accounts/$ACCOUNT_ID/apiKeys
      - ``expand``, ``encryptSecret=true`` (see below)
      - Retrieves the API Keys for the specified Account. ``account`` and ``tenant`` can be expanded.

.. note::

  If ``encryptSecret=true`` is included, then the returned API Key is encrypted. Additionally, the following parameters can also be modified:
    - ``encryptionKeySize``: The size of the key used for encryption. Default value is ``128``.
    - ``encryptionKeyIterations``: The number of times the key is hashed before it is sent. Default value is ``1024``
    - ``encryptionKeySalt``: Specifies whether you would like to use a cryptographic salt. Default value is ``false``.

Updating an API Key
+++++++++++++++++++

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/accounts/$ACCOUNT_ID/apiKeys
      - ``status``
      - Can be used to update the ``status`` field for an API Key to either ``ENABLED`` or ``DISABLED``.

Deleting an API Key
+++++++++++++++++++

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/apiKeys/$SP_API_KEY_ID
      - N/A
      - Deletes the specified API Key resource.


.. _access-tokens:

Access Tokens
^^^^^^^^^^^^^

This collection stores any OAuth 2.0 Access Tokens that have been generated for this Account.

**accessTokens URL**

``/v1/accessTokens/$ACCESS_TOKEN_ID``

**accessTokens Attributes**

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

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``jwt``
      - String
      - N/A
      - The JSON Web Token.

    * - ``expandedJwt``
      - Object
      - N/A
      - The embedded and expanded :ref:`JSON Web Token <ref-jwt>`.

    * - ``account``
      - Link
      - N/A
      - A link to the Account that this Access Token is associated with.

    * - ``application``
      - Link
      - N/A
      - A link to the Application that this Access Token is associated with.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant that this Access Token is associated with.

**accessTokens Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/accessTokens/6TVcnquGRyFZq0ssyHwpTN",
    "createdAt": "2015-11-18T19:16:12.437Z",
    "jwt": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2VFZjbnF1R1J5RlpxMHNzeUh3cFROIiwiaWF0IjoxNDQ3ODc0MTcyLCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQ3ODc1OTcyLCJydGkiOiI2VFZjbm5hQlhOd2JEQm4xbTI1WXJKIn0.flUqUWUEnwGcmVaCwWuf4KpQCkxkqYeWlYGrtFkBaFs",
    "expandedJwt": {
      "header": {
        "kid": "2ZFMV4WVVCVG35XATII9T96J7",
        "alg": "HS256"
      },
      "claims": {
        "jti": "6TVcnquGRyFZq0ssyHwpTN",
        "iat": 1447874172,
        "iss": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR",
        "sub": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
        "exp": 1447875972,
        "rti": "6TVcnnaBXNwbDBn1m25YrJ"
      },
      "signature": "flUqUWUEnwGcmVaCwWuf4KpQCkxkqYeWlYGrtFkBaFs"
    },
    "account": {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey"
    },
    "application": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR"
    },
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
    }
  }

Access Token Operations
"""""""""""""""""""""""

Creating Access Tokens
++++++++++++++++++++++

You can create an Access Token off of the Application's ``oauth/token`` endpoint as described in :ref:`generate-oauth-token`.

Retrieving Access Tokens
++++++++++++++++++++++++++

An Account's Access Tokens can be retrieved manually. It is also possible to specify an Application and only retrieve the Access Tokens that the Account has for that particular Application.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/accounts/$ACCOUNT_ID/accessTokens
      - ``application.href``
      - Retrieves the specified Account's Access Tokens.

.. _ref-refresh-token:

Refresh Tokens
^^^^^^^^^^^^^^
This collection stores any OAuth 2.0 Refresh Tokens that have been generated for this Account.

**refreshTokens URL**

``/v1/refreshTokens/$REFRESH_TOKEN_ID``

**refreshTokens Attributes**

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

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``jwt``
      - String
      - N/A
      - The JSON Web Token.

    * - ``expandedJwt``
      - Object
      - N/A
      - The embedded and expanded :ref:`JSON Web Token <ref-jwt>`.

    * - ``account``
      - Link
      - N/A
      - A link to the Account that this Access Token is associated with.

    * - ``application``
      - Link
      - N/A
      - A link to the Application that this Access Token is associated with.

    * - ``tenant``
      - Link
      - N/A
      - A link to the Tenant that this Access Token is associated with.

**refreshTokens Example**

.. code-block:: json

  {
    "href": "https://api.stormpath.com/v1/refreshTokens/6TVcnnaBXNwbDBn1m25YrJ",
    "createdAt": "2015-11-18T19:16:12.436Z",
    "jwt": "eyJraWQiOiIyWkZNVjRXVlZDVkczNVhBVElJOVQ5Nko3IiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2VFZjbm5hQlhOd2JEQm4xbTI1WXJKIiwiaWF0IjoxNDQ3ODc0MTcyLCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8xZ2s0RHh6aTZvNFBiZGxCVmE2dGZSIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy8zYXBlbll2TDBaOXY5c3BkenBGZmV5IiwiZXhwIjoxNDQ4NDc4OTcyfQ.jwb8UYfmGeqGT42wUjB1ymZp6c4ofJaqdkM6ZHRG_tk",
    "expandedJwt": {
      "header": {
        "kid": "2ZFMV4WVVCVG35XATII9T96J7",
        "alg": "HS256"
      },
      "claims": {
        "jti": "6TVcnnaBXNwbDBn1m25YrJ",
        "iat": 1447874172,
        "iss": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR",
        "sub": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
        "exp": 1448478972
      },
      "signature": "jwb8UYfmGeqGT42wUjB1ymZp6c4ofJaqdkM6ZHRG_tk"
    },
    "account": {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey"
    },
    "application": {
      "href": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR"
    },
    "tenant": {
      "href": "https://api.stormpath.com/v1/tenants/1gBTncWsp2ObQGgDn9R91R"
    }
  }

Refresh Token Operations
""""""""""""""""""""""""

Creating Refresh Tokens
+++++++++++++++++++++++

You can create a Refresh Token off of the Application's ``oauth/token`` endpoint as described in :ref:`generate-oauth-token`.

Retrieving Refresh Tokens
++++++++++++++++++++++++++

An Account's Refresh Tokens can be retrieved manually. It is also possible to specify an Application and only retrieve the Refresh Tokens that the Account has for that particular Application.

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/accounts/$ACCOUNT_ID/refreshTokens
      - ``application.href``
      - Retrieves the specified Account's Refresh Tokens.

.. _ref-jwt:

Expanded JSON Web Token
^^^^^^^^^^^^^^^^^^^^^^^

**expandedJwt Attributes**

*Header*

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``typ``
      - String
      - N/A
      - The type of Token.

    * - ``alg``
      - String
      - N/A
      - The hashing algorithm that is being used for this token. For JWT, this is HMAC-SHA-256.

*Claims* (AKA "Payload")

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - ``jti``
      - String
      - Base62
      - A unique identifier for this JWT.

    * - ``iat``
      - Number
      - N/A
      - The number of seconds since epoch (UTC) when the JWT was created.

    * - ``iss``
      - String
      - A valid URL.
      - The fully qualified location of the Stormpath-registered Application resource for which the JWT was created.

    * - ``sub``
      - String
      - A valid URL.
      - The fully qualified Stormpath location of the Account resource that was successfully authenticated.

    * - ``exp``
      - Number
      - N/A
      - The number of seconds since epoch (UTC) when the JWT will no longer be valid.

*Signature*

.. list-table::
    :widths: 15 10 20 60
    :header-rows: 1

    * - Attribute
      - Type
      - Valid Value(s)
      - Description

    * - signature
      - String
      - N/A
      - A hash of the header, claims, and the issuing server's hashing secret.

**expandedJwt Example**

.. code-block:: json

  {
    "header": {
      "kid": "2ZFMV4WVVCVG35XATII9T96J7",
      "alg": "HS256"
    },
    "claims": {
      "jti": "6TVcnnaBXNwbDBn1m25YrJ",
      "iat": 1447874172,
      "iss": "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR",
      "sub": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spdzpFfey",
      "exp": 1448478972
    },
    "signature": "jwb8UYfmGeqGT42wUjB1ymZp6c4ofJaqdkM6ZHRG_tk"
  }

.. _ref-customdata:

Custom Data
============

.. contents::
    :local:
    :depth: 2

**Description**

The customData resource is a schema-less map object that is automatically created at the same time as, and linked to, another Stormpath resource. It can currently be found alongside the following Stormpath resources:

- Tenant
- Application
- Directory
- Group
- Organization
- Account

**customData URL**

``/v1/$RESOURCE_TYPE/$RESOURCE_ID/customData``

**customData Attributes**

The customData resource has three reserved read-only fields:

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

    * - ``createdAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource was created.

    * - ``modifiedAt``
      - String
      - ISO-8601 Datetime
      - Indicates when this resource’s attributes were last modified.

You can store an unlimited number of additional name/value pairs in the customData resource, with the following restrictions:

- The total storage size of a single customData resource cannot exceed 10 MB (megabytes). The ``href``, ``createdAt`` and ``modifiedAt`` field names and values do not count against your resource size quota.

- Field names must:
  - be 1 or more characters long, but less than or equal to 255 characters long (1 <= N <= 255).
  - contain only alphanumeric characters (0-9 A-Z a-z), underscores or dashes, though they cannot start with a dash.
  - may not equal any of the following reserved names: ``href``, ``createdAt``, ``modifiedAt``, ``meta``, ``spMeta``, ``spmeta``, ``ionmeta``, or ``ionMeta``.

**customData Example**

.. code-block:: json

  {
    "href":"https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spexaMple/customData",
    "createdAt":"2015-08-25T19:57:05.976Z",
    "modifiedAt":"2015-08-26T19:27:29.699Z",
    "birthDate":"2305-07-13",
    "birthPlace":"La Barre, France",
    "currentAssignment":"USS Enterprise (NCC-1701-E)",
    "favoriteDrink":"Earl Grey tea",
    "rank":"Captain"
  }

.. _customdata-operations:

Custom Data Operations
--------------------------------

.. contents::
    :local:
    :depth: 1

Create a customData
^^^^^^^^^^^^^^^^^^^

Whenever you create an Stormpath resource, an empty customData resource is created for that resource automatically – you do not need to explicitly execute a request to create it.

However, it is often useful to populate custom data at the same time you create a resource. You can do this by embedding the customData directly in the resource. For an example, see :ref:`below <accnt-create-with-customdata>`.

Retrieve a customData
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Optional Parameters
      - Description

    * - GET /v1/$RESOURCE_TYPE/$RESOURCE_ID/customData
      - N/A
      - Retrieves the specified resource's' customData resource.

Update a customData
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - POST /v1/$RESOURCE_TYPE/$RESOURCE_ID/customData
      - N/A
      - Updates the specified attributes with the values provided.

Delete a customData
^^^^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: 40 20 40
    :header-rows: 1

    * - Operation
      - Attributes
      - Description

    * - DELETE /v1/$RESOURCE_TYPE/$RESOURCE_ID/customData
      - N/A
      - Deletes the specified customData resource.

    * - DELETE /v1/$RESOURCE_TYPE/$RESOURCE_ID/customData/$FIELD_NAME
      - ``"$FIELD_NAME": null``
      - Deletes only the specified Custom Data field. You must specify the value of the field as ``null`` in order for the call to succeed.

.. note::

  Deleting a customData resource still leaves an empty customData placeholder resource.

Example Queries
"""""""""""""""

.. _accnt-create-with-customdata:

**Create an Account and simultaneously populate its custom data**

.. code-block:: bash

  curl --request GET \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET \
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/directories/WpM9nyZ2TbaEzfbexaMPLE/accounts"
  --data '{
     "username" : "jlpicard",
     "email" : "capt@enterprise.com",
     "givenName" : "Jean-Luc",
     "middleName" : "",
     "surname" : "Picard",
     "password" : "uGhd%a8Kl!"
     "status" : "ENABLED",
     "customData": {
      "birthDate":"2305-07-13",
      "birthPlace":"La Barre, France",
      "currentAssignment":"USS Enterprise (NCC-1701-E)",
      "favoriteDrink":"Earl Grey tea",
      "rank":"Captain"
    }'
  }

This query would create an Account with the attribute values and custom data specified.

**Delete a single field from within a customData resource**

.. code-block:: bash

  curl --request POST \
  --user $SP_API_KEY_ID:$SP_API_KEY_SECRET\
  --header 'content-type: application/json' \
  --url "https://api.stormpath.com/v1/accounts/cJoiwcorTTmkDDBsf02bAb/customData" \
  --data '{
      "favoriteColor": null
    }'

This query would delete only the ``favoriteColor`` field from this customData resource.
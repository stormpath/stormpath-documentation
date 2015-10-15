******************
REST API Reference
******************

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
"""""""""""""""""""""""""""""

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

[Pagination] and [sorting] parameters are available.

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
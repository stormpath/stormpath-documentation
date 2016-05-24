.. only:: not rest

  .. _configuration:

  *************
  Configuration
  *************

  There are several options you can use to customize the behavior of the SDK. For example, you can set the API Key and Secret used to connect to the Stormpath API, or change the default caching behavior.

  There are a few ways you can set these configuration options (see :ref:`Configuration Sources <config_sources>`):

  * Environment variables
  * Markup file (YAML or JSON)
  * API credentials file (for API Key ID/Secret only)
  * Inline options in code (supplied to the SDK constructor)

  The Stormpath API Key and Secret must be set to initialize the SDK (see the next section). In most cases, you won't have to change any other options, as the SDK falls back to sensible defaults.


  .. _required_credentials:

  10.1. Required API Credentials
  ==============================

  At the very least, these configuration options **must** be set in order for
  the Stormpath SDK to initialize properly:

  * ``stormpath.client.apiKey.id`` (the Stormpath API Key ID)
  * ``stormpath.client.apiKey.secret`` (the Stormpath API Key Secret)

  If these values aren't set (using one of the :ref:`Configuration Sources <config_sources>` below), the Stormpath SDK with throw an error. See :ref:`api_keys` in the Configuration Reference for examples of how to set these values.


  .. _set_up_caching:

  10.2. Setting Up Caching
  ========================

  The Stormpath SDK comes with a robust caching layer built in. Reads and writes against the Stormpath API are cached locally, so that your applications can reduce the number of API calls made to Stormpath.

  By default, the SDK uses an in-memory cache implementation. This works well for single-server applications, but if you have multiple servers, you **must** plug in a distributed cache (below).

  Memcached
  '''''''''

  .. only:: csharp or vbnet

    .. note:: The .NET SDK does not currently have a plugin that supports memcached. If you need this functionality, please reach out to us at support@stormpath.com.

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  Redis
  '''''

  .. only:: csharp or vbnet

    The `Stormpath.SDK.Cache.Redis package <https://www.nuget.org/packages/Stormpath.SDK.Cache.Redis/>`_ provides a cache plugin that works with Redis.

    The source code is available `on Github <https://github.com/stormpath/stormpath-sdk-dotnet/tree/develop/src/Stormpath.SDK.Cache.Redis>`_.

    To use this plugin in your application, install the package from NuGet and pass a Redis connection string to the Redis plugin when initializing the SDK:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/redis_cache.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/redis_cache.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)

  Other Caches
  ''''''''''''

  The Stormpath SDK is designed with a modular plugin architecture, so you can plug in other cache technologies as well. Feel free to reach out to us at support@stormpath.com if you need help with a particular cache technology.


  .. _environments:

  10.3. Using a Different Environment
  ===================================

  By default, the Stormpath SDK connects to the Stormpath API Public Cloud at ``https://api.stormpath.com/v1``. If you are connecting to a Stormpath `Enterprise Deployment`_ or Private Deployment, you'll need to change this base URL before using the Stormpath SDK. See :ref:`Base URL <base_url>` in the Configuration Reference for examples of how to set this value.


  .. only:: csharp or vbnet

    .. todo::

      .. Using a Custom HTTP Client
      .. ==========================

        You can use a custom HTTP client plugin.

      .. Using a Custom Serializer
      .. ========================

        You can use a custom JSON serializer plugin.

    .. todo::

      Any SDK-specific configuration options here. If not, delete your section below:

      .. only:: java

        (java.todo)

      .. only:: nodejs

        (node.todo)

      .. only:: php

        (php.todo)

      .. only:: python

        (python.todo)


  .. _config_sources:

  10.4. Configuration Sources
  ===========================

  There are multiple ways to provide the SDK configuration settings. You can load values from local environment variables, or a YAML/JSON configuration file. You can also set them directly in your code.

  .. tip::

    We recommend using environment variables or a configuration file in production, especially for your Stormpath API credentials. This makes it easy to manage and update these values as needed. Configuration via code is useful during development.

  .. _env_vars:

  10.4.1. Environment Variables
  '''''''''''''''''''''''''''''

  Configuration options can be set in environment variables by formatting the configuration key with underscores. For example, ``stormpath.client.apiKey.id`` becomes ``STORMPATH_CLIENT_APIKEY_ID``.

  In a bash-like shell, you can set environment variables by running these commands:

  .. code-block:: bash

      export STORMPATH_CLIENT_APIKEY_ID=your_id_here
      export STORMPATH_CLIENT_APIKEY_SECRET=your_secret_here

  On Windows, the commands are:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_APIKEY_ID your_id_here
      setx STORMPATH_CLIENT_APIKEY_SECRET your_secret_here

  Any configuration option can be set using environment variables. The above are just examples!


  .. _markup_file:

  10.4.2. YAML/JSON Markup File
  '''''''''''''''''''''''''''''

  Configuration options can also be set by placing a file called ``stormpath.yaml`` or ``stormpath.json`` in one of these locations:

  * ``~/.stormpath`` (where ``~`` represents the user's home directory)
  * The application's base directory

  .. note::
    On Windows machines, the home directory is usually ``C:\Users\<username>\``.

  For example, this YAML configuration will set the Stormpath API Key and Secret:

  .. code-block:: yaml

    ---
    client:
      apiKey:
        id: "your_id_here"
        secret: "your_id_here"

  The equivalent JSON is:

  .. code-block:: json

    {
      "client": {
        "apiKey": {
          "id": "your_id_here",
          "secret": "your_id_here"
        }
      }
    }

  In both cases, the ``stormpath`` root node is implied and should be omitted.

  .. tip::
    You can refer to the `SDK Defaults`_ to see the entire default configuration in YAML.


  .. _api_credentials_file:

  10.4.3. API Credentials File
  ''''''''''''''''''''''''''''

  The API Key ID and Secret can be provided by placing the ``apiKey.properties`` generated by the `Stormpath Admin Console`_ file in one of these locations:

  * ``~/.stormpath/`` (where ``~`` represents the user's home directory)
  * The application's base directory

  If you don't opt to store the Stormpath API credentials in environment variables, this functionality makes it easy to download the ``apiKey.properties`` file from the Admin Console and drop it into your application.


  10.4.4. Inline Code Configuration
  '''''''''''''''''''''''''''''''''

  You can also configure the SDK directly in code, by passing the appropriate values when you initialize the Client object.

  For example, to set the API Key and Secret via code:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/api_credentials.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/api_credentials.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  10.5. Configuration Reference
  =============================

  .. _api_keys:

  API Credentials
  '''''''''''''''
  Configuration keys:

  * ``stormpath.client.apiKey.id`` - The Stormpath API Key ID
  * ``stormpath.client.apiKey.secret`` - The Stormpath API Key Secret
  * ``stormpath.client.apiKey.file`` - (Optional) The path to an ``apiKey.properties`` file, if the file is not in one of the standard locations that are searched for :ref:`API Credentials files <api_credentials_file>`.

  .. tip::
    You can find the API Key and Secret values or download a credentials file via the `Stormpath Admin Console`_.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      export STORMPATH_CLIENT_APIKEY_ID=your_id_here
      export STORMPATH_CLIENT_APIKEY_SECRET=your_secret_here

  Windows:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_APIKEY_ID your_id_here
      setx STORMPATH_CLIENT_APIKEY_SECRET your_secret_here

  YAML File
  ^^^^^^^^^

  .. code-block:: yaml

    ---
    client:
      apiKey:
        id: "your_id_here"
        secret: "your_id_here"

  JSON File
  ^^^^^^^^^

  .. code-block:: json

    {
      "client": {
        "apiKey": {
          "id": "your_id_here",
          "secret": "your_id_here"
        }
      }
    }

  Inline Code
  ^^^^^^^^^^^

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/api_credentials.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/api_credentials.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  .. _base_url:

  Base URL
  ''''''''
  Configuration key: ``stormpath.client.baseUrl``

  Default value: ``https://api.stormpath.com/v1``

  This setting controls the URL that the SDK uses to connect to the Stormpath API. You won't need to change this unless you are using a different :ref:`environment <environments>`.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      export STORMPATH_CLIENT_BASEURL=https://enterprise.stormpath.io/v1

  Windows:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_BASEURL https://enterprise.stormpath.io/v1

  YAML File
  ^^^^^^^^^

  .. code-block:: yaml

    ---
    client:
      baseUrl: "https://enterprise.stormpath.io/v1"

  JSON File
  ^^^^^^^^^

  .. code-block:: json

    {
      "client": {
        "baseUrl": "https://enterprise.stormpath.io/v1"
      }
    }

  Inline Code
  ^^^^^^^^^^^

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/use_enterprise_url.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/use_enterprise_url.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  .. _caching_configuration:

  Cache Manager
  '''''''''''''

  Configuration keys:

  * ``stormpath.client.cacheManager.enabled`` - Controls whether caching is enabled. (Default: ``true``)
  * ``stormpath.client.cacheManager.defaultTtl`` - Default Time-to-Live of cached resources, in seconds. (Default: ``300``)
  * ``stormpath.client.cacheManager.defaultTti`` - Default Time-to-Idle of cached resources, in seconds. (Default: ``300``)
  * ``stormpath.client.cacheManager.caches.*`` - Resource-specific cache configuration.

  These settings allow you to control the caching layer that is built into the SDK. See the :ref:`Setting Up Caching <set_up_caching>` section to understand how this works.

  .. warning::

    By default, the SDK uses an in-memory cache that is suitable for a single-server application. If you have multiple servers behind a load balancer, you **must** switch to a distributed cache store, or disable caching. Plugging in a distributed cache is covered in the :ref:`Setting Up Caching <set_up_caching>` section.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      # Disable caching entirely
      export STORMPATH_CLIENT_CACHEMANAGER_ENABLED=false

      # Or, change the default TTL and TTI for cached resources
      # and override this for specific resources:
      export STORMPATH_CLIENT_CACHEMANAGER_DEFAULTTTL=120
      export STORMPATH_CLIENT_CACHEMANAGER_DEFAULTTTI=600
      export STORMPATH_CLIENT_CACHEMANAGER_CACHES_ACCOUNT_TTL=900
      export STORMPATH_CLIENT_CACHEMANAGER_CACHES_ACCOUNT_TTI=900

  Windows:

  .. code-block:: powershell

      # Disable caching entirely:
      setx STORMPATH_CLIENT_CACHEMANAGER_ENABLED false

      # Or, change the default TTL and TTI for cached resources
      # and override this for specific resources:
      setx STORMPATH_CLIENT_CACHEMANAGER_DEFAULTTTL 120
      setx STORMPATH_CLIENT_CACHEMANAGER_DEFAULTTTI 600
      setx STORMPATH_CLIENT_CACHEMANAGER_CACHES_ACCOUNT_TTL 900
      setx STORMPATH_CLIENT_CACHEMANAGER_CACHES_ACCOUNT_TTI 900

  YAML File
  ^^^^^^^^^

  To disable caching entirely:

  .. code-block:: yaml

    ---
    client:
      cacheManager:
        enabled: false

  Or, to change the default TTL and TTI for cached resources and override the defaults for specific resources:

  .. code-block:: yaml

    ---
    client:
      cacheManager:
        defaultTtl: 120
        defaultTti: 600
        caches:
          account:
            ttl: 900
            tti: 900

  JSON File
  ^^^^^^^^^

  To disable caching entirely:

  .. code-block:: json

    {
      "client": {
        "cacheManager": {
          "enabled": false
        }
      }
    }

  Or, to change the default TTL and TTI for cached resources and override the defaults for specific resources:

  .. code-block:: json

    {
      "client": {
        "cacheManager": {
          "defaultTtl": 120,
          "defaultTti": 600,
          "caches": {
            "account": {
              "ttl": 900,
              "tti": 900
            }
          }
        }
      }
    }


  Inline Code
  ^^^^^^^^^^^

  To disable caching entirely:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/disable_caching.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/disable_caching.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)

  Or, to change the default TTL and TTI for cached resources and override the defaults for specific resources:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/custom_cache_config.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/custom_cache_config.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)

  Connection Timeout
  ''''''''''''''''''

  Configuration key: ``stormpath.client.connectionTimeout``

  Default value: 30 seconds

  This setting controls the HTTP timeout (in seconds) that is used when connecting to the Stormpath API.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      export STORMPATH_CLIENT_CONNECTIONTIMEOUT=60

  Windows:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_CONNECTIONTIMEOUT 60

  YAML File
  ^^^^^^^^^

  .. code-block:: yaml

    ---
    client:
      connectionTimeout: 60

  JSON File
  ^^^^^^^^^

  .. code-block:: json

    {
      "client": {
        "connectionTimeout": 60
      }
    }

  Inline Code
  ^^^^^^^^^^^

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/connection_timeout.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/connection_timeout.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  Authentication Scheme
  '''''''''''''''''''''

  Configuration key: ``stormpath.client.authenticationScheme``

  Default value: ``SAUTHC1``

  This setting allows you to change the authentication scheme used to communicate with the Stormpath API. The available options are ``BASIC`` and ``SAUTHC1`` (the default).

  For stronger security, ``SAUTHC1`` should be used **unless** you are in an environment that does not support HTTP digest authentication.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      export STORMPATH_CLIENT_AUTHENTICATIONSCHEME=BASIC

  Windows:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_AUTHENTICATIONSCHEME BASIC

  YAML File
  ^^^^^^^^^

  .. code-block:: yaml

    ---
    client:
      connectionTimeout: "basic"

  JSON File
  ^^^^^^^^^

  .. code-block:: json

    {
      "client": {
        "connectionTimeout": "basic"
      }
    }

  Inline Code
  ^^^^^^^^^^^

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/use_basic_auth.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/use_basic_auth.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


  HTTP Proxy
  ''''''''''

  Configuration keys:

  * ``stormpath.client.proxy.host`` - The proxy hostname to use
  * ``stormpath.client.proxy.port`` - The proxy port to use
  * ``stormpath.client.proxy.username`` - The proxy username (if any)
  * ``stormpath.client.proxy.password`` - The proxy password (if any)

  If you need to route communication to the Stormpath API through an HTTP proxy, you can set these configuration options. Null values are ignored.

  Environment Variables
  ^^^^^^^^^^^^^^^^^^^^^

  Bash-like shell:

  .. code-block:: bash

      export STORMPATH_CLIENT_PROXY_HOST=myproxy.example.com
      export STORMPATH_CLIENT_PROXY_PORT=8088
      export STORMPATH_CLIENT_PROXY_USERNAME=proxyuser
      export STORMPATH_CLIENT_PROXY_PASSWORD=proxypassword

  Windows:

  .. code-block:: powershell

      setx STORMPATH_CLIENT_PROXY_HOST myproxy.example.com
      setx STORMPATH_CLIENT_PROXY_PORT 8088
      setx STORMPATH_CLIENT_PROXY_USERNAME proxyuser
      setx STORMPATH_CLIENT_PROXY_PASSWORD proxypassword

  YAML File
  ^^^^^^^^^

  .. code-block:: yaml

    ---
    client:
      proxy:
        host: "myproxy.example.com"
        port: 8088
        username: "proxyuser"
        password: "proxypassword"

  JSON File
  ^^^^^^^^^

  .. code-block:: json

    {
      "client": {
        "proxy": {
          "host": "myproxy.example.com",
          "port": 8088,
          "username": "proxyuser",
          "password": "proxypassword"
        }
      }
    }

  Inline Code
  ^^^^^^^^^^^

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/use_proxy.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/use_proxy.vb
      :language: vbnet

  .. only:: java

    (java.todo)

  .. only:: nodejs

    (node.todo)

  .. only:: php

    (php.todo)

  .. only:: python

    (python.todo)


.. _Stormpath Admin Console: https://api.stormpath.com/login
.. _Enterprise deployment: https://stormpath.com/enterprise
.. _SDK Defaults: https://github.com/stormpath/stormpath-sdk-spec/blob/master/specifications/config.md#default-configuration

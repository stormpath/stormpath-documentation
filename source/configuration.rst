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

  The Stormpath API Key and Secret must be set to initialize the SDK (detailed in the next section). In most cases, you won't have to change any other options, as the SDK will fall back to sensible defaults.

  .. _required_credentials:

  1. Required API Credentials
  ==============================

  At the very least, these configuration options **must** be set in order to initialize the Stormpath SDK:

  * ``stormpath.client.apiKey.id`` (the Stormpath API Key ID)
  * ``stormpath.client.apiKey.secret`` (the Stormpath API Key Secret)

  If these values aren't set, the Stormpath SDK will throw an error. See :ref:`api_keys` in the Configuration Reference for examples of how to set these values.


  .. _set_up_caching:

  2. Setting Up Caching
  ========================

  The Stormpath SDK comes with a robust caching layer built-in. Reads and writes against the Stormpath API are cached locally to improve the performance of your application.

  Stormpath Resources are cached in regions that correspond to the resource type. For example, Stormpath Account resources are cached in a region specific to Accounts.

  You can customize the cache item time-to-live (TTL) and time-to-idle (TTI) of specific cache regions. For example, you might want cached Account resources to expire quickly, but cached Directory resources to stick around longer.

  For any regions that are not specifically configured, the SDK will use default time-to-live and time-to-idle values.

  See :ref:`caching_config` in the Configuration Reference to understand how to set these configuration values.

  .. only:: php

    .. note::

      The PHP SDK follows PSR-6 caching.  By default, the SDK ships with ``Array``, ``Redis``, ``Memcached``, and ``Null`` caching.
      Because of the implementation of PSR-6 in the SDK, you are able to use any caching that follows the standard that can be found
      on the `PHP Cache Documentation <http://php-cache.readthedocs.io/en/latest/>`__.

  .. only:: not php

    .. warning::

      By default, the SDK uses an in-memory cache implementation. This works well for single-server applications, but if you have multiple servers, you **must** plug in a distributed cache (see below).

  .. only:: php

    .. warning::

      By default, the PHP SDK uses array caching.  Because of this, the cache is cleared on each page request.

    The caching system in the PHP SDK has a set of options that can be passed into the ``Client`` resource caching manager options.

    .. code-block:: php

      $cacheManagerOptions = array(
        'cachemanager' => 'Array', //Array, Memcached, Redis, Null, or the full namespaced CacheManager instance
        'memcached' => array(
            array('host' => '127.0.0.1', 'port' => 11211, 'weight' => 100),
        ),
        'redis' => array(
            'host' => '127.0.0.1',
            'port' => 6379,
            'password' => NULL
        ),
        'ttl' => 60, // This value is set in minutes
        'tti' => 120, // This value is set in minutes
        'regions' => array(
          'accounts' => array(
              'ttl' => 60,
               'tti' => 120
            ),
           'applications' => array(
               'ttl' => 60,
               'tti' => 120
            ),
           'directories' => array(
               'ttl' => 60,
               'tti' => 120
            ),
           'groups' => array(
               'ttl' => 60,
               'tti' => 120
            ),
           'tenants' => array(
               'ttl' => 60,
               'tti' => 120
            ),

         )
      );

      \Stormpath\Client::$cacheManagerOptions = $cacheManagerOptions;

  .. only:: java

    Hazelcast
    '''''''''

    .. literalinclude:: code/java/configuration/hazelcast_cache.java
       :language: java

  Memcached
  '''''''''

  .. only:: csharp or vbnet

    .. note::

      The .NET SDK does not currently have a plugin that supports Memcached. If you need this functionality, please reach out to us at support@stormpath.com.

  .. only:: java

    .. note::

      The Java SDK does not currently have a plugin that supports Memcached. If you need this functionality, please reach out to us at support@stormpath.com.

  .. only:: nodejs

    For a simple use-case, you can allow the Node SDK to create a Memcached Client for you.  This assumes that a Memcached server is running locally on the default port:

    .. code-block:: javascript

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'memcached'
        }
      });

    If the Memcached server is running on a different port, you can pass that configuration information to the Memcached client that is created for you:

    .. code-block:: javascript

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'memcached',
          connection: 'localhost:11211'
        }
      });

    Otherwise, if you have a more complex client configuration, we suggest you create your own client instance and pass that to this library:

    .. code-block:: javascript

      var Memcached = require('memcached');

      var memcachedClient = new Memcached('localhost:11211');

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'memcached',
          client: memcachedClient
        }
      });

  .. only:: php

    The `MemcachedCacheManager` provides a cache plugin that works with Memcached.

    To use this caching method in your application, initialize the ``MemcachedCachedManager`` in your ``ClientBuilder``:

    .. code-block:: php

      $builder = new \Stormpath\ClientBuilder();
      $client = $builder->setCacheManager('Memcached') //setting this will ignore the 'cachemanager' in options array
          ->setCacheManagerOptions($cacheManagerOptions)
          ->build();

  .. only:: python

    .. literalinclude:: code/python/configuration/memcached_cache.py
      :language: python

  .. only:: ruby

    .. warning::

      This functionality is not yet available in the Ruby SDK. For updates, please follow `ticket #168 <https://github.com/stormpath/stormpath-sdk-ruby/issues/168>`_ on Github.

    .. todo::

      Add memcached store option

    .. literalinclude:: code/ruby/configuration/memcached_cache.rb
      :language: ruby

  Redis
  '''''

  .. only:: csharp or vbnet

    The `Stormpath.SDK.Cache.Redis package <https://www.nuget.org/packages/Stormpath.SDK.Cache.Redis/>`_ provides a cache plugin that works with Redis. The source code is available `on Github <https://github.com/stormpath/stormpath-sdk-dotnet/tree/develop/src/Stormpath.SDK.Cache.Redis>`_.

    To use this plugin in your application, install the package from NuGet and pass a Redis connection string to the Redis plugin when initializing the SDK:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/redis_cache.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/redis_cache.vb
      :language: vbnet

  .. only:: java

    .. note::

      The Java SDK does not currently have a plugin that supports Memcached. If you need this functionality please, reach out to us at support@stormpath.com.

  .. only:: nodejs

    For a simple use-case, you can allow the Node SDK to create a Redis Client for you.  This assumes that a Redis server is running locally on the default port:

    .. code-block:: javascript

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'redis'
        }
      });

    If the Redis server is running on a different port, you can pass that configuration information to the Redis client that is created for you:

    .. code-block:: javascript

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'redis',
          connection: {
            host: 'localhost',
            port: 7777
          }
        }
      });


    Otherwise, if you have a more complex client configuration, we suggest you create your own client instance and pass that to this library:

    .. code-block:: javascript

      var redis = require('redis');

      var redisClient = redis.createClient();

      var client = new stormpath.Client({
        cacheOptions: {
          store: 'redis',
          client: redisClient
        }
      });

  .. only:: php

    The `RedisCacheManager` provides a cache plugin that works with Redis.

    To use this caching method in your application, initialize the ``RedisCachedManager`` in your ``ClientBuilder``:

    .. code-block:: php

      $builder = new \Stormpath\ClientBuilder();
      $client = $builder->setCacheManager('Redis') //setting this will ignore the 'cachemanager' in options array
          ->setCacheManagerOptions($cacheManagerOptions)
          ->build();

  .. only:: python

    .. literalinclude:: code/python/configuration/redis_cache.py
      :language: python

  .. only:: ruby

    The Stormpath Ruby SDK provides a cache plugin that works with Redis.

    To use this plugin in your application, initialize the ``client`` instance and configure your store cache and regions store however you want.
    Currently, you can use the default cache store ``MemoryStore``, ``Redis`` and ``DisabledCacheStore``

    .. literalinclude:: code/ruby/configuration/redis_cache.rb
      :language: ruby

  Other Caches
  ''''''''''''

  The Stormpath SDK is designed with a modular plugin architecture, so you can plug in other cache technologies as well. Feel free to reach out to us at support@stormpath.com if you need help with a particular cache technology.


  .. _environments:

  3. Using a Different Environment
  ===================================

  By default, the Stormpath SDK connects to the Stormpath API Public Cloud.

  If you have a Stormpath Enterprise or Private Deployment, you'll need to change this base URL before using the Stormpath SDK. See :ref:`Base URL <base_url>` in the Configuration Reference for examples of how to set this value.

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

  .. _config_sources:

  4. Configuration Sources
  ===========================

  There are multiple ways to provide the SDK configuration settings. You can load values from local environment variables, or a YAML/JSON configuration file. You can also set them directly in your code.

  .. tip::

    We recommend using environment variables or a configuration file in production, especially for your Stormpath API credentials. This makes it easy to manage and update these values as needed. Configuration via code is useful during development.

  .. _env_vars:

  4.1. Environment Variables
  '''''''''''''''''''''''''''''

  .. only:: not python

    Configuration options can be set in environment variables by formatting the configuration key with underscores. For example, ``stormpath.client.apiKey.id`` becomes ``STORMPATH_CLIENT_APIKEY_ID``.

    In a bash-like shell, you can set environment variables by running these commands:

    .. code-block:: bash

        export STORMPATH_CLIENT_APIKEY_ID=your_id_here
        export STORMPATH_CLIENT_APIKEY_SECRET=your_secret_here

    On Windows, the commands are:

    .. code-block:: powershell

        setx STORMPATH_CLIENT_APIKEY_ID your_id_here
        setx STORMPATH_CLIENT_APIKEY_SECRET your_secret_here

    Any configuration option can be set using environment variables. The above are just examples! The :ref:`Configuration Reference <config_reference>` covers each option in detail.

  .. only:: python

    .. warning::

      Using environment variables for configuration is not currently supported by
      default in the Python SDK. This functionality will be released in the near
      future.

  .. _markup_file:

  4.2. YAML/JSON Markup File
  '''''''''''''''''''''''''''''

  .. only:: not (python or ruby)

    .. only:: php

      .. warning::

        Currently, the PHP SDK does not allow for configuration through this file. For updates, you can follow `ticket #153 <https://github.com/stormpath/stormpath-sdk-php/issues/153>`_ on Github.

        In the meantime, please use the ``ClientBuilder`` class to build a client with all configuration you need.

    .. only:: not php

      Configuration options can also be set by placing a file called ``stormpath.yaml`` or ``stormpath.json`` in one of these locations:

      * **Hidden .stormpath Directory**

      On Unix-like machines, the path ``~/.stormpath/`` is searched.

      On Windows machines, the path is ``%HOMEDRIVE%%HOMEPATH%%\.stormpath``. This is typically resolved to ``C:\Users\<username>\.stormpath``.

      * **Application Base Directory**

      .. only:: not (csharp or vbnet)

        The application's base or content root directory.

      .. only:: csharp or vbnet

        In a .NET web application, this is the directory that ``web.config`` or ``appsettings.json`` resides.

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

  .. only:: python

    .. warning::

      Using environment variables for configuration is not currently support by
      default in the Python SDK. This functionality will be released in the near
      future.

  .. only:: ruby

    .. warning::

      Currently the Ruby SDK doesn't provide using YAML or JSON files for storing configuration variables.

      Please use environment variables or instantiate your own ``client`` instance with :ref:`Inline Code Configuration <inline_code_configuration>`


  .. _api_credentials_file:

  4.3. API Credentials File
  ''''''''''''''''''''''''''''

  .. only:: not ruby

    The API Key ID and Secret can be provided by placing the ``apiKey.properties`` file generated by the `Stormpath Admin Console`_ file in one of these locations:

    * **Hidden .stormpath Directory**

    On Unix-like machines, the path ``~/.stormpath/`` is searched.

    On Windows machines, the path is ``%HOMEDRIVE%%HOMEPATH%%\.stormpath``. This is typically resolved to ``C:\Users\<username>\.stormpath``.

    * **Application Base Directory**

    .. only:: not (csharp or vbnet)

      The application's base or content root directory.

    .. only:: csharp or vbnet

      In a .NET web application, this is the directory that ``web.config`` or ``appsettings.json`` resides.

    If you don't opt to store the Stormpath API credentials in environment variables, this functionality makes it easy to download the ``apiKey.properties`` file from the Admin Console and drop it into your application.

  .. only:: ruby

    Currently, this functionality isn't supported by the Ruby SDK. Please use the :ref:`Inline Code Configuration <inline_code_configuration>`

  .. _inline_code_configuration:

  4.4. Inline Code Configuration
  '''''''''''''''''''''''''''''''''

  .. only:: not php

    You can also configure the SDK directly in code, by passing the appropriate values when you initialize the Client object.

    For example, to set the API Key and Secret via code:

  .. only:: csharp

    .. literalinclude:: code/csharp/configuration/api_credentials.cs
      :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/configuration/api_credentials.vb
      :language: vbnet

  .. only:: java

    .. literalinclude:: code/java/configuration/api_credentials.java
      :language: java

  .. only:: nodejs

    .. code-block:: javascript

      var client = new stormpath.Client({
        apiKey : {
          id : 'your_id_here',
          secret : 'your_secret_here'
        }
      });

  .. only:: php

    You can also configure the SDK directly in code, by building a client with the ``ClientBuilder`` and passing the appropriate values.

    For example, to set the API Key and Secret via code:

    .. literalinclude:: code/php/configuration/api_credentials.php
      :language: php

    .. note::

      The ``setApiKeyProperties()`` method will accept any string, however you need to pass a valid ini string.

  .. only:: python

    .. literalinclude:: code/python/configuration/api_credentials.py
      :language: python

  .. only:: ruby

    Initializing a client instance can be done in a number of ways:

    - with the location of API key properties file:

    .. literalinclude:: code/ruby/configuration/initialize_client/api_key_location.rb
      :language: ruby

    - by explicitly setting the API key id and secret:

    .. literalinclude:: code/ruby/configuration/initialize_client/api_key_and_secret.rb
      :language: ruby

    - with altered variables in the API key properties file:

    You can even identify the names of the properties to use as the API key id and secret. For example, suppose your properties was:

    .. code:: console

      foo=APIKEYID
      bar=APIKEYSECRET

    You could load it with the following:

    .. literalinclude:: code/ruby/configuration/initialize_client/altered_api_key.rb
      :language: ruby

    - by passing in a ``Stormpath::APIKey`` instance:

    .. literalinclude:: code/ruby/configuration/initialize_client/api_key_instance.rb
      :language: ruby

    - by passing a composite application url to ``Application.load``:

    .. literalinclude:: code/ruby/configuration/initialize_client/application_url.rb
      :language: ruby

  .. note::

    Values set explicitly via code have the highest precedence. In other words, if you have existing configuration values in environment variables or a markup file, values you set in your code will override them.

  .. _config_reference:

  5. Configuration Reference
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

  .. only:: not php

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

  .. only:: not (php or ruby)

    YAML File
    ^^^^^^^^^

    .. code-block:: yaml

      ---
      client:
        apiKey:
          id: "your_id_here"
          secret: "your_secret_here"

    JSON File
    ^^^^^^^^^

    .. code-block:: json

      {
        "client": {
          "apiKey": {
            "id": "your_id_here",
            "secret": "your_secret_here"
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

    .. literalinclude:: code/java/configuration/api_credentials.java
      :language: java

  .. only:: nodejs

    .. code-block:: javascript

      var client = new stormpath.Client({
        apiKey : {
          id : 'your_id_here',
          secret : 'your_secret_here'
        }
      });

  .. only:: php

    You can inline the settings for API Credentials with the following:

    .. literalinclude:: code/php/configuration/api_credentials.php
      :language: php

    .. note::

      The ``setApiKeyProperties()`` method will accept any string, however you need to pass a valid ini string.

  .. only:: python

    You can inline the settings for API Credentials with the following:

    .. literalinclude:: code/python/configuration/api_credentials.py
      :language: python

  .. only:: ruby

    You can inline the settings for API Credentials with the following:

    .. literalinclude:: code/ruby/configuration/initialize_client/api_key_and_secret.rb
      :language: ruby

  .. _base_url:

  Base URL
  ''''''''

  .. only:: not (php or ruby)

    Configuration key: ``stormpath.client.baseUrl``

  Default value: ``https://api.stormpath.com/v1``

  This setting controls the URL that the SDK uses to connect to the Stormpath API. You won't need to change this unless you are using a :ref:`different environment <environments>`.

  .. only:: not (php or ruby)

    Environment Variables
    ^^^^^^^^^^^^^^^^^^^^^


    Bash-like shell:

    .. code-block:: bash

       export STORMPATH_CLIENT_BASEURL=https://enterprise.stormpath.io/v1

    Windows:

    .. code-block:: none

       setx STORMPATH_CLIENT_BASEURL https://enterprise.stormpath.io/v1

  .. only:: not (php or ruby)

    YAML File
    ^^^^^^^^^

    .. code-block:: yaml

      ---
      client:
        baseUrl: "https://enterprise.stormpath.io/v1"

  .. only:: not (php or ruby)

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

    .. literalinclude:: code/java/configuration/base_url.java
      :language: java

  .. only:: nodejs

    .. code-block:: javascript

      var client = new stormpath.Client({
        baseUrl: 'https://enterprise.stormpath.io/v1'
      });

  .. only:: php

    .. code-block:: php

      $apiKeyProperties = "apiKey.id=APIKEYID\napiKey.secret=APIKEYSECRET";
      $builder = new \Stormpath\ClientBuilder();
      $client = $builder
        ->setBaseUrl('https://enterprise.stormpath.io/v1')
        ->build();

  .. only:: python

    .. literalinclude:: code/python/configuration/base_url.py
      :language: python

  .. only:: ruby

    You can also change the base url for your enterprise product if needed:

    .. literalinclude:: code/ruby/configuration/initialize_client/base_url.rb
      :language: ruby

  .. _caching_config:

  Cache Manager
  '''''''''''''

  .. only:: php

    .. note::

      The PHP SDK follows PSR-6 caching.  By default, the SDK ships with ``Array``, ``Redis``, ``Memcached``, and ``Null`` caching.
      Because of the implementation of PSR-6 in the SDK, you are able to use any caching that follows the standard that can be found
      on the `PHP Cache Documentation <http://php-cache.readthedocs.io/en/latest/>`__.

  .. only:: nodejs

    At the moment the Node SDK only supports cache configuration through static
    code configuration, some examples are below.  For a full reference of the
    available options please see `Stormpath Node SDK JsDoc: CacheOptions <https://docs.stormpath.com/nodejs/jsdoc/global.html#CacheOptions>`_

  .. only:: not (php or nodejs or ruby)

    Configuration keys:

    * ``stormpath.client.cacheManager.enabled`` - Controls whether caching is enabled. (Default: ``true``)
    * ``stormpath.client.cacheManager.defaultTtl`` - Default time-to-live of cached resources, in seconds. (Default: ``300``)
    * ``stormpath.client.cacheManager.defaultTti`` - Default time-to-idle of cached resources, in seconds. (Default: ``300``)
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

  .. only:: not nodejs

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

      .. literalinclude:: code/java/configuration/disable_caching.java
        :language: java

    .. only:: nodejs

      (node.todo)

    .. only:: php

      .. code-block:: php

        $builder = new \Stormpath\ClientBuilder();
        $client = $builder->setCacheManager('Null') //setting this will ignore the 'cachemanager' in options array
            ->build();

    .. only:: python

      .. literalinclude:: code/python/configuration/disable_caching.py
        :language: python

    .. only:: ruby

      .. literalinclude:: code/ruby/configuration/disable_caching.rb
        :language: ruby

    Or, to change the default TTL and TTI for cached resources and override the defaults for specific resources:

    .. only:: csharp

      .. literalinclude:: code/csharp/configuration/custom_cache_config.cs
        :language: csharp

    .. only:: vbnet

      .. literalinclude:: code/vbnet/configuration/custom_cache_config.vb
        :language: vbnet

    .. only:: java

      .. literalinclude:: code/java/configuration/custom_cache_config.java
        :language: java

    .. only:: nodejs

      (node.todo)

    .. only:: php

      .. literalinclude:: code/php/configuration/custom_cache_config.php
        :language: php

    .. only:: python

      .. literalinclude:: code/python/configuration/custom_cache_config.py
        :language: python

    .. only:: ruby

      .. literalinclude:: code/ruby/configuration/custom_cache_config.rb
        :language: ruby

  .. only:: not (php or ruby)

    Connection Timeout
    ''''''''''''''''''

    .. only:: nodejs

      At the moment the Node SDK only supports the request timeout through static
      code configuration.

    .. only:: not nodejs

      Configuration key: ``stormpath.client.connectionTimeout``

      Default value: 30 seconds

      This setting controls the HTTP timeout (in seconds) that is observed when connecting to the Stormpath API.

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

      .. literalinclude:: code/java/configuration/connection_timeout.java
        :language: java

    .. only:: nodejs

      .. code-block:: javascript

        var client = new stormpath.Client({
          timeout: 30000 // milliseconds
        });

    .. only:: python

      .. todo::

        (python.todo)

  Authentication Scheme
  '''''''''''''''''''''

  .. only:: nodejs

    At the moment the Node SDK uses BASIC authentication by default, SAUTHC1 is
    not yet implemented.

  .. only:: ruby

    The authentication scheme used to communicate with the Stormpath API in the Ruby SDK is by default ``SAUTHC1`` and cannot be changed to ``BASIC``.

  .. only:: not (nodejs or ruby)

    .. only:: not php

      Configuration key: ``stormpath.client.authenticationScheme``

    Default value: ``SAUTHC1``

    This setting allows you to change the authentication scheme used to communicate with the Stormpath API. The available options are ``BASIC`` and ``SAUTHC1`` (the default).

    For stronger security, ``SAUTHC1`` should be used unless you are in an environment that does not support HTTP digest authentication.

    .. only:: not php

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

      .. literalinclude:: code/java/configuration/use_basic_auth.java
        :language: java

    .. only:: nodejs

      .. code-block:: javascript

        var client = new stormpath.Client({
          authenticationScheme: 'BASIC'
        });

    .. only:: php

      .. literalinclude:: code/php/configuration/use_basic_auth.php
        :language: php

    .. only:: python

      .. literalinclude:: code/python/configuration/use_basic_auth.py
        :language: python

  .. only:: not (php or ruby)

    HTTP Proxy
    ''''''''''

    .. only:: nodejs

    At the moment the Node SDK only supports request proxy configuration through
    static code configuration.

    .. only:: not nodejs

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

      .. literalinclude:: code/java/configuration/use_proxy.java
        :language: java

    .. only:: nodejs

      .. code-block:: javascript

        var client = new stormpath.Client({
          proxy: 'http://user:pass@proxyhost:proxyport'
        });

    .. only:: python

      .. literalinclude:: code/python/configuration/use_proxy.py
        :language: python

.. _Stormpath Admin Console: https://api.stormpath.com/login
.. _SDK Defaults: https://github.com/stormpath/stormpath-sdk-spec/blob/master/specifications/config.md#default-configuration

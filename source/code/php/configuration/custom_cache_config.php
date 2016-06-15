$cacheManagerOptions = array(
  'cachemanager' => 'Array', //Array, Memcached, Redis, Null, or the full namespaced PSR6CacheManager instance
  'memcached' => array(
  array(
    'host' => '127.0.0.1', 'port' => 11211, 'weight' => 100),
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

$builder = new \Stormpath\ClientBuilder();
$client = $builder
    ->setCacheManagerOptions($cacheManagerOptions)
    ->build();
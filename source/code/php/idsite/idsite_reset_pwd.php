$location = $application->createIdSiteUrl([
  'path'=>'/#/reset',
  'sp_token'=>'{{SP_TOKEN}}',
  'callbackUri'=>'https://mysite.com/handleIdSiteCallback.php'
]);
header('Location:' . $location);  //or any other form of redirect to the $loginLink you want to use.

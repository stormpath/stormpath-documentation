$application = \Stormpath\Resource\Application::get('{APPLICATION_ID}');
$logoutLink = $application->createIdSiteUrl(['logout'=>true, 'callbackUri'=>'{CALLBACK_URI}']);
header('Location:'.$logoutLink);  //or any other form of redirect to the $loginLink you want to use.
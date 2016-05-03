$application = \Stormpath\Resource\Application::get('https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh');

$accountStoreMappings = $application->accountStoreMappings;
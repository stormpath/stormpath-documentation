$application = \Stormpath\Resource\Application::get(
                    'https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh'
                );

$accountStore = \Stormpath\Resource\Directory::get(
                    'https://api.stormpath.com/v1/directories/5nbYei0Xka2UW5uOCP75m5'
                );

$authenticationRequest = new \Stormpath\Authc\UsernamePasswordRequest(
                    'han@millenniumfalcon.com',
                    'SuperP4ss!'
                );

$result = $application->authenticateAccount($authenticationRequest);
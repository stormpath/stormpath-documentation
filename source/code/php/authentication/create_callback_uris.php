$application->setAuthorizedCallbackUris([
    'http://myapplication.com/whatever/callback',
    'http://myapplication.com/whatever/callback2'
  ]);

$application->save();
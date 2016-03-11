$apps = $client->tenant->applications;
$apps->search = array('name' => 'My Application');
$application = $apps->getIterator()->current();
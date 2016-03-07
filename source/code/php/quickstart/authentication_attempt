try {

    $result = $application->authenticate('johnsmith', '4P@$$w0rd!');
    $account = $result->account;

} catch (\Stormpath\Resource\ResourceError $re)
{
    var_dump($re->getStatus());
    var_dump($re->getErrorCode());
    var_dump($re->getMessage());
    var_dump($re->getDeveloperMessage());
    var_dump($re->getMoreInfo());
}
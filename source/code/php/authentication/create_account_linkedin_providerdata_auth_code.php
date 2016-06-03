$providerRequest = new LinkedInProviderRequest(array(
    "code" => "4/a3p_fn0sMDQlyFVTYwfl5GAj0Obd.oiruVLbQZSwU3oEBd8DOtNApQzTCiwI"
));

$result = $application->getAccount($providerRequest);
$account = $result->getAccount();
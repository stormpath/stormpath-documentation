Directory samlDir = client.instantiate(Directory.class);
samlDir.setName("SAML FTW");

String validX509Cert = "<valid X509 cert>";
String ssoLoginUrl = "<sso login url from service provider>";
String ssoLogoutUrl = "<sso logout url from service provider>";

CreateProviderRequest providerRequest = Providers.SAML.builder()
    .setEncodedX509SigningCert(validX509Cert)
    .setRequestSignatureAlgorithm("RSA-SHA256")
    .setSsoLoginUrl(ssoLoginUrl)
    .setSsoLogoutUrl(ssoLogoutUrl)
    .build();

CreateDirectoryRequest request = Directories.newCreateRequestFor(samlDir)
    .forProvider(providerRequest)
    .build();

samlDir = client.createDirectory(request);

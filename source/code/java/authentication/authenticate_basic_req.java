byte[] authBytes = (apiKey.getId() + ":" + apiKey.getSecret()).getBytes();
String basic = "Basic " + DatatypeConverter.printBase64Binary(authBytes);
HttpRequest request = HttpRequests.method(HttpMethod.GET)
    .addHeader("Authorization", new String[] {basic})
    .build();

ApiAuthenticationResult result = Applications
    .apiRequestAuthenticator(application)
    .authenticate(request);

Account account = result.getAccount();

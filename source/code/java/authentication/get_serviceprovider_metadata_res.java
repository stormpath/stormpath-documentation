public interface SamlServiceProviderMetadata extends Resource {

    String getEntityId();
    X509SigningCert getX509SigningCert();
    AssertionConsumerServicePostEndpoint getAssertionConsumerServicePostEndpoint();
}

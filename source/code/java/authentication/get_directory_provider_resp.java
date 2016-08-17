public interface SamlProvider extends Provider {

    String getSsoLoginUrl();
    void setSsoLoginUrl(String ssoLoginUrl);
    String getSsoLogoutUrl();
    void setSsoLogoutUrl(String ssoLogoutUrl);
    String getRequestSignatureAlgorithm();
    void setRequestSignatureAlgorithm(String requestSignatureAlgorithm);
    String getEncodedX509SigningCert();
    void setEncodedX509SigningCert(String encodedX509SigningCert);
    AttributeStatementMappingRules getAttributeStatementMappingRules();
    void setAttributeStatementMappingRules(AttributeStatementMappingRules attributeStatementMappingRules);
    SamlServiceProviderMetadata getServiceProviderMetadata();
}

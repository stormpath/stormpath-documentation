.. only:: rest

  .. _changelog:

  ********************
  Change Log
  ********************

  Stormpath is currently on Version 1 of its API, and all APIs use the ``/v1/`` namespace. All changes to the API and documentation are therefore arranged by date, in descending order.

  .. todo::

      DATE YYYY-MM-DD

      - List of changes, with links
      - List item, with link to documentation if applicable
      - Fixed:
      - Modified:
      - New:

      Link to Tweet or blog post announcing changes (if applicable)

  2016-07-01
  ==========

  - **New:** Added documentation for new Custom Data Search feature. The bulk of the new information is in Reference chapter under :ref:`search-customdata`, with a smaller section :ref:`howto-search-account-customdata` in Account Management.

  2016-06-30
  ==========

  - **New:** Tenants can now be assigned a Custom SMTP Server. New documentation has been added in the Account Management Chapter section :ref:`Customizing Your SMTP Server <add-custom-smtp>`, as well as a new :ref:`ref-custom-smtp` section under the Tenant resource in the Reference chapter.
  - **New:** Directories are now able to :ref:`restrict user email domains <email-domain-restriction>` using email domain whitelists and blacklists.

  2016-06-29
  ==========
  - **New:** New :ref:`ID Site Hosting Guide <idsite-hosting>` added to ID Site chapter.

  2016-06-20
  ==========

  - **Modified:** When :ref:`idsite-jwt-to-oauth`, the ``grant_type`` should now be ``stormpath_token``.
  - **Fixed:** Various Resources in :ref:`reference` had attributes with incorrect lengths of "1 < N <= 255". This has been corrected to be "0 < N < 256".

  2016-06-15
  ==========

  - **New:** The SAML section of the Authentication chapter now contains instructions for how to configure login via :ref:`ADFS <adfs>`.

  2016-06-09
  ==========

  - **New:** :ref:`Account API Keys <ref-account-apikeys>` now have optional ``name`` and ``description`` attributes.
  - **New:** Added information about :ref:`Request UUIDs <request-id>` to Reference chapter.
  - **New:** :ref:`REST Errors <ref-error-responses>` now return the Request UUID in the error body in a new ``requestId`` attribute.
  - **Modified:** OAuth Access and Refresh Tokens now have a maximum TTL of 10 years (``P10Y``). The :ref:`OAuth Policy <ref-oauth-policy>` documentation has been updated to reflect this.
  - **New:** Stormpath Token Type (``stt``) header now included with :ref:`Access <ref-access-token>` and :ref:`Refresh <ref-refresh-token>` Tokens, as well as :ref:`ID Site Assertion <idsite-response-jwt>` and :ref:`SAML Account Assertion <saml-response-jwt>` JWTs.

  2016-06-07
  ==========

  - **New:** Added language switcher to left-side navigation bar. You can use it to check out our SDK Documentation. If you are on a page (for example Authorization), it will take you to the equivalent page (if applicable) in the SDK of your choosing. Currently only the PHP SDK is available in this format.

  2016-06-03
  ==========

  - **New:** Added screenshots to :ref:`idsite-multitenancy` section.

  2016-06-01
  ==========

  - **New:** Updated ID Site chapter with two new sections: :ref:`idsite-multitenancy` and :ref:`idsite-sso`.

  2016-05-25
  ==========

  - **Fixed:** Adding missing ``usd`` claim to :ref:`idsite-auth-jwt` documentation.

  2016-05-18
  ==========

  - **New:** :ref:`Adding a new Account or Group to an Application or Organization <add-to-app-or-org>` in Account Management chapter.

  2016-05-11
  ==========

  - **New:** Password Policy's :ref:`Strength resource <ref-password-strength>` information updated with new ``preventReuse`` attribute. Also added use case information to Account Management chapter in new section :ref:`How to Restrict Password Reuse <password-reuse>`.
  - **New:** Added missing :ref:`ref-attribute-mapping`, :ref:`ref-sp-metadata` objects to Directory's Provider section of Reference chapter. Also added :ref:`ref-provider-data` to Account section of that chapter. Objects were previously documented and discussed in :ref:`Authentication Chapter <authn>` but were not included in Reference chapter.
  - **New:** Added additional information about attributes of :ref:`Stormpath collections <about-collections>`.
  - **New:** Added simplified ERD to :ref:`Data Model section of About chapter <about-data-model>`.
  - **Fixed:** Added missing ``kid`` header to :ref:`SAML Account Assertion JWT <saml-response-jwt>` and :ref:`ID Site Assertion JWT <idsite-response-jwt>` documentation.

  2016-04-29
  ==========

  - **Fixed:** Updated :ref:`Social Login information for LinkedIn <authn-linkedin>` to reflect the fact that Stormpath can handle the exchange of an Authorization Code for an Access Token.

  2016-04-28
  ==========

  - **New:** Added information to :ref:`ref-ldap-agent` section in Reference chapter to clarify which attributes are optional, and which ones are only present for regular LDAP vs Active Directory agents. Also added :ref:`clarifying note <authn-ldap-dir-creation>` to Authentication chapter that explains that Directory, Provider, and Agent must all be passed at the same time in order to create an LDAP Directory.

  2016-04-22
  ==========

  - **New:** Added new SAML Authentication :ref:`configuration instructions for Ping Identity <ping>`.
  - **New:** Added information about :ref:`Mapping SAML Attributes for Okta <okta-attribute-mapping>`.

  2016-04-21
  ==========

  - **New:** Added ``passwordModifiedAt`` attribute to :ref:`ref-account` Resource table, as well as to list of :ref:`searchable-attributes`. Example usage also added to :ref:`new section in Account Management chapter <password-change-timestamp-search>`.

  2016-04-18
  ==========

  - **New:** Added :ref:`errors` page, with list of REST Errors along with explanations.

  2016-03-16
  ==========

  - **Fixed:** Fixed error in :ref:`ID Site Authentication JWT <idsite-auth-jwt>`. ``organizationNameKey`` should be ``onk`` and ``showOrganizationField`` should be ``sof``.

  2016-03-04
  ==========

  - **New:** Added simplified Entity Relationship Diagrams to :ref:`Quickstart <quickstart>`, :ref:`Account Management <account-mgmt>`, and :ref:`Authentication <authn>` sections.
  - **Modified:** Updated :ref:`Account Management <account-mgmt>` and :ref:`Reference <account-operations>` chapters to clarify that Accounts can be added to Organizations directly.

  2016-03-01
  ==========

  - **New:** Information about new ``multipart/alternative`` email type added to Reference section on :ref:`Email Templates <ref-emailtemplates>` and Account Management section on :ref:`customizing email templates via REST <customizing-email-templates>`.

  2016-02-24
  ==========

  - **New:** Added section on :ref:`how to route users to their tenant <multitenant-routing-users>`.

  2016-02-19
  ==========

  - **New:** Multi-tenancy chapter significantly expanded. Now includes more information about :ref:`using Groups vs Directories to model tenants <multitenancy-strategies>`.

  2016-02-16
  ==========

  - **New:** Added information about :ref:`IdP-initiated SAML Authentication <saml-authn>`.
  - **Modified:** Updated Application's :ref:`SAML Policy <ref-samlpolicy>` resource in Reference Chapter to include new ``defaultRelayStates`` endpoint.

  2016-02-10
  ==========

  - Changed Sphinx Theme to Read The Docs.

  2016-02-02
  ==========

  - **New:** Updated SAML Section of Authentication chapter to include :ref:`IdP-specific set-up guides <saml-configuration>`.
  - **New:** Added missing :ref:`organizationAccountStoreMappings <ref-org-asm>` resource to Reference chapter.

  2016-01-20
  ==========

  - **New:** Added Change Log.
  - **Modified:** Directory type language changed. "Social", "Mirror" and "SAML" Directories are all actually "Mirror Directories", and the language in the :ref:`Account Management <account-mgmt>` and :ref:`Authentication <authn>` chapters has been updated to reflect this.
  - **New:** Created top-level :ref:`Mirror Directories section <about-mirror-dir>` that discusses all Mirror Directories in general and how to support multiple Mirror Directories.
  - **Modified:** Updated information about :ref:`Master Directories <mirror-login>` and how they function.
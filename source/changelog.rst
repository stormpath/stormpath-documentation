.. _changelog:

**********
Change Log
**********

Stormpath is currently on Version 1 of its API, and all APIs use the ``/v1/`` namespace. All changes to the API and documentation are therefore arranged by date, in descending order.

.. todo::

    UNRELEASED

    *The following changes have been made to the documentation, but not yet published. When they are ready to be published, this section will be converted into a dated section like the ones below*

    - List of changes, with links
    - List item, with link to documentation if applicable
    - Fixed:
    - Modified:
    - New

    DATE YYYY-MM-DD

    - List of changes, with links
    - List item, with link to documentation if applicable
    - Fixed:
    - Modified:
    - New:

    Link to Tweet or blog post announcing changes (if applicable)

2016-04-22
==========

- **New:** Added new SAML Authentication :ref:`configuration instructions for Ping Identity <ping>`.
- **New:** Added information about :ref:`Mapping SAML Attributes for Okta <okta-attribute-mapping>`.

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

- Changed Sphinx Theme to `Read The Docs <http://docs.readthedocs.org/en/latest/theme.html>`_.

2016-02-02
==========

- **New:** Updated SAML Section of Authentication chapter to include :ref:`IdP-specific set-up guides <saml-configuration>`.
- **New:** Added missing :ref:`organizationAccountStoreMappings <ref-org-asm>` resource to Reference chapter.

2016-01-20
==========

- **New:** Added :ref:`Change Log <changelog>`.
- **Modified:** Directory type language changed. "Social", "Mirror" and "SAML" Directories are all actually "Mirror Directories", and the language in the :ref:`Account Management <account-mgmt>` and :ref:`Authentication <authn>` chapters has been updated to reflect this.
- **New:** Created top-level :ref:`Mirror Directories section <about-mirror-dir>` that discusses all Mirror Directories in general and how to support multiple Mirror Directories.
- **Modified:** Updated information about :ref:`Master Directories <mirror-login>` and how they function.
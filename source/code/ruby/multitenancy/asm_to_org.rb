asm = client.organization_account_store_mappings.create(
  account_store: {
    href: directory_href
  },
  organization: {
    href: organization.href
  }
)

asm = client.organization_account_store_mappings.create(
  account_store: {
    href: directory_href
  },
  organization: {
    href: organization.href
  },
  is_default_account_store: true,
  is_default_group_store: true
)

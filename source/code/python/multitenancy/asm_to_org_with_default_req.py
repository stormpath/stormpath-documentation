asm = client.organization_account_store_mappings.create({
    'organization': organization,
    'account_store': directory,
    'is_default_account_store': True,
    'is_default_group_store': True,
})

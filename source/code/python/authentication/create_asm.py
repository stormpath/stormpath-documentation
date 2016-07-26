mapping = application.account_store_mappings.create({
    'application': application,
    'account_store': dir_or_group_obj,
    'is_default_account_store': True,
    'is_default_group_store': True,
    'list_index': 0,
})

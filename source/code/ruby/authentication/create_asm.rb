mapping = client.account_store_mappings.create(
  application: application,
  account_store: dir_or_group_obj,
  list_index: 0,
  is_default_account_store: true,
  is_default_group_store: true
)

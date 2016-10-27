expansion = Stormpath::Resource::Expansion.new('customData')

account.groups.each do |group|
  custom_group_data = client.groups.get(group.href, expansion).custom_data
end

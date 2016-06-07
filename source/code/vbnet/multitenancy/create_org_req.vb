Dim bankOfAOrg = client.Instantiate(Of IOrganization)() _
    .SetName("Bank of A") _
    .SetNameKey("bank-of-a") _
    .SetStatus(OrganizationStatus.Enabled)

Await bankOfAOrg.SaveAsync()

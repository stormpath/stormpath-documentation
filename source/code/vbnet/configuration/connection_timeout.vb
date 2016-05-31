' Value is in milliseconds
Dim client = Clients.Builder() _
    .SetConnectionTimeout(60 * 1000) _
    .Build()

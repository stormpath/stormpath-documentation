var client = Clients.Builder()
    .SetConnectionTimeout(60 * 1000) // in milliseconds
    .Build();

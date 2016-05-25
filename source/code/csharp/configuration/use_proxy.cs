var client = Clients.Builder()
    .SetProxy(new ClientProxyConfiguration()
    {
        Host = "myproxy.example.com",
        Port = 8088,
        Username = "proxyuser",
        Password = "proxypassword"
    })
    .Build();

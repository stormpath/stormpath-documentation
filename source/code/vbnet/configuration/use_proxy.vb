Dim client = Clients.Builder() _
    .SetProxy(New ClientProxyConfiguration() With
    {
        .Host = "myproxy.example.com",
        .Port = 8088,
        .Username = "proxyuser",
        .Password = "proxypassword"
    }).Build()

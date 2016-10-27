result = Stormpath::Authentication::HttpBearerAuthentication.new(application,
                                                                 bearer_authorization_header).authenticate!

# or if you want to validate the token locally

result = Stormpath::Authentication::HttpBearerAuthentication.new(application,
                                                                 bearer_authorization_header,
                                                                 local: true).authenticate!

result = Stormpath::Authentication::HttpBasicAuthentication.new(application, basic_authorization_header).authenticate!

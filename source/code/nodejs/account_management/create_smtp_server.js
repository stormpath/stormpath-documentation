var myStmpServer = {
  description: 'My Awesome SMTP Server',
  host: 'email.host.com',
  name: 'My SMTP Server',
  port: 25,
  securityProtocol: 'TLS',
  status: 'ENABLED',
  username: 'ausername',
  password: 'hellosmtp'
};

client.createResource('/smtpServers', myStmpServer, function(err, resource){

  // The href if our new SMTP server resource, save this as you
  // will need this HREF if you need to delete this server:

  console.log(err,resource.href);
});
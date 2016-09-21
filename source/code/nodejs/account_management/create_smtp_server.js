var mySmtpServer = {
  description: 'My Awesome SMTP Server',
  host: 'email.host.com',
  name: 'My SMTP Server',
  port: 25,
  securityProtocol: 'TLS',
  status: 'ENABLED',
  username: 'ausername',
  password: 'hellosmtp'
};

client.createResource('/smtpServers', mySmtpServer, function(err, resource){

  if (err) {
    return console.error(err);
  }

  // Log and save the href of the new resource, you will need this
  // HREF if you need to delete this server in the future:

  console.log(resource.href);
});
// You will need the HREF of the server, from when you created it:

var href = 'https://api.stormpath.com/v1/smtpServers/$RESOURCE_ID';

client.deleteResource(href, function(err){
  if (err) {
    return console.error(err);
  }
});
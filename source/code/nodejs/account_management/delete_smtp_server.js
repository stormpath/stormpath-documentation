// You will need the HREF of the server, from when you created it:

var href = 'https://api.stormpath.com/v1/smtpServers/XYZ';

client.deleteResource(href, function(err){
  if (err) {
    console.error(err);
  }
});
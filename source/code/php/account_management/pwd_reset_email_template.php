
$resetEmailTemplate = $directory->getPasswordPolicy()->getResetEmailTemplates();

$resetEmailTemplate
    ->setName('Password Reset Email Template')
    ->setDescription('Password Reset Email Template that is associated with the directory.')
    ->setFromName('John Doe')
    ->setFromEmailAddress('support@stormpath.com')
    ->setSubject('Reset Your Password')
    ->setTextBody('Forgot your password? We've received a request to reset the password for this email address. To reset your password please click on this link or cut and paste this URL into your browser (link expires in $!{expirationWindow} hours): $!{url} This link takes you to a secure page where you can change your password. If you don't want to reset your password, please ignore this message. Your password will not be reset. --------------------- For general inquiries or to request support with your account, please email support@stormpath.com')
    ->setHtmlBody('<p>Forgot your password?</p><br/><br/><p>We've received a request to reset the password for this email address.</p><p>To reset your password please click on this link (link expires $!{expirationWindow} hours):<br/><a href="$!{url}">Link</a></p><p>This link takes you to a secure page where you can change your password. If you don't want to reset your password, please ignore this message. Your password will not be reset.</p><p>----------------------<br/>For general inquiries or to request support with your account, please email support@stormpath.com</p>')
    ->setMimeType(\Stormpath\Stormpath::MIME_HTML)
    ->setDefaultModel(['linkBaseUrl'=>'http://localhost:8888/passwordReset.php'])
    ->save();
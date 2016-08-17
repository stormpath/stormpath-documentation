ModeledEmailTemplateList templates = myDirectory
    .getAccountCreationPolicy()
    .getAccountVerificationEmailTemplates();

// Currently, only one template is supported.
// Future releases may allow for more than one template.
ModeledEmailTemplate template = templates.iterator().next();

template
    .setName("Default Verification Email Template")
    .setDescription("This is the verification email template that is associated with the directory.")
    .setFromName("Jakub Swiatczak")
    .setFromEmailAddress("change-me@stormpath.com")
    .setSubject("Verify your account")
    .setTextBody("Hi,\nYou have been registered for an application that uses Stormpath.\n\n${url}\n\nOnce you verify, you will be able to login.\n\n---------------------\nFor general inquiries or to request support with your account, please email change-me@stormpath.com")
    .setHtmlBody("<p>Hi,</p>\\n<p>You have been registered for an application that uses Stormpath.</p><a href=\\\"${url}\\\">Click here to verify your account</a><p>Once you verify, you will be able to login.</p><p>--------------------- <br />For general inquiries or to request support with your account, please email change-me@stormpath.com</p>")
    .setMimeType(MimeType.PLAIN_TEXT)
    .setLinkBaseUrl("https://api.stormpath.com/emailVerificationTokens")
    .save();

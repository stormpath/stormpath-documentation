PasswordPolicy passwordPolicy = myDirectory.getPasswordPolicy();
ModeledEmailTemplateList templates = passwordPolicy.getResetEmailTemplates();

// Currently, only one template is supported.
// Future releases may allow for more than one template.
ModeledEmailTemplate template = templates.iterator().next();

template
    .setFromEmailAddress("captain@enterprise.com")
    .setLinkBaseUrl("https://email.starfleet.com")
    .setSubject("Welcome to Starfleet!")
    .setHtmlBody(htmlBody)
    .setMimeType(MimeType.HTML)
    .save();

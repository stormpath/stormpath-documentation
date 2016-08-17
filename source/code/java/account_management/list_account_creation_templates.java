AccountCreationPolicy accountCreationPolicy = myDirectory.getAccountCreationPolicy();

ModeledEmailTemplateList accountVerificationTemplates =
    accountCreationPolicy.getAccountVerificationEmailTemplates();

UnmodeledEmailTemplateList accountVerificationSuccessTemplates =
    accountCreationPolicy.getAccountVerificationSuccessEmailTemplates();

UnmodeledEmailTemplateList welcomeTemplates =
    accountCreationPolicy.getWelcomeEmailTemplates();

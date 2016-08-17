PasswordPolicy passwordPolicy = myDirectory.getPasswordPolicy();

ModeledEmailTemplateList resetPasswordemplates =
    passwordPolicy.getResetEmailTemplates();

UnmodeledEmailTemplateList resetPasswordSuccessTemplates =
    passwordPolicy.getResetSuccessEmailTemplates();

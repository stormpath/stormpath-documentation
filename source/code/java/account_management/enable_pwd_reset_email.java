PasswordPolicy passwordPolicy = myDirectory.getPasswordPolicy();
passwordPolicy.setResetEmailStatus(EmailStatus.ENABLED);
passwordPolicy.save();

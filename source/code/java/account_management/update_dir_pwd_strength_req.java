PasswordPolicy passwordPolicy = myDirectory.getPasswordPolicy();
PasswordStrength passwordStrength = passwordPolicy.getStrength();

passwordStrength
    .setMinLength(1)
    .setMaxLength(24)
    .setMinSymbol(1)
    .save();

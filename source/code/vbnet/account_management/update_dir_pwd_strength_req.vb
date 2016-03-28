' Get the Password Strength Policy from the Directory's Password Policy resource
Dim passwordPolicy = Await myDirectory.GetPasswordPolicyAsync()
Dim strengthPolicy = Await passwordPolicy.GetPasswordStrengthPolicyAsync()

' Update and save
strengthPolicy.SetMinimumLength(1) _
    .SetMaximumLength(24) _
    .SetMinimumSymbols(1)
Await strengthPolicy.SaveAsync()

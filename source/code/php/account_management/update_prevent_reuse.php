$passwordPolicy = $directory->getPasswordPolicy();

$passwordPolicy->setPasswordReuse(10)->save();
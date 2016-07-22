$passwordPolicy = $directory->getPasswordPolicy();

$strength = $passwordPolicy->getStrength();

$res = $strength->getMinLength(8)
    ->getMaxLength(50)
    ->getMinLowerCase(1)
    ->getMinUpperCase(1)
    ->getMinNumeric(1)
    ->getMinSymbol(0)
    ->getMinDiacritic(0)
    ->getPreventReuse(0)
    ->save();

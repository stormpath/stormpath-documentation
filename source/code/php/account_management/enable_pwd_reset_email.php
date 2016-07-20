$passwordPolicy = $directory->getPasswordPolicy();

$passwordPolicy->setResetEmailStatus(\Stormpath\Stormpath::ENABLED)
    ->save();
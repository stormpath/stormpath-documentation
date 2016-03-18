$token = {{ SP Token From Query String }}

$newPassword = "updated+Password1234";

$application->resetPassword($token, $newPassword);
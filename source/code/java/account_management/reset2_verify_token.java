try {
    application.verifyPasswordResetToken(tokenString);
} catch (ResourceException e) {
    // token is not valid
}

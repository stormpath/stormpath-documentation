try {
    client.verifyAccountEmail(tokenString);
} catch (ResourceException e) {
    // token is not valid
}

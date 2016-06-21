var ldapDirectory = {
  name: 'My LDAP Directory',
  description: 'An LDAP Directory created with the Stormpath API',
  provider: {
    providerId: 'ldap',
    agent: {
      config: {
        directoryHost: 'ldap.local',
        directoryPort: '636',
        sslRequired: true,
        agentUserDn: 'tom@stormpath.com',
        agentUserDnPassword: 'StormpathRulez',
        baseDn: 'dc=example,dc=com',
        pollInterval: 60,
        accountConfig: {
          dnSuffix: 'ou=employees',
          objectClass: 'person',
          objectFilter: '(cn=finance)',
          emailRdn: 'email',
          givenNameRdn: 'givenName',
          middleNameRdn: 'middleName',
          surnameRdn: 'sn',
          usernameRdn: 'uid',
          passwordRdn: 'userPassword'
        },
        groupConfig: {
          dnSuffix: 'ou=groups',
          objectClass: 'groupOfUniqueNames',
          objectFilter: '(ou=*-group)',
          nameRdn: 'cn',
          descriptionRdn: 'description',
          membersRdn: 'uniqueMember'
        }
      }
    }
  }
};

client.createDirectory(ldapDirectory, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('LDAP directory created!');
});
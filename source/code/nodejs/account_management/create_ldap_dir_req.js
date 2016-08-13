var newLdapDirectory = {
  name: 'Captains LDAP Directory',
  description: 'Famous captains throughout history.',
  provider:{
    providerId: 'ldap',
    agent: {
      config : {
        directoryHost : 'ldap.example.com',
        directoryPort : 6362,
        sslRequired : true,
        agentUserDn : 'agentUsername',
        agentUserDnPassword: 'uErnb73bXXsu8z',
        baseDn : 'dc=example,dc=com',
        pollInterval : 60,
        accountConfig : {
          dnSuffix : 'ou=employees',
          objectClass : 'person',
          objectFilter : '(cn=finance)',
          emailRdn : 'email',
          givenNameRdn : 'givenName',
          middleNameRdn : 'middleName',
          surnameRdn : 'sn',
          usernameRdn : 'uid',
          passwordRdn : 'userPassword'
        },
        groupConfig : {
          dnSuffix : 'ou=groups',
          objectClass : 'groupOfUniqueNames',
          objectFilter : '(ou=*-group)',
          nameRdn : 'cn',
          descriptionRdn : 'description',
          membersRdn : 'uniqueMember'
        }
      }
    }
  }
};

client.createDirectory(newLdapDirectory, function(err, directory) {
  console.log(err, directory);
});

# Stormpath::Oauth::VerifyTokenResult

{
  href: 'https://api.stormpath.com/v1/accessTokens/54YsnCz2f9dXBrUgY3G7da',
  createdAt: '2016-10-18T08:12:46.039Z',
  jwt: 'eyJraWQiOiIzTFoyUTlZQUE4RTdFRjROMUcxTE82RUxIIiwic3R0IjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI1NFlzbkN6MmY5ZFhCclVnWTNHN2RhIiwiaWF0IjoxNDc2Nzc4MzY2LCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy80cnFDaU9oc244elZFUkVieWZWbDB6Iiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy80dFFqalM2ZDk4Z0JMY1VmWE5QemVzIiwiZXhwIjoxNDc2NzgxOTY2LCJydGkiOiI1NFlzbjlleGtaS1laMk9wTG5PcjFXIn0.dTSK0YUUSXeDLVjiT-E3_f3k-Hqm8aAUdgK3Ejbgo3w',
  expandedJwt: {
    header: {
      kid: '3LZ2Q9YAA8E7EF4N1G1LO6ELH',
      stt: 'access',
      alg: 'HS256'
    },
    claims: {
      jti: '54YsnCz2f9dXBrUgY3G7da',
      iat: 1476778366,
      iss: 'https://api.stormpath.com/v1/applications/4rqCiOhsn8zVEREbyfVl0z',
      sub: 'https://api.stormpath.com/v1/accounts/4tQjjS6d98gBLcUfXNPzes',
      exp: 1476781966,
      rti: '54Ysn9exkZKYZ2OpLnOr1W'
    },
    signature: 'dTSK0YUUSXeDLVjiT-E3_f3k-Hqm8aAUdgK3Ejbgo3w'
  },
  account: {
    href: 'https://api.stormpath.com/v1/accounts/4tQjjS6d98gBLcUfXNPzes'
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/4rqCiOhsn8zVEREbyfVl0z'
  },
  tenant: {
    href: 'https://api.stormpath.com/v1/tenants/6zyOyZEFmmg4a6jNFSI9CX'
  }
}

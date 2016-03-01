from stormpath.error import Error as StormpathError

try:
    result = application.authenticate_account('tk421@galacticempire.co', 'Changeme123!')
    account = result.account

    print('User ' + result.account.full_name + ' logged in.')
except StormpathError, e:
    print('Could not log in. Error: ' + e.user_message)

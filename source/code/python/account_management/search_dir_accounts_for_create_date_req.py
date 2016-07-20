accounts = application.accounts.search({'modified_at': '2016-03-18'})

# Or, if you prefer, you can search using a `date` object:

from datetime import date
accounts = application.accounts.search({'modified_at': date(year=2016, month=3, day=18)})

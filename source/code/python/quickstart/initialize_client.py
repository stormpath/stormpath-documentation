from os.path import expanduser, join

from stormpath.client import Client


# This is the absolute path to the file ~/.stormpath/apiKey.properties
# downloaded in the previous section.  This will work on any OS.
API_KEY_FILE = join(expanduser('~'), '.stormpath', 'apiKey.properties')


client = Client(api_key_file=API_KEY_FILE)

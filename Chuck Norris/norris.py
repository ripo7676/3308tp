"""this file pulls a random chuck norris joke off of the internet and writes it to a file."""

import urllib
import json
from pprint import pprint

file = open("norris.txt", 'r+')

file.truncate()

link = "http://api.icndb.com/jokes/random"
f = urllib.urlopen(link)

j = json.load(urllib.urlopen(link))

joke = j['value']['joke']
file.write(joke)

file.close
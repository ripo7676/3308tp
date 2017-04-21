import norris

i = 0

while i != 10:

	norris.generateJoke()

	f = open('norris.txt')

	print "Chuck Norris Joke: %d" % i

	print f.read()

	i = i + 1
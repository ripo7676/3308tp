import norris

i = 0

quant = 20

while i != quant:

	norris.generateJoke()

	f = open('norris.txt')

	print "Adding Chuck Norris Joke to database: %d" % i

	#add code to populate database here

	print f.read()

	i = i + 1 


print "Added %d jokes to database" % i
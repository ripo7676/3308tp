import random
import os


#returns current location of TextFiles
def setDirectory():
    return(os.path.dirname(os.path.realpath(__file__)) + "/TextFiles/")

#makes a list of the files in /TextFiles
def setFileList():
    dir_path = setDirectory()
    x = [f for f in os.listdir(dir_path)]
    return(x)


#Opens file and makes list of tweets
def makeTweetList(filename):
    global tweetList
    filename = os.path.dirname(os.path.realpath(__file__)) + "/TextFiles/" + filename
    with open(filename) as f_in:
        tweetList = filter(None, (line.rstrip() for line in f_in))

#function that generates user interface
def printMenu():
    print("##########Auto Tweet##########")
    print("1. Select Tweet From File")
    print("2. Generate Random Tweet")
    print("3. Post To Twitter")
    print("4. Change Twitter Account")
    print("5. Exit Auto Tweet")
    print("##############################")

#print text file menu
def printTextFileMenu(fileList):
    print("##############################")
    count = 1
    for name in fileList:
        print("%d. %s") % (count, name)
        count += 1
    print("##############################")


#generates a random tweet
def generateRandomTweet():
    global tweet, tweetList, filename
    rand = False

    print("1. Select File")
    print("2. Use Random File")
    menuNum = input("Enter Selection: ")
    if menuNum == 1:
        setFileName()
        makeTweetList(filename)
        tweet = tweetList[random.randint(0,(len(tweetList)-1))]
        print("Current Tweet: %s") % (tweet)
    else:
        rand = True
        filename = fileList[random.randint(0,(len(fileList)-1))]
        makeTweetList(filename)
        tweet = tweetList[random.randint(0,(len(tweetList)-1))]
        print("Current Tweet: %s") % (tweet)

    menuNum = 0
    while menuNum != 1:
        print("Use Tweet?")
        print("1. Use It")
        print("2. Try Again")
        menuNum = input("Enter Selection: ")
        if menuNum == 2:
            if not rand:
                tweet = tweetList[random.randint(0,(len(tweetList)-1))]
                print("Current Tweet: %s") % (tweet)
            else:
                filename = fileList[random.randint(0,(len(fileList)-1))]
                makeTweetList(filename)
                tweet = tweetList[random.randint(0,(len(tweetList)-1))]
                print("Current Tweet: %s") % (tweet)

#set file Name
def setFileName():
    global filename, fileList
    printTextFileMenu(fileList)
    fileNum = input("Enter Selection: ")
    filename = fileList[fileNum - 1]
    print("File Name: %s") % (filename)

#select tweet
def selectTweet():
    global tweetList, tweet
    if not tweetList:
        setFileName()
        makeTweetList(filename)
    printTextFileMenu(tweetList)
    tweetNum = input("Enter Selection: ")
    tweet = tweetList[tweetNum - 1]
    print("Current Tweet: %s") % (tweet)

#Post to Twitter
def postToTwitter():
    print("Posting: %s") % tweet
    print("To Account: %s") % username
    print("Confirm?")
    print("1. Yes")
    print("2. No")
    menuNum = input("Enter Selection: ")
    if menuNum == 1:
        print("Posting To Twitter...")

#set Twitter Account
def setTwitterAccount():
    global username, password
    print("Current Username: %s") % username
    print("Current Password: %s") % password
    print("##############################")
    print("1. Use This Account")
    print("2. Change Account")
    menuNum = input("Enter Selection: ")
    if (menuNum == 2):
        username = raw_input("Enter Username:")
        password = raw_input("Enter Password:")
        print("Update Default Account?")
        print("1. Yes")
        print("2. No")
        response = input("Enter Selection:")
        if response == 1:
            print("Updating Default Account...")
            outFile = open("User.txt", "w")
            outFile.write(username + "\n")
            outFile.write(password + "\n")

#import twitter Account
def importTwitterAccount():
    global username, password

    with open("User.txt") as f_in:
        content = filter(None, (line.rstrip() for line in f_in))
        username = content[0]
        password = content[1]


#### Main ####

fileList = setFileList()
tweetList = []
filename = ""
tweet = ""
username = ""
password = ""
menuNum = 0
exitNum = 5

importTwitterAccount()

#Menu
while (menuNum != exitNum):
    printMenu()
    menuNum = input("Enter Selection: ")
    #select tweet from file
    if menuNum == 1:
        selectTweet()
    #generate random tweet
    if menuNum == 2:
        generateRandomTweet()
    #Post to Twitter
    if menuNum == 3:
        postToTwitter()
    if menuNum == 4:
        setTwitterAccount()

	http://127.0.0.1:8080

Everything you need is in the "AppAuth" (Authentication) folder.

****Unfortunately as of now, the full posting to the database ONLY works on WINDOWS******
(The WebApp itself works just online (http://127.0.0.1:8080) but the method of posting needs to be running on Windows not VM)

-Install NPM & Node.js for Windows
(You have to restart after you install before it works, it WILL NOT WORK without restarting your computer)

**Note Needed ANYMORE!**
-Install MongoDB for Windows
(Local host for MongoDB default port 27071, 120.0.0.1, you don't need to worry about as it's hardcoded in)
**
The database is now connected directly in the config/database.js file and directly connects to the 500MB of MongoDB
hosting that we have through 'mLab'
To access this if you want to play with it/see new users being added to the database as you 'sign-up'
VISIT: mLab.com
USER: Jotr4184
PASS: CSCI3308TEAM1107

==================================
== Twitter API stuff =============
==================================
Access Level Read and write (modify app permissions)
Owner rick_poulson_CU
Owner ID 852218747129651200 



There you have it!

To start up the App, just CD into the directory (In Windows Command Prompt -- UGH)
(To change directories use 'CD <directory-name>', 'dir' = display files in current directory)

Once you're in the 'AppAuth' folder, simply type:
node server.js

This will cause everything to start up then visit it at:
	http://127.0.0.1:8080

**Not needed anymore!**
To start MongoDB:
mongod.exe
**

Everything works great though!!!!! :D :D :D

You can Sign-Up, Log-in, it takes you to YOUR own profile, and displays errors if you try to sign-up or log-in and aren't in the DB yet!

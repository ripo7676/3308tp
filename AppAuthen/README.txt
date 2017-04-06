http://localhost:8080

Everything you need is in the "AppAuth" (Authentication) folder.

****Unfortunately as of now, the full posting to the database ONLY works on WINDOWS******
(The WebApp itself works just online (//localhost:8080) but the method of posting needs to be running on Windows not VM)

-Install NPM & Node.js for Windows
(You have to restart after you install before it works, it WILL NOT WORK without restarting your computer)

-Install MongoDB for Windows
(Local host for MongoDB default port 27071, 120.0.0.1, you don't need to worry about as it's hardcoded in)

There you have it!

To start up the App, just CD into the directory (In Windows Command Prompt -- UGH)
(To change directories use 'CD <directory-name>', 'dir' = display files in current directory)

Once you're in the 'AppAuth' folder, simply type:
node server.js

This will cause everything to start up then visit it at:
//localhost:8080

To start MongoDB:
mongod.exe

NOTE: Because this is currently running off of your LOCAL MongoDB, it will automatically start POSTing to YOUR DB when you 'sign-up' or 'login-in'.
(I'm in the processes of setting it up for the global mLab - server of our MongoDB)

Everything works great though!!!!! :D :D :D

You can Sign-Up, Log-in, it takes you to YOUR own profile, and displays errors if you try to sign-up or log-in and aren't in the DB yet!
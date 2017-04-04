from Tkinter import *

class Signin:
	def __init__(self,master):
		Label(master, text="Username").grid(row=0)
		Label(master, text="Password").grid(row=1)
		e1 = Entry(master)
		e2 = Entry(master)
		e1.grid(row=0, column=1)
		e2.grid(row=1, column=1)
		

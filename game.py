from tkinter import *
from turtle import right
from PIL import Image, ImageTk
import random
import time
 
root = Tk()
root.geometry("1600x1000")

PLAYER_SCORE = 0
NICO_SCORE = 0

# Computer Values For Moves
computer_value = {
    "0":"Rock",
    "1":"Paper",
    "2":"Scissor"
}

# Global Delay Time in seconds
DELAY = 2

# FUNCTIONS TO RUN GAME -------------------------------------------------------
def getCurrRoundNum():
    global PLAYER_SCORE, NICO_SCORE
    return int(PLAYER_SCORE + NICO_SCORE + 1)

def disable_buttons():
    b1["state"] = "disable"
    b2["state"] = "disable"
    b3["state"] = "disable"

def enable_buttons():
    b1["state"] = "active"
    b2["state"] = "active"
    b3["state"] = "active"

def endGame():
    round_num.config(text="Game Finished")

def newRound():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    if getCurrRoundNum() >= 21:
        score_num.config(text="Score: " + str(PLAYER_SCORE) +"-"+str(NICO_SCORE))
        endGame()
    else:
        round_num.config(text="Round " + str(getCurrRoundNum()))
        score_num.config(text="Score: " + str(PLAYER_SCORE) +"-"+str(NICO_SCORE))
        time.sleep(DELAY)
        enable_buttons()
    

def player_win():
    global PLAYER_SCORE, NICO_SCORE
    match_result = "You won!"
    robot_move.config(text=match_result)
    robot_move.update()
    player_move.config(text="") 
    player_move.update()
    PLAYER_SCORE += 1

def draw():
    global PLAYER_SCORE, NICO_SCORE
    match_result = "We drew!"
    robot_move.config(text=match_result)
    robot_move.update()
    player_move.config(text="") 
    player_move.update()
    NICO_SCORE+=0.5
    PLAYER_SCORE += 0.5

def nico_win():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    match_result = "I won!"
    robot_move.config(text=match_result)
    robot_move.update()
    player_move.config(text="") 
    player_move.update()
    NICO_SCORE += 1


def isrock():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    disable_buttons()
    nico_move = random_move()

    player_move.config(text="Rock!")
    player_move.update()
    robot_move.config(text=nico_move+"!")
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        draw()
    elif nico_move=="Scissor":
        player_win()
    else:
        nico_win()

    newRound()


def ispaper():
    global PLAYER_SCORE, NICO_SCORE
    disable_buttons()
    nico_move = random_move()

    player_move.config(text="Paper!")
    player_move.update()
    robot_move.config(text=nico_move+"!")
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        player_win()
    elif nico_move=="Scissor":
        nico_win()
    else:
        draw()

    newRound()
 

def isscissor():
    global PLAYER_SCORE, NICO_SCORE
    disable_buttons()
    nico_move = random_move()

    player_move.config(text="Scissor!")
    player_move.update()
    robot_move.config(text=nico_move+"!")
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        nico_win()
    elif nico_move=="Scissor":
        draw()
    else:
        player_win()

    newRound()


def random_move():
    return computer_value[str(random.randint(0,2))]

# -----------------------------------------------------------------------------

# Add Header Labels
round_num = Label(root,
      text = "Round 1",
      font = "normal 30 bold",
      fg = "black")
round_num.pack(pady = 5)
score_num = Label(root,
      text = "Score: 0-0",
      font = "normal 24 bold",
      fg = "black")
score_num.pack(pady = 5)

# Add Game Frame Labels

game_frame = Frame(root)
game_frame.pack(padx = 10, anchor="w")

player_bubble_image = Image.open("bubble.png")
player_bubble_resize_image = player_bubble_image.resize((300, 300))
img1 = ImageTk.PhotoImage(player_bubble_resize_image)

player_move = Label(game_frame, image=img1, text="", font ="normal 20 bold", compound="center")
player_move.pack(side = LEFT, pady=10, padx = 200)


robot_bubble_image = Image.open("bubble2.png")
robot_bubble_resize_image = robot_bubble_image.resize((300, 300))
img3 = ImageTk.PhotoImage(robot_bubble_resize_image)

robot_image = Image.open("robot.png")
robot_resize_image = robot_image.resize((300, 400))
img2 = ImageTk.PhotoImage(robot_resize_image)
robot = Label(game_frame, image=img2)
robot.pack(side = RIGHT, pady=10, padx = 40)

robot_move = Label(game_frame, image=img3, text="Hi, I'm Nico. \n Nice to meet you! \n\n", font ="normal 20 bold", compound="center")
robot_move.pack(side = RIGHT, pady=10, padx = 40)

 
frame1 = Frame(root)
frame1.pack()
 
b1 = Button(frame1, text = "Rock",
            font = 10, width = 20, height = 10,
            command = isrock)
 
b2 = Button(frame1, text = "Paper ",
            font = 10, width = 20, height = 10,
            command = ispaper)
 
b3 = Button(frame1, text = "Scissor",
            font = 10, width = 20, height = 10,
            command = isscissor)
b1.pack(side = LEFT, padx = 10, pady = 20)
b2.pack(side = LEFT,padx = 10, pady = 20)
b3.pack(padx = 10, pady = 20)
 
# Execute Tkinter
root.mainloop()
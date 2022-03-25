from tkinter import *
from turtle import right
from PIL import Image, ImageTk
import random
import time
 
root = Tk()

SCALE = 2
PLAYER_SCORE = 0
NICO_SCORE = 0

width = 1600 // SCALE 
height = 1000 // SCALE

root.geometry(str(width) +"x"+str(height))

# Computer Values For Moves
computer_value = {
    "0":"Rock",
    "1":"Paper",
    "2":"Scissor"
}

# Global Delay Time in seconds
DELAY = 2

# Robot fixed moved 
robot_moves = [0, 0, 0, 2, 1, 1, 2, 0, 2, 2, 0, 1, 1, 1, 0, 2, 0, 1, 0, 2]

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
    robot_move.config(text="Good game!", image = img3)
    robot_move.update()
    round_num.config(text="Game Finished")

def newRound():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    if getCurrRoundNum() >= 21:
        score_num.config(text="Score: " + str(PLAYER_SCORE) +"-"+str(NICO_SCORE))
        time.sleep(DELAY)
        endGame()
    else:
        round_num.config(text="Round " + str(getCurrRoundNum()))
        score_num.config(text="Score: " + str(PLAYER_SCORE) +"-"+str(NICO_SCORE))
        time.sleep(DELAY)
        enable_buttons()
    
    
def getPlayerMoveImage(i):
    player_bubble_image = Image.open("bubble.png").convert("RGBA")
    player_bubble_resize_image = player_bubble_image.resize((300//SCALE, 300//SCALE))

    if i != "":
        rock_image = Image.open(i+".jpg").convert("RGBA")
        rock_resize_image = rock_image.resize((100//SCALE,100//SCALE))

        player_bubble_resize_image.paste(rock_resize_image, (110//SCALE,90//SCALE), rock_resize_image)

    return ImageTk.PhotoImage(player_bubble_resize_image)

def getNicoMoveImage(i):
    nico_bubble_image = Image.open("bubble.png").convert("RGBA")
    nico_bubble_image = nico_bubble_image.transpose(Image.FLIP_LEFT_RIGHT)
    nico_bubble_resize_image = nico_bubble_image.resize((300//SCALE, 300//SCALE))

    if i != "":
        rock_image = Image.open(i+".jpg").convert("RGBA")
        rock_resize_image = rock_image.resize((100//SCALE,100//SCALE))

        nico_bubble_resize_image.paste(rock_resize_image, (90//SCALE,90//SCALE), rock_resize_image)

    return ImageTk.PhotoImage(nico_bubble_resize_image)

# Functions that display the text when someone wins

def player_win():
    global PLAYER_SCORE, NICO_SCORE
    match_result = "You won!"
    robot_move.config(text=match_result, image = img3)
    robot_move.update()
    player_move.config(text="", image=img1) 
    player_move.update()
    PLAYER_SCORE += 1

def draw():
    global PLAYER_SCORE, NICO_SCORE
    match_result = "We drew!"
    robot_move.config(text=match_result, image = img3)
    robot_move.update()
    player_move.config(text="", image=img1) 
    player_move.update()
    NICO_SCORE+=0.5
    PLAYER_SCORE += 0.5

def nico_win():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    match_result = "I won!"
    robot_move.config(text=match_result, image = img3)
    robot_move.update()
    player_move.config(text="", image=img1) 
    player_move.update()
    NICO_SCORE += 1

# Functions that depend on the exact move the human plays

def playRock():
    global PLAYER_SCORE, NICO_SCORE, DELAY
    disable_buttons()
    nico_move = fixed_move()

    rock_img = getPlayerMoveImage(computer_value["0"])

    player_move.config(image = rock_img)

    nico_img = getNicoMoveImage(nico_move)

    robot_move.config(text="", image = nico_img)
    robot_move.update()
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        draw()
    elif nico_move=="Scissor":
        player_win()
    else:
        nico_win()

    newRound()


def playPaper():
    global PLAYER_SCORE, NICO_SCORE
    disable_buttons()
    nico_move = fixed_move()

    paper_img = getPlayerMoveImage(computer_value["1"])

    player_move.config(image = paper_img)

    nico_img = getNicoMoveImage(nico_move)

    robot_move.config(text="", image = nico_img)
    robot_move.update()
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        player_win()
    elif nico_move=="Scissor":
        nico_win()
    else:
        draw()

    newRound()
 

def playScissor():
    global PLAYER_SCORE, NICO_SCORE
    disable_buttons()
    nico_move = fixed_move()

    scissor_img = getPlayerMoveImage(computer_value["2"])

    player_move.config(image = scissor_img)

    nico_img = getNicoMoveImage(nico_move)

    robot_move.config(text="", image = nico_img)
    robot_move.update()
    player_move.update()
    time.sleep(DELAY)


    if nico_move == "Rock":
        nico_win()
    elif nico_move=="Scissor":
        draw()
    else:
        player_win()

    newRound()


def fixed_move():
    return computer_value[str(robot_moves[getCurrRoundNum()-1])]

# -----------------------------------------------------------------------------

root.configure(background='white')

# Add Header Labels
round_num = Label(root,
      text = "Round 1",
      font = "normal 30 bold",
      fg = "black", bg="white")
round_num.pack(pady = 5)
score_num = Label(root,
      text = "Score: 0-0",
      font = "normal 24 bold",
      fg = "black", bg="white")
score_num.pack(pady = 5)

# Add Game Frame Labels

game_frame = Frame(root, background="white")
game_frame.pack(padx = 10, anchor="w")

player_bubble_image = Image.open("bubble.png").convert("RGBA")
player_bubble_resize_image = player_bubble_image.resize((300//SCALE, 300//SCALE))
img1 = ImageTk.PhotoImage(player_bubble_resize_image)

player_move = Label(game_frame, image=img1, text="", font ="normal 20 bold", compound="center", background="white")
player_move.pack(side = LEFT, pady=10//SCALE, padx = 200//SCALE)


robot_bubble_image = Image.open("bubble.png").convert("RGBA").transpose(Image.FLIP_LEFT_RIGHT)
robot_bubble_resize_image = robot_bubble_image.resize((300//SCALE, 300//SCALE))
img3 = ImageTk.PhotoImage(robot_bubble_resize_image)

robot_image = Image.open("robot.png")
robot_resize_image = robot_image.resize((300//SCALE, 400//SCALE))
img2 = ImageTk.PhotoImage(robot_resize_image)
robot = Label(game_frame, image=img2, background="white")
robot.pack(side = RIGHT, pady=10//SCALE, padx = 40//SCALE)

robot_move = Label(game_frame, image=img3, text="Hi, I'm Nico. \n Nice to meet you! \n\n", font ="normal 10 bold", compound="center", background="white")
robot_move.pack(side = RIGHT, pady=10//SCALE, padx = 40//SCALE)

 
frame1 = Frame(root, background="white")
frame1.pack()
 
b1 = Button(frame1, text = "Rock",
            font = 10, width = 20, height = 10,
            command = playRock, background="white")
 
b2 = Button(frame1, text = "Paper ",
            font = 10, width = 20, height = 10,
            command = playPaper, background="white")
 
b3 = Button(frame1, text = "Scissor",
            font = 10, width = 20, height = 10,
            command = playScissor, background="white")
b1.pack(side = LEFT, padx = 10, pady = 20)
b2.pack(side = LEFT,padx = 10, pady = 20)
b3.pack(padx = 10, pady = 20)
 
# Execute Tkinter
root.mainloop()
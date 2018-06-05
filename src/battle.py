from random import randint

#init
board = []
board_size = 7
shipe_size = 2
num_of_ships = 2

def init():    
    for x in range(board_size):
        board.append(["O"] * board_size)
        
    for r in range(num_of_ships):
        vorh = randint(0,1)
        if(vorh == 1):
            ship_row = randint(0, board_size - 1)
            ship_col = randint(0, board_size - 2)
            board[ship_row][ship_col] = "S"
            board[ship_row][ship_col+1] = "S"
        else:    
            ship_row = randint(0, board_size - 2)
            ship_col = randint(0, board_size - 1)
            board[ship_row][ship_col] = "S"
            board[ship_row+1][ship_col] = "S"

def print_board(board):
    for row in board:
        print " ".join(row)

def random_row(board):
    return randint(0, len(board_size) - 2)

def random_col(board):
    return randint(0, len(board[0]) - 1)



def validate(guess_row,guess_col):
     # Success
    if board[guess_row][guess_col] == "S":
        print ("Congratulations! You sunk my battleship!")
        return True
    else:       
        if (guess_row < 0 or guess_row > board_size) or (guess_col < 0 or guess_col > board_size):
            print ("Oops, that's not even in the ocean.")
            return False      
       
        elif(board[guess_row][guess_col] == "X"):
            print ("You guessed that one already.")
            return False       
        else:
            print ("You missed my battleship!")
            board[guess_row][guess_col] = "X"
    

def main():
    init()
    while(True):
        option = raw_input("Guess(G)/Cheat(C)/Quit(Q):")
        if(option == "G"):    
            guess_row = int(input("Guess Row(1,7):"))
            guess_col = int(input("Guess Col(1,7):"))
            if(validate(guess_row-1,guess_col-1)):
                return
        elif(option == "C"):    
            print_board(board)
        else:
            return

main()

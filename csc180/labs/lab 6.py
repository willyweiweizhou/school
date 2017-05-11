

'''
 X | O | X
---+---+---
 O | O | X    
---+---+---
   | X | 
'''

import random


def print_board_and_legend(board):
    for i in range(3):
        line1 = " " +  board[i][0] + " | " + board[i][1] + " | " +  board[i][2]
        line2 = "  " + str(3*i+1)  + " | " + str(3*i+2)  + " | " +  str(3*i+3) 
        print(line1 + " "*5 + line2)
        if i < 2:
            print("---+---+---" + " "*5 + "---+---+---")
            
def make_empty_board():
    global last_move,board
    board = []
    last_move = 'O'
    for i in range(3):
        board.append([" "]*3)
    return board
            
def find_coord():
    if square_num in range(1,10):
        coord = [(square_num - 1), (square_num % 3 - 1)]
    return coord

def put_in_board(board, mark, square_num):
    global last_move, count
    #if square_num in range(1,10):
    if mark == 'X':
        board[(square_num - 1)//3][(square_num - 1) % 3] = 'X'
    elif mark == 'O':
        board[(square_num - 1)//3][(square_num-1) % 3 ] = 'O'
    last_move = mark
    return board
    #else:
    #    return board     
    
    
    
def get_free_squares(board):
    global L,a
    L = []
    a= []
    for i in range(3):
        for e in range(3):
            if board[i][e] == ' ':
                b = [i,e]
                #b = i * 3 + e
                #L.append(b)
                a.append(i*3+e)
                
    return a
   
def make_random_move(board,mark):
    #global L,a
    a = get_free_squares(board)
    #i = int(10*random.random())
    #for i in a:
    #    position = i
    i = int(random.random() * len(a))    
        
    
    put_in_board(board,mark,a[i])
    print_board_and_legend(board)    
        
       
def is_row_all_marks (board, row_i, mark):
    if board[row_i][0] == board[row_i][1] == board[row_i][2] == mark:
        return True
    else:
        return False 
            
def is_col_all_marks(board, col_i,mark):
    if board[col_i][0]==board[col_i][1] == board [row_i][2]==mark:
        return True
    else:
        return False

def is_diagnal_all_marks(board, diag_i,mark):
    i = diag_i
    for i in range(3):
        
        if board[i][i] == board[i+1][i+1] == board [i+1][i+2] == mark:
            return True
            
            
    
if __name__ == '__main__':
    board = make_empty_board()
    print_board_and_legend(board)    
    
    print("\n\n")
    
    #put_in_board(board, 'X', 5)      
    #Eprint_board_and_legend(board)
    
    print(get_free_squares(board))
    
    
    
    #user_input = None
    #count = 0

    #while count < 10:
    #    user_input = int(input('number'))
    #    if last_move == 'O':
    #        board = put_in_board(board,'X',user_input)
    #    else:
    #        board = put_in_board(board,'O',user_input)
    #    count += 1
    #    print_board_and_legend(board)
    
    count = 0
    user_input = None
    while count < 10:
        make_random_move(board,'X')
        user_input = input('next move')
        put_in_board(board,'O',user_input)
        count += 2
                

    
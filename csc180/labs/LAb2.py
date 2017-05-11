if __name__ == '__main__':
    print('welcome to the calculator program')
    current_value = 0
    print'current value:',current_value
    
    
def display_current_value():
    print(current_value)
    
def add(s):
    global current_value
    current_value = current_value + s
    prev_value=current_value
    print(current_value)

def mult(to_mult):
    global current_value
    current_value=current_value*to_mult
    prev_value=current_value
    print(current_value)
    
def div(to_div):
    global current_value
    current_value=current_value/to_div
    prev_value=current_value
    print(current_value)
    
def memory():
    global current_value
    global memory
    memory=current_value

    


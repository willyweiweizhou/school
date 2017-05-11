if __name__=='__main__':
    from lab02 import*
    initialize()
    add(42)
    if get_current_value()==42:
        print('test 1 passed')
    else:
        print('test 1 failed')
    
    initialize ()
    subtract(42)
    if get_current_value()==-42:
        print('test 2 passed')
    else:
        print('test 2 failed')
        
    initialize()
    add(2)
    multiply(3)
    if get_current_value()==6:
        print('test 3 passed')
    else:
        print('test 3 failed')
        
    initialize()
    add(6)
    divide(3)
    if get_current_value()==2:
        print('test 4 passed')
    else:
        print('test 4 failed')
        
    initialize()
    add(45)
    store()
    subtract(45)
    recall()
    if get_current_value()==45:
        print ('test 5 passed')
    else:
        print('test 5 failed')
        
    initialize()
    add(2)
    add(3)
    undo()
    if get_current_value()==2:
        print('test 6 passed')
    else:
        print('test 6 failed')
        
    
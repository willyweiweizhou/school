def list1_start_with_list2(list1, list2):
    if len(list1) >= len(list2):
        for i in range(len(list2)):
            if list1[i]!=list2[i]:
                return False
        return True
    else:
        return False
        
        
def match_pattern(list1,list2):
    if len(list1) >= len(list2):
        for i in range(len(list1)-len(list2)):
            if list1[i]==list2[0]:
                for e in range(len(list2)+1):
                    if list1[i+e]==list2[e]:
                        return True
    else:
        return False
            

def duplicates(list0):
    for i in range(len(list0)-1):
        if list0[i]==list0[i+1]:
            return True
    return False
    
def print_matrix_dim(M):
    column=len(M[0])
    row=len(M)
    print row,'x',column


def mult_M_v(M,v):
    result_vector=[]
    for i in range(len(M)):
        a=0
        for e in range(len(M[0])):
            a += M[i][e]*v[e]
            
        result_vector.append(a)
    return result_vector    
    
def print_list(pets):
    for i in range(len(pets)):
        print (pets[i],)
        
        
def print_second_element(pets):
    for i in range(len(pets)):
        print (pets[i][1],)

def sum_age(pets):
    sum = 0
    for i in range(len(pets)):
        sum+=pets[i][2]
    return sum
    
def number_of_dog(pets):
    number = 0
    for i in range(len(pets)):
        if pets[i][1]=='dog':
            number+=1
    return number
        
if __name__=='__main__':
    list1=[0,1,3,4,5]
    list2=[0,1,3,4]
    list0=[0,1,2,3,4]
    M=[[1,2],
       [3,4],
       [5,6]]
    v=[1,2]
    pets=[["Shoji","cat",18],
          ['Hanako',"dog",15],
          ['Sir Toby','cat',15],
          ['Sachiko','cat',7],
          ['Sasha','dog',3],
          ['Lopez','dog',13]]
    print(list1_start_with_list2(list1,list2))
    print match_pattern(list1,list2)
    print duplicates(list0)
    print print_matrix_dim(M)
    print(mult_M_v(M,v))
    print(print_list(pets))
    print print_second_element(pets)
    print(sum_age(pets))
    print(number_of_dog(pets))
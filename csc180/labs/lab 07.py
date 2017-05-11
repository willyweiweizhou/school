from numpy import *

def print_matrix(M):
    print(array(M))
    
M = [[1,2,3],[1,2,3]]


def get_lead_ind(row):
    for i in range(len(row)):
        if row[i] != 0:
            return i
    return len(row)
        


def get_row_to_swap(M,start_i):
    for a in range(0,len(M[0])+1):
        for i in range(start_i + 1, len(M)):
            if get_lead_ind(M[i]) == a:
                if get_lead_ind(M[start_i])== get_lead_ind(M[i]):
                    return start_i
                else:
                    return i
    
    
def add_rows_coefs(r1, c1, r2, c2):
    L = []
    for i in range(0, len(r1)):
        L.append(c1*r1[i]+c2*r2[i])
        
    return L
    
def eliminate(M, row_to_sub, best_lead_ind):
    for i in range(row_to_sub + 1, len(M)):
        c = M[i][best_lead_ind]/M[row_to_sub][best_lead_ind]
        
        for e in range(best_lead_ind, len(M[0])):
            
            
            M[i][e] = int(M[i][e]-M[row_to_sub][e]*c)
            
    return M
    

def eliminate2(M, row_to_sub, best_lead_ind):
    r1 = M[row_to_sub]
    for i in range(row_to_sub+1, len(M)):
        c = -(M[i][best_lead_ind]/M[row_to_sub][best_lead_ind])
        r2 = M[i]
        if get_lead_ind(r2) == get_lead_ind(r1): 
            M[i] = add_rows_coefs(r1,c,r2,1)
        else:
            r1, r2 = r1,r2
    return M
    
def forward_step(M):
    
    for i in range(len(M)):
        a = get_row_to_swap(M,i)
        if a != None:
            M[i],M[a] = M[a], M[i]
            print_matrix(M)
            lead_ind = get_lead_ind(M[i])
            
            eliminate2(M, i,lead_ind)
            print_matrix(M)
    return M        
            
    
    

        

            

if __name__ == '__main__':
    M = [[5, 6, 7, 8],[0, 0, 1, 1],[1, 0,5, 2],[0,0,7,0]]
    row = [0,0,1]
    print(get_lead_ind(row))
    print(get_row_to_swap(M,1))
    
    r1 = M[0]
    r2 = M[3]
    print(add_rows_coefs(r1,2,r2,2))
    
    print(eliminate2(M,1,2))
    
    N = [[0, 0, 1, 0, 2], [1, 0, 2, 3, 4], [3, 0, 4, 2, 1], [1, 0, 1, 1, 2]]
    print_matrix(N)
    forward_step(N)
    
    
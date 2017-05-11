#part(a)

f = open("pride.txt", encoding = "latin-1")

s = f.read().lower()
s = s.replace("\n", " ")
s = s.replace(".", " ")
s = s.replace("!", " ")
s = s.replace(":"," ")
s = s.replace("'", " ")
s = s.replace("'", " ")
s = s.replace(",", " ")

s = s.split(" ")
total_words = len(s)
print(total_words)
def count_word(word,s):
    
    d = {}
    for i in s:
        if i not in d.keys():
            d[i] = 1
        else:
            d[i] += 1
            
    return d[word]
    
    
#print (count_word("am",s))
            
            
L = list(range( 0,200,2))

def top10(L):
    L = sorted(L)
    M = []
    for i in range(len(L)-1, len(L)-11, -1):
        M.append(L[i])
    return M
        
print(top10(L))

def top10text(s):
    print(10)
    d = {}
    for word in s:
        d[word] = count_word(word,s)
    L = d.items()
    M = top10(L)
    print(d)
    return M
    
#print(top10text(s))
    
    




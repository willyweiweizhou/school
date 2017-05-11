def print_lol(): 
    f = open("data2.txt", encoding = "latin-1")

    text = f.read()
    print(text)

    L = text.split("\n")
    print(len(L))
    for i in range(len(L)):
        if "lol" in L[i].lower():
            print(L[i])
            
            
d = {1:2, 5:6, 0:8}
def dict_to_str(d):
    string = ""
    for i in d.keys():
        string += (str(i) + ',' + str(d[i]) + '\n')
    return string 
    
    
dict_to_str(d)


def dict_to_str_sorted(d):
    L = []
    string = ''
    for i in d.keys():
        L.append(i)
    
    S = sorted(L)
    print(S)
    for i in range(len(S)):
        string += str(S[i])+',' + str(d[S[i]]) + '\n'
    return string
    
    

def flesch():
    f = open("data2.txt", encoding = "latin-1")
    
    text = f.read()
    
    num_words = len(text.split(" "))
    
    text1 = text.replace("!", ",")
    text1 = text.replace("?", ".")
    
    num_sentence = len(text1.split("."))
    
    vowel = 'aeiou'
    
    num_syllables = 0
    for i in range(1,len(text)):
        if text[i] in vowel:
            if text[i-1] not in vowel:
                num_syllables += 1
    return 0.39*(num_words/num_sentence)+11.8*(num_syllables/num_words)
                
            
        
    
'''Semantic Similarity: starter code

Author: Michael Guerzhoy. Last modified: Nov. 14, 2016.
'''

import math


def norm(vec):
    '''Return the norm of a vector stored as a dictionary,
    as described in the handout for Project 3.
    '''
    
    sum_of_squares = 0.0  
    for x in vec:
        sum_of_squares += vec[x] * vec[x]
    
    return math.sqrt(sum_of_squares)

def norm2(vec):
    sum_of_squares = 0.0
    for i in range(len(vec)):
        sum_of_squares += vec[i]**2
    return math.sqrt(sum_of_squares)
    
def negative_distance(vec1, vec2):
    L = []
    
    for e in vec1:
        if e not in vec2:
            L.append(vec1[e])
        elif e in vec2:
            L.append(vec1[e]-vec2[e])
    for i in vec2:
        if i not in vec1:
            L.append(-vec2[i])

    return -norm2(L)
    
#def negative_distance_normalized(vec1, vec2):
    a = vec1/norm(vec1)
#    b = vec2/norm(vec2)
#    return -norm(a-b)

def negative_distance_normalized(vec1, vec2):
    L = []
    normvec1=norm(vec1)
    normvec2=norm(vec2)
    for i in vec1.keys():
        vec1[i] = vec1[i]/normvec1
    for j in vec2.keys():
        vec2[j] = vec2[j]/normvec2
        
    for m in vec1:
        if m not in vec2:
            L.append(vec1[m])
        elif m in vec2:
            L.append((vec1[m]-vec2[m]))
    for n in vec2:
        if n not in vec1:
            L.append(-vec2[n])
    
    return -norm2(L)

def cosine_similarity(vec1, vec2):
    dot_product = 0
    norm_product1 = 0
    norm_product2 = 0
    L1 = list(vec1.values())
    L2 = list(vec2.values())
    #print(L1, L2)
    for i in vec1.keys():
        for e in vec2.keys():
            if i == e:            
                dot_product += vec1[i] * vec2[e]

    for k in range(len(L1)):
        norm_product1 += L1[k]**2
    for m in range(len(L2)):
        norm_product2 += L2[m]**2
    if math.sqrt(norm_product1*norm_product2) != 0:
        sim = dot_product/math.sqrt(norm_product1*norm_product2)
        return sim
    return -1

def build_semantic_descriptors(sentences):
    D = {}

    word_appeared = []
    
    for i in range(len(sentences)):
        sentences[i] = list(set(sentences[i]))
        #print(sentences[i])
        for e in range(len(sentences[i])):
            if sentences[i][e] not in D:
                D[sentences[i][e]]={}

                for j in range(len(sentences[i])):
                    if sentences[i][j] not in D[sentences[i][e]].keys() and sentences[i][j] != sentences[i][e]:
                        D[sentences[i][e]][sentences[i][j]] = 1
                        
                    
                    elif sentences[i][j] in D[sentences[i][e]].keys():
                        D[sentences[i][e]][sentences[i][j]] += 1
                        
            elif sentences[i][e] in D:
                for j in range(len(sentences[i])):
                    if sentences[i][j] not in D[sentences[i][e]].keys() and sentences[i][j] != sentences[i][e]:
                        D[sentences[i][e]][sentences[i][j]] = 1
                    
                    elif sentences[i][j] in D[sentences[i][e]].keys():

                        D[sentences[i][e]][sentences[i][j]] += 1
    #print(D)
    return D
    
    
def build_semantic_descriptors_from_files(filenames):
    text = ""
    for i in filenames:
        f = open(i, encoding="latin-1")
        text += f.read().lower()
    text = text.replace("!", ".")
    text = text.replace("?", ".")
    text = text.replace("\n", " ")
    text = text.split(".")
    #print(text)
    for i in range(len(text)):
        text[i] = text[i].replace("-", " ")
        text[i] = text[i].replace(" -- ", " ")
        text[i] = text[i].replace(":", " ")
        text[i] = text[i].replace(";", " ")
        text[i] = text[i].split(" ")
        a = 0
        while a < len(text[i]):
            if text[i][a] == '':
                del text[i][a]
            else:
                a += 1
    
    return build_semantic_descriptors(list(text))


def most_similar_word(word, choices, semantic_descriptors, similarity_fn):
    max_word = None
    # L = list(semantic_descriptors.keys())
    # L2 = [0] * len(L)
    # L_word = [0]*len(L)
    max_similarity = -1000000
    # if word not in semantic_descriptors:
    #     return choices[-1]
    # #for m in semantic_descriptors[word].keys():
    #     L_word[L.index(m)] = semantic_descriptors[word][m]
        
    
    #for i in choices:
    #    for e in semantic_descriptors[i].keys():
    #        L2[L.index(e)] = semantic_descriptors[i][e]
    for i in choices:
        if i not in semantic_descriptors or word not in semantic_descriptors:
            similarity = -1
        else:
            similarity = similarity_fn(semantic_descriptors[word], semantic_descriptors[i])

        if max_similarity < similarity:
            max_word = i
            max_similarity = similarity
        #L2 = [0] * len(L)    L = list(semantic_descriptors.keys())
    if max_word == None:
        max_word == choices[0]
    return max_word



def run_similarity_test(filename, semantic_descriptors, similarity_fn):
    f = open(filename, encoding = "latin-1")
    text = f.read().split("\n")
    count = 0
    for i in text:
        list = i.split(" ")
        #print(list)
        if len(list) == 1:
            break
        choices = list[1:]
        #print(choices)
        if list[1] == most_similar_word(list[0],choices, semantic_descriptors, similarity_fn):
            count += 1
        
    #print(count)
    return count/(len(text)-1)*100
            


    
def build_semantic_descriptors_from_files2(text):
    text = text.replace("!", ".")
    text = text.replace("?", ".")
    text = text.replace("\n", " ")
    text = text.split(".")
    for i in range(len(text)):
        text[i] = text[i].replace("-", " ")
        text[i] = text[i].replace(" -- ", " ")
        text[i] = text[i].replace(":", " ")
        text[i] = text[i].replace(";", " ")
        text[i] = text[i].split(" ")
        a = 0
        while a < len(text[i]):
            if text[i][a] == '':
                del text[i][a]
            else:
                a += 1
    
    return build_semantic_descriptors(list(text))


def partial_file(filenames, percentage):
    text = ""
    s = ""
    for i in filenames:
        f = open(i, encoding="utf-8")
        text += f.read().lower()
   
 
    L = []
    for i in range(int(len(text)*percentage)):
        s += text[i]
        
    return s

#print(partial_file(["war and peace.txt","swanns way.txt"], 0.001))

        
def run_time(files,filenames,similarity_fn):
    import time
    start = time.time()
    run_similarity_test(files, build_semantic_descriptors_from_files2(filenames), similarity_fn)
    end = time.time()
    return end - start

            


import matplotlib.pyplot as plt
x = list(range(10,100,10))
# y = []
# for i in x:
#     files = partial_file(["war and peace.txt","swanns way.txt"], i/100)    
#     time = run_time("test.txt",files, cosine_similarity)
#     y.append(time)
# plt.plot(x, y)
# plt.xlabel("size of the file")
# plt.ylabel("run time(sec)")
# plt.title("run time vs size of file")
# plt.show()

y2 = []
for i in x:
    files = partial_file(["war and peace.txt","swanns way.txt"], i/100)   
    score = run_similarity_test("test.txt", build_semantic_descriptors_from_files2(files), cosine_similarity)
    y2.append(i)
plt.plot(x, y2)
plt.xlabel("size of the file")
plt.ylabel("performance(%)")
plt.title("performance vs size of file")
plt.show()   





    
if __name__ == '__main__':
    import time
    start_time = time.time()
    #print(cosine_similarity({"a": 1, "b": 2, "c": 3}, {"b": 4, "c": 5, "d": 6}))
    sentences =  [["i", "am", "a", "sick", "man"],
    ["i", "am", "a", "spiteful", "man"],
    ["i", "am", "an", "unattractive", "man"],
    ["i", "believe", "my", "liver", "is", "diseased"],
    ["however", "i", "know", "nothing", "at", "all", "about", "my",
    "disease", "and", "do", "not", "know", "for", "certain", "what", "ails", "me"]]
    a = build_semantic_descriptors(sentences)

    # print(build_semantic_descriptors(sentences))
    print(cosine_similarity(a["man"], a["liver"]))

    #D = build_semantic_descriptors_from_files(["war and peace.txt","swanns way.txt"])
    #print(D)
    # print(run_similarity_test("test.txt", D, cosine_similarity))
    # print(run_similarity_test("test.txt", D, negative_distance))
    # print(run_similarity_test("test.txt", D, negative_distance_normalized))
    # print(time.time() - start_time)
    #print(D["dog"])
    # D = {}
    #print(run_similarity_test("test.txt", D, cosine_similarity))
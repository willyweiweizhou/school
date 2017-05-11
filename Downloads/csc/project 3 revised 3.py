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
    
def negative_distance(vec1, vec2):
    L = []
    
    for e in vec1:
        if e not in vec2:
            L.append(-vec1[e])
        L.append(vec1[e]-vec2[e])
    return -norm(L)
    
#def negative_distance_normalized(vec1, vec2):
    a = vec1/norm(vec1)
#    b = vec2/norm(vec2)
#    return -norm(a-b)

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
        
    sim = dot_product/math.sqrt(norm_product1*norm_product2)
    return sim

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
                        
                    #print(D[elem].keys())
                    
                    elif sentences[i][j] in D[sentences[i][e]].keys():
                        #print(sentences[b][j], sentences[b])
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
        f = open(i, encoding="utf-8")
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
    L = list(semantic_descriptors.keys())
    L2 = [0] * len(L)
    L_word = [0]*len(L)
    max_similarity = 0
    if word not in semantic_descriptors:
        return choices[0]
    #for m in semantic_descriptors[word].keys():
        L_word[L.index(m)] = semantic_descriptors[word][m]
        
    
    #for i in choices:
    #    for e in semantic_descriptors[i].keys():
    #        L2[L.index(e)] = semantic_descriptors[i][e]
    for i in choices:
        if i not in semantic_descriptors:
            return choices[0]
        similarity = similarity_fn(semantic_descriptors[word], semantic_descriptors[i])
        max_similarity = max(max_similarity, similarity)
        if max_similarity == similarity:
            max_word = i
        #L2 = [0] * len(L)
    return max_word


def run_similarity_test(filename, semantic_descriptors, similarity_fn):
    f = open(filename, encoding = "utf-8")
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
    # a = build_semantic_descriptors(sentences)

    # print(build_semantic_descriptors(sentences))
    # print(cosine_similarity(a["man"], a["liver"]))

    D = build_semantic_descriptors_from_files(["war and peace.txt","swanns way.txt"])
    #print(D)
    print(run_similarity_test("text.txt", D, negative_distance))
    print(time.time() - start_time)
    #print(D["dog"])
    # D = {}
    #print(run_similarity_test("test.txt", D, cosine_similarity))
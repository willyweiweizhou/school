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


def cosine_similarity(vec1, vec2):
    dot_product = 0
    norm_product1 = 0
    norm_product2 = 0
    L1 = list(vec1.values())
    L2 = list(vec2.values())
    print(L1, L2)
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
    L = []
    D = {}
    word_appeared = []
    
    for i in range(len(sentences)):
        for e in range(len(sentences[i])):
            if sentences[i][e] not in L:
                L.append(sentences[i][e])
    print(L)

    for a in range(len(L)):
        D[L[a]] = {} 

    #print(D)
    for elem in L:
        for b in range(len(sentences)):
            if elem in sentences[b]:
                for j in range(len(sentences[b])):
                    if sentences[b][j] not in D[elem].keys() and sentences[b][j] != elem:
                        D[elem][sentences[b][j]] = 1
                        
                    #print(D[elem].keys())
                    
                    elif sentences[b][j] in D[elem].keys() and sentences[b][j] not in word_appeared:
                        #print(sentences[b][j], sentences[b])
                        D[elem][sentences[b][j]] += 1
                        word_appeared.append(sentences[b][j])
                word_appeared = []
    return D
    #print(D["man"])
    #print(cosine_similarity(D["man"], D["liver"]))
    
def build_semantic_descriptors_from_files(filenames):
    f = open(filenames, encoding="utf-8")
    text = f.read().lower()
    text = text.replace("!", ".")
    text = text.replace("?", ".")
    text = text.split(".")
    for i in range(len(text)):
        text[i] = text[i].replace("-", ", ")
        text[i] = text[i].replace(" -- ", ", ")
        text[i] = text[i].replace(":", ",")
        text[i] = text[i].replace(";" ,",")
        text[i] = text[i].replace("\n", ",")
        text[i] = text[i].split(",")
        
    
    return build_semantic_descriptors(text)


def most_similar_word(word, choices, semantic_descriptors, similarity_fn):
    L = list(semantic_descriptors.keys())
    L2 = [0] * len(L)
    L_word = [0]*len(L)
    if word not in semantic_descriptors:
        return choices[0]
    
    for m in semantic_descriptors[word].keys():
        L_word[L.index(m)] = semantic_descriptors[word][m]
        
    
    for i in choices:
        if choices[i] not in semantic_descriptors:
            return choices[0]
        for e in semantic_descriptors[i].keys():
            
            L2[L.index(e)] = semantic_descriptors[i][e]
  
        similarity = similarity_fn(semantic_descriptors[word].values(), choices[i].values())
        max_similarity = max(max_similarity, similarity)
        if max_similarity == similarity:
            max_word = choices[i]
        L2 = [0] * len(L)
    return max_word


def run_similarity_test(filename, semantic_descriptors, similarity_fn):
    f = open(filename, encoding = "utf-8")
    text = f.read().split("\n")
    count = 0
    for i in text:
        list = i.split()
        
        choices = list[1:-2]
        if list[-1] == most_similar_word(list[0],choices, semantic_descriptors, similarity_fn):
            count += 1
    print(count)
    return count/len(text)*100
            
            
            
    
    
    
    
    
if __name__ == '__main__':
    #print(cosine_similarity({"a": 1, "b": 2, "c": 3}, {"b": 4, "c": 5, "d": 6}))
    sentences =  [["i", "am", "a", "sick", "man"],
    ["i", "am", "a", "spiteful", "man"],
    ["i", "am", "an", "unattractive", "man"],
    ["i", "believe", "my", "liver", "is", "diseased"],
    ["however", "i", "know", "nothing", "at", "all", "about", "my",
    "disease", "and", "do", "not", "know", "for", "certain", "what", "ails", "me"]]
    a = build_semantic_descriptors(sentences)
    #build_semantic_descriptors_from_files(filenames)
    #print(run_similarity_test("text.txt",a, cosine_similarity))
    #build_semantic_descriptors_from_files("war and peace.txt")
    run_similarity_test("text.txt", build_semantic_descriptors_from_files("swanns way.txt"), cosine_similarity)
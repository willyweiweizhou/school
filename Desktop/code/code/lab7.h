#include <stdio.h>
#include <stdlib.h>

struct Data{
    int data;
};

struct Node{
    struct Data d;
    struct Node * lChild;
    struct Node * rChild;
};

struct sNode{
    struct Node * n;
    struct sNode * next;
};

struct Stack{
    int size;
    struct sNode * top;
};

struct Stack * initializeStack();
void push(struct Stack * S, struct Node * n);
struct Node * pop(struct Stack * S);
int isEmpty(struct Stack * S);
void freeStack(struct Stack * S);


struct Node * insertBST(struct Node * r, struct Data d);
void printBSTs(struct Node * r1, struct Node * r2);
void deleteTree(struct Node * r);
void printInOrder(struct Node * r);


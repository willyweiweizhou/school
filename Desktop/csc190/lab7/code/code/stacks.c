#include "lab7.h"

struct Stack * initializeStack(){
    struct Stack * s =(struct Stack *)malloc(sizeof(struct Stack));
    s->top=NULL;
    s->size=0;
    return s;
}

void push(struct Stack * S, struct Node * n){
    struct sNode * sN = (struct sNode *)malloc(sizeof(struct sNode));
    sN->next=S->top;
    sN->n=n;
    S->top=sN;
    S->size++;
}

int isEmpty(struct Stack * S){
    if (S->size==0) {
        return 1;
    }
    else{
        return 0;
    }
}

struct Node * pop(struct Stack * S){
    struct Node * n=NULL;
    struct sNode * sN;
    if (isEmpty(S)!=1){
        n = S->top->n;
        sN = S->top;
        S->top=sN->next;
        S->size--;
        free(sN);
    }
    return n;
}

void freeStack(struct Stack * S){
    free(S);
}
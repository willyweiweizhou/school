#include "lab7.h"
void pushinstack(struct Stack * stack, struct Node * r1);

struct Node * insertBST(struct Node * r, struct Data d){

    if (r == NULL)
    {
        struct Node *newnode = (struct Node *)malloc(sizeof (struct Node));
        newnode -> d = d;
        newnode -> lChild = NULL;
        newnode -> rChild = NULL;
        return newnode;
    }
    else
    {
        if (r -> d.data > d.data)
        {
            r -> lChild = insertBST(r->lChild, d);
        }
        else
        {
            r -> rChild = insertBST(r->rChild, d);
        }
    }
    return r;
}

void printInOrder(struct Node * r){
    if (r != NULL)
    {
        printInOrder(r->lChild);
        printf("%d ", r->d.data);
        printInOrder(r->rChild);
    }
}

void deleteTree(struct Node * r){
    if (r!=NULL)
    {
        deleteTree(r->rChild);
        deleteTree(r->lChild);
        free(r);
    }
}

void printBSTs(struct Node * r1, struct Node * r2){

    struct Stack * stack1 = initializeStack();
    pushinstack(stack1, r1);
    struct Stack * stack2 = initializeStack();
    pushinstack(stack2, r2);

    while ( !isEmpty(stack1) || !isEmpty(stack2))
    {
        if (isEmpty(stack1))
        {
            while (!isEmpty(stack2))
            {

                struct Node * a = pop(stack2);
                printf("%d ", a -> d.data);
            }
        }
        else if(isEmpty(stack2))
        {
            while(!isEmpty(stack1))
            {

                struct Node * a = pop(stack1);
                printf("%d ", a -> d.data);
            }
        }
        else
        {
            if ((stack1 -> top -> n -> d).data > (stack2 -> top -> n -> d).data)
            {

                struct Node * a = pop(stack1);
                printf("%d ", a -> d.data);
            }
            else if (stack2 -> top->n->d.data > stack1 -> top -> n -> d.data )
            {

                struct Node * a = pop(stack2);
                printf("%d ", a -> d.data);

            }
        }
    }
    freeStack(stack1);
    freeStack(stack2);
}


void pushinstack(struct Stack * stack, struct Node * r1)
{
    if (r1 == NULL)
    {
        return;
    }


    else if (r1 -> lChild == NULL && r1 -> rChild == NULL)
    {
        push(stack, r1);
    }
    else
    {
        pushinstack(stack, r1->lChild);
        push(stack, r1);
        pushinstack(stack, r1 -> rChild);
    }


}



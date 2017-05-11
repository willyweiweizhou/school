# include <stdio.h>
# include <stdlib.h>

struct Data
{
    int content;
};

struct Node
{
    struct Data d;
    struct Node * next;
}


void reverseList (struct Node ** pL)
{

    if ((*pL) -> next == NULL)
    {
        return;
    }
    else
    {
        reverseList(&((*pL)->next));
        struct Node *q = (*pL) -> next;
        q -> next = *pL;
        (*pL) -> next = NULL;


    }


}

void insertFront (int d, struct Node ** ptrL)
{

    struct Node * newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->d.content = d;
    newNode -> next = *ptrL;
    *ptrL = newNode;
}

void printList(struct Node *pL)
{

    struct Node * currNode = pL;
    while (currNode != NULL)
    {

        printf("%d", currNode->d);
        currNode = currNode -> next;
    }
    printf("\n");
}



int main(void)
{
    struct Node * L = NULL;
    insertFront(3, &L);
    insertFront(1, &L);
    insertFront(4, &L);
    insertFront(5, &L);
    printList(L);
    reverseList(&L);
    printList(L);
    return 0;


}

#include "lab5.h"

void insertNode(int d, struct Node ** lPtr)
{
    struct Node *newnode = (struct Node *)malloc(sizeof(struct Node));
    struct Node *prev = NULL;
    newnode -> data = d;
    newnode -> next = NULL;
    struct Node *currnode = *lPtr;

    if (*lPtr == NULL)
    {
        *lPtr = newnode;
        return;
    }

    while (currnode -> data < d)
    {
        if (currnode -> next == NULL)
        {

            break;
        }
        prev = currnode;
        currnode = currnode -> next;

    }




    if (prev == NULL)
    {
        newnode -> next = *lPtr;
        *lPtr =  newnode;
        return;
    }
    else
    {
        if (currnode ->next == NULL)
        {
            if (currnode -> data < d)
            {
                currnode -> next = newnode;
                return;
            }
            else
            {
                newnode -> next = currnode;
                prev -> next = newnode;
            }


        }
        else
        {
            newnode -> next = currnode;
            prev -> next = newnode;
            return;
        }


    }





}
void deleteNode(int d, struct Node ** lPtr)
{
    struct Node *temp = *lPtr;
    struct Node *prev = NULL;
    while (temp -> data < d)
    {
        if (temp -> next == NULL)
        {
            break;
        }
        prev = temp;
        temp = temp -> next;

    }
    if (prev == NULL)
    {

        *lPtr = temp -> next;

    }
    else
    {
        if (temp -> next == NULL)
        {
            prev -> next = temp -> next;

        }
        else
        {
            prev -> next = temp -> next;
        }

    }

}

void printList(struct Node * L)
{
    if (L == NULL)
    {

        return;
    }
    while (L -> next!= NULL)
    {
        printf("%d ", L-> data);
        L = L-> next;
    }
    printf("%d", L-> data);
    printf("\n");

}

struct Node ** createTable(int buckets)
{
    int i;    
    struct Node **newtable = (struct Node **)malloc(sizeof(struct Node *)*buckets);
    for (i = 0; i < buckets; i ++)

    {
        newtable[i] = NULL;
    }
    return newtable;

}

int findHash(int key, int buckets)
{
    return key%buckets;
}

void insertTable(int key, int buckets, struct Node ** tablePtr)
{
    int a = findHash(key,buckets);
    insertNode(key, &tablePtr[a]);

}

void freeTable(struct Node ** tablePtr, int buckets)
{
    int i, d;
    for (i = 0; i < buckets; i ++)
    {
        while (tablePtr[i] != NULL)
        {
            d = tablePtr[i] -> data;
            deleteNode(d, &tablePtr[i]);
        }
        free(tablePtr[i]);
    }
    free(tablePtr);

}



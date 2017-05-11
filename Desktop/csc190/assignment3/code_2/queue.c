#include "queue.h"

struct Queue initQueue()
{
    struct Queue newQueue;
    newQueue.currSize = 0;
    newQueue.front = NULL;
    newQueue.rear = NULL;
    return newQueue;
}

void enQueue(struct Queue *qPtr, struct Data d)
{
    struct Node * newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode -> data = d;
    newNode -> next = NULL;

    if (qPtr -> rear == NULL )
    {
        qPtr -> rear = newNode;
        qPtr -> front = newNode;
    }
    else
    {
        qPtr -> rear -> next = newNode;
        qPtr -> rear = newNode;
    }
    qPtr -> currSize ++;
}

struct Data deQueue(struct Queue *qPtr)
{

    if (qPtr -> currSize > 0)
    {
        struct Node * temp;
        temp = qPtr -> front;
        struct Data d = temp -> data;
        if (qPtr -> front == qPtr -> rear)
        {
            qPtr -> front = NULL;
            qPtr -> rear = NULL;
        }
        else
        {
            qPtr -> front = temp -> next;
        }
        free(temp);
        qPtr -> currSize --;
        return d;
    }
}
void freeQueue(struct Queue *qPtr)
{
    struct Data d;
    while (qPtr -> currSize != 0)
    {
       d = deQueue(qPtr);
    }



}

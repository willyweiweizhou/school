#include <stdio.h>

struct Queue
{
    int currsize;
};

struct Queue initQueue()
{
    struct Queue * newqueue= (struct Queue *)malloc (sizeof(struct Queue));
    newqueue -> currsize = 1;
    return *newqueue;
}


int main()
{
    struct Queue Q = initQueue();
    printf("%d", Q.currsize);

}

#include "lab7.h"

void p1(void)
{
    struct Node * r=NULL;
    struct Data d;
    d.data=10;
    r=insertBST(r,d);
    d.data=1;
    r=insertBST(r,d);
    d.data=15;
    r=insertBST(r,d);
    d.data=9;
    r=insertBST(r,d);
    printInOrder(r);
    deleteTree(r);
}

void p2(void)
{
    struct Node * r1=NULL, * r2=NULL;
    struct Data d;
    d.data=10;
    r1=insertBST(r1,d);
    d.data=20;
    r1=insertBST(r1,d);
    d.data=1;
    r1=insertBST(r1,d);
    d.data=15;
    r1=insertBST(r1,d);
    //printInOrder(r1);

    d.data=13;
    r2=insertBST(r2,d);
    d.data=17;
    r2=insertBST(r2,d);
    d.data=3;
    r2=insertBST(r2,d);
    d.data=2;
    //printInOrder(r2);

    printBSTs(r1, r2);

    deleteTree(r1);
    deleteTree(r2);
}

int main( int argc, char *argv[] )
{
    if( argc < 2 || argc > 2)
   	{
        printf("Expecting one argument. Please try again\n");
   	}
    else if(argc==2)
    {
        if(atoi(argv[1])==1)
        {
            p1();
        }
        else if(atoi(argv[1])==2)
        {
            p2();
        }
        else
        {
            printf("Incorrect argument supplied.\n");
        }
    }
}

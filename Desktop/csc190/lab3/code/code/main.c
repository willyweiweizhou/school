#include "lab3.h"

void p1(void)
{
    struct Car * c = initCar(1,"CarA");
    c->setCarState(c, 61, 2, 4, 1);
    printCarState(c);
    cleanUpCar(c);
}

void p2(void)
{
    struct ExpressLaneRec * eLFront, * eLCurr;
    struct Car * c;
    c=initCar(1,"CarA");
    c->setCarState(c, 61, 2, 4, 1);
    eLFront=addCarRec(c,10.23, 10.34, NULL);
    c=initCar(1,"CarB");
    c->setCarState(c, 110, 4, 2, 0);
    eLCurr=addCarRec(c,11.23, 12.34, eLFront);
    c=initCar(1,"CarC");
    c->setCarState(c, 190, 5, 1, 0);
    eLCurr=addCarRec(c, 1.34, 2.32, eLCurr);
    printRecords(eLFront);
    cleanUpRec(eLFront);
}

int main( int argc, char *argv[] )
{
    if( argc < 2 )
   	{
        printf("Expecting at least one argument. Please try again\n");
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
    else
    {
        printf("Expecting one argument. Please try again.\n");
    }
}

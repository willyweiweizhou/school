#include "lab3.h"

struct ExpressLaneRec * initExpressLane(float enterTime, float exitTime)
{
    struct ExpressLaneRec *ptr = (struct ExpressLaneRec *)malloc(sizeof(struct ExpressLaneRec));
    ptr -> enterTime = enterTime;
    ptr -> exitTime = exitTime;
    ptr -> car = NULL;
    ptr -> nextRec = NULL;
    return ptr;

}

struct ExpressLaneRec * addCarRec(struct Car * c, float enterTime, float exitTime, struct ExpressLaneRec * eL)
{
    struct ExpressLaneRec *ptr;
    ptr = initExpressLane(enterTime, exitTime);
    ptr -> car = c;
    if(eL != NULL)
    {
        eL->nextRec=ptr;
    }
    return ptr;



}

void printRecords(struct ExpressLaneRec * eLCurr)
{
    if (eLCurr -> nextRec != NULL)
    {
        printf("Car enter time is: %f\n", eLCurr -> enterTime);
        printf("Car exit time is: %f\n", eLCurr -> exitTime);
        printCarState(eLCurr->car);
        printf("\n\n");
        printRecords(eLCurr -> nextRec);

    }
    else
    {
        printf("Car enter time is: %f\n", eLCurr -> enterTime);
        printf("Car exit time is: %f\n", eLCurr -> exitTime);
        printCarState(eLCurr->car);

    }





}

void cleanUpRec(struct ExpressLaneRec * eL)
{
    if (eL->nextRec == NULL)
    {
        cleanUpCar(eL->car);
        free(eL);
    }
    else
    {
        cleanUpRec(eL->nextRec);
        cleanUpCar(eL -> car);
        free(eL);
    }


}


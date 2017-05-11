#include "lab3.h"

struct Vehicle * initVehicle(int wheels, char * model, struct vInterface vInt)
{
    struct Vehicle *vptr = (struct Vehicle *)malloc(sizeof(struct Vehicle));
    vptr-> numWheels = wheels;
    strcpy(vptr->model, model);
    vptr->numPassengers = 0;
    vptr->currSpeed = 0;
    vptr->gear = 0;
    vptr->vehInt = vInt;
    return vptr;


}

void cleanUpVehicle(struct Vehicle * v)
{
    free(v);
}


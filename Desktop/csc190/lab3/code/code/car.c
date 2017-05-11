#include "lab3.h"

int setSpeed(int speed)
{
    if (speed <= 260)
    {

        return speed;
    }
    else
    {

        return -1;
    }

}

int setGear(int gear)
{
    if (gear <= 5)
    {

        return gear;

    }
    else
    {
        return -1;
    }

}

int setPassengers(int passengers)
{
    if (passengers <= 5)
    {
        return passengers;
    }
    else
    {
        return -1;
    }

}

void setCarState(struct Car * c, int speed, int gear, int passengers, int nav){
    c -> veh -> currSpeed = c -> veh -> vehInt.setSpeed(speed);
    c -> veh -> gear = c -> veh -> vehInt.setGear(gear);
    c -> veh -> numPassengers = c -> veh -> vehInt.setPassengers(passengers);
    c -> hasNav = nav;

}

void printCarState(struct Car * c){
    printf("the current speed is: %d\n", c-> veh -> currSpeed);
    printf("the gear is : %d\n", c-> veh -> gear);
    printf("the number of Passenger is: %d\n", c -> veh -> numPassengers);
    printf("navigator in the car is: %d\n", c-> hasNav);

}

struct Car * initCar(int nav, char * model)
{
    struct Car *car = (struct Car *)malloc(sizeof(struct Car));
    car -> veh = initVehicle(4, model, initVInterface(setSpeed, setGear, setPassengers));
    car -> hasNav = nav;
    car -> setCarState = setCarState;
    return car;
}

void cleanUpCar(struct Car * c)
{
    cleanUpVehicle(c->veh);
    free(c);

}





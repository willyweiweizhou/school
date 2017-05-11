#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include "time.h"
#include "queue.h"

typedef enum {ARRIVAL, DEPARTURE} Event;

struct Simulations{
    double currTime;
    double arrivalRate;
    double serviceTime;
    double timeForNextArrival;
    double timeForNextDeparture;
    double totalSimTime;
    struct Queue buffer, eventQueue;
    Event e;
};

double runSimulations(double arrivalRate, double serviceTime, double simTime);
struct Simulations initSimulations(double arrivalRate, double serviceTime, double simTime);
double getRandTime(double arrivalRate);
double calcAverageWaitingTime(struct Simulations * S);

#include "assignment3.h"

double calcAverageWaitingTime(struct Simulations * S)
{
    double time = 0;
    int count = S -> eventQueue.currSize;
    struct Data data;
    while (S -> eventQueue.currSize!=0)
    {
        data = deQueue(&(S -> eventQueue));
        time += data.departureTime - data.arrivalTime;

    }

    freeQueue(&(S->buffer));
    return time /count;
}

struct Simulations initSimulations(double arrivalRate, double serviceTime, double simTime)
{
    struct Simulations simulations;
    simulations.currTime = 0;
    simulations.arrivalRate = arrivalRate;
    simulations.serviceTime = serviceTime;
    simulations.totalSimTime = simTime;
    simulations.timeForNextArrival = getRandTime(arrivalRate);
    simulations.timeForNextDeparture = serviceTime + simulations.timeForNextArrival;
    simulations.buffer = initQueue();
    simulations.eventQueue = initQueue();
    return simulations;
}

double runSimulations(double arrivalRate, double serviceTime, double simTime)
{
    struct Data data;

    struct Simulations simulations = initSimulations(arrivalRate, serviceTime, simTime);


    while (simulations.currTime < simTime)
    {

        if (simulations.timeForNextArrival < simulations.timeForNextDeparture || simulations.buffer.currSize == 0)
        {
            simulations.currTime = simulations.timeForNextArrival;
            data.arrivalTime = simulations.currTime;
            enQueue(&simulations.buffer, data);
            simulations.timeForNextArrival = simulations.currTime + getRandTime(arrivalRate);

        }
        else
        {
            simulations.currTime = simulations.timeForNextDeparture;
            data = deQueue(&simulations.buffer);
            data.departureTime = simulations.currTime;
            enQueue(&simulations.eventQueue, data);

            if (simulations.buffer.currSize == 0)
            {
                simulations.timeForNextDeparture = simulations.timeForNextArrival + serviceTime;
            }
            else
            {

                simulations.timeForNextDeparture = simulations.timeForNextDeparture + serviceTime;
            }

        }
    }

    double avgtime = calcAverageWaitingTime(&simulations);

    return avgtime;


}

#include "lab3.h"

struct vInterface initVInterface(int (*sS)(int), int (*sG)(int), int (*sP)(int))
{
    struct vInterface v;
    v.setSpeed = sS;
    v.setGear = sG;
    v.setPassengers = sP;
    return v;
}

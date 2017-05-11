#include "a1.h"
#include "a1Part1.c"
float S(float a, float b)
{
    float m = (a+b)/2;
    float n = (f(a)+ f(m)*4 + f(b))*(b-a)/6;
    return n;
}


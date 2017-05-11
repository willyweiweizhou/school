#include "a1.h"
#include "a1Part2.c"
int i, c, sum, A[ARRAYSIZE];
void simpsonsAdaptiveIntegration(float aOrig, float bOrig, float eps, float minIntSize)
{
    A[0] = aOrig;
    A[1] = bOrig;
    int n = 2;
    float a = (aOrig - aOrig)/n;
    for (i = 0; i<n; i++){
        if (S(A[i+1],A[i])+ S(A[i+1],A[i+2]) -S(A[i],A[i+2]) > eps){
            if ((A[i+1] - A[i])/2 > minIntSize){
                for (c = n+1; c >= i; c--){
                    A[c+1] = A[c];
                    A[i+1] = floor((A[i+2]-A[i])/2);
                    n += 1;
            }}
            else{
                sum += S(A[i],A[i+1]);
            }}
        else{
            sum += S(A[i],A[i+2]);
        }
        }
    printf("%f", sum);
}

int main()
{
    simpsonsAdaptiveIntegration(-M_PI/2,M_PI/12,0.0000001,0.0000001);
    return 0;
}

#include "a1.h"
#include "a1Part2.c"
void simpsonsAdaptiveIntegration(float aOrig, float bOrig, float eps, float minIntSize)
{
    float A[ARRAYSIZE];
    A[0] = aOrig;
    A[1] = bOrig;
    int n = 2;int j, i;
    float sum = 0;
    float mid;

    for (i = 0; i< n-1; i++)
    {
        mid = (A[i]+A[i+1])/2;
        if (fabs(S(A[i],mid)+S(mid,A[i+1])-S(A[i],A[i+1]))/15 > eps && mid - A[i] > minIntSize)
        {
            for (j= n; j>i+1; j--)
            {
                A[j] = A[j-1];
            }

            A[i+1] = mid;

            n += 1;

            i=i-1;
        }
        else
        {
            sum += S(A[i],A[i+1]);

        }

    }

    printf("%f", sum);

}


int main()
{
    simpsonsAdaptiveIntegration(-M_PI/2,M_PI/12,0.0000001,0.0000001);
    return 0;
}

#include "a1.h"
#include "a1Part2.c"
int A[ARRAYSIZE];
void simpsonsAdaptiveIntegration(float aOrig, float bOrig, float eps, float minIntSize)
{
    float a = aOrig;
    float b = bOrig;
    int count = 0, i;
    float mid = (aOrig+bOrig)/2;
    float sum = 0;
    while (1)
    {
        if (fabs(S(a,mid)+S(mid,b)-S(a,b))/15 > eps || b-a > minIntSize)
        {
            for (i = ARRAYSIZE; i>=count; i--)
            {
                A[i+1] = A[i];
                A[count]=b;
            }
            b = mid;
            mid = (a + b)/2;

        }
        else
        {
            sum += S(a, b);
            a = mid;
            mid = (a + b)/2;
            count += 1;
            if (a == bOrig)
            {
                break;
            }

        }
    }
    printf("%f", sum);
}

int main()
{

    simpsonsAdaptiveIntegration(-M_PI/2,M_PI/12,0.0000001,0.0000001);
}

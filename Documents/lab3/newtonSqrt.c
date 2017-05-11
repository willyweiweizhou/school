#include<stdio.h>
double absolute(double a)
{
    if (a < 0)
    {
        return -a;
    }
    else
    {
        return a;
    }
}

double newtonSqrt(double x, double a, double eps)
{
	if (absolute(a*a-x)<eps)
	{
       		return a;
        }
	else
	{
		return newtonSqrt(x, (a+x/a)/2, eps);
	}
}

int main()
{
    printf("Newton's method:%f\n", newtonSqrt(15, 15/2, 0.1));
    //printf("Hello\n");
    return 0;
}


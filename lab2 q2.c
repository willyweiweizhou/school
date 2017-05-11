
#include <stdio.h>
int number = 0 ;
int S[] = {1,5,10,20,25};
int A[1000];
int min_number = 10000;

int findMinChangeCoins(int c, int n)
{
    int i;

        if (c%S[n] == 0)
        {
            number += c/S[n];
            min_number = min(min_number, number);
            number = 0;


        }
        else
        {
            for (i=n; i >=0; i--)
            {


                number += c/S[i];
                return findMinChangeCoins(c%S[n], n-1);

            }
        }


}

int min(int a, int b)
{
    if (b<a)
    {
        return b;
    }
    return a;
}

int main(void)
{
    printf("Change: %d, Number of Coins: %d\n", 40, findMinChangeCoins(40,4));
    printf("", min_number);
    return 0;
}

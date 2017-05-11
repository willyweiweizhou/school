
#include <stdio.h>
int S[] = {1,5,10,20,25};
int way = 0;
//int temp1 = 0; int temp2 = 0;
int find(int c, int n)
{
    int temp1, temp2;
/*    int number;
    if (c-S[n] == 0)
    {
        return 1;
    }
    else
    {
        if (c>=S[n] && n>=1)
        {
            temp1 = find(c-S[n], n)+1;
            temp2 = find(c, n-1) +1;
        }
        /*
        if (c>=S[n] && n == 0)
        {
            temp1 = find(c - S[n], n) +1;
        }
        else
        {
            temp2 = find(c, n-1) +1;
        }*/
    //}
    //return min(temp1, temp2);

    //if(c<S[n]) //first base case
      //  {
        //    return 0;
        //}
     if (c== S[n]) //second base case
        {
            return 1;
        }
    else if (n < 0)
    {
        return 100000;
    }
    //else if (n<0)
      //  {
        //    return 0;
        //}
    if (c>=S[n])
    {
        temp1 = find(c-S[n], n) + 1; // if S[n] is included
        temp2 = find(c, n-1) + 1;
    }
    if(temp1 < temp2)
          {
              return temp1;
          }
    else
          {
              return temp2;
          }




}




int min(int a, int b)
{
    if (a<b)
    {
        return a;
    }
    return b;
}

int main(void)
{
    printf("Change: %d, Number of Coins: %d\n", 40, find(40,4));
}
